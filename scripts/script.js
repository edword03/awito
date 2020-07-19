'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal__add'),
      addAd = document.querySelector('.add__ad'),
      modalBtnSubmit = document.querySelector('.modal__btn-submit'),
      modalSubmit = document.querySelector('.modal__submit'),
      catalog = document.querySelector('.catalog'),
      modalItem = document.querySelector('.modal__item'),
      modalBtnWarning = document.querySelector('.modal__btn-warning'),
      modalFileInput = document.querySelector('.modal__file-input'),
      modalFileBtn = document.querySelector('.modal__file-btn'),
      modalImageAdd = document.querySelector('.modal__image-add');

const textFileBtn = modalFileBtn.textContent;
const srcModalImage = modalImageAdd.src;

const elementModalSubmit = [...modalSubmit.elements]
    .filter(elem => elem.tagName !== 'BUTTON' || elem.type !== 'submit');


const infoPhoto = {};

const saveDB = () => localStorage.setItem('awito', JSON.stringify(dataBase));
  
const checkForm = () => {
    const validForm = elementModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
};
    
const closeModal =  event => {  
    const target = event.target;
    
    if(target.closest('.modal__close') || target.classList.contains('modal') || event.code === 'Escape'){
      modalAdd.classList.add('hide');
      modalItem.classList.add('hide');
      document.removeEventListener('keydown', closeModal);
      modalSubmit.reset();
      modalImageAdd.src = 'img/temp.jpeg';
      modalFileBtn.textContent = 'Добавить фото';
      checkForm();
    }
};

modalFileInput.addEventListener('change', event => {
  const target = event.target;

  const reader = new FileReader();

  const file = target.files[0];

  infoPhoto.filename = file.name;
  infoPhoto.size = file.size;

  reader.readAsBinaryString(file);

  reader.addEventListener('load', event => {
    if(infoPhoto.size < 200000){
      modalFileBtn.textContent = infoPhoto.filename;
      infoPhoto.base64 = btoa(event.target.result);
      modalImageAdd.src = `data: image/jpeg;base64, ${infoPhoto.base64}`;
    } else {
      modalFileBtn.textContent = 'Файл не должен быть больше 200кб';
    }

  });
});

modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
    const itemObject = {};
    for(const elem of elementModalSubmit) {
        itemObject[elem.name] = elem.value;
    }
    itemObject.image = infoPhoto.base64;
    dataBase.push(itemObject);
    closeModal({target: modalAdd});
    saveDB();

});

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModal);
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

catalog.addEventListener('click', event => {
    const target = event.target;
    if(target.closest('.card')){
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModal);
    }
});

