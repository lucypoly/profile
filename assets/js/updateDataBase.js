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