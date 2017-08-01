/**
 * Created by ZZH on 2017/7/15.
 */
require(['jquery','artTemplate','util'], function ($,template,util) {
    // $.get('_page/index.html',function(data){
    //     var render = template.compile(data);
    //     $("#page").html(render(data));
    // });
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
            $.log('页面初始化');
            fn.initTpl(pageData);
        };
        fn.initTpl = function (data) {
            $.publish('dataRender',data);
        };
        // var header = (function(){
        //     $.subscribe('dataRender',function(e,data){
        //         $.ajax({url:'component/title.html'}).then(function(dom){
        //             $.renderTpl('#header',dom,data);
        //         });
        //     });
        // })();
        $.when($.ajax({url:'component/title.html'}),$.ajax({url:'_page/index.html'})).done(function(d1,d2){
                console.log(d1);
                console.log(d2);
        });

        var dtd = $.Deferred(); // 新建一个deferred对象
        var wait = function(dtd){
            var tasks = function(){
                alert("执行完毕！");
                dtd.resolve(); // 改变deferred对象的执行状态
            };
            setTimeout(tasks,5000);
            return dtd;
        };
        wait(dtd);
        return module;
    })(page||{});
});