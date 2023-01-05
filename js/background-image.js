const numImagesAvailable = 539 //how many photos are total in the collection
const numItemsToGenerate = 1; //how many photos you want to display
const collectionID = 4332580 //the collection ID from the original url

function renderGalleryItem(randomNumber) {
    document.body.style.backgroundColor = `black`;
    fetch(`https://source.unsplash.com/collection/${collectionID}/?sig=${randomNumber}`)
        .then((response) => {
            console.log(response.url)
            document.body.style.backgroundImage = `url(${response.url})`;
        })
}
for (let i = 0; i < numItemsToGenerate; i++) {
    let randomImageIndex = Math.floor(Math.random() * numImagesAvailable);
    renderGalleryItem(randomImageIndex);
}