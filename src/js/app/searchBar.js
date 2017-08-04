/**
 * Created by luyouwei on 2017/7/31
 * 搜索栏手风琴效果
 */
require(['jquery'], function ($) {
    $("#up_down").on("click",function(){
        var that = $(this);
        var thatF = that.parent().parent();
        if(!that.find("i").is(".down")){
            that.html("展开<i class='down'></i>");
            thatF.find(".ds").addClass("dn");
            thatF.find(".ds").removeClass("ds");
        }else{
            that.html("收起<i class='up'></i>");
            thatF.find(".dn").addClass("ds");
            thatF.find(".dn").removeClass("dn");
        }
    })
});