'use strict';

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});


$('.sidebar-nav>li').click(function (e) {
    $("#sidebar-wrapper").toggleClass("active");
});