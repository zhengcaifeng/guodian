/**
 * Created by YLN on 2017/7/31.
 */
require(['jquery','layer','./app/util','./app/gdLayer'], function ($,layer,util) {
   /* layer.config({
        path: '/js/layer/'
    });*/
    var fn = {};

    $(document).on('click', '.baseLayer', function(e) {
        e.preventDefault();
        var _this = $(this),
            type = _this.data("fn-type");
        var lwidth = "";
        var lheight = "";
        var text = "";
        var littleMsg = "";
        if(type == "base" || type == "twoLayer"){
            lwidth = "522px";
            lheight = "290px";
        }
        if(type == "warn"){
            text = "这是进行一项操作时必须了解的重要信息";
            littleMsg = "一些重要的需要用户知道的信息，你还要继续吗？";
            lwidth = "390px";
            lheight = "190px";
        }
        if(type == "success"){
            text = "这是一条成功通知信息";
            littleMsg = "一些附加信息一些附加信息一些附加信息";
            lwidth = "390px";
            lheight = "190px";
        }
        if(type == "error"){
            text = "这是一条错误提示";
            littleMsg = "一些附加信息一些附加信息一些附加信息";
            lwidth = "390px";
            lheight = "190px";
        }
        if(type == "message"){
            text = "这是一条通知信息";
            littleMsg = "一些附加信息一些附加信息一些附加信息";
            lwidth = "390px";
            lheight = "190px";
        }
        if(type == "prompt"){
            text = "这是一个标题";
            littleMsg = "此处是一条通知提醒，衬衫的价格是九磅十五便士，所以你选择B选项。 衬衫的价格是九磅十五便士，所以你选择B选项。";
            lwidth = "390px";
            lheight = "190px";
        }
        $.gdLayer({
            "width":lwidth,
            "height": lheight,
            "type": type,
            "text": text,
            "littleMsg": littleMsg
        }, function(index) {
            layer.msg("正确", {
                time: 2000
            });
            //layer.close(index);
        });
    });
});