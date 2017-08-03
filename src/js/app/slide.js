/**
 * Created by wangxiao on 2017/8/2.
 */
//require(['jquery','Swiper'],function($,Swiper){
//    var mySwiper = new Swiper('.swiper-container', {
//        width: 690,
//        height: 300,
//        autoplay: 2000,//可选选项，自动滑动
//        speed:500,
//        prevButton:'.swiper-button-prev',
//        nextButton:'.swiper-button-next',
//        loop : true,
//        pagination : '.swiper-pagination',
//        createPagination :false,
//        paginationClickable :true,
//        //paginationCustomRender: function (swiper, current, total) {
//        //    $('.pagination-num:eq('+(current-1)+')').addClass('pagination-active').siblings().removeClass('pagination-active');
//        //},
//        //onClick: function(swiper,even){
//        //    //alert('事件触发了;');
//        //    console.log(swiper.activeIndex);
//        //},
//    })
//    $('.swiper-container').on("mouseenter",function(){
//        mySwiper.stopAutoplay();
//    }).on("mouseleave",function(){
//        mySwiper.startAutoplay();
//    })
//})
require(['jquery','slide'],function($,slide){
    $(".slideBox").slide({mainCell:".bd ul",effect:"left",autoPlay:true,trigger:"click"});
})