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