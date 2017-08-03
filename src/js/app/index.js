/**
 * Created by ZZH on 2017/7/15.
 */
require(['jquery','artTemplate','util'], function ($,template,util) {
    $(function(){
        page.init();
        $(document).on('click','.btn-page',function () {

        });
    });
    var page = (function (module) {
        var fn = {};
        var pageData = {
            username:'tom',
            sex:'male',
            age:'33'
        };
        module.init = function(){
            util.log('页面初始化');
            util.setCache('i','123');
            fn.initTpl(pageData);
        };
        fn.initTpl = function (data) {
            $.publish('dataRender',data);
        };
        var renderHtml = (function(){
            $.subscribe('dataRender',function(e,data){
                $.ajax({url:'component/title.html'}).done(function(dom){
                    util.log(util.getCache('i'));
                    util.renderTpl('#header',dom,data);
                });
                $.ajax({url:'_page/index.html'}).done(function(dom){
                    util.renderTpl('#content',dom,data);
                });
            });
        })();
        return module;
    })(page||{});
});