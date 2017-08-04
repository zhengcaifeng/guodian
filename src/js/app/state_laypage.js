/**
 * Created by liangqingzhu on 2017/8/1.
 */
require(['jquery','laypage'], function ($,laypage) {
    $(function(){
        //测试数据
        var data = [
            '北京',
            '上海',
            '广州',
            '深圳',
            '杭州',
            '长沙',
            '合肥',
            '宁夏',
            '成都',
            '西安',
            '南昌',
            '上饶',
            '沈阳',
            '济南',
            '厦门',
            '福州',
            '九江',
            '宜春',
            '赣州',
            '宁波',
            '绍兴',
            '无锡',
            '苏州',
            '徐州',
            '东莞',
            '佛山',
            '中山',
            '成都',
            '武汉',
            '青岛',
            '天津',
            '重庆',
            '南京',
            '九江',
            '香港',
            '澳门',
            '台北'
        ];

        var nums = 5; //每页出现的数量
        var pages = Math.ceil(data.length/nums); //得到总页数
        var thisDate = function(curr){
            //此处只是演示，实际场景通常是返回已经当前页已经分组好的数据
            var str = '', last = curr*nums - 1;
            last = last >= data.length ? (data.length-1) : last;
            for(var i = (curr*nums - nums); i <= last; i++){
                str += '<li>'+ data[i] +'</li>';
            }
            return str;
        };

        laypage({
            cont: 'page_default', //容器。值支持id名、原生dom对象，jquery对象,
            pages: pages, //总页数
            skip: true, //是否开启跳页
            skin: 'gd',
            multiterm:true,//是否开启选择每页多少条
            jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递true当前页：obj.curr
                    document.getElementById('biuuu_city_list').innerHTML = thisDate(obj.curr);
                }
            },
            prev: '<i class="glyphicon-pre"></i>', //若不显示，设置false即可
            next: '<i class="glyphicon-next"></i>', //若不显示，设置false即可
            first: false,
            last: false,
            groups: 7 //连续显示分页数
        });

        $(document).on("click",".js_selectpage",function(){
        $(this).next(".selectpage_main").slideToggle();
        })

       $(document).on("click",".selectpage_main li",function(){
           $(".js_selectpage").html($(this).text());
           $(".selectpage_main").hide();
        })

        laypage({
            cont: 'page_style01', //容器。值支持id名、原生dom对象，jquery对象,
            pages: pages, //总页数
            skip: true, //是否开启跳页
            skin: 'gd2',
            multiterm:false,//是否开启选择每页多少条
            jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                    document.getElementById('biuuu_city_list').innerHTML = thisDate(obj.curr);
                }
            },
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            first: 1,
            last: 10,
            isshowtotal:true,//是否显示总页数
            groups: 6 //连续显示分页数
        });

        laypage({
            cont: 'page_style02', //容器。值支持id名、原生dom对象，jquery对象,
            pages: pages, //总页数
            skip: true, //是否开启跳页
            skin: 'gd3',
            multiterm:false,//是否开启选择每页多少条
            jump: function(obj, first){ //触发分页后的回调
                if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
                    document.getElementById('biuuu_city_list').innerHTML = thisDate(obj.curr);
                }
            },
            prev: '上一页', //若不显示，设置false即可
            next: '下一页', //若不显示，设置false即可
            first: 1,
            last: 10,
            isshowtotal:true,//是否显示总页数
            totalrecord:1000,//总共条数并且显示
            groups: 6 //连续显示分页数
        });



    });
});