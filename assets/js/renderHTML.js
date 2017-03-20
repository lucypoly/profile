'use strict';

function renderSkills() {
    var skillSet = '';
    $('.skillset').html('');
    readData("skills").then(function (val) {
        if (val) {
            $.each(val, function (skill) {
                skillSet += '<div class="item"><h3 class="level-title">' + val[skill].name + '</h3><div class="level-bar"><div class="level-bar-inner" data-level="' + val[skill].level + '%"></div></div></div>';
            });
            $('.skillset').append(skillSet);
            renderSkillSet();
            renderHistory();
        } else $('.loader').hide();
    });
}

function renderExperience() {
    var workSet = '';
    $('#workset').html('');
    readExperience().then(function (val) {
        if (val) {
            $.each(val, function (work) {
                workSet += '<div class="item"><h3 class="title" id="work-title">' + val[work].title + ' - ' + '<span class="place" id="work-place"><a href="#">' + val[work].place + ' ' + '</a></span><span id="start-year" class="year">' + '(' + val[work].start + ' ' + '</span> <span id="end-year" class="year">' + ' -  ' + val[work].end + ')' + '</span></h3> <p id="work-description">' + val[work].description + '</p></div>'
            });
            $('#workset').append(workSet);
            renderHistory();
        }
    });
}

function renderAbout() {
    readData("details").then(function (val) {
        if (val) {
            $('#about-info').html(val);
        }
    });
}

function renderName() {
    readData("username").then(function (val) {
        if (val) {
            $('.name').html(val);
        }
    });
}