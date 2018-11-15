class ExtViews {

    /**
     * Add js files to end of head tag in index.hml
     * Append Views library to each images with '.image-trigger' selector
     * Append navigation to Views library by viewer.on('open'... and viewer.on('close',...
     */
    // TODO move 'copy' to configuration
    static appendViewsToImage() {
        return new Promise( (resolve, reject) => {
            
            WebUtil.appendScriptToDOM('js/vendors/lazysizes.min.js');
            WebUtil.appendScriptToDOM('js/vendors/ls.attrchange.min.js');
            
            const triggers = document.querySelectorAll('.image-trigger');
            triggers.forEach( (img, index) => {
                const viewer = new Views(img, {
                        defaultTheme: true,
                        prefix: 'wu-images',
                        loader: 'Loading...',
                        anywhereToClose: true,
                        openAnimationDuration: 0,
                        closeAnimationDuration: 0
                    });
                viewer.on('open', () => {
                    WebUtil.waitForDomElement('#wu-images-views-wrapper > div.wu-images-views-content', 40, (element) => {
                        
                        let nextImageDom = triggers[index+1];
                        let prevImageDom = triggers[index-1];
                        
                        ExtViews.createNavigation(viewer, "Next", element, nextImageDom, "right: 10%");
                        ExtViews.createNavigation(viewer, "Prev", element, prevImageDom, "left: 10%");
                        
                    });
                });
            });
        });
    }
    
    
    static createNavigation(viewer, label, parent, imageDom, position) {
        if(typeof imageDom !== "undefined" && imageDom !== null) {
            let container = document.createElement("div");
            container.setAttribute("id", "wu-images-views-next");
            container.setAttribute("style", "z-index: 10090 !important; width: 24px; height: 24px; position: absolute; top: 45%; color: #FFF; " + position);
            container.addEventListener("click", () => {
                viewer.close();
                imageDom.click();
            });
            
            let nextText = document.createTextNode(label); 
            container.appendChild(nextText); 
            
            parent.appendChild(container);
        }
    }

}