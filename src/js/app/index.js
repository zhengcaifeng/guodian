/**
 * Created by ZZH on 2017/7/15.
 */
require(['jquery','artTemplate','util'], function ($,template,util) {
    $.get('_page/index.html',function(data){
        var render = template.compile(data);
        $("#page").html(render(data));
    });
    $.getTpl('_page/index');
});