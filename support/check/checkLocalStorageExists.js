/**
 * Check if a local storage with the given name exists
 * @param  {[type]}   keyName   The name of the local storage
 * @param  {[type]}   falseCase Whether or not to check if the local storage exists or not
 */
module.exports = (keyName, falseCase) => {

    const keyValue = browser.execute((keyName) => { 
        return localStorage.getItem(keyName); 
    }, keyName);

    if (falseCase) {
        expect(keyValue).to.equal(
            null,
            `Expected local storage "${keyName}" not to exists but it does`
        );
    } else {
        expect(keyValue).to.not.equal(
            null,
            `Expected local storage "${keyName}" to exists but it does not`
        );
    }
};
