/**
 * Perform an click action on the given element
 * @param  {String}   type    Type of the element (checkbox or radio)
 * @param  {String}   inputName Element selector
 * @param  {String}   labelText Label text
 */
module.exports = (type, inputName, labelText) => {
    let element = `//label[text()[contains(.,'${labelText}')]]/input[@name='${inputName}']`;
    $(element).click();
};
