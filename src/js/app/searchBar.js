/**
 * Created by Administrator on 2017/7/31 0031.
 */
require(['jquery'], function ($) {
    $("#up_down").on("click",function(){
        if($(this).is(".down")){
            $(this).text("收起");
            $(this).removeClass("down");
            $(this).addClass("up");
            $(this).parent().parent().find(".dn").show();
        }else{
            $(this).text("展开");
            $(this).removeClass("up");
            $(this).addClass("down");
            $(this).parent().parent().find(".dn").hide();
        }
    })
});