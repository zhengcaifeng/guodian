require(['jquery','jedate1'], function ($,jedate1) {
    $(function(){
        var startDate = jedate1({
            dateCell: "#start-Date",
            format: "YYYY-MM-DD"
        });
    });
});