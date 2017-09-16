(function() {
	const config = {
        apiKey: "AIzaSyB1iSgyDlGIz4JJdNCnPyEmyOgDhH9Pd-o",
        authDomain: "trackr-01.firebaseapp.com",
        databaseURL: "https://trackr-01.firebaseio.com",
        projectId: "trackr-01",
        storageBucket: "trackr-01.appspot.com",
    };

    // Get elements 
    const preObject = document.getElementById('object');

    // create references
    const dbRefObject = firebase.database().ref().child('object');

    // sync object
    dbRefObject.on('value', snap => console.log(snap.val()));
}());