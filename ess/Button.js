function Button() {
    const button = document.createElement("button");

    button.dataset.text = "button";
    button.dataset.color = "blue";

    button.addEventListener("@update", () => {
        button.innerText = button.dataset.text;
        button.style.color = button.dataset.color;
    });

    button.dispatchEvent(new CustomEvent("@update"));

    return button;
}