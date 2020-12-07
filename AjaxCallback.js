let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log(methodType + " State Change called at " + showTime() + ". Ready State: " + xhr.readyState + " Status: " + xhr.status);
        if (xhr.readyState === 4) {
            // Matching all 200 series responses
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 Client Error or 500 Server Error at " + showTime());
            }
        }
    }
    console.log("Before opening connection:");
    xhr.open(methodType, url, async);
    console.log("After opening connection and before sending:");
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " Request sent to Server at " + showTime());
}

const getURL = "http://localhost:3000/employees/1";

function getUserDetails(data) {
    console.log("Get User Data at: " + showTime() + " data: " + data);
}
makeAJAXCall("GET", getURL, getUserDetails);
console.log("Made GET AJAX Call to Server at " + showTime());

const deleteURL = "http://localhost:3000/employees/4";

function deleteUserDetails(data) {
    console.log("Deleted User Data at: " + showTime() + " data: " + data);
}
makeAJAXCall("DELETE", deleteURL, deleteUserDetails, false);
console.log("Made DELETE AJAX Call to Server at " + showTime());

const postURL = "http://localhost:3000/employees";
const empData = { "name": "Harry", "salary": "5000" };

function postUserDetails(data) {
    console.log("Posted(/Added) User Data at: " + showTime() + " data: " + data);
}
makeAJAXCall("POST", postURL, postUserDetails, true, empData);
console.log("Made POST AJAX Call to Server at " + showTime());