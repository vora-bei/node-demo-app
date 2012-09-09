app.Views.mainApp=Backbone.View.extend({
    templates: '',
    itemCollection :{
        selector : '.section',
        attrs : ['id','name']
    },
    apps: {},

    visibleSection: '',//Открытая Section

    collectionClass : app.Collections.section,

    initialize: function(options){
        this.apps=options.apps;
        this.initCollection()
        this.preRender();
    },

    //инициализация коллекции
    initCollection: function(){

        var collection=this.collection=new this.collectionClass();

        //определение параметров необходимых для построения по html элементам, элементов коллекции
        //определение аттрибутов элементов коллекции (id,name)
        var itemColl =this.itemCollection;
        var selector=itemColl.selector?itemColl.selector:'div';
        var attrs=itemColl.attrs?itemColl.attrs:['id'];

        //добавление в коллекцию элементов c атрибутами определенными в attrs
        var item;
        this.$(selector).each(function(i){
             item={}
            _.each(attrs,function(val){
                 item[val]=this.attr(val);
            },$(this))
            collection.add(item)
        })
    },


    preRender :function(){
        this.initList(this.elem);
        this.appsRender();
    },
    appsRender :function(){
        _.each(this.apps,function(val,name){
            var parentApp=this;
            this.$(val.elements).each(function(i){
                if(_.isUndefined(parentApp['apps_'+name]))
                    parentApp['apps_'+name]=[];
                parentApp['apps_'+name][i]=new val.app(_.extend(val.options,{parentApp:parentApp,el:this}));
            })
        },this)
    },

    initList: function(item){
        var coll = this.collection;
        if(!_.isEmpty(coll)&&!_.isEmpty(coll.models))
            coll.each(function(num,i){
                var view = new item({model: num, el :$('#'+num.id).get(0)});
            },this);
    },

    toggle: function (current,next){
        var coll=this.collection;
        if(!_.isEmpty(current)){
            coll.get(current).trigger('close');
        }
           coll.get(next).trigger('open');
    },

    render: function(section){
       this.toggle(this.visibleSection,section)
       this.visibleSection=section;
       this.trigger('navigate')
    },
    elem : app.Views.sectionApp
});