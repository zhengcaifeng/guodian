require.config({
	paths: {

　　　　　　"dimSearch": "app/dimSearch"

　　　　}
})
require(['jquery','dimSearch'],function($,dimSearch){
	
	$('.form-search').click(function(e){
		var $this  = $(this);
		dimSearch.formClick($this);
		e.stopPropagation();
	});
	$(document).click(function() {
		$(".form-search-div").hide();
		$('.form-search').css("background-image", "url(../../slice/icon-select-down.png)");
	});
	$(document).on("mouseover", ".form-search-li", function() {
		var $this  = $(this);
		dimSearch.formMoveOver($this);
	});
	$(document).on("click", ".form-search-li", function() {
		var $this  = $(this);
		dimSearch.formValue($this);
	})
	$(document).on("keyup",".form-search-input",function(e){
		var $this  = $(this);
		dimSearch.dimSearch($this);
		e.stopPropagation();
	})
//	$(document).on("mouseout", ".form-search-li", function() {
//		var $this  = $(this);
//		dimSearch.formMoveOut($this);
//	});
	
})
