define(['jquery'],function($){
	var dimSearch = {
        defaultValue:{
        	value:''
        }
    };
    dimSearch.initSearch = function (values) {
       // var settings = $.extend(true,dimSearch.defaultValue,values || {});
        $('.form-search').formSearch();
    };
	$.fn.formSearch = function(){
		var $this = $(this);
		$this.on("click", function(e){
			$this.siblings('.form-search-div').show();
			$this.css("background-image", "url(../../slice/icon-select-up.png)");
			e.stopPropagation();
			return this;
		});
		$(document).on("mouseover", ".form-search-li", function() {
			$(this).addClass("bg-blue").siblings().removeClass("bg-blue");
		});
		$(document).on("mouseout", ".form-search-li", function() {
			$(this).removeClass("bg-blue");
		});
		$(document).on("click", ".form-search-li", function() {
			$this.css("color","#000000");
			$this.val($(this).html());
			$(this).parent().parent().hide();
			$this.css("background-image", "url(../../slice/icon-select-down.png)");
		});
		$(document).on("click",".form-search-input",function(e){
				e.stopPropagation();
			});
			$(document).on("keyup",".form-search-input",function(e){
				var $formSearchLi = $('.form-search-ul').children('li');
				var $val = $(this).val();
				$formSearchLi.hide().filter(":contains('"+$val+"')").show();
				e.stopPropagation();
			});
	     $(document).click(function() {
			$(".form-search-div").hide();
			$this.css("background-image", "url(../../slice/icon-select-down.png)");
	});
	}
	
	return dimSearch;
})