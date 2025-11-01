$(document).ready(function() {
    // Menu toggle
    $('.menu-toggle input').on('click', function() {
        $('nav ul').toggleClass('slide');
    });

    // Intersection Observer for animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                $(entry.target).addClass('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    $('.kiri, .kanan, .scroll-animate').each(function() {
        observer.observe(this);
    });

    // Timeline visibility check
    function isElementInViewport($el) {
        var rect = $el[0].getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function callbackFunc() {
        $('.timeline li').each(function() {
            if (isElementInViewport($(this))) {
                $(this).addClass('in-view');
            }
        });
    }

    // Listen for events
    $(window).on('load resize scroll', callbackFunc);

    // Fancybox binding
    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });

    // top button animation
    $('body').append('<button id="toTopBtn" title="Go to top">Top</button>');

    $(window).scroll(function() {
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
            $('#toTopBtn').fadeIn();
        } else {
            $('#toTopBtn').fadeOut();
        }
    });

    $('#toTopBtn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800, 'swing');
        return false;
    });

});