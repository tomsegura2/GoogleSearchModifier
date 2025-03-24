chrome.action.onClicked.addListener((tab) => {
    if (tab.url && tab.url.includes("www.google.com/search")) {
        console.log("Google search page detected:", tab.url);
        let url = new URL(tab.url);

        if (!url.searchParams.has("num") || url.searchParams.get("num") !== "100") {
            url.searchParams.set("num", "100");
            chrome.tabs.update(tab.id, { url: url.href });
            console.log("Updated URL to include &num=100:", url.href);
        } else {
            console.log("URL already includes &num=100.");
        }
    } else {
        console.log("Not a Google search tab. Current URL:", tab.url);
    }
});
