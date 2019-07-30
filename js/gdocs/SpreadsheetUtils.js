class SpreadsheetUtils {

    static prepareDaySummary(day, activities) {
        let mealsCount = 0;
        let trainingCount = 0;
        let trainingTime = 0;
        let minWeight = 0;
        let maxWeight = 0;

        activities.forEach((activity) => {
            if (typeof activity.startTime === "undefined" || activity.startTime === null) {
                return;
            }

            if (SPREADSHEET_CONF.SPREADSHEET_DIET === activity.spreadsheetName) {
                mealsCount++;
                return;
            }

            if (SPREADSHEET_CONF.SPREADSHEET_TRAINING === activity.spreadsheetName) {
                trainingCount++;
                trainingTime += activity.viewData["time(min.)"];
                return;
            }

            if (SPREADSHEET_CONF.SPREADSHEET_WEIGHT === activity.spreadsheetName) {
                let weightRawValue = activity.viewData[WEIGHT_VIEW_KEY].replace(SPREADSHEET_CONF[LABELS_KEY]['WEIGHT_UNIT'], "");
                if (minWeight > weightRawValue || minWeight === 0) {
                    minWeight = weightRawValue;
                }
                if (maxWeight < weightRawValue || maxWeight === 0) {
                    maxWeight = weightRawValue;
                }
                return;
            }
        });
        return {
            "meals": mealsCount,
            "training": trainingCount,
            "trainingTime": trainingTime + SPREADSHEET_CONF[LABELS_KEY]['TIME_UNIT'],
            "minWeight": minWeight + SPREADSHEET_CONF[LABELS_KEY]['WEIGHT_UNIT'],
            "maxWeight": maxWeight + SPREADSHEET_CONF[LABELS_KEY]['WEIGHT_UNIT'],
        }
    }

    /**
     * Currently support sorting only for one day
     */
    static sortByStartTime(spreadsheetsOrderByDate) {
        spreadsheetsOrderByDate.sort(function (obj1, obj2) {
            let a = typeof obj1.startTime === "undefined" ? null : obj1.startTime;
            let b = typeof obj2.startTime === "undefined" ? null : obj2.startTime;
            if (a === null && b === null) {
                return 0;
            }
            if (a === null) {
                return -1;
            }
            if (b === null) {
                return 1;
            }
            let checkHours = parseInt(a.split(":")[0]) - parseInt(b.split(":")[0]);
            if (checkHours === 0) {
                return parseInt(a.split(":")[1]) - parseInt(b.split(":")[1]);
            } else {
                return checkHours;
            }

        })
    }

    static minutesBetweenHours(startHour, endHour) {
        const startDate = new Date('2000/01/01 ' + startHour);
        const endDate = new Date('2000/01/01 ' + endHour);
        const diff = endDate.getTime() - startDate.getTime();
        return Math.abs((diff / 60000));
    }

}