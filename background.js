chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ 'onOrOff': false }, result => {
        console.log("On Installed Set value to off")
    })
})

var isExtensionOn = false;

chrome.storage.onChanged.addListener(function (changes, area) {
    if (area === 'local' && changes.onOrOff) {
        console.log(changes.onOrOff.newValue)
        // extension is on
        if (changes.onOrOff.newValue) {
           isExtensionOn = true;
        }
        // extension is off
        else {
            console.log("Extension Is Off")
            isExtensionOn = false;

        }

    }
})