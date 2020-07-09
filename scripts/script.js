'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal__add'),
      addAd = document.querySelector('.add__ad'),
      modalBtnSubmit = document.querySelector('.modal__btn-submit'),
      modalSubmit = document.querySelector('.modal__submit'),
      catalog = document.querySelector('.catalog'),
      modalItem = document.querySelector('.modal__item'),
      modalBtnWarning = document.querySelector('.modal__btn-warning');

const elementModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON' || elem.type !== 'submit');
    
 
const closeModalEsc = event =>{
    if(event.code === 'Escape'){
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        document.removeEventListener('keydown', closeModalEsc);
    }
};
const closeModal = function (event) {  
    const target = event.target;
    if(target.closest('.modal__close') || target === this){
        this.classList.add('hide');
        if(this === modalAdd){
            modalSubmit.reset()
;        }
    }
};

modalSubmit.addEventListener('input', () => {
    const validForm = elementModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.getElementsByClassName.display =!validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObject = {};
    for(const elem of elementModalSubmit) {
        itemObject[elem.name] = elem.value;
    }
    dataBase.push(itemObject);
});

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModalEsc);
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

catalog.addEventListener('click', event => {
    const target = event.target;
    if(target.closest('.card')){
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModalEsc);
    }
});

