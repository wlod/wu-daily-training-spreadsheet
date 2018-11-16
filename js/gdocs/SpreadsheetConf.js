var SPREADSHEET_CONF = {
                
    appendProperty: function(name, value) {
        Object.defineProperty(this, name,
            {
                value : value,
                writable : false,
                enumerable : true,
                configurable : true
            });
    },
    
    // TODO please
    appendPropertyFromRow: function(row, propertiesParent) {
        if(row.length != 2) {
            return;
        }
        if(row[0].startsWith(SPREADSHEET_CELL_MULTIDATA_COMMENT) || row[1].startsWith(SPREADSHEET_CELL_MULTIDATA_COMMENT)) {
            return;
        }
        
        let propertyName = row[0];
        let propertyKey = null;
        let isObject = false;
        let indexValue = 1;
        
        if(typeof propertiesParent !== "undefined" && propertiesParent !== null) {
            isObject = true;
            propertyKey = propertyName;
            propertyName = propertiesParent;
        }
        
        let value = row[indexValue];
        
        let isArray = false;
        if(row[indexValue].includes(SPREADSHEET_CELL_MULTIDATA_DELIMITER)) {
            value = row[indexValue].split(SPREADSHEET_CELL_MULTIDATA_DELIMITER);
            isArray = true;
        }
        
        if(typeof SPREADSHEET_CONF[propertyName] === 'undefined') {
            if(isObject) {
                const objectValue = { [propertyKey] : value };
                this.appendProperty(propertyName,  objectValue);
            }
            else {
                this.appendProperty(propertyName, value);
            }
            return;
        }
        
        if(typeof SPREADSHEET_CONF[propertyName] === 'object') {
            const currentValue = SPREADSHEET_CONF[propertyName];
            currentValue[propertyKey] = value;
            return;
        }
    },
    
    /**
     * This method should be invoke after technical configuration is loaded from external sources - GApiSpreadsheetProvider
     */
    appendConfiguration: function() {
        // App conf
        
        // HELPERS MAP
        const startTimeColumn = {
            [this.SPREADSHEET_TRAINING] : (this.TRAINING_DURATION_COLUMN - 1),
            [this.SPREADSHEET_DIET] : (this.DIET_START_TIME_COLUMN - 1),
            [this.SPREADSHEET_WEIGHT] : (this.WEIGHT_START_TIME_COLUMN - 1)
        }
        this.appendProperty('START_TIME_COLUMN', startTimeColumn);
    }
    
};