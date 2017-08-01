require(['jquery'], function ($) {
	var record;
		$.ajax({
			type:"get",
			url:"inputAbtn.json",
			data:{},
			dataType:"json",
			async:true,
			success:function(data){
				record = data;
				console.log(record);
			}
		});
});