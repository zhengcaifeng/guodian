/**
 * Created by liangqingzhu on 2017/8/1.
 */
/*define(['jquery','laypage'], function ($,laypage) {*/
 ;(function($){
    var _laypage={
        paging:{
            ele: 'page_default', //容器。值支持id名、原生dom对象，jquery对象,
            pages: 10, //总页数
            skip: true, //是否开启跳页
            skin: 'gd',
            multiterm:false,//是否开启选择每页多少条
            prev: '<i class="glyphicon-pre"></i>', //若不显示，设置false即可
            next: '<i class="glyphicon-next"></i>', //若不显示，设置false即可
            first: false,
            last: false,
            groups: 7 //连续显示分页数
        }
    }

    $.initpage = function (options) {
        var settings = $.extend(true,_laypage.paging,options || {});
        laypage(settings);
    };

//return _laypage;
    })(jQuery);
/*});*/
