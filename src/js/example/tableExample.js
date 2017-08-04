/**
 * Created by 刘泽举 on 2017/8/3.
 */
require(['jquery','table'], function ($,table) {
    $.getJSON("../../js/mock/managerData.js",function (data) {
        table.initTable({
            target:'#table',
            width:800,
            height:500,
            data:data,
            columns: [
                {field:'userCode',title:'角色编码',width:80},
                {field:'userName',title:'角色名称',width:400},
                {field:'userType',title:'角色类型',width:180},
                {field:'creater',title:'创建人',width:160},
                {field:'creatTime',title:'创建日期',width:120}
            ],
            hasCheckbox:true,
            hasSortNumber:true
        });
        // var option =  table.defaultOption;
        // option.data = data;
        // option.columns = [[
        //     {field:'',title:'',checkbox:true,resizable:false},
        //     {field:'userCode',title:'角色编码',width:80,align:'center',resizable:false},
        //     {field:'userName',title:'角色名称',width:400,align:'center',resizable:false},
        //     {field:'userType',title:'角色类型',width:180,align:'center',resizable:false},
        //     {field:'creater',title:'创建人',width:160,align:'center',resizable:false},
        //     {field:'creatTime',title:'创建日期',width:120,align:'center',resizable:false}
        // ]];
        //
        // table.updateTable("#table",option);
    });
});