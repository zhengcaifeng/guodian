/**
 * Created by 刘泽举 on 2017/8/3.
 */
require(['jquery','table','util'], function ($,table,util) {
    $.getJSON("../../js/mock/managerData.js",function (data) {
        table.initTable({
            target:'#table',
            width:800,
            height:500,
            data:data,
            columns: [
                {field:'userCode',title:'角色编码',width:80},
                {field:'userName',title:'角色名称',width:200},
                {field:'userType',title:'角色类型',width:180},
                {field:'creater',title:'创建人',width:160},
                {field:'creatTime',title:'创建日期',width:120}
            ],
            hasCheckbox:true,
            hasSortNumber:true
        });
    });

    $(document).on("click","#getData",function () {
       util.log(table.getCheckedData({
           target:'#table'
       }));
    });

});