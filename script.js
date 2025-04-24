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
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
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
    $(document).ready(function () {
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
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonial carousel
    $(".testimonial-carousel-1").owlCarousel({
        loop: true,
        dots: false,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0:{
                items:1
            },
            575:{
                items:1
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });

    $(".testimonial-carousel-2").owlCarousel({
        loop: true,
        dots: false,
        rtl: true,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0:{
                items:1
            },
            575:{
                items:1
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });

})(jQuery);

document.addEventListener("DOMContentLoaded", function () {
    const btn1 = document.getElementById('ted');
    const btn2 = document.getElementById('tedx');
    const btn3 = document.getElementById('dwps');

    const tedabout = document.getElementById("tedAbout");
    const tedxabout = document.getElementById("tedxAbout");
    const dwpsabout = document.getElementById("dwpsAbout");

    btn1.addEventListener("click", function() {
        showSection("tedAbout");
    });

    btn2.addEventListener("click", function() {
        showSection("tedxAbout");
    });

    btn3.addEventListener("click", function() {
        showSection("dwpsAbout");
    });

    function showSection(sectionId) {
        const sections = ["tedAbout", "tedxAbout", "dwpsAbout"];

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add("d-none");
        });

        document.getElementById(sectionId).classList.remove("d-none");
    }

    showSection("tedAbout");
});

window.onload = function () {
    const canvas = document.getElementById("colorStarsCanvas");
    const ctx = canvas.getContext("2d");
    const stars = [];
    const numStars = 100;

    // Function to resize the canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Make sure the stars are reset or their positions are updated after resizing
        stars.length = 0;  // Clear the existing stars
        createStars(); // Recreate stars based on the new canvas size
    }

    // Initial resize to set canvas size
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas); // Resize on window change

    // Function to generate random color for stars
    function randomColor() {
        const colors = ['#ff6ec7', '#6effe8', '#fff44f', '#ff5733', '#a29bfe', '#81ecec'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // Function to create stars with random position, velocity, color, and opacity
    function createStars() {
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,  // Random x position within canvas width
                y: Math.random() * canvas.height, // Random y position within canvas height
                radius: Math.random() * 2 + 1,    // Random radius size
                dx: (Math.random() - 0.5) * 2,    // Increased speed of stars (dx)
                dy: (Math.random() - 0.5) * 2,    // Increased speed of stars (dy)
                color: randomColor(),
                opacity: Math.random()
            });
        }
    }

    // Function to draw the stars on the canvas
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame

        stars.forEach(star => {
            ctx.beginPath();
            const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3);
            gradient.addColorStop(0, `${star.color}`);
            gradient.addColorStop(1, "transparent");
            ctx.fillStyle = gradient;
            ctx.globalAlpha = star.opacity;
            ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
            ctx.fill();

            // Move stars based on their velocity
            star.x += star.dx;
            star.y += star.dy;

            // Wrap around edges
            if (star.x < 0) star.x = canvas.width;
            if (star.x > canvas.width) star.x = 0;
            if (star.y < 0) star.y = canvas.height;
            if (star.y > canvas.height) star.y = 0;
        });

        ctx.globalAlpha = 1;
    }

    // Function to animate the stars
    function animate() {
        drawStars();
        requestAnimationFrame(animate); // Loop the animation
    }

    createStars(); // Initialize stars
    animate(); // Start the animation
};