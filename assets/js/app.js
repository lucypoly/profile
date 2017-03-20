'use strict';

var profileDatabase;
var user;
var name;
var registerModal = $('[data-remodal-id=register-modal]').remodal();
var userId;
initApp(renderHTML);


function initApp(cb) {
    firebase.auth().onAuthStateChanged(function (curUser) {
        if (curUser) {
            profileDatabase = firebase.database();
            user = firebase.auth().currentUser;
            name = user.email.substring(0, user.email.indexOf("@"));
            userId = 'users/' + name + 'id';
            $('.loader').show();
            cb();
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('quickstart-sign-in-status').textContent = 'You are already logged in';
            document.getElementById('quickstart-sign-in').textContent = 'Log out';
            document.getElementById('login').textContent = 'Log out';
        } else {
            $('#content').css('display', 'none');
            $('#menu-toggle').css('display', 'none');

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
