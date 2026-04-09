// nav.js — GLOBAL NAV INJECTION

(function(){
  var NAV_ID = "globalNav";
  var NAV_STYLE_ID = "globalNavStyles";

  function getCurrentPage(){
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf("/") + 1);
    return file || "index.html";
  }

  function injectNavStyles(){
    if (document.getElementById(NAV_STYLE_ID)) return;

    var style = document.createElement("style");
    style.id = NAV_STYLE_ID;
    style.textContent = `
      .nav{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 80px;
        background: #fff;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 999;
      }

      .nav-item{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 56px;
        cursor: pointer;
        color: #888;
        transition: color .18s ease;
        -webkit-tap-highlight-color: transparent;
      }

      .nav-item.active{
        color: #6f9faa;
        font-weight: 600;
      }

      .nav-icon{
        width: 26px;
        height: 26px;
        object-fit: contain;
        margin-bottom: 4px;
        display: block;
        opacity: .75;
        transform: scale(1);
        transition: transform .18s ease, opacity .18s ease, margin .18s ease;
        filter: none !important;
      }

      .nav-item.active .nav-icon{
        opacity: 1;
        transform: scale(1.5);
        margin-bottom: 10px;
        filter: none !important;
      }

      .nav-label{
        font-size: 12px;
        line-height: 1;
        opacity: 1;
        max-height: 16px;
        overflow: hidden;
        transition: opacity .18s ease, max-height .18s ease, margin .18s ease;
      }

      .nav-item.active .nav-label{
        opacity: 0;
        max-height: 0;
        margin: 0;
      }
    `;
    document.head.appendChild(style);
  }

  function injectNav(){
    if (document.getElementById(NAV_ID)) return;

    injectNavStyles();

    var current = getCurrentPage();

    var nav = document.createElement("div");
    nav.className = "nav";
    nav.id = NAV_ID;
    nav.setAttribute("role", "navigation");
    nav.setAttribute("aria-label", "Primary");

    nav.innerHTML = `
      <div class="nav-item ${current === "locations.html" ? "active" : ""}" data-link="locations.html" role="button" tabindex="0" aria-label="Locations">
        <img src="icon-location.png" class="nav-icon" alt="">
        <div class="nav-label">Locations</div>
      </div>

      <div class="nav-item ${current === "order-details.html" || current === "order.html" ? "active" : ""}" data-link="order-details.html" role="button" tabindex="0" aria-label="Order">
        <img src="icon-order.png" class="nav-icon" alt="">
        <div class="nav-label">Order</div>
      </div>

      <div class="nav-item ${current === "rewards.html" ? "active" : ""}" data-link="rewards.html" role="button" tabindex="0" aria-label="Rewards">
        <img src="icon-rewards.png" class="nav-icon" alt="">
        <div class="nav-label">Rewards</div>
      </div>

      <div class="nav-item ${current === "gift-cards.html" || current === "gift-checkout.html" ? "active" : ""}" data-link="gift-cards.html" role="button" tabindex="0" aria-label="Gift Cards">
        <img src="icon-gift.png" class="nav-icon" alt="">
        <div class="nav-label">Gift Cards</div>
      </div>

      <div class="nav-item ${current === "more.html" ? "active" : ""}" data-link="more.html" role="button" tabindex="0" aria-label="More">
        <img src="icon-more.png" class="nav-icon" alt="">
        <div class="nav-label">More</div>
      </div>
    `;

    nav.addEventListener("keydown", function(e){
      var item = e.target.closest(".nav-item");
      if (!item) return;

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });

    document.body.appendChild(nav);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectNav);
  } else {
    injectNav();
  }
})();