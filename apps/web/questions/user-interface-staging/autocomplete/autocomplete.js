// API End Point
// https://mock-autocomplete.herokuapp.com/autocomplete?q=Au

// jQuery is available with $
// Feel free to look stuff up
$(() => {
  const API_END_POINT = 'https://mock-autocomplete.herokuapp.com/autocomplete';
  const DOM = {
    $searchInput: $('#search'),
    $results: $('#results'),
  };

  const state = {
    selectedIndex: -1,
    results: [],
    lastSearch: '',
  };

  DOM.$searchInput.on('input', function (event) {
    const searchTerm = DOM.$searchInput.val();
    state.lastSearch = searchTerm;
    $.get(
      `${API_END_POINT}?q=${encodeURIComponent(searchTerm)}`,
      function (res) {
        if (searchTerm !== state.lastSearch) {
          return;
        }
        state.selectedIndex = -1;
        state.results = res.data;
        renderResults();
      },
    );
  });

  DOM.$searchInput.on('keydown', function (event) {
    switch (event.key) {
      case 'ArrowUp':
        state.selectedIndex--;
        break;
      case 'ArrowDown':
        state.selectedIndex++;
        break;
      case 'Enter':
        if (state.selectedIndex < 0) {
          return;
        }
        DOM.$searchInput.val(state.results[state.selectedIndex]);
        break;
      default:
        return;
    }
    event.preventDefault();
    state.selectedIndex =
      (state.selectedIndex + state.results.length) % state.results.length;
    renderResults();
  });

  function renderResults() {
    DOM.$results.html('');
    state.results.forEach((country, index) => {
      const $li = $('<li>').text(country);
      if (index === state.selectedIndex) {
        $li.addClass('selected');
      }
      DOM.$results.append($li);
    });
  }
});
