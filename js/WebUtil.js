"use strict";

class WebUtil {

    /**
     * Below is simple and ugly solution for RWD
     */
    static updateItemHeight() {
        return new Promise((resolve, reject) => {
            let maxHeight = 0;
            document.querySelectorAll('ul.item-list').forEach((itemList) => {
                const itemsContent = itemList.querySelectorAll('li.item > div.item-content');
                itemsContent.forEach((itemContent) => {
                    if (maxHeight < itemContent.clientHeight) {
                        maxHeight = itemContent.clientHeight;
                    }
                });
                itemsContent.forEach((itemContent) => {
                    itemContent.style.height = maxHeight + "px";
                });
            });
            document.querySelectorAll('div.day-container .day-summary').forEach((daySummary) => {
                daySummary.style.height = maxHeight + "px";
            });
        });
    }

    /**
     * Append js script file to DOM
     */
    static appendScriptToDOM(path) {
        const script = document.createElement('script');
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", path);
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    /**
     * Check developer options
     */
    static isDevOptionIsOn(devOption) {
        const url = new URL(window.location.href);
        const param = url.searchParams.get("devopt");
        if (typeof param !== "undefined" && param !== null) {
            return param.includes(devOption);
        }
        return false;
    }

    /**
     * Waiting to load DOM element by selector.
     * Default value for attempt is 5. Other parameters should be set directly.
     */
    static waitForDomElement(selector, time, func, attempt) {
        let inAttempt = (typeof attempt !== "undefined" && attempt !== null) ? attempt : 5;
        let loadedElement = document.querySelector(selector);
        if (loadedElement !== null) {
            func(loadedElement);
            return;
        } else if (inAttempt < 0) {
            console.error("Cannot load element: " + selector);
            return;
        } else {
            inAttempt -= 1;
            setTimeout(() => {
                WebUtil.waitForDomElement(selector, time, func, inAttempt);
            }, time);
        }
    }

}