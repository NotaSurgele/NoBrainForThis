var list = [];
var createPass = `<button id="generatedPassword"> Generate password </button>`;
var getTab;

chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    getTab = function getcurrentTab(tabs){
        current = tabs[0].url;
        console.log(current);
        return current;
    }
);

function checkIfPasswordExist() {

    this.list = localStorage.getItem("stockedData");
    if (this.list == null || this.list == undefined) {
        document.getElementById('content').innerHTML = this.createPass;
    }
}

function algorithm() {
    var passWord = "";
    var letterLower = "abcdefghijklmnopqrstuvwxyz";
    var letterUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var digit = "0123456789";
    var specialChar = "!:;,(-_)=}]@^\|[{~#²";

    for (let i = 0; i != 24; i++) {
        if (i < 6) {
            let value = Math.floor(Math.random() * 26);
            console.log(letterLower[value]);
            passWord += letterLower[value];
        } else if (i >= 6 && i < 12) {
            let value = Math.floor(Math.random() * 26);
            passWord += letterUpper[value];
        } else if (i >= 12 && i < 18) {
            let value = Math.floor(Math.random() * 9);
            passWord += digit[value];
        } else {
            let value = Math.floor(Math.random() * 19);
            passWord += specialChar[value];
        }
    }
    return passWord;
}

function generatePassword() {
    document.getElementById('generatedPassword').addEventListener('click', function() {
        console.log(algorithm());
    });
}

function main() {
    checkIfPasswordExist();
    generatePassword();
}

window.onload = main();
