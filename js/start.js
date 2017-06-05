var app = app || {}

app.appModel = new Application();
app.littlenavi = new LittleNavi({model: app.appModel});
$('#naviapp').append(app.littlenavi.render().el);
