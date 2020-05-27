/**
 * Resize the browser window
 * @param  {String}   screenWidth  The width of the window to resize to
 * @param  {String}   screenHeight The height of the window to resize to
 */
module.exports = (screenWidth, screenHeight) => {
    const width = parseInt(screenWidth, 10);
    const height = parseInt(screenHeight, 10);

    browser.setWindowSize(width, height);
};
