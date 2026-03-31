// app.js — FINAL GLOBAL LOADER (FIXED + SAFE)

(function(){

  function injectLoader(){
    if(document.getElementById('loader')) return;

    const loader = document.createElement('div');
    loader.id = 'loader';

    loader.innerHTML = `
      <div class="loader-inner" id="loaderInner">
        <div class="loader-ring"></div>
        <img src="PropChkn2.png" class="loader-logo">
      </div>
    `;

    document.body.appendChild(loader);
  }

  function showLoader(target, duration){
    const loader = document.getElementById('loader');
    const inner = document.getElementById('loaderInner');

    if(!loader || !inner){
      if(typeof target === 'function'){ target(); }
      else if(typeof target === 'string'){ window.location.href = target; }
      return;
    }

    loader.classList.add('active');

    inner.classList.remove('pop');
    void inner.offsetWidth;
    inner.classList.add('pop');

    setTimeout(function(){

      if(typeof target === 'function'){
        target();
        return;
      }

      if(typeof target === 'string'){
        window.location.href = target;
        return;
      }

    }, duration || 1200);
  }

  window.showLoader = showLoader;

  document.addEventListener('click', function(e){

  const el = e.target.closest('[data-link]');
  if(!el) return;

  // 🚨 DO NOT block global events anymore
  e.preventDefault();

  const url = el.getAttribute('data-link');
  const duration = el.getAttribute('data-duration') || 1200;

  showLoader(url, parseInt(duration));

}, false); // ← CHANGE: NO CAPTURE

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', injectLoader);
  } else {
    injectLoader();
  }

})();