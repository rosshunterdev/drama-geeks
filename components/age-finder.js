(function () {
  var finder = document.querySelector('.age-finder');
  if (!finder) return;

  var buttons    = finder.querySelectorAll('.age-finder__btn');
  var cards      = document.querySelectorAll('.class-card[data-class-id]');
  var liveRegion = finder.querySelector('.age-finder__result');

  var labelMap = {
    'mini-geeks':  'Mini Geeks',
    'drama-geeks': 'Drama Geeks',
    'associates':  'DG Associates'
  };

  function clearAll() {
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
    cards.forEach(function (c) {
      c.classList.remove('class-card--highlighted', 'class-card--dimmed');
    });
    if (liveRegion) liveRegion.textContent = '';
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var alreadyPressed = btn.getAttribute('aria-pressed') === 'true';
      clearAll();
      if (alreadyPressed) return;

      btn.setAttribute('aria-pressed', 'true');

      var targets = (btn.getAttribute('data-ages') || '').split(' ').filter(Boolean);
      var matchedLabels = [];

      cards.forEach(function (card) {
        var id = card.getAttribute('data-class-id');
        if (targets.indexOf(id) !== -1) {
          card.classList.add('class-card--highlighted');
          matchedLabels.push(labelMap[id] || id);
        } else {
          card.classList.add('class-card--dimmed');
        }
      });

      if (liveRegion && matchedLabels.length) {
        liveRegion.textContent = 'Recommended: ' + matchedLabels.join(' and ') + '.';
      }

      var firstMatch = document.querySelector('.class-card--highlighted');
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
})();
