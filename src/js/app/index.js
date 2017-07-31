/**
 * Created by ZZH on 2017/7/15.
 */
require(['jquery','artTemplate','util','layer'], function ($,template,util,layer) {
    layer.alert('见到你真的很高兴', {icon: 2});
    $.get('_page/index.html',function(data){
        var render = template.compile(data);
        $("#page").html(render(data));
    });
    $.getTpl('_page/index');
});