/**
 * Created with JetBrains PhpStorm.
 * User: Администратор
 * Date: 14.08.12
 * Time: 23:47
 * To change this template use File | Settings | File Templates.
 */
var app={
            Models: {},
            Collections: {},
            Routers: {},
            Views: {}

        }
$(document).ready(function(){
    new app.Routers.index();
    Backbone.history.start()
});
