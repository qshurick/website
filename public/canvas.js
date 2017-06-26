var Xc = 200, Yc = 200, timer, P;

document.addEventListener('DOMContentLoaded', function () {

    /*var planets = [];
    for (var index = 0; index < 100; index++ ){
        planets.push(
            new physics.Planet(1 + Math.random() * 50, 100 + Math.random() * 300, 100 + Math.random() * 300, {
                x: Math.random() * 10 - 5,
                y: Math.random() * 10 - 5
            })
        )
    }*/

    // planets.push()

    var planets = [
        new physics.Planet(5, 270, 50, {x:10,y:0}),
        new physics.Planet(6, 270, 100, {x:9,y:0}),
        new physics.Planet(7, 270, 220, {x:10,y:0}),
        new physics.Planet(500, 270, 270, {x:0,y:0})
    ];

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    function loop() {
        requestAnimationFrame(loop);
        physics.tick(ctx, planets);
    }
    loop();

    // init();
});

function init() {
    if (timer) {
        window.cancelAnimationFrame(timer);
    }
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var stuff = JSON.parse(document.getElementById('dots').value);

    animation(canvas, ctx, stuff);
    console.log(stuff);

    canvas.addEventListener('click', function(event){
        // Xc = event.layerX;
        // Yc = event.layerY;
        ctx.strokeStyle = getRandomColor();
    });
}

function getRandomColor() {
    var r = Math.round(Math.random() * 255), g = Math.round(Math.random() * 255), b = Math.round(Math.random() * 255);
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    return '#' + (r.length < 2 ? '0' + r : r) + (g.length < 2 ? '0' + g : g) + (b.length < 2 ? '0' + b : b);
}

function animation(canvas, ctx, data) {

    function draw() {
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        data = rotatePolygon(data, Math.PI / 200, Xc, Yc);
        bezier(ctx, data);
        timer = requestAnimationFrame(draw);
    }

    draw();

}

function bezier(ctx, coordinates) {
    ctx.beginPath();
    ctx.moveTo(coordinates[0].x, coordinates[0].y);
    ctx.bezierCurveTo(coordinates[1].x, coordinates[1].y, coordinates[2].x, coordinates[2].y, coordinates[3].x, coordinates[3].y);
    ctx.stroke();
    ctx.closePath();
}

function polygon(ctx, coordinates) {
    ctx.beginPath();
    ctx.moveTo(coordinates[0].x, coordinates[0].y);
    for (var index = 1; index < coordinates.length; index++) {
        ctx.lineTo(coordinates[index].x, coordinates[index].y);
    }
    ctx.lineTo(coordinates[0].x, coordinates[0].y);
    ctx.stroke();
    ctx.closePath();
}

function rotatePolygon(coordinates, angle, xc, yc) {
    var rotated = [];
    for (var index = 0; index < coordinates.length; index++) {
        rotated.push(rotate(coordinates[index].x, coordinates[index].y, angle, xc, yc));
    }
    return rotated;
}

function rotate(x, y, angle, xc, yc) {
    if (undefined === xc) {
        xc = 0;
    }
    if (undefined === yc) {
        yc = 0;
    }
    return {
        x: (x - xc) * Math.cos(angle) - (y - yc) * Math.sin(angle) + xc,
        y: (x - xc) * Math.sin(angle) + (y - yc) * Math.cos(angle) + yc
    }
}