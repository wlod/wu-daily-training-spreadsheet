class ExtViews {
    /**
     * Add js files to end of head tag in index.hml
     * Append Views library to each images with '.image-trigger' selector
     * Append navigation to Views library by viewer.on('open'... and viewer.on('close',...
     */
    static appendViewsToImageWithLibraries() {
        return new Promise(() => {

            WebUtil.appendScriptToDOM('js/vendors/lazysizes.min.js');
            WebUtil.appendScriptToDOM('js/vendors/ls.attrchange.min.js');

            this.appendViewsToImage('.image-trigger');

        });
    }

    static appendViewsToImage(selectors) {
        const triggers = document.querySelectorAll(selectors);
        triggers.forEach((img, index) => {
            const viewer = new Views(img, {
                defaultTheme: true,
                prefix: 'ext',
                loader: '<img src="assets/loader-2.gif" class="ext-views-loader" alt="loader"/>',
                anywhereToClose: true,
                openAnimationDuration: 0,
                closeAnimationDuration: 0
            });
            viewer.on('open', () => {
                WebUtil.waitForDomElement('#ext-views-wrapper > div.ext-views-content', 40, (imageContainer) => {
                    ExtViews.snapBrowserScroll(img);
                    ExtViews.createLabel(triggers[index]);
                    ExtViews.createMealDescription(triggers[index], imageContainer);
                    ExtViews.createNavigation(viewer, imageContainer, triggers, index);
                });
            });
        });
    }

    static snapBrowserScroll(img) {
        const dayContainer = img.closest("div.day-container");
        if(dayContainer !== null) {
            window.scrollTo(0, dayContainer.offsetTop);
        }
    }

    static createLabel(sourceImageDom) {
        if (typeof sourceImageDom === "undefined" || sourceImageDom == null) {
            return;
        }

        const imageContainer = document.querySelector("#ext-views-wrapper > div.ext-views-content");
        if (typeof imageContainer === "undefined" || imageContainer == null) {
            return;
        }

        imageContainer.setAttribute("data-image-label", sourceImageDom.firstChild.getAttribute("data-image-label"));
    }

    // TODO dodac rozwijany opis do zdjec
    static createMealDescription(sourceImageDom, imageContainer) {
        if (typeof sourceImageDom === "undefined" || sourceImageDom == null) {
            return;
        }

        const mealDescription = sourceImageDom.closest("div.item-content").querySelector('p[data-activity-key="meal"] > span:last-child');
        if (typeof mealDescription === "undefined" || mealDescription == null) {
            return;
        }

        console.log("Description: ", mealDescription.innerHTML);

        const container = document.createElement("div");
        container.setAttribute("class", "ext-views-meal-description");

        const textNodeLabel = document.createTextNode("Recipe");
        container.appendChild(textNodeLabel);

        imageContainer.appendChild(container);
    }

    static createNavigation(viewer, imageContainer, triggers, index) {
        const nextImageDom = triggers[index + 1];
        const prevImageDom = triggers[index - 1];

        const prevNavigation = ExtViews.createNavigationDOMElement(viewer, "Prev (arrow left)", imageContainer, prevImageDom, "ext-views-navigation-prev");
        const nextNavigation = ExtViews.createNavigationDOMElement(viewer, "Next (arrow right)", imageContainer, nextImageDom, "ext-views-navigation-next");

        // TODO for now "document.onkeydown" is only used in this place
        document.onkeydown = function (e) {
            if (e.key === 'ArrowLeft' && typeof prevNavigation !== "undefined") {
                prevNavigation.click();
            }
            if (e.key === 'ArrowRight' && typeof nextNavigation !== "undefined") {
                nextNavigation.click();
            }
        }
    }

    static createNavigationDOMElement(viewer, label, imageContainer, imageDom, clazz) {
        if (typeof imageDom !== "undefined" && imageDom !== null) {
            const container = document.createElement("div");
            container.setAttribute("class", "ext-views-navigation " + clazz);
            container.addEventListener("click", () => {
                viewer.close();
                imageDom.click();
            });

            const textNodeLabelContainer = document.createElement("span");
            const textNodeLabel = document.createTextNode(label);
            textNodeLabelContainer.append(textNodeLabel);
            container.appendChild(textNodeLabelContainer);

            imageContainer.appendChild(container);

            return container;
        }
    }

}