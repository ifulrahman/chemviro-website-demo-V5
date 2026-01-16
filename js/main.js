(function ($) {
  "use strict";

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Vendor carousel
  $(".vendor-carousel").owlCarousel({
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 3,
      },
      768: {
        items: 4,
      },
      992: {
        items: 5,
      },
      1200: {
        items: 6,
      },
    },
  });

  // Related carousel
  $(".related-carousel").owlCarousel({
    loop: true,
    margin: 29,
    nav: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 4,
      },
    },
  });

  // Product Quantity
  $(".quantity button").on("click", function () {
    var button = $(this);
    var oldValue = button.parent().parent().find("input").val();
    if (button.hasClass("btn-plus")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    button.parent().parent().find("input").val(newVal);
  });
})(jQuery);

// <!-- Custom JavaScript for Announcement Modal -->
function openAnnouncementModal() {
  $("#announcementModal").modal("show");
}

document
  .querySelector(".card-img-top")
  .addEventListener("mouseover", function () {
    this.style.transform = "scale(1.03)";
  });
document
  .querySelector(".card-img-top")
  .addEventListener("mouseout", function () {
    this.style.transform = "scale(1)";
  });

function lockCarouselToTallestItem(carouselId) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const inner = carousel.querySelector(".carousel-inner");
  const items = [...carousel.querySelectorAll(".carousel-item")];
  if (!inner || items.length === 0) return;

  let maxH = 0;

  items.forEach((item) => {
    const prev = {
      display: item.style.display,
      position: item.style.position,
      visibility: item.style.visibility,
    };

    item.style.display = "block";
    item.style.position = "absolute";
    item.style.visibility = "hidden";

    const h = item.offsetHeight;
    if (h > maxH) maxH = h;

    item.style.display = prev.display;
    item.style.position = prev.position;
    item.style.visibility = prev.visibility;
  });

  // Kunci tinggi berdasarkan yang paling tinggi
  inner.style.minHeight = maxH + "px";

  items.forEach((item) => {
    item.style.minHeight = maxH + "px";
  });
}

window.addEventListener("load", () => {
  lockCarouselToTallestItem("certificateCarousel");
});

// Re-lock saat layar berubah
window.addEventListener("resize", () => {
  lockCarouselToTallestItem("certificateCarousel");
});

// Re-lock juga setelah slide selesai animasi (buat jaga-jaga)
$("#certificateCarousel").on("slid.bs.carousel", function () {
  lockCarouselToTallestItem("certificateCarousel");
});

// Klik gambar -> buka modal -> tampilkan gambar full
document.addEventListener("click", function (e) {
  const img = e.target.closest(".certificate-img");
  if (!img) return;

  const fullSrc = img.getAttribute("data-full") || img.getAttribute("src");
  const modalImg = document.getElementById("certificateModalImg");
  if (modalImg) modalImg.src = fullSrc;
});

// Optional: bersihin src pas modal ditutup (biar ga “nyangkut”)
if (window.jQuery) {
  $("#certificateModal").on("hidden.bs.modal", function () {
    $("#certificateModalImg").attr("src", "");
  });
}


// ======================================================================
// PROMO POPUP FUNCTIONALITY
// ======================================================================

(function () {
  const popup = document.getElementById("promoPopup");
  const closeBtn = document.getElementById("closePromoPopup");
  const STORAGE_KEY = "chemviro_promo_shown";

  // Function to show popup
  function showPopup() {
    popup.classList.add("active");
    // Scroll tetap bisa digunakan - tidak ada overflow hidden
  }

  // Function to hide popup
  function hidePopup() {
    popup.classList.remove("active");
    // Scroll tetap normal - tidak perlu restore
    sessionStorage.setItem(STORAGE_KEY, "true");
  }

  // Check if popup should be shown
  function shouldShowPopup() {
    // Check if this is the homepage (you can adjust this condition)
    const isHomepage =
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html" ||
      window.location.pathname.endsWith("/");

    // Check if popup was already shown in this session
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);

    return isHomepage && !alreadyShown;
  }

  // Close popup when clicking close button
  closeBtn.addEventListener("click", hidePopup);

  // Close popup when clicking outside the content
  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      hidePopup();
    }
  });

  // Close popup with ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && popup.classList.contains("active")) {
      hidePopup();
    }
  });

  // Show popup on page load if conditions are met
  window.addEventListener("load", function () {
    if (shouldShowPopup()) {
      // Delay popup appearance for better UX (1.5 seconds after page load)
      setTimeout(showPopup, 1500);
    }
  });
})();