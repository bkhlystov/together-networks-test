/**
 * Select an option of a select element
 * @param  {String}   selectionType  Type of method to select by (name, value or text)
 * @param  {String}   selectionValue Value to select by
 * @param  {String}   selectElem     Element selector
 */
module.exports = (selectionType, selectionValue, selectElem) => {

    switch (selectionType) {

        case 'value':
        case 'name': {
            $(selectElem).selectByAttribute(selectionType,selectionValue);
            break;
        }

        case 'text': {
            $(selectElem).selectByVisibleText(selectionValue);
            break;
        }

        default: {
            throw new Error(`Unknown selection type "${selectionType}"`);
        }
    }

    browser.pause(200);
};
