import common from '../common';
import selectOption from './selectOption';
import selectDropListOption from './selectDropListOption';

/**
 * Filling form with values from data table
 * @param  {String}   formSelector Element selector
 * @param  {Array}   values from table
 */
module.exports = (formSelector, dataTable) => {

    $(formSelector).waitForDisplayed();

    const formValues = dataTable.rowsHash();

    for (let fieldName in formValues) {

        let fieldPath = `${formSelector} [name="${fieldName}"]`;
        let fieldType = common.parseFieldType(fieldName);

        if( fieldType ){
            fieldPath = `${formSelector} [name="${fieldType.name}"]`;
        }

        let fieldValue = common.prepValue(formValues[fieldName]);
        let fieldTagName = $(fieldPath).getTagName();

        switch( fieldTagName ){
            case "input":

                if( fieldType ){
                    switch( fieldType.type ){
                        case "DatePicker":

                            $(fieldPath).setValue(fieldValue);

                            browser.execute(function(path) {
                                if( jQuery(".daterangepicker:visible").length ){
                                    window.jQuery(path).data('daterangepicker').hide();
                                } else if( jQuery(".datetimepicker:visible").length ){
                                    window.jQuery(path).blur().data('datetimepicker').hide();
                                } else {
                                    window.jQuery(path).blur();
                                }
                            }, fieldPath);

                            browser.waitUntil(() => {
                                let noDrp = browser.execute(function(path) {
                                    return jQuery(".daterangepicker:visible,.datetimepicker:visible").length === 0;
                                });
                                return noDrp;
                            });

                            break;
                        case "Drop":
                            selectDropListOption( 'text', fieldValue, fieldPath );
                            break;
                    }
                } else {
                    $(fieldPath).setValue(fieldValue);
                }

                break;
            case "textarea":
                $(fieldPath).setValue(fieldValue);
                break;
            case "select":

                let fieldBrackets = common.parseBrackets(fieldValue);

                if( fieldBrackets ){
                    selectOption( fieldBrackets.type, fieldBrackets.value, fieldPath );
                } else {
                    selectOption( 'text', fieldValue, fieldPath );
                }

                // TODO: checkbox, radio, dropdown
        }

    }

};
