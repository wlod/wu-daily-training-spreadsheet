class SpreadsheetUtils {
    
    
    static removeDataWihoutStartTime(spreadsheetsOrderByDate) {
        return spreadsheetsOrderByDate.filter(function( obj ) {
            let a = obj.startTime;
            return typeof a !== "undefined" && a !== null;
        });
    }
    
    static prepareDaySummary(day, activities) {
        let mealsCount = 0;
        let trainingCount = 0;
        let minWeight = 0;
        let maxWeight = 0;
        
        activities.forEach( (activity) => {
            if(activity.startTime === null) {
                return;
            }
            
            if(SPREADSHEET_DIET === activity.spreadsheetName) {
                mealsCount++;
                return;
            }
            
            if(SPREADSHEET_TRAINING === activity.spreadsheetName) {
                trainingCount++;
                return;
            }
            
            if(SPREADSHEET_WEIGHT === activity.spreadsheetName) {
                let weightRawValue = activity.viewData[WEIGHT_VIEW_KEY].replace(WEIGHT_UNIT, "");
                if(minWeight > weightRawValue || minWeight === 0) {
                    minWeight = weightRawValue;
                }
                if(maxWeight < weightRawValue || maxWeight === 0) {
                    maxWeight = weightRawValue;
                }
                return;
            }
        });
        return {
            "meals": mealsCount,
            "training" : trainingCount,
            "minWeight": minWeight + WEIGHT_UNIT,
            "maxWeight": maxWeight + WEIGHT_UNIT,
        }
    }
    
    /**
     * Currently support sorting only for one day
     */
    static sortByStartTime(spreadsheetsOrderByDate) {
        spreadsheetsOrderByDate.sort(function(obj1, obj2) {
            let a = obj1.startTime;
            let b = obj2.startTime;
            if( (typeof a === "undefined" || a === null) && (typeof b === "undefined" || b === null) ) {
                return 0;
            }
            if( (typeof a === "undefined" || a === null) ) {
                return -1;
            }
            if( (typeof b === "undefined" || b === null) ) {
                return 1;
            }
            let checkHours = parseInt(a.split(":")[0]) - parseInt(b.split(":")[0]);
            if (checkHours === 0) {
                let checkMinutes = parseInt(a.split(":")[1]) - parseInt(b.split(":")[1]);
                return checkMinutes;
            } else {
                return checkHours;
            }
            
        })
    }
    
}