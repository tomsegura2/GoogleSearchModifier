document.getElementById("modify-button").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let tab = tabs[0];
        if (tab.url && tab.url.includes("www.google.com/search")) {
            let url = new URL(tab.url);

            // Modify the URL
            if (!url.searchParams.has("num") || url.searchParams.get("num") !== "100") {
                url.searchParams.set("num", "100");
                chrome.tabs.update(tab.id, { url: url.href });
            } else {
                alert("This Google search page already shows 100 results.");
            }
        } else {
            alert("This is not a Google search results page.");
        }
    });
});
