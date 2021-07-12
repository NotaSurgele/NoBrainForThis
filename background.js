const url = chrome.runtime.getURL('path/to/file');

fetch(url)
    .then((response) => {response.json()}) //assuming file contains json
    .then((json) => doSomething(json)); 