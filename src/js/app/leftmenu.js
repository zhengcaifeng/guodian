require(['jquery'], function ($) {

    $(".leftmenu  .memu-item-title").click(function(){
        //��ȡ���˵�������Ӳ˵�ul
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