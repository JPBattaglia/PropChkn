// app.js — FINAL GLOBAL LOADER (DEPTH + SAFE + STABLE)

(function(){

  /* =========================
     INJECT LOADER (ONCE)
  ========================= */
  function injectLoader(){
    if(document.getElementById('loader')) return;

    const loader = document.createElement('div');
    loader.id = 'loader';

    loader.innerHTML = `
      <div class="loader-backdrop"></div>
      <div class="loader-inner" id="loaderInner">
        <div class="loader-ring"></div>
        <img src="PropChkn2.png" class="loader-logo">
      </div>
    `;

    document.body.appendChild(loader);
  }

  /* =========================
     SHOW LOADER
  ========================= */
  function showLoader(target, duration){

    const loader = document.getElementById('loader');
    const inner  = document.getElementById('loaderInner');

    if(!loader || !inner){
      if(typeof target === 'function'){ target(); }
      else if(typeof target === 'string'){ window.location.href = target; }
      return;
    }

    // activate
    loader.classList.add('active');
    document.body.classList.add('loader-active'); // depth effect

    // pop animation reset
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

  /* =========================
     GLOBAL CLICK HANDLER
  ========================= */
  document.addEventListener('click', function(e){

    const el = e.target.closest('[data-link]');
    if(!el) return;

    // skip if explicitly disabled
    if(el.hasAttribute('data-no-loader')) return;

    e.preventDefault();

    const url = el.getAttribute('data-link');
    if(!url) return;

    const duration = parseInt(el.getAttribute('data-duration')) || 1200;

    showLoader(url, duration);

  }, false);

  /* =========================
     RESET ON BACK / CACHE
  ========================= */
  window.addEventListener('pageshow', function(){

    const loader = document.getElementById('loader');

    if(loader){
      loader.classList.remove('active');
    }

    document.body.classList.remove('loader-active');

  });

  /* =========================
     INIT
  ========================= */
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', injectLoader);
  } else {
    injectLoader();
  }

})();

