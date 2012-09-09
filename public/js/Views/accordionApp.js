/**
 * Created with JetBrains PhpStorm.
 * User: Администратор
 * Date: 14.08.12
 * Time: 23:43
 * To change this template use File | Settings | File Templates.
 */
app.Views.accordionApp=Backbone.View.extend({
        head: 'h3',
        body:'div',
        sections: '',
        openBody : 0,
        initialize: function(options){
            this.parentApp=options.parentApp;
            this.openBody= !_.isEmpty(options.openBody)?options.openBody:this.openBody;
            this.head=options.head?options.head:this.head;
            this.body=options.body?options.body:this.body;
            this.preRender()
        },
        events:{
            'click .js-toggle': "accordionToggle"
        },
        accordionToggle: function(){
            if(this.isAllOpen()){
                this.sections.hide();
            }else{
                this.sections.show();
            }
        },
        preRender :function(){
            this.events['click '+this.head]='toggle';
            this.delegateEvents();
            this.sections=this.$el
                    .children(this.body)
                        .hide()//скрыть все section
            this.openByIndex(this.openBody)
        },
        openByIndex: function(index){
            var section=this.sections.eq(index);
                section?section.show():'';
        },
        isAllOpen:  function(){
            return (this.sections.filter(':visible').length==this.sections.length)
        },
        toggle :function(events){
            var elem=this.$(events.currentTarget);
            elem.next().slideToggle('slow',function(){})

            return false;

        }


});