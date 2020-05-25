/**
 * Wait for the given element to be checked, enabled, selected, visible, contain
 * a text, contain a value or to exist
 * @param  {String}   elem                     Element selector
 * @param  {String}   ms                       Wait duration (optional)
 * @param  {String}   falseState               Check for opposite state
 * @param  {String}   state                    State to check for (default
 *                                             existence)
 */
module.exports = (elem, ms, falseState, state) => {

    const intMs = parseInt(ms, 10) || 30000;

    let command = 'waitForExist';
    let $elem = $(elem);
    let boolFalseState = !!falseState;
    let parsedState = '';

    if (typeof falseState === 'undefined') {
        boolFalseState = false;
    }

    if (falseState || state) {
        parsedState = state.indexOf(' ') > -1
            ? state.split(/\s/)[state.split(/\s/).length - 1]
            : state;

        switch(parsedState){
            case "checked":
                break;
            case "enabled":
                $elem.waitForEnabled(intMs,boolFalseState);
                break;
            case "selected":
                break;
            case "displayed":
                $elem.waitForDisplayed(intMs,boolFalseState);
                break;
            case "text":
                if( boolFalseState ){
                    browser.waitUntil(() => {
                        return $elem.getText().length === 0;
                    }, intMs );
                } else {
                    browser.waitUntil(() => {
                        return $elem.getText().length > 0;
                    }, intMs );
                }
                break;
            case "value":
                if( boolFalseState ){
                    browser.waitUntil(() => {
                        return $elem.getValue().length === 0;
                    }, intMs );
                } else {
                    browser.waitUntil(() => {
                        return $elem.getValue().length > 0;
                    }, intMs );
                }
                break;
            case "exist":
                $elem.waitForExist(intMs,boolFalseState);
                break;
        }

    } else {
        $elem[command](intMs,boolFalseState);
    }

};
