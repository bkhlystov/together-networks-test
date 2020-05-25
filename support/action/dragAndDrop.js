/**
 * Drag a element to a given destination
 * @param  {String}   selector      The selector for the source element
 * @param  {String}   target The selector for the destination element
 */
module.exports = (selector, target) => {
    $(selector).dragAndDrop(target)
};
