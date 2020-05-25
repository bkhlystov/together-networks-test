/**
 * Select frame
 * @param  {String}   element Frame selector
 */
module.exports = (element) => {
    $(element).waitForDisplayed();
    browser.pause(1000);
    browser.switchToFrame($(element));
};
