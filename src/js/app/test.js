require(['jquery'], function ($) {

    $(".leftmenu  .memu-item-title").click(function(){
        //获取主菜单下面的子菜单ul
        var ulObject=$(this).siblings("ul");
        ulObject.slideToggle();
        var thatPart= $(this).parent();
        if(thatPart.hasClass("tive")){
            thatPart.removeClass("tive");
        }else{
            thatPart.addClass("tive");
        }
    });


});