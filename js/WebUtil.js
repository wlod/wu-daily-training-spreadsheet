"use strict";

class WebUtil {

    /**
     * Append js script file to DOM
     */
    static appendScriptToDOM(path) {
        // TODO only one path should be added
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
        }
        if (inAttempt < 0) {
            console.error("Cannot load element: " + selector);
            return;
        }
        inAttempt -= 1;
        setTimeout(() => {
            WebUtil.waitForDomElement(selector, time, func, inAttempt);
        }, time);
    }

    /**
     * Select text in DOM Element
    */
    static selectTextForDomElement(domElement) {
        if (document.selection) {
            const range = document.body.createTextRange();
            range.moveToElementText(domElement);
            range.select();
        } else if (window.getSelection()) {
            const range = document.createRange();
            range.selectNode(domElement);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    }

    /**
     * Copy DOM Element text to clipboard
    */
    static copyTextToClipboardForDomElement(domElement) {
        try {
            WebUtil.selectTextForDomElement(domElement);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        } catch (e) {
            console.log('Cannot copy text from dom element: {}.', e, domElement);
        }
    }
}