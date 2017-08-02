/**
 * Created by luyouwei on 2017/7/31
 * 商城搜索筛选栏
 */
require(['jquery'], function ($) {
    var show = true;
    $("#dropDown").on("click",function(){
        var _this = $(this);
        if(show){
            _this.find("span").text("收起");
            _this.find("img").attr("src","../../slice/icon-arrows-up.png");
            $(".hide").addClass("show");
            $(".hide").removeClass("hide");
            show=false;
        }else{
            _this.find("span").text("展开");
            _this.find("img").attr("src","../../slice/icon-arrows-down.png");
            $(".show").addClass("hide");
            $(".show").removeClass("show");
            show=true;
        }
    })
    //点击更多 展示当前行全部
    $(document).on("click",".addMore",function(){
        var _this  = $(this).parent().parent();
        if(_this.parent().hasClass("mc")){

        }else{
            if(_this.hasClass("no-see")){
                _this.removeClass("no-see");
            }else{
                _this.addClass("no-see");
            }
        }
    })
    //头部选项取消
    $(document).on("click",".title-block-img",function(){
        $(this).parent().remove();
    })
    //
    // span bind
    var spanBind = function(){
        $(document).on("click",".title-cent span",function(event){
            if($(this).text()=="更多" || $(this).text()=="多选"){

            }else if($(this).parent().parent().hasClass("mc")){
               /* if($(this).find("input").is(":checked")){
                    $(this).find("input").attr("checked","false");
                }else{
                    $(this).find("input").attr("checked","true");
                }*/
            }
            else{
                    var dom = $(".title-label-show"),
                    text = $(this).text(),
                    typeName = $(this).parent().prev().find("p").text();
                if(dom.text().indexOf(text)==-1){
                    var html = ' <p class="title-block">'+typeName+'<span class="color-red">'+text+'</span>\
								<img src="../../slice/icon-close.png" class="title-block-img"/></p>';
                    dom.append(html);
                }
            }
        })
    }
    spanBind();
    //more
    //
    $(document).on("click",".multiSelect",function(){
        var _this = $(this);
        var _thisFather = _this.parent().parent().parent();
        var len  = _this.parent().parent().find("input");
        if(!len.is(".dn")){

        }else{
            if($(".mc").length){
                $(".title-cent").addClass("no-see");
                $(".mc").removeClass("mc");
                $(".title-check").addClass("dn");
                $(".cen-btn").find("p").addClass("dn");
            }
            _this.parent().parent().removeClass("no-see");
            $(".multi-select").removeClass("multi-select");
            _this.parent().parent().find(".dn").removeClass("dn");
            _thisFather.addClass("mc");
        }
    })
    //more 取消按钮
    $(document).on("click",".mail-btn-no",function(){
        $(".title-cent").addClass("no-see");
        $(".mc").removeClass("mc");
        $(".title-check").addClass("dn");
        $(".cen-btn").find("p").addClass("dn");
    })
    //checkbox change
    $(document).on("change input",".title-check",function(){
        var btnOk;
        if($(this).parent().parent().find(".title-check").is(":checked")){
            $(this).parent().parent().find(".mail-btn-ok").addClass("btn-oktrue");
        }else{
            $(this).parent().parent().find(".mail-btn-ok").removeClass("btn-oktrue");
        }
    })
    //more 确认按钮
    $(document).on("click",".mail-btn-no",function(){

    })
/*    ezj.ready(function(){
        $("<label").labelFor();
    });*/
});