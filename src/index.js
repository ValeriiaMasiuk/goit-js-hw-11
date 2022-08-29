// * * * Импортируем стили, классы, библиотеки

import './css/styles.css';
import NewsApiService from './js/api-service';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createMarkup } from './js/card-template';

// * * * Создаем переменные

const refs = {
    searchForm: document.querySelector('.search-form'),
    loadMoreBtn: document.querySelector('.load-more'),
    galleryBox: document.querySelector('.gallery')
}

refs.loadMoreBtn.classList.add('visually-hidden');

let newsApiService = new NewsApiService();

// * * * Добавляем слушателей событий

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnAction);
refs.galleryBox.addEventListener('click', onImgAction);

// * * * Добавляем функцию на сабмит формы, при которой будет рендериться карточки

function onFormSubmit(evt) {
    evt.preventDefault();

    newsApiService.searchQuery = evt.target.elements.searchQuery.value;
    newsApiService.pageReset();

    if (newsApiService.searchQuery.trim() === '') {
        clearGalleryBox()
        return Notiflix.Notify.failure('Please, put data into the field')
    } 

    newsApiService.fetchArticles()
        .then(({ data }) => {
            refs.loadMoreBtn.classList.add('visually-hidden');
            clearGalleryBox(data.hits);
            appendHitsMarkup(data.hits);
            if (data.totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                refs.loadMoreBtn.classList.add('visually-hidden');
            } else {
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`)
            }
        });
}

// * * * Добавляем функцию на кнопку загрузки, при которой будут рендериться дополнительные карточки

function onLoadMoreBtnAction() {
    newsApiService.fetchArticles()
        .then(({ data }) => {
            appendHitsMarkup(data.hits)    
        })
        .catch(error => {
            Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
            refs.loadMoreBtn.classList.add('visually-hidden')
        })
}

// * * * Создаем функцию, которая создает галерею карточек

function appendHitsMarkup(hits) {
        refs.galleryBox.insertAdjacentHTML('beforeend', createMarkup(hits));
        refs.loadMoreBtn.classList.remove('visually-hidden')
}

// * * * Создаем функцию, которая очищает галерею карточек при повторном сабмите

function clearGalleryBox() {
    refs.galleryBox.innerHTML = ''
}

// * * * Создаем функцию, при которой будет открываться модальное окно с изображением карточки

function onImgAction(evt) {
    evt.preventDefault();

    new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});
}
