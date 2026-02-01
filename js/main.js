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
  // Configuration
  const STORAGE_KEY = "chemviro_all_popups_shown";
  const popupConfigs = [
    {
      id: "newPopup",
      closeButtonId: "closeNewPopup"
    },
    {
      id: "promoPopup", 
      closeButtonId: "closePromoPopup"
    }
  ];

  let currentPopupIndex = 0;

  // Function to show specific popup
  function showPopup(index) {
    if (index >= popupConfigs.length) return;
    
    const config = popupConfigs[index];
    const popup = document.getElementById(config.id);
    if (popup) {
      popup.classList.add("active");
    }
  }

  // Function to hide current popup and show next
  function closeCurrentAndShowNext() {
    const currentConfig = popupConfigs[currentPopupIndex];
    const currentPopup = document.getElementById(currentConfig.id);
    
    if (currentPopup) {
      currentPopup.classList.remove("active");
    }

    currentPopupIndex++;

    // If there are more popups, show the next one after a short delay
    if (currentPopupIndex < popupConfigs.length) {
      setTimeout(() => {
        showPopup(currentPopupIndex);
      }, 300); // 300ms delay for smooth transition
    } else {
      // All popups shown, set session flag
      sessionStorage.setItem(STORAGE_KEY, "true");
    }
  }

  // Check if popups should be shown
  function shouldShowPopups() {
    // Check if this is the homepage
    const isHomepage =
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html" ||
      window.location.pathname.endsWith("/") ||
      window.location.pathname === "";

    // Check if popups were already shown in this session
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);

    return isHomepage && !alreadyShown;
  }

  // Set up event listeners for all close buttons
  function setupEventListeners() {
    // Set up close button event listeners
    popupConfigs.forEach((config, index) => {
      const closeBtn = document.getElementById(config.closeButtonId);
      const popup = document.getElementById(config.id);

      if (closeBtn) {
        closeBtn.addEventListener("click", closeCurrentAndShowNext);
      }

      // Close popup when clicking outside the content
      if (popup) {
        popup.addEventListener("click", function (e) {
          if (e.target === popup) {
            closeCurrentAndShowNext();
          }
        });
      }
    });

    // Close current popup with ESC key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        // Check if any popup is currently active
        const activePopup = popupConfigs.find(config => {
          const popup = document.getElementById(config.id);
          return popup && popup.classList.contains("active");
        });

        if (activePopup) {
          closeCurrentAndShowNext();
        }
      }
    });
  }

  // Initialize sequential popups
  function initSequentialPopups() {
    if (!shouldShowPopups()) return;

    // Set up all event listeners first
    setupEventListeners();

    // Show first popup after a delay for better UX
    setTimeout(() => {
      showPopup(0);
    }, 1500); // 1.5 seconds after page load
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSequentialPopups);
  } else {
    // DOM already loaded
    initSequentialPopups();
  }

  // Also initialize on window load as backup
  window.addEventListener("load", function() {
    // Only run if not already initialized
    if (currentPopupIndex === 0 && shouldShowPopups() && !document.querySelector('.promo-popup-overlay.active')) {
      initSequentialPopups();
    }
  });
})();