class SpreadsheetUtils {
    
    
    static removeDataWihoutStartTime(spreadsheetsOrderByDate) {
        return spreadsheetsOrderByDate.filter(function( obj ) {
            let a = obj.startTime;
            return typeof a !== "undefined" && a !== null;
        });
    }
    
    /**
     * Currently support sorting only for one day
     */
    static sortByStartTime(spreadsheetsOrderByDate) {
        spreadsheetsOrderByDate = spreadsheetsOrderByDate.sort(function(obj1, obj2) {
            let a = obj1.startTime;
            let b = obj2.startTime;
            if( (typeof a === "undefined" || a === null) && (typeof b === "undefined" || b === null)) {
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