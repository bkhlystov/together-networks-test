module.exports = {
    randomInteger: ( min, max ) => {

        if(!min || !max) {
            throw new Error('Please, set the range options for random integer!');
        }

        return Math.floor(Math.random() * (max - min + 1) + min );
    },
    randomEIN: function(){
        return this.randomInteger(10,99) + '-' + this.randomInteger(1000000,9999999);
    },
    parseBrackets: function( string ){
        let matchedString = string.match(/^\[([^\[\]:]+):([^\[\]]+)\]$/i);
        if( matchedString ){
            return {
                type: matchedString[1],
                value: matchedString[2]
            };
        }
        return null;
    },
    parseFieldType: function( string ){
        let matchedString = string.match(/^([^:]+):([^:]+)$/i);
        if( matchedString ){
            return {
                type: matchedString[2],
                name: matchedString[1]
            };
        }
        return null;
    },
    prepValue: function(string){
        string = string.replace(/{UniqueVal}/ig, global.uniqueValue);
        string = this.tryToGetConfigData(string);
        return this.prepRememberedValues(string);
    },
    tryToGetConfigData: function(string){
        let values = string.match(/<([^<>]+)>/i);
        if( values && values[1] ){
            try { string = eval(`global.configData.${values[1]}`) } catch (e){};
        }
        return string;
    },
    prepRememberedValues: function(string){
        let values = string.match(/{[^{}]+}/ig);
        if( values ){
            for( let i in values ){
                let vp = values[i].match(/{([^{}]+)}/i);
                string = string.replace(vp[0],global.testData[vp[1]]);
            }
        }
        return string;
    },
    generateUniqueValue(length = 5) {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },
    disableCSSAnimation() {
        browser.execute(function () {
            document.documentElement.setAttribute("style", "scroll-behavior:unset");
        });
    }
};