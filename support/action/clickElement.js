/**
 * Perform an click action on the given element
 * @param  {String}   action  The action to perform (click or doubleClick)
 * @param  {String}   type    Type of the element (link or selector)
 * @param  {String}   selector Element selector
 */
module.exports = (action, type, selector) => {
    const element = (type === 'link') ? `=${selector}` : selector;
    const method = (action === 'click') ? 'click' : 'doubleClick';
    const elem = $(element);
    elem.waitForDisplayed();
    elem.scrollIntoView();
    switch( elem.getTagName() ){
        case 'button':
        case 'input':
        case 'select':
        case 'textarea':
            elem.waitForEnabled();
            break;
    }
    browser.pause(200);
    elem[method]();
};
