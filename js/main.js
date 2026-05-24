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
  const STORAGE_KEY_2 = "chemviro_iso_popup_shown";

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

  function shouldShowPopup2() {
    const isHomepage =
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html" ||
      window.location.pathname.endsWith("/") ||
      window.location.pathname === "";
    const alreadyShown2 = sessionStorage.getItem(STORAGE_KEY_2);
    return isHomepage && !alreadyShown2;
  }

  function showPopup2() {
    if (!shouldShowPopup2()) return;

    // Buat elemen popup kedua secara dinamis
    const overlay = document.createElement('div');
    overlay.id = 'isoPopupOverlay';
    overlay.style.cssText = `
      display: flex;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0,0,0,0.75);
      z-index: 10001;
      justify-content: center;
      align-items: center;
      animation: fadeIn 0.3s ease-in;
    `;

    overlay.innerHTML = `
      <div style="
        position: relative;
        background: white;
        border-radius: 14px;
        max-width: 480px;
        width: 90%;
        overflow: hidden;
        box-shadow: 0 12px 40px rgba(0,0,0,0.35);
        animation: slideUp 0.4s ease-out;
        font-family: 'Poppins', sans-serif;
      ">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #047857, #059669); padding: 22px 24px 18px; position: relative;">
          <button id="closeIsoPopup" style="
            position: absolute; top: 14px; right: 16px;
            background: rgba(255,255,255,0.15); border: none; border-radius: 50%;
            width: 30px; height: 30px; font-size: 18px; font-weight: bold;
            color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;
            transition: background 0.2s;
          ">&times;</button>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="background: rgba(255,255,255,0.15); border-radius: 50%; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; font-size: 22px;">🏆</div>
            <div>
              <p style="margin:0; color: rgba(255,255,255,0.75); font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 600;">Pengumuman Resmi</p>
              <h4 style="margin:4px 0 0; color: white; font-size: 16px; font-weight: 700; line-height: 1.3;">Sertifikasi Internasional Baru!</h4>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div style="padding: 20px 24px 24px;">
          <p style="font-size: 13px; color: #374151; margin-bottom: 14px; line-height: 1.6;">
            PT Chemviro Buana Indonesia dengan bangga mengumumkan telah memperoleh <strong>4 Sertifikasi Internasional</strong> baru dari <strong>Globus Certifications Private Limited</strong> dan <strong>QVR (Quality Verification Registrar)</strong>:
          </p>

          <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">

              <div style="display: flex; align-items: center; gap: 12px; background: #f0fdf4; border-radius: 8px; padding: 10px 14px; border-left: 3px solid #059669;">
            <img src="img/home-logo/1713.jpeg" alt="ISO 9001" style="width: 40px; height: 40px; object-fit: contain; border-radius: 4px; background: white; padding: 2px; flex-shrink: 0;">
            <div>
              <p style="margin:0; font-size: 13px; font-weight: 700; color: #065f46;">ISO 9001:2015</p>
              <p style="margin:0; font-size: 11px; color: #6b7280;">Quality Management System</p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 12px; background: #f0fdf4; border-radius: 8px; padding: 10px 14px; border-left: 3px solid #059669;">
            <img src="img/home-logo/1712.jpeg" alt="ISO 14001" style="width: 40px; height: 40px; object-fit: contain; border-radius: 4px; background: white; padding: 2px; flex-shrink: 0;">
            <div>
              <p style="margin:0; font-size: 13px; font-weight: 700; color: #065f46;">ISO 14001:2015</p>
              <p style="margin:0; font-size: 11px; color: #6b7280;">Environmental Management System</p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 12px; background: #f0fdf4; border-radius: 8px; padding: 10px 14px; border-left: 3px solid #059669;">
            <img src="img/home-logo/1720.jpeg" alt="ISO 45001" style="width: 40px; height: 40px; object-fit: contain; border-radius: 4px; background: white; padding: 2px; flex-shrink: 0;">
            <div>
              <p style="margin:0; font-size: 13px; font-weight: 700; color: #065f46;">ISO 45001:2018</p>
              <p style="margin:0; font-size: 11px; color: #6b7280;">Occupational Health &amp; Safety Management System</p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 12px; background: #f0fdf4; border-radius: 8px; padding: 10px 14px; border-left: 3px solid #059669;">
            <img src="img/home-logo/37001.jpeg" alt="ISO 37001" style="width: 40px; height: 40px; object-fit: contain; border-radius: 4px; background: white; padding: 2px; flex-shrink: 0;">
            <div>
              <p style="margin:0; font-size: 13px; font-weight: 700; color: #065f46;">ISO 37001:2016</p>
              <p style="margin:0; font-size: 11px; color: #6b7280;">Anti-Bribery Management System</p>
            </div>
          </div>
          </div>

          <button id="closeIsoPopupBtn" style="
            width: 100%;
            background: #059669;
            color: white;
            border: 2px solid #059669;
            border-radius: 25px;
            padding: 12px 28px;
            font-size: 0.85rem;
            font-weight: 700;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
          "
          onmouseover="this.style.background='white';this.style.color='#059669';this.style.transform='scale(1.05)';this.style.boxShadow='0 6px 20px rgba(0,0,0,0.2)';"
          onmouseout="this.style.background='#059669';this.style.color='white';this.style.transform='scale(1)';this.style.boxShadow='0 4px 15px rgba(0,0,0,0.15)';"
          >Tutup</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    sessionStorage.setItem(STORAGE_KEY_2, 'true');

    function closePopup2() {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease';
      setTimeout(() => overlay.remove(), 300);
    }

    document.getElementById('closeIsoPopup').addEventListener('click', closePopup2);
    document.getElementById('closeIsoPopupBtn').addEventListener('click', closePopup2);
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closePopup2();
    });
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') { closePopup2(); document.removeEventListener('keydown', handler); }
    });
  }

  function initPopup() {
    if (!shouldShowPopup()) return;

    const popup = document.getElementById("auditCemsPopup");
    const closeBtn = document.getElementById("closeAuditCemsPopup");

    function closePopup() {
      if (popup) popup.classList.remove("active");
      sessionStorage.setItem(STORAGE_KEY, "true");
      // Setelah popup pertama ditutup, tampilkan popup kedua
      setTimeout(showPopup2, 400);
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

    document.addEventListener('click', function (e) {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('open');
        popup.classList.remove('open');
      }
    });
    // Logo Zoom
    const logoModal = document.getElementById('logoZoomModal');
    const logoZoomImg = document.getElementById('logoZoomImg');
    const closeLogoZoom = document.getElementById('closeLogoZoom');

    document.querySelectorAll('.logo-zoomable').forEach(function(img) {
      img.addEventListener('click', function() {
        logoZoomImg.src = this.src;
        logoZoomImg.alt = this.alt;
        logoModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLogo() {
      logoModal.style.display = 'none';
      document.body.style.overflow = '';
    }

    if (closeLogoZoom) closeLogoZoom.addEventListener('click', closeLogo);
    if (logoModal) logoModal.addEventListener('click', function(e) {
      if (e.target === logoModal) closeLogo();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && logoModal && logoModal.style.display === 'flex') closeLogo();
    });
})();