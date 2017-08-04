/**
 * Created by liangqingzhu on 2017/7/31.
 */
require(['jquery'], function ($) {



    $(".leftmenu  .memu-item-title").click(function(){
        var ulObject=$(this).siblings("ul");
        ulObject.slideToggle();
        //ulObject.toggle();
        var thatPart= $(this).parent();
        if(thatPart.hasClass("tive")){
            thatPart.removeClass("tive");
        }else{
            thatPart.addClass("tive");
            /*判断是单菜单展开还是多菜单展开*/
            if($(this).parents(".leftmenu").attr("data-shrink")=="single"){
            thatPart.siblings().removeClass("tive");
                thatPart.siblings().find("ul").slideUp();
           // thatPart.siblings().find("ul").hide();
            }
        }


    });


});