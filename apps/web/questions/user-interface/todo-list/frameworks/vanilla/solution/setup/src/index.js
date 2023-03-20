import './styles.css';

(() => {
  // Retain a reference to the elements which persist
  // throughout usage of the app.
  const $inputEl = document.querySelector('input');
  const $submitButtonEl = document.querySelector('#submit');
  const $todoListEl = document.querySelector('ul');

  function addTask(label) {
    // Create the DOM elements for the new task.
    const $newTaskElement = document.createElement('li');

    const $span = document.createElement('span');
    $newTaskElement.appendChild($span);
    // Using Node.textContent here instead of Element.innerHTML
    // to prevent XSS (Cross Site Scripting).
    $span.textContent = label;

    const $btn = document.createElement('button');
    $btn.textContent = 'Delete';
    $newTaskElement.appendChild($btn);

    // Add the new task to the list.
    $todoListEl.append($newTaskElement);
  }

  function deleteTask($itemEl) {
    // Remove the task from the list.
    $itemEl.parentNode.removeChild($itemEl);
  }

  $submitButtonEl.addEventListener('click', () => {
    addTask($inputEl.value);
    // Reset the input so that new tasks can be added.
    $inputEl.value = '';
  });

  // Add a listener to the list instead of individual tasks.
  // This is called event delegation and the benefit is that
  // the Delete button of newly-added tasks will also respond
  // to clicks without you having to manually add event listeners
  // to them. You also don't have to remove any event listeners
  // when the task is removed.
  $todoListEl.addEventListener('click', (event) => {
    // Check that the button is being clicked and not something
    // else (e.g. the task label).
    if (event.target.tagName === 'BUTTON') {
      deleteTask(event.target.parentNode);
    }
  });
})();
