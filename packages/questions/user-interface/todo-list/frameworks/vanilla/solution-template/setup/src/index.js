import './styles.css';

(() => {
  // Decouple the tasks from the rendering
  // and client-side render the tasks during initial load.
  const TASKS = [
    'Walk the dog',
    'Water the plants',
    'Wash the dishes',
  ];

  // Retain a reference to the elements which persist
  // throughout usage of the app.
  const $inputEl = document.querySelector('input');
  const $form = document.querySelector('form');
  const $todoListEl = document.querySelector('ul');
  const $taskTemplate = document.querySelector(
    '#task-template',
  );

  function addTask(label) {
    // Use the template to make it easy to add new tasks.
    const $newTaskElement =
      $taskTemplate.content.cloneNode(true);
    $newTaskElement.querySelector('span').textContent =
      label;
    $todoListEl.appendChild($newTaskElement);
  }

  function deleteTask($itemEl) {
    // Remove the task from the list.
    $itemEl.parentNode.removeChild($itemEl);
  }

  $form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = $inputEl.value;
    // Don't do anything for empty value. Good for UX.
    if (value.trim() === '') {
      return;
    }

    // Trim before adding to the list.
    addTask(value.trim());

    // Reset the input so that new tasks can be added.
    $inputEl.value = '';
  });

  // Add a listener to the list instead of individual tasks.
  // This is called event delegation and the benefit is that
  // the Delete button of new tasks can also respond to clicks.
  $todoListEl.addEventListener('click', (event) => {
    // Check that the button is being clicked and not something
    // else (e.g. the task label).
    if (event.target.tagName !== 'BUTTON') {
      return;
    }

    // Add confirmation before destructive actions.
    if (
      window.confirm(
        'Are you sure you want to delete the task?',
      )
    ) {
      deleteTask(event.target.parentNode);
      $inputEl.focus();
    }
  });

  function initialRender() {
    // Render the initial tasks using the template.
    TASKS.forEach(function (label) {
      addTask(label);
    });
  }

  initialRender();
})();
