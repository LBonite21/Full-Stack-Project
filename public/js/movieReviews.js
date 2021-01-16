let parent_div = document.getElementsByClassName('parent-div')

const revealReviews = (evt) => {
    let hiddenBox = evt.target.parentElement.children[1];

    if (hiddenBox.style.display === 'none') {
        hiddenBox.style.display = 'block';
    } else {
        hiddenBox.style.display = 'none';
    }
}

for (let i = 0; i < parent_div.length; i++) {
    parent_div[i].onclick = revealReviews;
}