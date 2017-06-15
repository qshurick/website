var fs = require('fs');
var express = require('express');

function initTemplateEngine(app) {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'twig');
    app.set("twig options", {
        strict_variables: false
    });
}

function initRoutes(app) {
    app.get("/", function(req, res){
        res.render("main");
    });

    app.get("/tools/image-optimiser", function(req, res){
        res.render("index");
    });

    app.get("/static", express.static(__dirname + "/../public/"));

    app.get('*', function(req, res){
        console.log('404ing');
        res.status(404);
        res.render('404');
    });
}

function initSymlinks(done) {
    var base = __dirname + "/../";
    var flexPublic = base + "public/flex-layout-attribute.css";
    var flex = base + "node_modules/flex-layout-attribute/css/flex-layout-attribute.css";

    fs.unlink(flexPublic, function() {
        fs.symlink(flex, flexPublic, done);
    });
}

module.exports = {
    init: function(app, port, callback) {
        initTemplateEngine(app);
        initRoutes(app);
        // initSymlinks(function(){
            app.listen(port, function(){
                console.log("Application is started at port [" + port + "]");
                if (typeof callback === 'function') {
                    callback();
                }
            });
        // });
    },
    say: function() {
        console.log("bootstrap");
    }
};
