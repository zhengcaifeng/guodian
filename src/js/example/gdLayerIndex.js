/**
 * Created by YLN on 2017/7/31.
 */
require(['jquery', 'layer', 'util', 'dialog'], function ($, layer,util,dialog) {
    /* layer.config({
     path: '/js/layer/'
     });*/
    var fn = {};

    $(document).on('click', '.baseLayer', function (e) {
        e.preventDefault();
        var _this = $(this),
            type = _this.data("fn-type");
        var text = "";
        var littleMsg = "";
        var title = "";
        if (type == "base") {
            title = "标题";
            dialog.modal({
                title: title,
                content: "",
                width: "",
                height: "290"
            }, function (index) {
                layer.msg("正确", {
                    time: 2000
                });
            });
        } else {
            if (type == "warn") {
                text = "这是进行一项操作时必须了解的重要信息";
                littleMsg = "一些重要的需要用户知道的信息，你还要继续吗？";
            }
            if (type == "success") {
                text = "这是一条成功通知信息";
                littleMsg = "一些附加信息一些附加信息一些附加信息";
            }
            if (type == "error") {
                text = "这是一条错误提示";
                littleMsg = "一些附加信息一些附加信息一些附加信息";
            }
            if (type == "message") {
                text = "这是一条通知信息";
                littleMsg = "一些附加信息一些附加信息一些附加信息";
            }
            if (type == "prompt") {
                text = "这是一个标题";
                littleMsg = "此处是一条通知提醒，衬衫的价格是九磅十五便士，所以你选择B选项。 衬衫的价格是九磅十五便士，所以你选择B选项。";
            }
            dialog.alert({
                type: type,
                data: {
                    text: text,
                    littleMsg: littleMsg
                },
                width: "",
                height: "190"
            }, function (index) {
                layer.msg("正确", {
                    time: 2000
                });
            });
        }
    });
});