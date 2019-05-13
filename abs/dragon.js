function dragon(element) {
    const uuid = (n = 16) => {
        let token = "";
        while (token.length < n) {
            token += Math.random().toString(32).slice(2);
        }
        return token.slice(0, n);
    };

    const parseChannel = channel => {
        let query = null;

        [channel, query] = channel.split("->");
        
        query = (query || "").trim();
        
        let directive = null;
        
        [channel, directive] = channel.split("::");
        
        directive = (directive || "").trim();
        
        channel = (channel || "").trim();

        element.log("parseChannel", channel, query, directive);

        return { channel, directive, query };
    };

    const inline = (html, query = null) => {
        const div = document.createElement("div");
        
        const range = document.createRange();
        const fragment = range.createContextualFragment(html.trim());
        
        div.appendChild(fragment);
    
        const divSelected = query ? div.querySelector(query) : div;
    
        return dragon(divSelected.firstChild);
    }

    element.dragonId = element.dragonId || uuid();
    element.dragonDebug = false;
    element["@dragon"] = "v1.0";

    element.log = (...params) => {
        if (!element.dragonDebug) {
            return;
        }
        console.log(element, element.dragonId, ...params);
    };

    if (element === document) {
        element._createElement = element._createElement || element.createElement;
        element.createElement = function (tagName) {
            if (tagName.match(/^\w+$/)) {
                const createdElement = element._createElement.call(this, tagName);
                return dragon(createdElement);
            }
            return inline(tagName);
        };
    }

    element._querySelector = element._querySelector || element.querySelector;

    element.querySelector = function (query) {
        const childElement = element._querySelector.call(this, query);
        return dragon(childElement);
    };

    element.listeners = element.listeners || {};

    element._removeEventListener = element._removeEventListener || element.removeEventListener;

    element.removeEventListener = function (event, id) {
        element.log("removeEventListener [1]", event, id);
        if (!event) {
            element.log("removeEventListener [2: all channels]");
            for (let channel in element.listeners) {
                element.removeEventListener(channel);
            }
            return;
        }
        const { channel, query, directive } = parseChannel(event);
        if (query) {
            element.log("removeEventListener [3: query]", channel, query, directive);
            const childElement = element.querySelector(query);
            childElement.removeEventListener(`${channel}::${directive}`, id);
            return;
        }
        if (!id) {
            element.log("removeEventListener [4: all callbacks]", channel, element.listeners, this);            
            for (let id in element.listeners[channel]) {
                element.removeEventListener(`${channel}::${directive}`, id);
            }
            return;
        }
        element.log("removeEventListener [5]", channel, id, element.listeners);
        element._removeEventListener.call(this, channel, element.listeners[channel][id]);
        delete element.listeners[channel][id];
    }

    element._addEventListener = element._addEventListener || element.addEventListener;

    element.addEventListener = function (event, callback, id = null) {
        const { channel, query, directive } = parseChannel(event);

        element.log("addEventListener [1]", channel, query, directive);
        
        if (query) {
            element.log("addEventListener [2: query]", channel, query, directive);
            const childElement = element.querySelector(query);
            return childElement.addEventListener(`${channel}::${directive}`, callback, id);
        }

        id = id || uuid();

        const _callback = callback;

        callback = (e, ...params) => {
            e = e instanceof CustomEvent ? e.detail : e;
            _callback(e, ...params, element);
        };

        element.listeners[channel] = element.listeners[channel] || {};
        element.listeners[channel][id] = callback;

        element._addEventListener.call(this, channel, callback);

        element.log("addEventListener [3: callback]", element.listeners);

        return id;
    };

    element._dispatchEvent = element._dispatchEvent || element.dispatchEvent;

    element.dispatchEvent = function (event, data) {
        if (typeof event !== "string") {
            element._dispatchEvent(event);
            return;
        }

        const { channel, query, directive } = parseChannel(event);

        element.log("dispatchEvent [1]", channel, query, directive);

        if (query) {
            element.log("removeEventListener [2: query]", channel, query, directive);
            const childElement = element.querySelector(query);
            childElement.dispatchEvent(`${channel}::${directive}`, data);
            return;
        }

        element._dispatchEvent.call(this, new CustomEvent(channel, {
            detail: data
        }));
    };

    return element;
}

dragon(document);