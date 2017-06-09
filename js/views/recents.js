var app = app || {};


var RecentsView = Backbone.View.extend({

  className: 'recents-view',

  template: _.template( $('#recents-view-template').html() ),

  // The DOM events specific to an item.
  events: {
  },

  initialize: function() {
     this.listenTo(this.collection, 'change', this.render);
  },


  render: function() {
    this.$el.html(this.template( this.model.attributes ));
    return this;
  }
});


var RecentView = Backbone.View.extend({

  className: 'recent-view',

  template: _.template( $('#recent-view-template').html() ),

  // The DOM events specific to an item.
  events: {
  },

  initialize: function() {
     this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template( this.model.attributes ));
    return this;
  }
});
