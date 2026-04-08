// nav.js — GLOBAL NAV INJECTION

(function(){
  var NAV_ID = "globalNav";

  function getCurrentPage(){
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf("/") + 1);
    return file || "index.html";
  }

  function injectNav(){
    if (document.getElementById(NAV_ID)) return;

    var current = getCurrentPage();

    var nav = document.createElement("div");
    nav.className = "nav";
    nav.id = NAV_ID;
    nav.setAttribute("role", "navigation");
    nav.setAttribute("aria-label", "Primary");

    nav.innerHTML = `
      <div class="nav-item ${current === "locations.html" ? "active" : ""}" data-link="locations.html" role="button" tabindex="0" aria-label="Locations">
        <img src="icon-location.png" class="nav-icon" alt="">
        <div>Locations</div>
      </div>

      <div class="nav-item ${current === "order-details.html" || current === "order.html" ? "active" : ""}" data-link="order-details.html" role="button" tabindex="0" aria-label="Order">
        <img src="icon-order.png" class="nav-icon" alt="">
        <div>Order</div>
      </div>

      <div class="nav-item ${current === "rewards.html" ? "active" : ""}" data-link="rewards.html" role="button" tabindex="0" aria-label="Rewards">
        <img src="icon-rewards.png" class="nav-icon" alt="">
        <div>Rewards</div>
      </div>

      <div class="nav-item ${current === "gift-cards.html" || current === "gift-checkout.html" ? "active" : ""}" data-link="gift-cards.html" role="button" tabindex="0" aria-label="Gift Cards">
        <img src="icon-gift.png" class="nav-icon" alt="">
        <div>Gift Cards</div>
      </div>

      <div class="nav-item ${current === "more.html" ? "active" : ""}" data-link="more.html" role="button" tabindex="0" aria-label="More">
        <img src="icon-more.png" class="nav-icon" alt="">
        <div>More</div>
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