const descriptionField1 = document.querySelector('#description-field1');

descriptionField1.addEventListener('input', event => {
  const count = event.target.value.length;
  const countElement = document.querySelector('#description-field-count1');
  countElement.textContent = event.target.value.length;

  const countParentElement = countElement.parentElement;
  if (count > 500) {
    countParentElement.classList.add('error');
    descriptionField1.classList.add('error');
  } else {
    countParentElement.classList.remove('error');
    descriptionField1.classList.remove('error');
  }
});
