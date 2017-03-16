'use strict';

function initApp(cb) {
    firebase.auth().onAuthStateChanged(function (curUser) {
        if (curUser) {
            cb();
            var profileDatabase = firebase.database();
            var user = firebase.auth().currentUser;
            var name = user.email.substring(0, user.email.indexOf("@"));
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('quickstart-sign-in-status').textContent = 'You are already logged in';
            document.getElementById('quickstart-sign-in').textContent = 'Log out';
            document.getElementById('login').textContent = 'Log out';
        } else {
            $('#workset').html('');
            $('#about-info').html('');
            $('.skillset').html('');
            $('.loader').hide();

            $('.name').html('You need to log in');


            var loginModal = $('[data-remodal-id=login-modal]').remodal();
            loginModal.open();
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('quickstart-sign-in-status').textContent = 'Logged out';
            document.getElementById('quickstart-sign-in').textContent = 'Log in';
            document.getElementById('login').textContent = 'Log in';
        }
        document.getElementById('quickstart-sign-in').disabled = false;
    });
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('quickstart-sign-in').addEventListener('login', toggleSignIn, false);
    document.getElementById('quickstart-register').addEventListener('click', handleSignUp, false);
}

function renderHTML() {
    renderSkills();
    renderAbout();
    renderName();
    renderExperience();
    renderHistory();
}
window.onload = function () {
    $('.loader').show();
    initApp(renderHTML);
};