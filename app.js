var createPass = `<button id="generatedPassword"> Generate password </button>`;

chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
    function(tabs) {
        getcurrentURL(tabs);
});

function getcurrentURL(tabs)
{
    let url = tabs[0].url;

    if (localStorage.getItem("currentURL") != null || localStorage.getItem("currentURL") != undefined) {
        if (url != localStorage.getItem("currentURL"))
            window.location.reload();
    }
    localStorage.setItem("currentURL", url);
}

function checkIfPasswordExist() {
    var list = [];
    list = JSON.parse(localStorage.getItem("stockedData"));

    if (list == null || list == undefined) {
        document.getElementById('generate').innerHTML = createPass;
    } else {
        let length = Object.keys(list).length;

        for (let i = 0; i != length; i++) {
            var str = JSON.stringify(list[i]);

            if (str.indexOf(localStorage.getItem("currentURL")) != -1) {
                var passwd = str.split('§');
                console.log(str);
                document.getElementById("password").innerText = "Your password for this current site is: " + passwd[1];
                document.getElementById("refresh").innerHTML = `<button id="ref"> refresh </button>`
                document.getElementById("refresh").addEventListener("click", function() {
                    document.location.reload();
                });
                return;
            }
        }
        document.getElementById('generate').innerHTML = createPass;
    }
}

function algorithm() {
    var passWord = "";
    var letterLower = "abcdefghijklmnopqrstuvwxyz";
    var letterUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var digit = "0123456789";
    var specialChar = "!:;,(-_)=}]@^\|[{#²";

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
            let value = Math.floor(Math.random() * 18);
            passWord += specialChar[value];
        }
    }
    console.log(passWord);
    return passWord;
}

function showGeneratedPassword()
{
    var password = algorithm();
    
    document.getElementById('password').innerText = password;
    var keep = document.getElementById('keep');
    if (keep != null) {
        keep.innerHTML = `<button id="keepThisOne"> Save for this site </button>`;
    }
    keep.addEventListener('click', function() {
        var list = JSON.parse(localStorage.getItem("stockedData"));
        if (list == null)
            list = [];
        var currentURL = localStorage.getItem("currentURL");
        list.push(JSON.stringify(currentURL + "§" + document.getElementById("password").innerText));
        localStorage.setItem("stockedData", JSON.stringify(list));
        window.location.reload();
    });
}

function generatePassword() {
    if (document.getElementById('generatedPassword'))
        document.getElementById('generatedPassword').addEventListener('click', showGeneratedPassword);
}

function main() {
    checkIfPasswordExist();
    generatePassword();
}

document.onload = main();