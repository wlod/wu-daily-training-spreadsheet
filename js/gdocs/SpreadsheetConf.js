const SPREADSHEET_CONF = {

    appendProperty: function (name, value) {
        Object.defineProperty(this, name,
            {
                value: value,
                writable: false,
                enumerable: true,
                configurable: true
            });
    },

    appendPropertyFromRow: function (rowPropertyKeyValue, propertiesParent) {
        if (rowPropertyKeyValue.length != 2) {
            return;
        }
        if (rowPropertyKeyValue[0].startsWith(SPREADSHEET_CELL_MULTIDATA_COMMENT) || rowPropertyKeyValue[1].startsWith(SPREADSHEET_CELL_MULTIDATA_COMMENT)) {
            return;
        }

        const propertyName = rowPropertyKeyValue[0];
        const propertyValue = this._getSingleOrMultiValue(rowPropertyKeyValue[1]);

        if (typeof propertiesParent !== "undefined" && propertiesParent !== null) {
            this.appendObjectProperty(propertiesParent, propertyName, propertyValue);
        } else {
            this.appendPrimitiveProperty(propertyName, propertyValue);
        }
    },

    appendObjectProperty: function (propertiesParent, propertyKey, propertyValue) {
        if (typeof SPREADSHEET_CONF[propertiesParent] === 'undefined') {
            const objectValue = {[propertyKey]: propertyValue};
            this.appendProperty(propertiesParent, objectValue);
        } else if (typeof SPREADSHEET_CONF[propertiesParent] === 'object') {
            const currentValue = SPREADSHEET_CONF[propertiesParent];
            currentValue[propertyKey] = propertyValue;
        }
    },

    appendPrimitiveProperty: function (propertyName, propertyValue) {
        this.appendProperty(propertyName, propertyValue);
    },

    _getSingleOrMultiValue(rawPropertyValue) {
        if (rawPropertyValue.includes(SPREADSHEET_CELL_MULTIDATA_DELIMITER)) {
            return rawPropertyValue.split(SPREADSHEET_CELL_MULTIDATA_DELIMITER);
        }
        return rawPropertyValue;
    },
};