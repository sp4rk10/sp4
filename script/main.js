const rotateBox = document.getElementById('header-button-js');
const header = document.getElementById('headerjs');
const links = document.getElementById('header-links-js');
const htj = document.getElementById('hello-tile-js');

let isExpanded = false;

rotateBox.addEventListener('click', () => {
    if (!isExpanded) {
        header.style.top = '0vh';
        rotateBox.style.transform = 'rotate(180deg)';
    } else {
        header.style.top = '-100vh';
        rotateBox.style.transform = 'rotate(0deg)';
    }
    isExpanded = !isExpanded;
});

htj.addEventListener('mousemove', (e) => {
    const boxRect = htj.getBoundingClientRect();
    const boxCenterX = boxRect.left + boxRect.width / 2;
    const boxCenterY = boxRect.top + boxRect.height / 2;

    const dx = e.clientX - boxCenterX;
    const dy = e.clientY - boxCenterY;
    const maxDistance = Math.sqrt(
        Math.pow(boxRect.width, 2) + 
        Math.pow(boxRect.height, 2)
    );

    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy), maxDistance);
    const pushDepth = 30 * (1 - distance / maxDistance);

    const transformX = pushDepth * Math.cos(angle);
    const transformY = pushDepth * Math.sin(angle);

    htj.style.transform = `translate(-50%, -50%) translate3d(${transformX}px, ${transformY}px, ${pushDepth}px)`;
});

htj.addEventListener('mouseleave', () => {
    htj.style.transform = 'translate(-50%, -50%) translate3d(0, 0, 0)';
});

var unit = 100,
    canvasList,
    info = {},
    colorList;

function init() {
    info.seconds = 0;
    info.t = 0;
		canvasList = [];
    colorList = [];
    canvasList.push(document.getElementById("waveCanvas"));
    colorList.push(['#666', '#ffffff']);
for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        canvas.width = document.documentElement.clientWidth;
        canvas.height = 150;
        canvas.contextCache = canvas.getContext("2d");
    }
		update();
}

function update() {
		for(var canvasIndex in canvasList) {
        var canvas = canvasList[canvasIndex];
        draw(canvas, colorList[canvasIndex]);
    }
    info.seconds = info.seconds + .014;
    info.t = info.seconds*Math.PI;
    setTimeout(update, 35);
}

function draw(canvas, color) {
    var context = canvas.contextCache;
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawWave(canvas, color[0], 0.5, 5, 0);
    drawWave(canvas, color[1], 0.4, 4, 250);
}

function drawWave(canvas, color, alpha, zoom, delay) {
		var context = canvas.contextCache;
    context.fillStyle = color;
    context.globalAlpha = alpha;
    context.beginPath();
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width + 10, canvas.height);
    context.lineTo(0, canvas.height);
    context.closePath()
    context.fill();
}

function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height/2);
    var yAxis = 0;
    var context = canvas.contextCache;
    var x = t;
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis);

    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y+xAxis);
    }
}

init();

function showModal(id, content) {
    document.getElementById(`overlay${id}`).style.display = 'flex';
    document.getElementById(`modalContent${id}`).innerText = content;
}

function hideModal(id) {
    document.getElementById(`overlay${id}`).style.display = 'none';
}