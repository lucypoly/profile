'use strict';

function readData(field) {
    var profileDatabase = firebase.database();
    var user = firebase.auth().currentUser;
    var name = user.email.substring(0, user.email.indexOf("@"));
    return profileDatabase.ref('/users/' + name + 'id').once('value').then(function (snapshot) {
        if (snapshot.val()) {
            return snapshot.val()[field];
        }
    });
}


function readExperience() {
    var profileDatabase = firebase.database();
    var user = firebase.auth().currentUser;
    var name = user.email.substring(0, user.email.indexOf("@"));
    return profileDatabase.ref('/users/' + name + 'id/experience').orderByKey().limitToLast(5).once('value').then(function (snapshot) {
        if (snapshot.val()) {
            return snapshot.val();
        }
    });
}




