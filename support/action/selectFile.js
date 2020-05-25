const path = require('path');

/**
 * Select file for field
 * @param  {String}   filePath Path to the file
 * @param  {String}   element Element selector
 */
module.exports = (filePath, element) => {

    const fileUpload = $(element);
    const fullPath = path.join(__dirname, '../../files/', `${filePath.replace(/^\//,'')}`);
    const remoteFilePath = browser.uploadFile(fullPath);

    browser.execute(
        function() {
            jQuery("[type=file]").attr("style","display:block !important;position:initial;width:initial;height:initial");
        }
    );

    //browser.pause(2000);

    fileUpload.waitForDisplayed();
    fileUpload.setValue(remoteFilePath);
};
