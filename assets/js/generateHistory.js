'use strict';

function setHistory(event) {
    var profileDatabase = firebase.database();
    var updates = {};
    updates['history/' + Date.now() + '/'] = event;
    return profileDatabase.ref().update(updates);
}

function readHistory() {
    var profileDatabase = firebase.database();
    return profileDatabase.ref('/history/').orderByKey().once('value').then(function (snapshot) {
        if (snapshot.val()) {
            return snapshot.val();
        }
    });
}

function renderHistory() {
    var history = '<ul>';
    $('#history').html('');
    readHistory().then(function (val) {
        if (val) {
            $.each(val, function (item) {
                history += '<li>' + val[item] + '</li>';
            });
            history+='</ul>';
            $('#history').append(history);
        }
    });
}


