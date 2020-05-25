import common from '../common';
/**
 * Open the given URL
 * @param  {String}   type Type of navigation (url or site)
 * @param  {String}   page The URL to navigate to
 */
module.exports = (type, page) => {
    /**
     * The URL to navigate to
     * @type {String}
     */
    
    let url = (type === 'url') ? page : browser.options.baseUrl + page;

    console.log(`Navigate to: ${url}`);
    browser.url(url);
    browser.waitUntil(() => {
        const state = browser.execute(function () {
            return document.readyState;
        });
        return state === 'complete';
    }, null, 'Ready State Complete, time out!');

    common.disableCSSAnimation();

};
