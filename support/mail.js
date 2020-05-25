let fs = require('fs');
let Imap = require('imap');
let qp = require('quoted-printable');

export default class MailHelper {

    get filePath() { return `${__dirname}\\mail-cache\\${global.uniqueValue}.txt`; }

    constructor( credentials ){
        this.imap = new Imap( credentials );
        this.connectTimeout = 10000;
        this.connected = false;
    }

    fetchLetter(query){
        this.connect(() => {
            this.openInbox(() => {
                this.searchInbox(query);
            });
        });
        this.waitConnection();
    }

    connect(ready = () => {}) {
        this.connected = false;
        this.imap.once('ready', () => {
            this.connected = true;
            ready();
        });
        this.imap.once('error', (err) => {
            console.log( '\x1b[31m', ` IMAP Connect Error: ${err}`);
        });
        this.imap.connect();
    }

    ping(){
        this.connect();
        this.waitConnection();
    }

    waitConnection(){
        browser.waitUntil(() => { return this.connected }, this.connectTimeout);
    }

    openInbox( cb ) {
        this.imap.openBox( 'INBOX', false, ( err, box ) => {
            if(err) throw err;
            cb();
        });
    }

    searchInbox( query ){

        this.imap.search( query, (err, results) => {

            if(err) throw err;

            let f = this.imap.fetch(results, {
                bodies: "TEXT",
                markSeen: true
            });

            f.on("message", (message, seqno) => {
                message.on("body", (stream) => {
                    stream.pipe( fs.createWriteStream(this.filePath) );
                });
            });

            f.once("error", (err) => {
                console.log( '\x1b[31m', `Fetch error: ${err}` );
            });

            f.once("end", () => {
                this.imap.end();
            });

        });

    }

    fetchCredentialsFromLetter( query, ready = () => {} ) {

        this.imap.once('close', () => {
            fs.readFile( this.filePath, "utf8", (err,data) => {
                let emailBody = this.prettyData(data);
                let credentials = {
                    email: emailBody.match(/Email: (.+)<br>/)[1],
                    password: emailBody.match(/(?<=Password: )[^\s]+/)[0]
                };
                ready(credentials);
                this.deleteFile();
            });
        });

        this.fetchLetter(query);

    }

    getVerificationLinkFromLetter( query, ready = () => {} ) {

        this.imap.once('close', () => {
            fs.readFile( this.filePath, "utf8", (err,data) => {
                let emailBody = this.prettyData(data);
                ready(emailBody.match(/>([^><]+)<\/a>/)[1]);
                this.deleteFile();
            });
        });

        this.fetchLetter(query);

    }

    prettyData(data){
        let dataMath = data.match(/<html>/);
        let isHtml = dataMath && dataMath[0];
        if( !isHtml ){
            data = Buffer.from(data,"base64").toString("ascii");
        }
        return qp.decode(data);
    }

    deleteFile(){
        fs.unlink(this.filePath,(err) => {
            if (err) throw err;
        });
    }

};

