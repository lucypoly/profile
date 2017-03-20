'use strict';

$(document).ready(function () {


    $('#about-button').on('click', function () {
        $('.about-form').toggle();
    });

    $('#about-form-button').on('click', function () {
        var aboutInfo = $('#about-info-edit').val();
        updateDetails(aboutInfo);
        $('#about-info').html(readData("details").then(function (val) {
            $('.about-form').hide();
            $('#about-info').html(val);
        }));
    });


    // Skills
    $('#skills-button').on('click', function () {
        $('.skills-form').toggle();
    });
    $('#skills-form-button').on('click', function () {
        var skillName = $('#skills-name-info-edit').val();
        var skillLevel = $('#skills-level-info-edit').val();
        var skillsData = {
            name: skillName,
            level: skillLevel
        };
        readData("skills").then(function (val) {
            if (val) {
                updateSkill(skillsData);
                renderSkills();
            } else {
                updateFirstSkill(skillsData);
                renderSkills();
            }
        });
        $('.skills-form').hide();
    });


    //Experience
    $('#work-button').on('click', function () {
        $('.work-form').toggle();
    });
    $('#work-form-button').on('click', function () {
        var workTitle = $('#work-title-info-edit').val();
        var workPlace = $('#work-place-info-edit').val();
        var workStart = $('#work-start-info-edit').val();
        var workEnd = $('#work-end-info-edit').val();
        var workDescription = $('#work-description-info-edit').val();
        var workData = {
            title: workTitle,
            place: workPlace,
            start: workStart,
            end: workEnd,
            description: workDescription
        };
        readExperience().then(function (val) {
            if (val) {
                updateWork(workData);
                renderExperience();
            } else {
                updateFirstWork(workData);
                renderExperience();
            }
        });
        $('.work-form').hide();
    });
});
