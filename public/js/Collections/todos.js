// An example Backbone application contributed by
// [Jérôme Gravel-Niquet](http://jgn.me/). This demo uses a simple
// [LocalStorage adapter](backbone-localstorage.html)
// to persist Backbone models within your browser.

// Load the application once the DOM is ready, using `jQuery.ready`:


  // Todo Collection
  // ---------------

  // The collection of todos is backed by *localStorage* instead of a remote
  // server.

var Chats = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo,
    initialize: function(models,options) {

    }

});

var TodoList = Backbone.Collection.extend({

    // Reference to this collection's model.
    model: Todo,
      initialize: function(models,options) {
          this.fetch();
          this.chats=options.chats;
      },
      success: function(){
          this.Chats.reset(_.union(this.Chats.models,this.models));
          this.models=[];
          this.fetch();
      },
      error: function(){
          this.fetch();
      }

  });
