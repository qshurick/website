var Xc = 200, Yc = 200;

document.addEventListener('DOMContentLoaded', function () {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var stuff = [
        {x: 100, y: 100},
        {x: 100, y: 300},
        {x: 200, y: 200}
    ];

    animation(canvas, ctx, stuff);

    canvas.addEventListener('click', function(event){
        Xc = event.layerX;
        Yc = event.layerY;
    });

});

function animation(canvas, ctx, data) {

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        data = rotatePolygon(data, Math.PI / 200, Xc, Yc);
        polygon(ctx, data);
        requestAnimationFrame(draw);
    }

    draw();

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