/**
 * Check the links
 * @param  {Array}
 */
module.exports = (elementPath,dataTable) => {
    const links = dataTable.rowsHash();
    const $el = $(elementPath);
    for (let linkCaption in links) {
        const linkAddress = links[linkCaption];
        let $links = $el.$$(`//a[contains(@href,"${linkAddress}")][contains(text(),"${linkCaption}")]`);
        expect($links).to.have.length
            .above(0, `Expected element "${$el.selector} ${$links.selector}" was to exist.`);
    }
};
