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
function initApp() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('quickstart-sign-in-status').textContent = 'You are already logged in';
            document.getElementById('quickstart-sign-in').textContent = 'Log out';
        } else {
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('quickstart-sign-in-status').textContent = 'Logged out';
            document.getElementById('quickstart-sign-in').textContent = 'Log in';
        }
        document.getElementById('quickstart-sign-in').disabled = false;
    });
    document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    document.getElementById('quickstart-register').addEventListener('click', handleSignUp, false);
}
window.onload = function () {
    initApp();
};
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
});
jQuery(document).ready(function ($) {
    /*======= Skillset *=======*/
    $('.level-bar-inner').css('width', '0');
    $(window).on('load', function () {
        $('.level-bar-inner').each(function () {
            var itemWidth = $(this).data('level');
            $(this).animate({
                width: itemWidth
            }, 800);
        });
    });

    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();
});
function readData(field) {
    var profileDatabase = firebase.database();
    var user = firebase.auth().currentUser;
    var name = user.email.substring(0, user.email.indexOf("@"));
    var dataPromise = profileDatabase.ref('/users/' + name + 'id').once('value').then(function (snapshot) {
        return snapshot.val()[field];
    });
    return dataPromise();
}


var registerModal = $('[data-remodal-id=register-modal]').remodal();


function handleSignUp() {
    var email = document.getElementById('register-email').value;
    var password = document.getElementById('register-password').value;
    var name = document.getElementById('register-name').value;
    var id = name + 'id';
    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length < 4) {
        alert('Please enter a password.');
        return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
            alert('The password is too weak.');
        } else {
            alert(errorMessage);
        }
        console.log(error);
    });

    writeData(id, email, name);
}

var loginModal = $('[data-remodal-id=login-modal]').remodal();

function toggleSignIn() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
    } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            document.getElementById('quickstart-sign-in').disabled = false;
        });
    }
    document.getElementById('quickstart-sign-in').disabled = false;
}


function updateDetails(info) {
    var profileDatabase = firebase.database();
    var user = firebase.auth().currentUser;
    var name = user.email.substring(0, user.email.indexOf("@"));
    profileDatabase.ref('users/' + name + 'id' + '/details').set(info).then(function () {
        console.log('successful');
    }, function (error) {
        alert(error);
    });
}


function updateEducation(info) {

    user.updateProfile({
        education: info
    }).then(function () {
        console.log('successful');
    }, function (error) {
        alert(error);
    });
}

function updateExperience(info) {
    var user = firebase.auth().currentUser;

    user.updateProfile({
        experience: info
    }).then(function () {
        console.log('successful');
    }, function (error) {
        alert(error);
    });
}
function writeData(id, email, username) {
    var profileDatabase = firebase.database();

    function writeUserData(userId, mail, name) {
        profileDatabase.ref('users/' + userId).set({
            id: userId,
            username: name,
            email: mail
        });
    }

writeUserData(id, email, username);

}
