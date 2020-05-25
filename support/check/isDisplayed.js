/**
 * Check if the given element is (not) visible
 * @param  {String}   element   Element selector
 * @param  {String}   falseCase Check for a visible or a hidden element
 */
module.exports = (element, falseCase) => {
    /**
     * Visible state of the give element
     * @type {String}
     */
    const isDisplayed = $(element).isDisplayed();

    if (falseCase) {
        expect(isDisplayed).to.not
            .equal(true, `Expected element "${element}" not to be displayed`);
    } else {
        expect(isDisplayed).to
            .equal(true, `Expected element "${element}" to be displayed`);
    }
};
