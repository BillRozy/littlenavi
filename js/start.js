var app = app || {}

app.appModel = new Application();
app.littlenavi = new LittleNavi({model: app.appModel});
app.router = new NaviRouter();
app.mapModel = new MapLayer();
app.map = new MapView({model: app.mapModel});
if(!$.contains($('#naviapp'), app.littlenavi.el)){
  app.littlenavi.render().$el.hide();
  $('#naviapp').append(app.littlenavi.render().$el);
}
Backbone.history.start();
// $('#naviapp').append(app.littlenavi.render().el);
