// app.js — LOCKED SYSTEM (LOADER + WIDGET CONTROL)

(function(){

  let loading = false;

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

    if(loading) return;
    loading = true;

    const loader = document.getElementById('loader');
    const inner  = document.getElementById('loaderInner');

    if(!loader || !inner){
      loading = false;
      if(typeof target === 'function'){ target(); }
      else if(typeof target === 'string'){ window.location.href = target; }
      return;
    }

    loader.classList.add('active');
    document.body.classList.add('loader-active');
    document.body.style.overflow = 'hidden';

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

    if(el.hasAttribute('data-no-loader')) return;

    e.preventDefault();

    const url = el.getAttribute('data-link');
    if(!url) return;

    const duration = parseInt(el.getAttribute('data-duration')) || 1200;

    showLoader(url, duration);

  }, false);

  /* =========================
     WIDGET CONTROL
  ========================= */
  function shouldDelayWidgetAutoMount(){
    return !!window.MM_DELAY_WIDGET_AUTOLOAD || !!window.MM_INDEX_EMBED_WIDGET;
  }

  function ensureWidget(force){

    if(document.getElementById('mmA11yLauncher')) return;

    if(!force && shouldDelayWidgetAutoMount()) return;

    window.MenuMadeAccessibilityWidgetLoaded = false;

    const existingScript =
      document.querySelector('script[data-mm-a11y="1"]') ||
      document.querySelector('script[data-mm-a11y-injected="true"]');

    if(existingScript) return;

    const script = document.createElement('script');
    script.src = 'mm-a11y.js';
    script.defer = true;
    script.setAttribute('data-mm-a11y', '1');

    document.body.appendChild(script);
  }

  window.MMEnsureAccessibilityWidget = function(){
    ensureWidget(true);
  };

  window.MMMountAccessibilityWidget = function(){
    ensureWidget(true);
  };

  /* =========================
     RESET ON BACK / CACHE
  ========================= */
  window.addEventListener('pageshow', function(){

    const loader = document.getElementById('loader');

    if(loader){
      loader.classList.remove('active');
    }

    document.body.classList.remove('loader-active');
    document.body.style.overflow = '';
    loading = false;

    ensureWidget(false);

  });

  /* =========================
     INIT
  ========================= */
  function init(){
    injectLoader();
    ensureWidget(false);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();