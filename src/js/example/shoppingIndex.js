/**
 * Created by YLN on 2017/7/31.
 */
$(function(){
    $(document).on('click', '.arrow-toggle', function(e) {
        e.preventDefault();
        var $this = $(this);
        if($this.hasClass("arrow-down")){
            $this.removeClass("arrow-down");
            $this.addClass("arrow-up");
        } else {
            $this.removeClass("arrow-up");
            $this.addClass("arrow-down");
        }
    });
});
