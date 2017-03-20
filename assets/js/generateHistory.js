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


