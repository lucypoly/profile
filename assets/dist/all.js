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
'use strict';

function setHistory(event) {
    var updates = {};
    updates['history/' + Date.now() + '/'] = event;
    return profileDatabase.ref().update(updates);
}

function readHistory() {
    return profileDatabase.ref('/history/').limitToLast(5).once('value').then(function (snapshot) {
        if (snapshot.val()) {
            return snapshot.val();
        }
    });
}

function renderHistory() {
    var history = '<ul>';
    readHistory().then(function (val) {
        if (val) {
            $('#history').html('');
            $.each(val, function (item) {
                history += '<li>' + val[item] + '</li>';
            });
            history += '</ul>';
            $('#history').append(history);
        }
    });
}



'use strict';

function readData(field) {
       return profileDatabase.ref('/users/' + name + 'id').once('value').then(function (snapshot) {
        if (snapshot.val()) {
            return snapshot.val()[field];
        }
    });
}




function readExperience() {
    return profileDatabase.ref('/users/' + name + 'id/experience').orderByKey().limitToFirst(5).once('value').then(function (snapshot) {
        if (snapshot.val()) {
            var lastIndex = Object.keys(snapshot.val()).pop();
            return snapshot.val();
        }
    });
}





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

'use strict';



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

    registerModal.close();

    writeData(id, email, name);
}

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
'use strict';

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});


$('.sidebar-nav>li').click(function (e) {
    $("#sidebar-wrapper").toggleClass("active");
});
'use strict';

var loginModal = $('[data-remodal-id=login-modal]').remodal();

function toggleSignIn() {
    if (firebase.auth().currentUser) {
        firebase.auth().signOut();
        $('#content').css('display', 'none');
        $('#menu-toggle').css('display', 'none');
    } else {
        $('#content').css('display', 'block');
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
    loginModal.close();
}


'use strict';


//About
function updateDetails(info) {
    var profileDatabase = firebase.database();
    var user = firebase.auth().currentUser;
    var name = user.email.substring(0, user.email.indexOf("@"));
    var userId = 'users/' + name + 'id';
    profileDatabase.ref(userId + '/details').set(info).then(function () {
        console.log('successful');
        setHistory(name + ' changed details about ');
    }, function (error) {
        alert(error);
    });

}


//Skills
function updateFirstSkill(skill) {
    // var profileDatabase = firebase.database();
    // var user = firebase.auth().currentUser;
    // var name = user.email.substring(0, user.email.indexOf("@"));
    var userId = 'users/' + name + 'id';
    profileDatabase.ref(userId + '/skills/').set(null).then(function () {
        console.log('successful');
    }, function (error) {
        alert(error);
    });
    updateSkill(skill);
}

function updateSkill(skillsData) {
    var updates = {};
    updates[userId + '/skills/' + Date.now()] = skillsData;
    setHistory(name + ' added skill ' + skillsData.name + ' (' + skillsData.level + '%)');
    return profileDatabase.ref().update(updates);
}


//Experience
function updateFirstWork(work) {
    profileDatabase.ref(userId + '/experience/').set(null).then(function () {
        console.log('successful');
    }, function (error) {
        alert(error);
    });
    updateWork(work);
}

function updateWork(workData) {
    var profileDatabase = firebase.database();
    var user = firebase.auth().currentUser;
    var name = user.email.substring(0, user.email.indexOf("@"));
    var userId = 'users/' + name + 'id';
    var updates = {};
    updates[userId + '/experience/' + Date.now()] = workData;
    setHistory(name + ' added work experience in ' + workData.place);
    return profileDatabase.ref().update(updates);
}
'use strict';

function writeData(id, email, username) {

    function writeUserData(userId, mail, name) {
        profileDatabase.ref('users/' + userId).set({
            id: userId,
            username: name,
            email: mail
        });
    }

    writeUserData(id, email, username);
    $('.loader').hide();

}