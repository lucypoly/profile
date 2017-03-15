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
