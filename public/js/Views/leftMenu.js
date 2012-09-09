/**
 * Created with JetBrains PhpStorm.
 * User: Администратор
 * Date: 14.08.12
 * Time: 23:43
 * To change this template use File | Settings | File Templates.
 */
app.Views.leftMenu=Backbone.View.extend({

        initialize: function(options){
            this.parentApp=options.parentApp;
            this.parentApp.on('navigate',this.current,this);
        },
        events: {
        },
        current: function(){
            this.$('.current').removeClass('current')
            this.$("[href='#"+this.parentApp.visibleSection+"']").addClass('current')
        },
        render :function(){

        }

});