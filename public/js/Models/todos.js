

  // Todo Model
  // ----------

  // Our basic **Todo** model has `title`, `order`, and `done` attributes.
  var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        message: '',
        user_id: "",
        name: ""
      };
    }

    // Ensure that each todo created has `title`.



  });

