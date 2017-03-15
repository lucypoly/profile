$(document).ready(function () {
    $('#about-button').on('click', function () {
        $('.about-form').show();
    });
    $('#about-form-button').on('click', function () {
        var aboutInfo = $('#about-info-edit').val();
        updateDetails(aboutInfo);
        $('#about-info').html(readData('details'));
    });
});