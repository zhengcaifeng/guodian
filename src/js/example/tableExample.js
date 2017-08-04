/**
 * Created by 刘泽举 on 2017/8/3.
 */
require(['jquery','table'], function ($,table) {
    table.initTable("#table");

    $.getJSON("../../js/imock/managerData.js",function (data) {
        var option =  table.defaultOption;
        option.data = data;
        option.columns = [[
            {field:'',title:'',checkbox:true,resizable:false},
            {field:'userCode',title:'角色编码',width:80,align:'center',resizable:false},
            {field:'userName',title:'角色名称',width:400,align:'center',resizable:false},
            {field:'userType',title:'角色类型',width:180,align:'center',resizable:false},
            {field:'creater',title:'创建人',width:160,align:'center',resizable:false},
            {field:'creatTime',title:'创建日期',width:120,align:'center',resizable:false}
        ]];

        table.updateTable("#table",option);
    });

});