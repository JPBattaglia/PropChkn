// app.js — FINAL GLOBAL LOADER

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

  function showLoader(url, duration = 1200){
    const loader = document.getElementById('loader');
    const inner = document.getElementById('loaderInner');

    loader.classList.add('active');

    inner.classList.remove('pop');
    void inner.offsetWidth;
    inner.classList.add('pop');

    setTimeout(()=>{
      window.location.href = url;
    }, duration);
  }

  window.showLoader = showLoader;

  // 🚨 CRITICAL FIX: CAPTURE PHASE
  document.addEventListener('click', function(e){

    const el = e.target.closest('[data-link]');
    if(!el) return;

    e.preventDefault();
    e.stopPropagation();

    const url = el.getAttribute('data-link');
    const duration = el.getAttribute('data-duration') || 1200;

    showLoader(url, parseInt(duration));

  }, true); // ← THIS makes it override everything

  // inject immediately (not waiting)
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', injectLoader);
  } else {
    injectLoader();
  }

})();