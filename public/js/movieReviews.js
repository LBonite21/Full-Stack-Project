// Slider Functionality
let slider = document.getElementsByClassName('slider');

const updateRatingImage = evt => {
    evt.target.parentElement.children[1].src = `img/star_rating_${evt.target.value}.png`;
}

for (let i = 0; i < slider.length; i++) {
    slider[i].onchange = updateRatingImage;
}