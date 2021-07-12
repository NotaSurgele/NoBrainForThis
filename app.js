window.onload = chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      current = tabs[0].url;
      console.log(current);
   }
);