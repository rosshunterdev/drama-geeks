// Fetches components/footer.html and injects it in place of #footer-placeholder.
(function () {
  var placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  fetch('/components/footer.html')
    .then(function (r) {
      if (!r.ok) throw new Error('footer-loader: HTTP ' + r.status);
      return r.text();
    })
    .then(function (html) {
      placeholder.insertAdjacentHTML('afterend', html);
      placeholder.remove();
    })
    .catch(function (err) {
      console.error('footer-loader: could not load components/footer.html', err);
    });
})();
