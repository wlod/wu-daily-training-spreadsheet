"use strict";

class ControlVersionRepositoryProvider {

    constructor() {
        this.controlVersionRepositoryCache = new Map();
    }

    loadData() {
        return fetch("https://api.github.com/repos/wlod/wu-daily-training-spreadsheet").then(response => {
            return response.json();
        }).then(controlVersionData => {
            this.controlVersionRepositoryCache = controlVersionData;
        });
    }

    getLastUpdateDate() {
        return this.controlVersionRepositoryCache['updated_at'];
    }

}