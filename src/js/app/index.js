/**
 * Created by ZZH on 2017/7/15.
 */
require(['jquery','artTemplate','./app/util'], function ($,template,util) {
    util.test();
    console.log(util.url);
    $.get('_page/index.html',function(data){
        var render = template.compile(data);
        $("#page").html(render(data));
    });
});