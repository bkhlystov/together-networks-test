/**
 * Check the content of a local storage against a given value
 * @param  {String}   keyName       The name of the local storage
 * @param  {String}   falseCase     Whether or not to check if the value matches or not
 * @param  {String}   expectedValue The value to check against
 */
module.exports = (keyName, falseCase, expectedValue) => {

    const keyValue = browser.execute((keyName) => { 
        return localStorage.getItem(keyName); 
    }, keyName);

    if (falseCase) {
        expect(keyValue).to.not
            .equal(
                expectedValue,
                `expected local storage "${keyName}" not to have value "${expectedValue}"`
            );
    } else {
        expect(keyValue).to
            .equal(
                expectedValue,
                `expected local storage "${keyName}" to have value "${expectedValue}"` +
                ` but got "${keyValue}"`
            );
    }
    
};
