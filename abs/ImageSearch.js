function ImageSearch() {
    const container = inlineHTML(`
        <input type="search" placeholder="Type image url">
        <button>search</button>
        <img src="default.png" alt="Default Image" hidden>
    `);

    container.fire("@style::width -> input", "100%");
    container.fire("@attribute::value -> input", "http://placekitten.com/400");

    container.subscribe("click -> button", () => {
        container.fire("#update:image");
    });

    container.subscribe("keyup -> input", e => {
        container.e.key !== "Enter" || fire("#update:image");
    });

    container.subscribe("#update:image", () => {
        console.log("update image");
        const url = container.querySelector("input").value;
        container.fire("@attribute::src -> img", url);
        container.fire("@attribute::hidden -> img", false);
    });

    return container;
}