'use strict';

$(document).ready(function () {
    if ($('#back-to-top').length) {
        var scrollTrigger = 200,
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').show();
                } else {
                    $('#back-to-top').hide();
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
    $('#workset').scroll(function () {
        if (document.getElementById("workset").scrollHeight - document.getElementById('workset').clientHeight == document.getElementById('workset').scrollTop
        ) {
            console.log('loading in development')
        }
    });
});