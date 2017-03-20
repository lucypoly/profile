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




