/**
 * Check the links
 * @param  {Array}
 */
module.exports = (domain,links) => {
    $$(links).forEach(link => {
        const href = link.getAttribute("href");
        const result = new RegExp(`^${domain}`).test(href);
        expect(result).to
            .equal(true, `Expected link "${link.selector}" does not contain domain ${domain}`);
    });
};
