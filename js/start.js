var app = app || {}

app.appModel = new Application();
app.littlenavi = new LittleNavi({model: app.appModel});
app.router = new NaviRouter();
app.mapModel = new MapLayer();
app.map = new MapView({model: app.mapModel});
app.Recents = new Recents();
app.Recents.fetch();
app.RecentsView  = new RecentsView({collection: app.Recents});
if(!$.contains($('#content'), app.littlenavi.el)){
  app.littlenavi.render().$el.hide();
  $('#content').append(app.littlenavi.render().$el);
}
Backbone.history.start();
// $('#naviapp').append(app.littlenavi.render().el);
