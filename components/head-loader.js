// Injects shared <head> content — preconnects and Google Fonts — synchronously
// so preconnect hints fire before the main stylesheet starts loading.
// Runs inline (not deferred) to maximise hint priority.
// The main stylesheet link (/styles.css) and per-page <title>/<meta description>
// remain in each page's <head> and are not managed here.
(function () {
  document.head.insertAdjacentHTML('beforeend',
    '<link rel="preconnect" href="https://fonts.googleapis.com">' +
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter+Tight:wght@300;400;500;600&family=Poppins:wght@400;500;600;700&display=swap">'
  );
}());
