function dragon(element) {
    element = typeof element === "string" ? document.createElement(element) : element;

    element.fire = (...params) => {
        return fire(...params)(element);
    };
    element.subscribe = (...params) => {
        return subscribe(...params)(element);
    };

    subscribe("@update", () => {
        const styles = JSON.parse(element.dataset.styles || "{}");
        const attributes = JSON.parse(element.dataset.attributes || "{}");
        for (let [key, value] of Object.entries(styles)) {
            element.style[key] = value;
        }
        for (let [key, value] of Object.entries(attributes)) {
            element[key] = value;
        }
    })(element);

    subscribe("@style", (styles = {}) => {
        const oldStyles = JSON.parse(element.dataset.styles || "{}");
        styles = Object.assign(oldStyles, styles);
        element.dataset.styles = JSON.stringify(styles);
        fire("@update")(element);
    })(element);

    subscribe("@attribute", (attributes = {}) => {
        const oldAttributes = JSON.parse(element.dataset.attributes || "{}");
        attributes = Object.assign(oldAttributes, attributes);
        element.dataset.attributes = JSON.stringify(attributes);
        fire("@update")(element);
    })(element);

    return element;
}

function fire(channel, data) {
    return element => {
        let query = null;

        [channel, query] = channel.split("->");
        
        console.log(element, channel, query);

        query = (query || "").trim();
        channel = (channel || "").trim();

        if (query) {
            element = dragon(element.querySelector(query));
        }

        // console.log("fire", channel, data, element);
        const [main, key] = channel.split("::");

        if (key) {
            element.dispatchEvent(new CustomEvent(main, {
                detail: { [key]: data }
            }));
            return element;
        }

        element.dispatchEvent(new CustomEvent(channel, {
            detail: data
        }));

        return element;
    }
}

function subscribe(channel, callback) {
    return element => {
        let query = null;

        [channel, query] = channel.split("->");
        
        query = (query || "").trim();
        channel = (channel || "").trim();

        console.log("subscribe", element, channel, query);

        if (query) {
            element = dragon(element.querySelector(query));
        }
        
        element.addEventListener(channel, e => {
            // console.log("subscribe emit", channel, e, element);
            const data = e instanceof CustomEvent ? e.detail : e;
            callback(data);
        });
    }
}

function inlineHTML(html, query = null) {
    const div = document.createElement("div");
    
    const range = document.createRange();
    const fragment = range.createContextualFragment(html);
    
    div.appendChild(fragment);

    const divSelected = query ? div.querySelector(query) : div;

    return dragon(divSelected);;
}