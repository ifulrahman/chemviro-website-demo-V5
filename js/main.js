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

// Optional: bersihin src pas modal ditutup (biar ga "nyangkut")
if (window.jQuery) {
  $("#certificateModal").on("hidden.bs.modal", function () {
    $("#certificateModalImg").attr("src", "");
  });
}


// ======================================================================
// POPUP HOME FUNCTIONALITY
// ======================================================================

(function () {
  const STORAGE_KEY = "chemviro_audit_cems_popup_shown";

  function shouldShowPopup() {
    // Check if this is the homepage
    const isHomepage =
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html" ||
      window.location.pathname.endsWith("/") ||
      window.location.pathname === "";

    // Check if popup was already shown in this session
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);

    return isHomepage && !alreadyShown;
  }

  function initPopup() {
    if (!shouldShowPopup()) return;

    const popup = document.getElementById("auditCemsPopup");
    const closeBtn = document.getElementById("closeAuditCemsPopup");

    function closePopup() {
      if (popup) popup.classList.remove("active");
      sessionStorage.setItem(STORAGE_KEY, "true");
    }

    // Show popup after a delay for better UX
    setTimeout(() => {
      if (popup) popup.classList.add("active");
    }, 1500); // 1.5 seconds after page load

    if (closeBtn) closeBtn.addEventListener("click", closePopup);

    // Close popup when clicking outside the content
    if (popup) {
      popup.addEventListener("click", function (e) {
        if (e.target === popup) closePopup();
      });
    }

    // Close popup with ESC key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && popup && popup.classList.contains("active")) {
        closePopup();
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopup);
  } else {
    // DOM already loaded
    initPopup();
  }


  // <!-- Script WhatsApp (Pojok kanan bawah) Multi-Contact -->
  const wrapper = document.getElementById('waFloatWrapper');
        const btn     = document.getElementById('waMainBtn');
        const popup   = document.getElementById('waPopup');

        btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = wrapper.classList.toggle('open');
        popup.classList.toggle('open', isOpen);
        });

        // Tutup popup saat klik di luar
        document.addEventListener('click', function (e) {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
            popup.classList.remove('open');
        }
        });
  // <!-- END Script WhatsApp Multi-Contact -->
})();