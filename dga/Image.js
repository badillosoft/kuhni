function Image() {
    const image = document.createElement('img');

    image.dataset.config = JSON.stringify({
        url: "http://placehold.it/400",
        margin: "20px",
        objectFit: "cover"
    
    });

    image.addEventListener("@update", () => {
        const config = JSON.parse(image.dataset.config);
        image.src =  config.url;
        image.style.margin = config.margin;
        image.style.objectFit = config.objectFit

    });

    image.dispatchEvent( new CustomEvent("@update") );

    return image;

}