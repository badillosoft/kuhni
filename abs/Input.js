function Input() {
    const input = dragon("input");

    input.fire("@attribute::placeholder", "Hello world");
    input.fire("@attribute::value", "hi");

    return input;
}