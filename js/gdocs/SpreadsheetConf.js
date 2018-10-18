// TODO: following configuration should be in the spreadsheet
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
    
    /**
     * This method should be invoke after basic configuration is loaded from external sources - GApiSpreadsheetProvider
     */
    appendConfiguration: function() {
        // columns
        this.appendProperty('TRAINING_TABLE_TENNIS',"tenis stołowy");
        this.appendProperty('TRAINING_SQUASH',"squash");
        
        // App conf
        this.appendProperty('SPREADSHEETS_TO_LOAD', [this.SPREADSHEET_WEIGHT, this.SPREADSHEET_DIET, this.SPREADSHEET_TRAINING]);
        this.appendProperty('SPREADSHEETS_RANGE_TO_LOAD', [this.SPREADSHEET_WEIGHT_RANGE, this.SPREADSHEET_DIET_RANGE, this.SPREADSHEET_TRAINING_RANGE]);

        this.appendProperty('SPREADSHEET_CELL_VALUE_DELIMITER', "~");
        this.appendProperty('SPREADSHEET_CELL_VALUE_EMPTY', "-");
        this.appendProperty('SPREADSHEETS_SUPPORT_START_TIME', [this.SPREADSHEET_TRAINING, this.SPREADSHEET_DIET, this.SPREADSHEET_WEIGHT]);

        // For now for all spreadsheet
        this.appendProperty('COLUMNS_TO_SHOW_NAME_IN_DETAILS', [this.TRAINING_TABLE_TENNIS, this.TRAINING_SQUASH, this.SPREADSHEET_WEIGHT]);

        // TRAINING
        this.appendProperty('TRAINING_DURATION_COLUMN', 2);
        this.appendProperty('TRAINING_HEADER_INFORMATION_COLUMNS', ['kroki - mi band 3']);

        // DIET
        this.appendProperty('DIET_START_TIME_COLUMN', 1);

        // WEIGHT
        this.appendProperty('WEIGHT_START_TIME_COLUMN', 2);
        this.appendProperty('WEIGHT_UNIT', "kg");
        this.appendProperty('WEIGHT_VIEW_KEY', "weight");
        
        // HELPERS MAP
        const startTimeColumn = {
            [this.SPREADSHEET_TRAINING] : (this.TRAINING_DURATION_COLUMN - 1),
            [this.SPREADSHEET_DIET] : (this.DIET_START_TIME_COLUMN - 1),
            [this.SPREADSHEET_WEIGHT] : (this.WEIGHT_START_TIME_COLUMN - 1)
        }
        this.appendProperty('START_TIME_COLUMN', startTimeColumn);
        
        
        // ICONS
        const icons = {
            "sniadanie" : "free_breakfast",
            "drugie sniadanie" : "fastfood",
            "obiad" : "room_service",
            "podwieczorek" : "fastfood",
            "kolacja" : "restaurant_menu",
            "Ważenie I" : "accessibility",
            "Ważenie II" : "accessibility",
            "Ważenie III" : "accessibility",
            "Ważenie IV" : "accessibility",
            "Ważenie V" : "accessibility",
            "Ważenie VI" : "accessibility",
            "Ważenie VII" : "accessibility",
            "spacer I" : "directions_run",
            "spacer II" : "directions_run",
            "spacer III" : "directions_run",
            "basen" : "pool",
            "siłownia" : "fitness_center",
            [this.TRAINING_SQUASH] : "toll",
            [this.TRAINING_TABLE_TENNIS] : "toll",
            "drzemka" : "local_hotel"
        }
        this.appendProperty('ICONS', icons);
        this.appendProperty('DEFAULT_ICON', "warning");
        this.appendProperty('PICTURE_LABEL', "pictures");
        
        // OTHER
        const labelsOthers = {
            "basen" : ['distance'],
            "spacer I" : ['distance'],
            "spacer II" : ['distance'],
            "spacer III" : ['distance'],
            [this.TRAINING_SQUASH] : ['comment'],
            [this.TRAINING_TABLE_TENNIS] : ['comment'],
            "siłownia" : ['comment'],
            "sniadanie" : ["meal", "supplements", this.PICTURE_LABEL],
            "drugie sniadanie" : ["meal", "supplements", this.PICTURE_LABEL],
            "obiad" : ["meal", "supplements", this.PICTURE_LABEL],
            "podwieczorek" : ["meal", "supplements", this.PICTURE_LABEL],
            "kolacja" : ["meal", "supplements", this.PICTURE_LABEL]
        }
        this.appendProperty('LABELS_OTHERS', labelsOthers);
        
        this.appendProperty('DEFAULT_LABEL', "other");
    }
};