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