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
        if(type == "base"){
            lwidth = "522px";
            lheight = "290px";
        }
        if(type == "warn" || type == "success" || type == "error" || type == "message" || type == "prompt"){
            lwidth = "390px";
            lheight = "190px";
        }
        $.gdLayer({
            "width":lwidth,
            "height": lheight,
            "type": type,
            "text": "这是要显示的",
            "littleMsg": "你看不到"
        }, function(index) {
            layer.msg("正确", {
                time: 2000
            });
            layer.close(index);
        });
    });
});