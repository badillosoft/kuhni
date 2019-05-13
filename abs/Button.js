function Button() {
    const button = inlineHTML(`<button>button</button>`, "button");

    // Styles
    fire("@style::color", "crimson")(button);
    fire("@style::margin", "10px")(button);
    fire("@style::padding", "10px")(button);

    // Attributes
    fire("@attribute::innerText", "hello world")(button);

    return button;
}