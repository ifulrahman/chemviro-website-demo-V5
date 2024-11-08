(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    console.log($videoSrc);
    $('#videoModal').on('shown.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    })
    $('#videoModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src', $videoSrc);
    })


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Project carousel
    $(".project-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:2
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);


// -------------------- DOWNLOAD BROSUR ------------------
let currentDownloadLink = '';
let formSubmitted = false; // Flag untuk melacak pengiriman form

document.querySelectorAll('.btn-light').forEach(btn => {
  btn.addEventListener('click', function(event) {
    event.preventDefault();
    currentDownloadLink = this.href; // Simpan tautan unduhan
    formSubmitted = false; // Reset flag setiap kali modal dibuka
    openModal();
  });
});

function openModal() {
  document.getElementById('emailModal').style.display = 'block';
  const submitButton = document.querySelector('#submitButton');
  const emailInput = document.getElementById('emailInput');

  // Tambahkan event listener untuk mengaktifkan tombol submit hanya jika input valid
  emailInput.addEventListener('input', function () {
    if (emailInput.value.trim() !== '') {
      submitButton.disabled = false; // Aktifkan tombol
    } else {
      submitButton.disabled = true; // Nonaktifkan tombol
    }
  });
}

function closeModal() {
  document.getElementById('emailModal').style.display = 'none';
  // Jangan unduh jika form belum dikirim
  if (formSubmitted && currentDownloadLink) {
    // Beri jeda 3 detik sebelum mengunduh file
    setTimeout(() => {
      window.location.href = currentDownloadLink;
      currentDownloadLink = ''; // Reset tautan setelah unduhan
    }, 1500);
  }
}

function submitEmail() {
  const emailInput = document.getElementById('emailInput').value;
  if (emailInput) {
    // Kirim data email ke Google Apps Script Web App
    fetch('https://script.google.com/macros/s/AKfycbyeSzz_h9DCD29E2QRxrEMWRS2CYlW0B4rQ3BpPO2yuNGqIb6etfHG06Nf54Wf47sU/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
      body: JSON.stringify({ email: emailInput })
    })
    .then(() => {
      showNotification('Email telah disimpan.');
      formSubmitted = true; // Set flag untuk menunjukkan bahwa form telah dikirim
      closeModal(); // Tutup modal setelah pengiriman
    })
    .catch(error => {
      console.error('Error:', error);
      showNotification('Terjadi kesalahan, mohon coba lagi.', true);
    });
  } else {
    showNotification('Mohon masukkan email yang valid.', true);
  }
}

function showNotification(message, isError = false) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = 'notification visible';
  if (isError) {
    notification.classList.add('error');
  }

  // Tampilkan notifikasi selama 3 detik, lalu sembunyikan
  setTimeout(() => {
    notification.className = 'notification hidden';
  }, 1500);
}



