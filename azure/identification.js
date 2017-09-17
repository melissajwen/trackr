const PERSON_GROUP_ID = 'obama_2-1';
var myId, myFaceId;
var faceIds = [];
var facePercentages = [];

function returnId(id) {
    myId = id;
};

function returnFaceId(id) {
    myFaceId = id;
};

function pushFaceIdsFromPeopleList(arr) {
    for (var i = 0; i < arr.length; i++) {
        console.log('run i');
        if (arr[0].persistedFaceIds) {
            for (var j = 0; j < arr[i].persistedFaceIds.length; j++) {
                console.log('run j');
                faceIds.push(arr[0].persistedFaceIds[j]);
            }
        }
    }
};

// create person group
function createPersonGroup(persGroupId) {
    console.log('entered createPersonGroup');
    var params = {
        personGroupId: persGroupId
    };

    var data = {
        "name": "group1",
        "userData": "user"
    };

    $.ajax({
        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}?" + $.param(params),
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json; charset=utf-8");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","db4740530dab4187b67329b352ef7a40");
        },
        type: "PUT",
        // Request body
        data: JSON.stringify(data)
    })
    .done(function(data) {
        console.log('createPersonGroup success');
    })
    .fail(function(e, status) {
    });

};

// create person
function createPerson(persGroupId, persName) {
    var params = {
        personGroupId: persGroupId
    };

    var data = {
        name: persName
    };

    var apiUrl = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+ persGroupId +"/persons";

    $.ajax({
        url: apiUrl,
        beforeSend: function(xhrObj){
            // Request headersr
            xhrObj.setRequestHeader("Content-Type","application/json; charset=utf-8");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","4a0aa454a3be46638311014ccad947e9");
        },
        type: "POST",
        // Request body
        data: JSON.stringify(data)
    })
    .done(function(data) {
        myId = data.personId;
        console.log('create person (Id:'+ myId +') success');
    })
    .fail(function(e) {
        console.log(e);
    });
};

// Add person face
function addFace(groupId, personId, imageUrl) {
    var params = {
        personGroupId: groupId,
        personId: personId,
    };

    var data = {
        url: imageUrl
    };
  
    var url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/persons/{personId}/persistedFaces?" + $.param(params);

    $.ajax({
        url: url,
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","db4740530dab4187b67329b352ef7a40");
        },
        type: "POST",
        data: JSON.stringify(data)
    })
    .done(function(data) {
        console.log("addFace success");
    })
    .fail(function(e) {
    });
};



// Train the person group
function train(groupId) {
    var params = {
            personGroupId: groupId
        };
      
    $.ajax({
        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}/train?" + $.param(params),
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","db4740530dab4187b67329b352ef7a40");
        },
        type: "POST"
    })
    .done(function(data) {
        console.log("train success");
    })
    .fail(function() {
        alert("error");
    });
};

function addLinksTrainDetect(groupId, id, links, link) {
    for (var i = 0; i < links.length; i++) {
        addFace(PERSON_GROUP_ID, id, links[i]);
    }

};


// Add a face for a person and return a faceId array
function newFaceDetect(url) {
    var params = {
            // Request parameters
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            //"returnFaceAttributes": "{string}",
        };

    var data = {
        url: url
    };
      
    return $.ajax({
        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false",
        beforeSend: function(xhrObj){
            // Request headers
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","db4740530dab4187b67329b352ef7a40");
        },
        type: "POST",
        data: JSON.stringify(data)
    })
    .done(function(data) {

        for (var i = 0; i < data.length; i++) {
            faceVerify(PERSON_GROUP_ID, data[i].faceId, data[i].faceRectangle);
        }
        console.log(facePercentages);
        
    })
    .fail(function() {
    });
};

// Given a new face, verify if it is similar to someone in the database
function faceVerify(groupId, faceId, rectangle) {

    var data = {
        "faceId": faceId,
        "personId": myId,
        "personGroupId": PERSON_GROUP_ID
    };
      
    $.ajax({
        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify?",
        beforeSend: function(xhrObj){

            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","db4740530dab4187b67329b352ef7a40");
        },
        type: "POST",
        // Request body
        data: JSON.stringify(data)
    })
    .done(function(data) {
        alert("success");
        facePercentages.push([faceId, Math.round(data.confidence * 100 * 10) / 10, rectangle]);
    })
    .fail(function() {
        alert("error");
    });
};

// Delete person group and create a new one
function deleteDataAndCreate(personGroupId) {
    var params = {
        personGroupId: personGroupId
    };
  
    $.ajax({
        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/{personGroupId}?" + $.param(params),
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","db4740530dab4187b67329b352ef7a40");
        },
        type: "DELETE",
    })
    .done(function(data) {
        console.log("success deleted");
        createPersonGroup(PERSON_GROUP_ID);
    })
};

function listOfAllPersons(personGroupId) {
      
    $.ajax({
        url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/"+personGroupId+"/persons",
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","db4740530dab4187b67329b352ef7a40");
        },
        type: "GET"
    })
    .done(function(data) {
        console.log('Success retrived list of all people');
        console.log(data);
        pushFaceIdsFromPeopleList(data);
    })
    .fail(function() {
    });
}

console.log("identification js has started");

// deleteData(PERSON_GROUP_ID).done(createPersonGroup(PERSON_GROUP_ID));


deleteDataAndCreate(PERSON_GROUP_ID);

setTimeout(function() {
    createPerson(PERSON_GROUP_ID, "Barack Obama");
}, 5000);

setTimeout(function() {
    console.log("Obama id: " + myId);
}, 10000);

setTimeout(function() {
    var obamaUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Official_portrait_of_Barack_Obama.jpg/170px-Official_portrait_of_Barack_Obama.jpg";
    addFace(PERSON_GROUP_ID, myId, obamaUrl);
    var obamaUrl2 = "https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/08/16/104656161-GettyImages-688156110.1910x1000.jpg";
    addFace(PERSON_GROUP_ID, myId, obamaUrl2);
}, 20000);

// setTimeout(function() {
//     console.log('about to get all people');
//     listOfAllPersons(PERSON_GROUP_ID);
//     console.log('List of all people: ');
// for (var i = 0; i < faceIds.length; i++) {
//     console.log(faceIds[i]);
// }
// }, 26000);

setTimeout(function() {
    newFaceDetect('https://i.imgur.com/54HXxzL.jpg');
}, 26000);




// setTimeout(function() {
//     train(PERSON_GROUP_ID);
// }, 700000);

// setTimeout(function() {
//     faceDetect('http://www.ilooklikebarackobama.com/images/barack/Barack1.jpg');
// }, 600000);