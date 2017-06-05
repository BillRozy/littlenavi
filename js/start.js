var app = app || {}

app.appModel = new Application();
app.littlenavi = new LittleNavi({model: app.appModel});
app.router = new NaviRouter();
app.currentRoute = new RouteView({model: new RouteModel()});
Backbone.history.start();
// $('#naviapp').append(app.littlenavi.render().el);
