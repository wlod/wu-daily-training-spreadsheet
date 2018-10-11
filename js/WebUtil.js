"use strict";

class WebUtil {
    
    /**
     * Below is simple and ugly solution for RWD
     */
    static updateItemHeight() {
        return new Promise( (resolve, reject) => {
            document.querySelectorAll('ul.item-list').forEach( (itemList) => {
                const itemsContent = itemList.querySelectorAll('li.item > div.item-content');
                let maxHeight = 0;
                
                itemsContent.forEach( (itemContent) => {
                   if(maxHeight < itemContent.clientHeight) {
                        maxHeight = itemContent.clientHeight;
                    }
                });
                itemsContent.forEach( (itemContent) => {
                    itemContent.style.height = maxHeight + "px";
                });
            });
        });
    }
    
    /**
     * Add js files to end of index.hml
     * Append Views library to each images with '.image-trigger' selector
     */
    static appendViewsToImage() {
        return new Promise( (resolve, reject) => {
            
            WebUtil.appendScriptToDOM('js/vendors/lazysizes.min.js');
            WebUtil.appendScriptToDOM('js/vendors/ls.attrchange.min.js');
            
            const triggers = document.querySelectorAll('.image-trigger');
            triggers.forEach( (img) => {
                new Views(img, {
                    defaultTheme: true,
                    prefix: 'light',
                    loader: 'Loading...',
                    anywhereToClose: true,
                    openAnimationDuration: 400,
                    closeAnimationDuration: 400
                });
            });
        });
    }
    
    /**
     * Append js script file to DOM
     */
    static appendScriptToDOM(path){
        const script = document.createElement('script');
        script.setAttribute("type","text/javascript");
        script.setAttribute("src", path);
        document.getElementsByTagName("head")[0].appendChild(script);
    }
    
    /**
     * Check developer options
     */
    static isDevOptionIsOn(devOption) {
        const url = new URL(window.location.href);
        const param = url.searchParams.get("devopt");
        if(typeof param !== "undefined" && param !== null) {
            return param.includes(devOption);
        }
        return false;
    }
}