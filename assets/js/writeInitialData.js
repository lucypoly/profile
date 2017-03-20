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