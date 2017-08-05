/**
 * Created by liangqingzhu on 2017/7/31.
 */
;(function($){
    var fn={};
    var leftmenu={
        menu_data:{
            ele:"helpcenter_leftmenu",
            datashrink:"single",//data-shrink="all"为多类目展开模式data-shrink="single"为单一类目展开模式
            menuname:"帮助中心",
            data:[]
        }
    }
    $.leftMenuInit = function (options) {
        var setdata = $.extend(true,leftmenu.menu_data,options || []);
        fn.applymenu(setdata);
    };

    fn.applymenu=function(menudata){
        var menuhtml='';
        if(menudata.menuname){
            menuhtml+='<h2 class="leftmemu_title"><i class="glyphicon glyphicon-menu-left"></i>'+menudata.menuname+'</h2>';
        }
        menuhtml+='<ul>';
        var fn={};
        menudata.data.forEach(function(item,index){
            menuhtml+='<li class="memu-item"><a class="memu-item-title" href="javascript:;">'+item.name+'<i class="glyphicon glyphicon-add-left"></i></a>'+IsChild(item.submenu||"")
                + '</li>';
        })
        menuhtml+='</ul>';
        $("."+menudata.ele).html(menuhtml);
        $("."+menudata.ele).attr("data-shrink",menudata.datashrink);
    }

    function IsChild(childdata){
        if(childdata!=""){
            var ChildHtml='<ul class="list-group" style="display: none;">';
            childdata.forEach(function(item,index){
                ChildHtml+='<li class="list-group-item"><a href="javascript:;" class="list-group-item-title">'+item.name+'</a><i class="glyphicon glyphicon-arrows-right dn"></i></li>';
            })
            ChildHtml+='</ul>';
            return ChildHtml;
        }
    }


    $(document).on("click",".leftmenu  .memu-item-title",function(){
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
})(jQuery);