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
    console.log(passWord);
    return passWord;
}

function showGeneratedPassword()
{
    var password = algorithm();
    console.log("password = " + password);
    document.getElementById('password').innerText = password;
}

function generatePassword() {
    document.getElementById('generatedPassword').addEventListener('click', showGeneratedPassword);
}

function main() {
    checkIfPasswordExist();
    generatePassword();
}

window.onload = main();