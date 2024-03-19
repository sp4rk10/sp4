var userAgent = navigator.userAgent;
var deviceType = "Other";

if (userAgent.match(/Mac/i)) {
    deviceType = "Mac";
} else if (userAgent.match(/iPhone/i)) {
    deviceType = "iPhone";
} else if (userAgent.match(/Windows/i)) {
    deviceType = "Windows";
}

var deviceInfo = document.getElementById('nftos-text');
deviceInfo.textContent = "Loading Completed Device>" + deviceType;

var scrollingElement = document.getElementById("nftos-motion");
var learnsJsElement = document.getElementById('learns-js');
var originalText = deviceInfo.textContent;

function setScrollingElementStyles(rightValue, transformValue) {
    scrollingElement.style.right = rightValue;
    scrollingElement.style.transform = transformValue;
}

setScrollingElementStyles("-205px");

learnsJsElement.addEventListener('mouseover', function() {
    deviceInfo.textContent = "Tasksに移動";
    setScrollingElementStyles("0");
});

learnsJsElement.addEventListener('mouseout', function() {
    setTimeout(function() {
        deviceInfo.textContent = "Tasksに移動";
        setScrollingElementStyles("-205px");
    }, 800);
});

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var scrollingElement = document.getElementById("nftos-motion");
        scrollingElement.style.right = "0";
    }, 300);
});
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var scrollingElement = document.getElementById("nftos-motion");
        scrollingElement.style.right = "-205px";
    }, 3000);
});