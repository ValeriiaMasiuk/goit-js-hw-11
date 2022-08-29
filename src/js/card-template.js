// * * * Создаем функцию, которая делает разметку одной карточки

export function createMarkup(hits) {
    const gallery = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
    <div class="photo-card">
    <a class="gallery__link" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width=250px/>
     </a>
        <div class="info">
     <p class="info-item">
       <b>Likes: ${likes}</b>
     </p>
     <p class="info-item">
       <b>Views: ${views}</b>
     </p>
     <p class="info-item">
       <b>Comments: ${comments}</b>
     </p>
     <p class="info-item">
       <b>Downloads: ${downloads}</b>
     </p>
        </div>
    </div>`
    }).join('')

    return gallery;
}