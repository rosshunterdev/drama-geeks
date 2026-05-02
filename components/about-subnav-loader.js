(function () {
  var placeholder = document.getElementById('about-subnav-placeholder');
  if (!placeholder) return;

  fetch('/components/about-subnav.html')
    .then(function (r) {
      if (!r.ok) throw new Error('about-subnav-loader: HTTP ' + r.status);
      return r.text();
    })
    .then(function (html) {
      placeholder.insertAdjacentHTML('afterend', html);
      placeholder.remove();

      var path = window.location.pathname;
      document.querySelectorAll('[data-subnav]').forEach(function (link) {
        if (path.startsWith(link.getAttribute('href'))) {
          link.setAttribute('aria-current', 'page');
        }
      });
    })
    .catch(function (err) {
      console.error(err);
      placeholder.remove();
    });
})();
