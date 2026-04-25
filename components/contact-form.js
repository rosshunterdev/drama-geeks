(function () {
  document.querySelectorAll('.contact-form').forEach(function (form) {

    // Validate a single field; return true if valid
    function validate(field) {
      return field.value.trim() !== '' && field.checkValidity();
    }

    function setError(field, hasError) {
      var errorId = field.getAttribute('aria-describedby');
      var errorEl = errorId ? document.getElementById(errorId) : null;
      field.setAttribute('aria-invalid', hasError ? 'true' : 'false');
      if (errorEl) errorEl.hidden = !hasError;
    }

    // Clear error as soon as the field has a value
    form.querySelectorAll('[required]').forEach(function (field) {
      field.addEventListener('input', function () {
        if (validate(field)) setError(field, false);
      });
      field.addEventListener('change', function () {
        if (validate(field)) setError(field, false);
      });
    });

    form.addEventListener('submit', function (e) {
      var required = form.querySelectorAll('[required]');
      var firstInvalid = null;

      required.forEach(function (field) {
        var ok = validate(field);
        setError(field, !ok);
        if (!ok && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        e.preventDefault();
        firstInvalid.focus();
      }
    });
  });
})();
