function createPagination(paginationContainer, currentPage, totalPages) {
  const prevButton = paginationContainer.querySelector('.button--previous');
  const nextButton = paginationContainer.querySelector('.button--next');
  const paginationItemContainer =
    paginationContainer.querySelector('.pagination__items');
  paginationItemContainer.innerHTML = '';

  handlePrevButton(prevButton, paginationContainer, currentPage, totalPages);
  renderPageItems(
    paginationItemContainer,
    paginationContainer,
    currentPage,
    totalPages,
  );
  handleNextButton(nextButton, paginationContainer, currentPage, totalPages);
}

// Handle the logic for the previous button
function handlePrevButton(
  prevButton,
  paginationContainer,
  currentPage,
  totalPages,
) {
  if (currentPage === 1) {
    prevButton.setAttribute('disabled', true);
  } else {
    prevButton.removeAttribute('disabled');
    prevButton.onclick = () =>
      createPagination(paginationContainer, currentPage - 1, totalPages);
  }
}

// Handle the logic for the next button
function handleNextButton(
  nextButton,
  paginationContainer,
  currentPage,
  totalPages,
) {
  if (currentPage === totalPages) {
    nextButton.setAttribute('disabled', true);
  } else {
    nextButton.removeAttribute('disabled');
    nextButton.onclick = () =>
      createPagination(paginationContainer, currentPage + 1, totalPages);
  }
}

// Render the pagination items
function renderPageItems(
  paginationItemContainer,
  paginationContainer,
  currentPage,
  totalPages,
) {
  // Always show the first page
  paginationItemContainer.appendChild(
    createPageItem(paginationContainer, 1, currentPage, totalPages),
  );

  // Add ellipsis if needed
  if (currentPage > 3) paginationItemContainer.appendChild(createEllipsis());

  // Render pages around the current page
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    paginationItemContainer.appendChild(
      createPageItem(paginationContainer, i, currentPage, totalPages),
    );
  }

  // Add ellipsis if needed
  if (currentPage < totalPages - 2)
    paginationItemContainer.appendChild(createEllipsis());

  if (currentPage === 1 && totalPages >= 5) {
    paginationItemContainer.appendChild(
      createPageItem(
        paginationContainer,
        totalPages - 1,
        currentPage,
        totalPages,
      ),
    );
  }

  // Show the last page
  paginationItemContainer.appendChild(
    createPageItem(paginationContainer, totalPages, currentPage, totalPages),
  );
}

// Create individual page items
function createPageItem(paginationContainer, page, currentPage, totalPages) {
  const listItem = document.createElement('li');
  const button = document.createElement('button');
  button.classList.add('button', 'pagination__item');
  button.setAttribute('tabindex', '0');
  button.setAttribute('aria-label', `Page ${page}`);
  button.textContent = page;

  if (page === currentPage) {
    button.classList.add('active');
    button.setAttribute('aria-current', 'page');
  }

  button.onclick = () =>
    createPagination(paginationContainer, page, totalPages);
  listItem.appendChild(button);

  return listItem;
}

// Create the ellipsis (dots) element
function createEllipsis() {
  const listItem = document.createElement('li');
  listItem.classList.add('pagination__item');
  listItem.textContent = '...';
  return listItem;
}

// Example usage
const paginationContainers = [
  { id: 'pagination1', currentPage: 1, totalPages: 3 },
  { id: 'pagination2', currentPage: 1, totalPages: 3 },
  { id: 'pagination3', currentPage: 1, totalPages: 10 },
  { id: 'pagination4', currentPage: 5, totalPages: 10 },
];

paginationContainers.forEach(({ id, currentPage, totalPages }) => {
  const container = document.getElementById(id);
  createPagination(container, currentPage, totalPages);
});
