function Image() {
    const image = inlineHTML(`<img src="default.png" alt="Default image">`, "img");

    // Styles
    fire("@style::filter", "sepia(100)")(image);

    // Attributes
    fire("@attribute::src", "http://placekitten.com/300")(image);

    subscribe("mouseover", () => {
        fire("@style::filter", "sepia(0)")(image);
    })(image);

    subscribe("mouseout", () => {
        fire("@style::filter", "sepia(100)")(image);
    })(image);

    return image;
}