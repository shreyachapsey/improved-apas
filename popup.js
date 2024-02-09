console.log("popup loaded");


var user_data;
chrome.storage.local.get({'total_credits': 0}, function(data) {
    console.log(`storage's value is ${data.total_credits}.`);
    document.getElementById("total_credits").innerHTML = data.total_credits;
});

