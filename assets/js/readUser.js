function readData(field) {
    var profileDatabase = firebase.database();
    var user = firebase.auth().currentUser;
    var name = user.email.substring(0, user.email.indexOf("@"));
    var dataPromise = profileDatabase.ref('/users/' + name + 'id').once('value').then(function (snapshot) {
        return snapshot.val()[field];
    });
    return dataPromise();
}

