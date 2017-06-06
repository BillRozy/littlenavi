var app = app || {}

var NaviRouter = Backbone.Router.extend({
    /* define the route and function maps for this router */
    routes: {

        "buildroute" : "showStartRouting",

        "route/:id" : "showRoute",

        "": 'showStarterPage'

    },

    initialize: function(){
      this.route('#');
    },

    showStarterPage: function(){
      app.littlenavi.$el.fadeOut(500, () => {
        app.littlenavi.model.set({state: 'init', message: 'Hello'});
        app.littlenavi.render();
        app.littlenavi.$el.fadeIn(500);
      });
    },

    showStartRouting: function(){
      app.littlenavi.$el.fadeOut(500, () => {
        app.littlenavi.model.set({state: 'ride', message: 'Choose your route now'});
        app.littlenavi.render();
        app.littlenavi.$el.fadeIn(500, () => {
          app.map.trigger('map:appear');
        });
      });
    },

    showRoute: function(id){
        /*
        Note that the id matched in the above route will be passed to this function
        */
        console.log("You are trying to reach todo " + id);
    }
});
