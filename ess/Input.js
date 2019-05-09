function Input() {
    const input = document.createElement("input");

    input.dataset.text = "index";
    input.dataset.color = "blue";

    input.addEventListener("@update", () => {
        input.value = input.dataset.text;
        input.style.color = input.dataset.color;
    });

    input.dispatchEvent(new CustomEvent("@update"));

    return input;
}