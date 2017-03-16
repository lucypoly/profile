'use strict';

function renderSkillSet() {
    $('.level-bar-inner').css('width', '0');
    $('.level-bar-inner').each(function () {
        var itemWidth = $(this).data('level');
        $(this).animate({
            width: itemWidth
        }, 800);
    });
    $('.loader').hide();
}

$(document).ready(function () {
    renderSkillSet();
});