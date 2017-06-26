var physics = (function(){

    var camera = -1;
    var scale = 1;

    var colors = ['#ff0000', '#00ff00', '#0000ff', '#FFFF00'];
    function getColor(index) {
        return colors[index % 4];
    }
    // x = x0 + v*t + 0.5 * a * t^2;
    // g = G (m1+m2)/r^2;
    //
    // v = v0 + a * t
    //
    //
    //
    // r = sqrt( (x2-x1)^2 + (y2-y1)^2 )

    var G = 1;

    function Planet(m, x, y, v) {
        this.x = x;
        this.y = y;
        this.m = m;
        this.v = v;
    }

    Planet.prototype.applyAcceleration = function(a) {
        this.v.x = this.v.x + a.x;
        this.v.y = this.v.y + a.y;
    };

    Planet.prototype.getNewCoordinates = function() {
        this.x = this.x + this.v.x;
        this.y = this.y + this.v.y;
    };

    Planet.prototype.draw = function(ctx, cx, cy, index) {
        ctx.beginPath();
        // ctx.arc(this.x,this.y,Math.max(3, Math.sqrt(this.m/(100 * scale))), 0, 2*Math.PI);
        ctx.arc(this.x,this.y, 5, 0, 2*Math.PI);
        ctx.fillStyle = getColor(index);
        ctx.fill();
        // ctx.stroke();
        ctx.closePath();
        // ctx.beginPath();
        // ctx.moveTo(cx, cy);
        // ctx.lineTo(this.x, this.y);
        // ctx.stroke();
        // ctx.closePath();
    };

    function getCombinedAcceleration(planet, planets) {
        var a = {x: 0, y: 0}, index;
        for(index = 0; index < planets.length; index++) {
            var ax = planets[index].x - planet.x, ay = planets[index].y - planet.y;
            var r = Math.sqrt( ax * ax + ay * ay );
            var g = 0;
            if (r > 0e-5) {
                g = G * (planet.m + planets[index].m) / (r*r*scale*scale)
            }

            a.x += ax*g / planet.m;
            a.y += ay*g / planet.m;
        }
        return a;
    }



    function tick(ctx, planets) {
        var a = [], index;
        for(index = 0; index < planets.length; index++) {
            a.push(getCombinedAcceleration(planets[index], planets));
        }
        // ctx.clearRect(0,0,540,540);
        // ctx.beginPath();
        for(index = 0; index < planets.length; index++) {
            planets[index].applyAcceleration(a[index]);
            planets[index].getNewCoordinates();
        }
        if (camera < 0 || camera > planets.length - 1) {
            camera = planets.length - 1;
        }
        var dx = 270 - planets[camera].x;
        var dy = 270 - planets[camera].y;
        for(index = 0; index < planets.length; index++) {
            planets[index].x += dx;
            planets[index].y += dy;
            planets[index].draw(ctx, planets[camera].x, planets[camera].y, index);
            // writeLabels(planets[index], index);
        }


        // ctx.stroke();
        // ctx.closePath();
    }

    function v(V) {
        return Math.sqrt(V.x*V.x + V.y*V.y);
    }

    var names = ['red', 'green', 'blue'];
    var labels = [];
    function writeLabels(planet, index) {
        var velocity = v(planet.v);
        var radius   = v({x: planet.x - 270, y: planet.y - 270});
        if (!labels[index] && names[index]) {
            labels[index] = document.getElementById(names[index]);
        }
        if (labels[index]) {
            labels[index].innerHTML = names[index] + ' radius: <span>' + radius + '</span>; velocity: <span>' + velocity + '</span>';
        }
    }

    return {
        Planet: Planet,
        tick: tick,
        setCamera: function(index, ctx) {
            if (!ctx) {
                var canvas = document.getElementById('canvas');
                ctx = canvas.getContext('2d');
            }
            ctx.clearRect(0,0,540,540);
            camera = index;
        }
    }

})();