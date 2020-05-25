const selectors = {
    itemOptionContainedText: function( text ){
        return `//div[contains(@class, 'open')]/ul[contains(@class, 'dropdown-menu')]/descendant::label[text()[contains(.,"${text}")]]`;
    }
}

/**
 * Select an option of a select element
 * @param  {String}   selectionType  Type of method to select by (name, value or text)
 * @param  {String}   selectionValue Value to select by
 * @param  {String}   selectElem     Element selector
 */
module.exports = ( selectionType, selectionValue, selectElem ) => {
    $(selectElem).click();
    let itemOption = null;
    switch( selectionType ){
        case 'text':
            itemOption = selectors.itemOptionContainedText(selectionValue);
            break;
    }
    if( !itemOption ){
        throw new Error('Wrong selection type!');
    }
    $(itemOption).waitForDisplayed();
    $(itemOption).click();
    $(selectElem).click();
    browser.pause(200);
};
