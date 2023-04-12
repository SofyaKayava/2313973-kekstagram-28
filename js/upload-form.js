import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import { sendData } from './fetch.js';
import { onShowErrorMessage, onShowSuccessMessage, isErrorMessageOpen} from './messages.js';

const HASHTAG_SYMBOLS = /^#[a-za-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT_SYMBOLS = 'Хэштэг должен начинаться с # и содержать только цифры и буквы, максимальная длины - 20 символов';
const HASHTAG_ERROR_TEXT_COUNT = 'Слишком большое количество хэштэгов';
const HASHTAG_ERROR_TEXT_UNIQUE = 'Хэштэги не должны повторяться';
const HASGTAG_COUNT = 5;

const downloadPicture = document.querySelector('#upload-file');
const openModal = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadForm = document.querySelector('.img-upload__form');
const hashtagField = uploadForm.querySelector('.text__hashtags');
const commentField = uploadForm.querySelector('.text__description');
const uploadSubmit = document.querySelector('.img-upload__form');
const uploadSubmitButton = document.querySelector('.img-upload__submit');


const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

function isFocused () {
  return document.activeElement === hashtagField ||
  document.activeElement === commentField;
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isFocused() && isErrorMessageOpen()) {
    evt.preventDefault();
    onCloseUploadModal ();
  }
}
function onOpenUploadModal () {
  openModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  resetScale();
}

downloadPicture.addEventListener('change', onOpenUploadModal);

function onCloseUploadModal () {
  openModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  uploadSubmitButton.removeAttribute('disabled');
}

uploadCancel.addEventListener('click', onCloseUploadModal);


function createArrayOfTags (value) {
  return value.trim().split(' ').filter((tag) => tag.trim().length);
}
function isValidated (tag) {
  return HASHTAG_SYMBOLS.test(tag);
}

function checkHashgtagSymbols (value) {
  const tags = createArrayOfTags(value);
  return tags.every(isValidated);
}

function checkValidCount (value) {
  const tags = createArrayOfTags(value);
  return tags.length <= HASGTAG_COUNT;
}

function checkUniqueaHashtags (value) {
  const tags = createArrayOfTags(value);
  const toLowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return tags.length === new Set(toLowerCaseTags).size;
}


pristine.addValidator(hashtagField,checkHashgtagSymbols, HASHTAG_ERROR_TEXT_SYMBOLS);
pristine.addValidator(hashtagField,checkValidCount,HASHTAG_ERROR_TEXT_COUNT);
pristine.addValidator(hashtagField,checkUniqueaHashtags, HASHTAG_ERROR_TEXT_UNIQUE);

const setUserFormSubmit = (onSuccess) => {
  uploadSubmit.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      const formData = new FormData(evt.target);
      uploadSubmitButton.setAttribute('disabled', 'disabled');
      await sendData(formData)
        .then(uploadSubmitButton.removeAttribute('disabled'))
        .then(onSuccess).then(() => {
          onShowSuccessMessage();
        })
        .catch(
          () => {
            onShowErrorMessage();
          });
    }
  });
};

export {setUserFormSubmit,onCloseUploadModal};
