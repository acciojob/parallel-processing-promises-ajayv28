const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
];


function downloadImages(imageArray) {
    const promises = imageArray.map(image => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = image.url;

            img.onload = () => resolve(img);
            img.onerror = () => reject(`Failed to load image's URL: ${image.url}`);
        });
    });

    return Promise.all(promises);
}


btn.addEventListener("click", () => {
    output.innerHTML = ''; 

    downloadImages(images)
        .then((loadedImages) => {
            loadedImages.forEach(img => {
                output.appendChild(img);
            });
        })
        .catch((error) => {
            console.error(error);
            output.innerHTML = `<div class="alert alert-danger">${error}</div>`;
        });
});
