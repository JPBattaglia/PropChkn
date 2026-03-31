// nav.js — GLOBAL NAV INJECTION

(function(){

  function getCurrentPage(){
    const path = window.location.pathname;
    const file = path.substring(path.lastIndexOf('/') + 1);
    return file || 'index.html';
  }

  function injectNav(){

    if(document.getElementById('globalNav')) return;

    const current = getCurrentPage();

    const nav = document.createElement('div');
    nav.className = 'nav';
    nav.id = 'globalNav';

    nav.innerHTML = `
      <div class="nav-item ${current === 'locations.html' ? 'active' : ''}" data-link="locations.html">
        <img src="icon-location.png" class="nav-icon">
        <div>Locations</div>
      </div>

      <div class="nav-item ${current === 'order-details.html' || current === 'order.html' ? 'active' : ''}" data-link="order-details.html">
        <img src="icon-order.png" class="nav-icon">
        <div>Order</div>
      </div>

      <div class="nav-item ${current === 'rewards.html' ? 'active' : ''}" data-link="rewards.html">
        <img src="icon-rewards.png" class="nav-icon">
        <div>Rewards</div>
      </div>

      <div class="nav-item ${current === 'gift-cards.html' || current === 'gift-checkout.html' ? 'active' : ''}" data-link="gift-cards.html">
        <img src="icon-gift.png" class="nav-icon">
        <div>Gift Cards</div>
      </div>

      <div class="nav-item ${current === 'more.html' ? 'active' : ''}" data-link="more.html">
        <img src="icon-more.png" class="nav-icon">
        <div>More</div>
      </div>
    `;

    document.body.appendChild(nav);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', injectNav);
  } else {
    injectNav();
  }

})();