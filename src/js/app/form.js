require(['jquery'], function ($) {
	//下拉列表一
	$.fn.formSelect = function(){
		var $this = $(this);
		$this.click(function(e){
			$this.siblings('.form-ul').children().remove();
			$this.css("background-image", "url(../../slice/icon-select-up.png)");
			var formLi = "<li class="+'form-li-first'+">全部</li><li class="+'form-li'+">是</li><li class="+'form-li'+">否</li>";
			$this.siblings(".form-ul").show().append(formLi);
			e.stopPropagation();
			return this;
		});
		$(document).click(function() {
			$(".form-ul").hide();
			$this.css("background-image", "url(../../slice/icon-select-down.png)");
		});
		$(document).on("mouseover", ".form-li", function() {
				$(this).addClass("bg-blue").siblings().removeClass("bg-blue");

			});
	    $(document).on("mouseout", ".form-li", function() {
				$(this).removeClass("bg-blue");
			});
		$(document).on("mouseover", ".form-li-first", function() {
				$(this).addClass("bg-blue");

			});
	    $(document).on("mouseout", ".form-li-first", function() {
				$(this).removeClass("bg-blue");
			});
		$(document).on("click", ".form-li", function() {
			$this.css("color","#000000");
			$this.val($(this).html());
			$(this).parent().hide();
			$this.css("background-image", "url(../../slice/icon-select-down.png)");
		});
		$(document).on("click", ".form-li-first", function() {
			$this.css("color","#cccccc");
			$this.val($(this).html());
			$(this).parent().hide();
			$this.css("background-image", "url(../../slice/icon-select-down.png)");
		});
	}
	//调用执行
		$('.form-yn').formSelect();
		
    //下拉列表大小号
	$.fn.formNum = function(e) {
		var $this = $(this);
		$this.on("click", function(e) {
			$this.siblings('.form-div').children().remove();
			var formNum = "<p class=" + 'formNum-p' + ">全部</p><ul class=" + 'formNum-ul' + "><li class=" + 'formNum-li' + ">超大号</li><li class=" + 'formNum-li' + ">大号</li><li class=" + 'formNum-li' + ">中号</li><li class=" + 'formNum-li' + ">小号</li><li class=" + 'formNum-li' + ">超小号</li><li class=" + 'formNum-li' + ">没号</li></ul>";
			$this.siblings('.form-div').show().append(formNum);
			$this.css("background-image", "url(../../slice/icon-select-up.png)");
			e.stopPropagation();
			return this;
		});
		$(document).on("mouseover", ".formNum-p", function() {
			$(this).addClass("bg-blue");
		});
		$(document).on("mouseout", ".formNum-p", function() {
			$(this).removeClass("bg-blue");
		});
		$(document).on("mouseover", ".formNum-li", function() {
			$(this).addClass("bg-blue").siblings().removeClass("bg-blue");
		});
		$(document).on("mouseout", ".formNum-li", function() {
			$(this).removeClass("bg-blue");
		});
		$(document).on("click", ".formNum-p", function() {
			$this.css("color","#cccccc");
			$this.val($(this).html());
			$(this).parent().hide();
			$this.css("background-image", "url(../../slice/icon-select-down.png)");
		});
		$(document).on("click", ".formNum-li", function() {
			$this.css("color","#000000");
			$this.val($(this).html());
			$(this).parent().parent().hide();
			$this.css("background-image", "url(../../slice/icon-select-down.png)");
		});
		$(document).click(function() {
			$(".form-div").hide();
			$this.css("background-image", "url(../../slice/icon-select-down.png)");
		})
    }

	//调用执行
	$('.form-num').formNum();
	
	
//	var record;
//		$.ajax({
//			type:"get",
//			url:"../../js/mock/a.txt",
//			data:{},
//			dataType:"json",
//			async:true,
//			success:function(data){
//				record = data;
//				console.log(record);
//			}
//		});
});