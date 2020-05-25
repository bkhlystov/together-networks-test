import waitAjax from './waitAjax'
/**
 * Filling address with Google autocomplete
 * @param  {String}   element Element selector
 * @param  {Array}   address line value
 */
module.exports = (formElement, dataTable) => {

    const googleFirstOption = `.pac-logo .pac-item:first-child`;
    const addressFields = dataTable.rowsHash();

    waitAjax();

    for (let fieldName in addressFields) {

        const field = `${formElement} [name="${fieldName}"]`;

        if(!$(field).isDisplayed()) {
            $(field).waitForDisplayed();
        }

        $(field).setValue(addressFields[fieldName]);

        browser.pause(200);

        $(googleFirstOption).waitForDisplayed();
        $(googleFirstOption).click();
        $(googleFirstOption).waitForDisplayed( null,true );

    }

};
