import Mail from "../support/mail";

const { Given } = require('cucumber');

Given(
    /^I connect into the mailbox for "(.*)"$/,
    (email) => {

        let mail = new Mail({
            ...configData.emailCredentials[email],
            ...{user:email}
        });

        mail.ping();
    }
);

Given(
    /^I get email with "([^"]*)" for "(.*)"$/,
    function( subject, email ) {

        const user = configData.emailCredentials[email].user;

        let mail = new Mail({
            ...configData.emailCredentials[email],
            ...( user ? {} : {user:email} )
        });

        let query = ['UNSEEN', ['FROM', 'info@neomeda.com'], [ 'SUBJECT', subject ]];

        console.log( "\x1b[34m", `Try to get Email with subject: ${subject}`, "\x1b[0m" );

        switch( subject ){
            case "Credentials":
                mail.fetchCredentialsFromLetter(query, (credentials) => {
                    testData.users[email] = credentials;
                    console.log( "\x1b[34m", `User Credentials | Email: ${email}, Password: ${credentials.password}`, "\x1b[0m" );
                });
                browser.waitUntil(() => {
                    return typeof testData.users[email] !== "undefined" &&
                            typeof testData.users[email].password !== "undefined";
                }, 30000 );
                break;
            case "Verification Link":
                mail.getVerificationLinkFromLetter(query, (link) => {
                    if( !testData.users[email] ){
                        testData.users[email] = {};
                    }
                    testData.users[email].verificationLink = link;
                    console.log( "\x1b[34m", `Email verification link: ${link}`, "\x1b[0m" );
                });
                browser.waitUntil(() => {
                    return typeof testData.users[email].verificationLink !== "undefined"
                }, 30000 );
                break;
            default:
                mail.fetchLetter(query);
        }

    }
);