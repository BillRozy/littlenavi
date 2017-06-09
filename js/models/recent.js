var app = app || {};

app.Recent = Backbone.Model.extend({

  localStorage: new Backbone.LocalStorage('recent')

});
