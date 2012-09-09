app.Views.sectionApp=Backbone.View.extend({

        initialize: function(options){
            this.render();
            this.model.on('open',this.open,this);
            this.model.on('close',this.close,this);
        },
        open : function(){
            this.$el.show('slow');
        },
        close : function(){
            this.$el.hide('slow');
        },
        render :function(){
            this.$el.hide();
        }

});