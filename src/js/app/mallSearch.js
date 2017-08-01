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
        if(!_this.hasClass("multi-select")){
            if(_this.hasClass("title-more")){
                _this.removeClass("title-more");
            }else{
                _this.addClass("title-more");
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
        $(document).on("click",".title-right-cent span",function(event){
            if($(this).find(":first").is("input")){
                /*if($(this).find(":first").is(":check")){
                 $(this).find(":first")
                 }*/
            }else{
                var dom = $(".mail-marbot").find(".title-cont-right"),
                    text = $(this).text(),
                    typeName = $(this).parent().prev().find("p").text();
                if(dom.text().indexOf(text)==-1){
                    var html = '<p class="title-block-marrig type-block">\
							<span class="title-block">'+typeName+'<span class="color-red">'+text+'</span>\
								<img src="../../slice/icon-close.png" class="icon-size title-block-img"/>\
							</p>';
                    dom.append(html);
                }
            }
        })
    }
    spanBind();
    var spanUnBind = function(Dom){
        Dom.unbind();
    }
    //more
    //
    $(document).on("click",".title-btn-nomargin",function(){
        var _this = $(this);
        var allSpan = $(this).parent().prev().find("span");
        var _thisFather = _this.parent().parent();
        var titleCen = _this.parent().prev();
        var titleLeft = $(this).parent().prev().prev().find("p");
        var len  = _this.parent().prev().find(".mall-checekbox").length;
        if(len){

        }else{
            $(".mall-checekbox").remove();
            $(".multi-color").removeClass("multi-color");
            $(".multi-select").addClass("title-more");
            $(".multi-select").removeClass("multi-select");
            $(".mail-buttom").remove();
            _this.parent().parent().removeClass("title-more");
            _thisFather.addClass("multi-select");
            titleLeft.addClass("multi-color");
            spanUnBind(allSpan);
            moreOn = true;
            for(var i=0;i<allSpan.length;i++){
                var inputHtml = '<input type="checkbox" class="mall-checekbox"/>';
                $(allSpan[i]).prepend(inputHtml);
            }
            var btnHtml = '<div class="fix mb10 mt5 w160 mau mall-checekbox">\
							<p class="mail-btn-ok">确定</p>\
							<p class="mail-btn-no">取消</p></div>' ;
            titleCen.append(btnHtml);
        }
    })
    //more 取消按钮
    $(document).on("click",".mail-btn-no",function(){
        var _this = $(this);
        var _thisFather = $(this).parent().parent().parent();
        _this.parent().parent().prev().find("p").removeClass("multi-color");
        _thisFather.removeClass("multi-select");
        _thisFather.addClass("title-more");
        _this.parent().parent().find(".mall-checekbox").remove();
    })
    //checkbox change
    $(document).on("change input",".mall-checekbox",function(){
        var btnOk;
        if($(this).parent().parent().find(".mall-checekbox").is(":checked")){
            $(this).parent().parent().find(".mail-btn-ok").addClass("btn-oktrue");
        }else{
            $(this).parent().parent().find(".mail-btn-ok").removeClass("btn-oktrue");
        }
    })
    //more 确认按钮
    $(document).on("click",".mail-btn-no",function(){

    })
});