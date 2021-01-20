let conatiner = document.getElementById('container')

const revealReviews = (evt) => {
    let hiddenBox = evt.target.parentElement.parentElement.children[1];

    if (hiddenBox.style.display === 'none') {
        hiddenBox.style.display = 'block';
    } else {
        hiddenBox.style.display = 'none';
    }
}

for (let i = 0; i < conatiner.childNodes.length; i++) {
    conatiner.childNodes[i].childNodes[0].onclick = revealReviews;
}

// Slider Functionality
let slider = document.getElementsByClassName('slider');

const updateRatingImage = evt => {
    evt.target.parentElement.children[1].src = `img/star_rating_${evt.target.value}.png`;
}

for (let i = 0; i < slider.length; i++) {
    slider[i].onchange = updateRatingImage;
}
