
function initTemplateEngine(app) {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'twig');
    app.set("twig options", {
        strict_variables: false
    });
}

function initRoutes(app) {
    app.get("/", function(req, res){
        res.render("index");
    });

    app.get('*', function(req, res){
        console.log('404ing');
        res.status(404);
        res.render('404');
    });
}

module.exports = {
    init: function(app, port, callback) {
        initTemplateEngine(app);
        initRoutes(app);
        app.listen(port, function(){
            console.log("Application is started at port [" + port + "]");
            if (typeof callback === 'function') {
                callback();
            }
        });
    },
    say: function() {
        console.log("bootstrap");
    }
};
