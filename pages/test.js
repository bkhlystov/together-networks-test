const assert = require('assert');

export default class Test {
	constructor() {
		this.storage = {};
        this.TIMEOUT = 30000;
	}

    click( element ){
        let $el = $(element);
        $el.waitForDisplayed();
        $el.waitForEnabled();
        $el.click();
        browser.pause(100);
    }
    clickAndWaitAjax( element, delay ){
        this.click(element);
        this.waitAjax(delay);
    }
    clearAndSetValue(element, fieldValue){
	    let $el = $(element);
	    $el.waitForDisplayed();
	    $el.waitForEnabled();
	    $el.clearValue();
	    $el.setValue(fieldValue);
	    browser.pause(100);
    }
    expectValue( selector, fieldValue ){
        expect(fieldValue).to.equal( $(selector).getValue() );
    }
    waitAjax(delay) {
        browser.pause(400);
        browser.waitUntil(() => {
            const activeRequests = browser.execute(function () {
                return window.jQuery.active;
            });
            return activeRequests === 0;
        }, (delay || null), "Has active Ajax requests", 100 );
        this.noErrors();
    }
    noErrors(){
        this.noJsErrors();
        //this.noAjaxErrors();
    }
    noJsErrors(){
        const jsErrorsCount = browser.execute(function() {
            if( window._store_get_errors ){
                return window._store_get_errors().length;
            }
            if( window._crm_get_errors ){
                return window._crm_get_errors().length;
            }
            return 0;
        });
        assert.strictEqual( jsErrorsCount, 0, `${jsErrorsCount} javascript errors found`);
    }
    noAjaxErrors(){
        const internalErrorsCount = browser.execute(function() {
            if( window.InternalError ){
                return window.InternalError.getErrors().length;
            }
            return 0;
        });
        if( internalErrorsCount > 0 ){
            const internalErrors = browser.execute(function() {
                if( window.InternalError ){
                    return _.map(window.InternalError.getErrors(),function(el){return JSON.stringify(el.stack||el)}).join("\n");
                }
                return "";
            });
            assert.strictEqual( internalErrorsCount, 0, internalErrors);
        }
    }
    scrollToTop(){
        browser.execute("$('html').scrollTop(0)");
    }
    scrollToLeft(){
        browser.execute("$('html').scrollLeft(0)");
    }
    AjaxApi(method, url, data = {}){
        browser.execute(function(method, url, data) {
            window.AjaxApi[method](url,data);
        }, method, url, data);
        this.waitAjax();
    }
    reCache(text) {
        const matched = text.match(/\{[^\{\}]+\}/g);
        for( let i in matched ){
            const barCase = matched[i];
            const barCaseVal = `testData.${matched[i].replace(/[\\{\\}]+/g,'')}`;
            const barCaseData = eval(barCaseVal);
            console.log(`We took the data for ${barCase}: ${barCaseData}`);
            text = text.replace(barCase,barCaseData);
        }
        return text;
    }
    reLoadPage() {
	    browser.execute("document.location.reload(true);");
    }
};