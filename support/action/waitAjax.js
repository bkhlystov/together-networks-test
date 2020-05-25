module.exports = () => {

    browser.waitUntil(() => {

        const activeRequests = browser.execute(function () {
            return window.jQuery.active;
        });

        return activeRequests === 0;

    }, null, "Has active Ajax requests", 100 );

};
