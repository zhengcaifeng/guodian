require(['jquery','jedate','layer'], function ($,jedate,layer) {
    $(function(){
        var startDate = jedate({
            dateCell: "#start-Date",
            format: "YYYY-MM-DD"
        });
    });
});