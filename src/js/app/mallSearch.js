/**
 * Created by luyouwei on 2017/7/31
 * 商城搜索筛选栏
 */
;(function(){
    $(function () {
        //绑定事件机制待定。。。。
        $("#dropDown").on("click",function(){
            mallSearch["option"].show ? fn.stop.call(this) : fn.open.call(this);
        });
        $(document).on("click",".addMore",function(){
            fn.showMore.call(this);
        });
        $(document).on("click",".icon-close",function(){
            fn.titleRemove.call(this);
        });
        $(document).on("click",".title-cent span",function(event){
            fn.clickTag.call(this);
        });
        $(document).on("click",".multiSelect",function(){
            fn.multiSelect.call(this);
        });
        $(document).on("click",".mail-btn-no",function(){
            fn.multiCancel();
        });
        $(document).on("change input",".title-check",function(){
            fn.checkboxInput.call(this);
        });
        $(document).on("click",".mail-btn-no",function(){
            fn.multiTrue();
        })
    });
    var fn = {};
    var mallSearch = {
        option:{
            show:true, //默认是下拉展开
        }
    };
    mallSearch.initMallSearch = function (options) {
        var settings = $.extend(true,initMallSearch.option,options || {});
    };
    mallSearch.updateMallSearch = function (data) {
    };
    /**
     * 尾部展开收起事件
     * */
    fn.open =function () {
        var that = $(this);
        that.find("span").text("展开");
        that.find("img").attr("src","../../slice/icon-arrows-down.png");
        $(".show").addClass("hide");
        $(".show").removeClass("show");
        mallSearch["option"].show=true;
    }
    fn.stop = function(){
        var that = $(this);
        that.find("span").text("收起");
        that.find("img").attr("src","../../slice/icon-arrows-up.png");
        $(".hide").addClass("show");
        $(".hide").removeClass("hide");
        mallSearch["option"].show=false;
    }
    /**
     * 点击更多按钮 展示当前行全部
     * */
    fn.showMore = function(){
        var that = $(this).parent().parent();
        //进行判断 是否已经点开了多选 如果点开了多选 让更多失效
        (!that.parent().hasClass("mc")) &&(that.hasClass("no-see")?that.removeClass("no-see"): that.addClass("no-see"));
    }
    /**
     * 头部选项取消
     * */
    fn.titleRemove = function(){
        $(this).parent().remove();
    }
    /**
     * 选择标签事件
     * */
    fn.clickTag = function(){
        var that = $(this);
        var isTitleTag =!(that.text().indexOf("更多")!=-1|| that.text().indexOf("多选")!=-1||that.parent().parent().hasClass("mc"));
        isTitleTag && fn.addSeaTitle.call(this);
    }
    /**
    * 点击标签将其添加到title
    * */
    fn.addSeaTitle = function() {
        var that = $(this);
        var dom = $(".title-label-show"),
            text = that.text(),
            typeName = that.parent().prev().find("p").text();
        var isReat = (dom.text().indexOf(text) == -1);
        isReat && fn.appendTitle(typeName,text,dom);
    }
    /**
     * 将标签append到title
     * 参数1类别
     * 参数2标签名
     * 参数3 Dom
     * */
    fn.appendTitle = function(typeName,text,dom){
        var html = ' <p class="title-block">' + typeName + '<span class="color-red">' + text + '</span>\
								<i class="icon-close"></i></p>';
        dom.append(html);
    }
    /**
     * 点击多选按钮触发事件
     * */
    fn.multiSelect = function(){
        var that = $(this);
        var _thisFather = that.parent().parent().parent();
        var len  = that.parent().parent().find("input");
        if(len.is(".dn")){
            if($(".mc").length){
                $(".title-cent").addClass("no-see");
                $(".mc").removeClass("mc");
                $(".title-check").addClass("dn");
                $(".cen-btn").find("p").addClass("dn");
            }
            that.parent().parent().removeClass("no-see");
            $(".multi-select").removeClass("multi-select");
            that.parent().parent().find(".dn").removeClass("dn");
            _thisFather.addClass("mc");
        }
    }
    /**
     * 点击多选的取消按钮
     * */
    fn.multiCancel = function () {
        $(".title-cent").addClass("no-see");
        $(".mc").removeClass("mc");
        $(".title-check").addClass("dn");
        $(".cen-btn").find("p").addClass("dn");
    }
    /**
     * 当多选的checkbox发生改变时
     * */
    fn.checkboxInput = function(){
        var that= $(this);
        var condition = that.parent().parent().find(".title-check").is(":checked");
        condition ? that.parent().parent().find(".mail-btn-ok").addClass("btn-oktrue") : that.parent().parent().find(".mail-btn-ok").removeClass("btn-oktrue");
    }
    /**
     * 当点击多选的确认按钮
     * */
    fn.multiTrue = function(){

    }
})(jQuery)