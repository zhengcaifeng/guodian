/**
 * Created by 刘泽举 on 2017/8/3.
 */
define(['jquery','datagrid'], function ($,datagrid) {
    var table = {
        defaultOption:{//表格默认配置参数
            width:'1000px',
            height:"460px",
            singleSelect:false,
            selectOnCheck:false,
            checkOnSelect:false,
            columns:[],
            rowStyler:function () {
                return "background:white";
            }
        }
    };
    /**
     * 初始化表格
     * @param selector  选择器
     */
    table.initTable = function(selector){
        table.updateTable(selector,table.defaultOption);

        $(document).on("mouseover",".datagrid-row",function () {
            //$(this).css("background","#FEF9E6");
            var index = $(this).attr("datagrid-row-index");
            $(".datagrid-view1").find(".datagrid-row").each(function(i){
                if(i===index){
                    $(this).css("background","#FEF9E6");
                }
            });
            $(".datagrid-view2").find(".datagrid-row").each(function(i){
                if(i===index){
                    $(this).css("background","#FEF9E6");
                }
            });
        });
        $(document).on("mouseout",".datagrid-row",function () {
            //$(this).css("background","white");
            var index = $(this).attr("datagrid-row-index");
            $(".datagrid-view1").find(".datagrid-row").each(function(i){
                if(i===index){
                    $(this).css("background","white");
                }
            });
            $(".datagrid-view2").find(".datagrid-row").each(function(i){
                if(i===index){
                    $(this).css("background","white");
                }
            });
        });
    }
    /**
     * 更新表格数据
     * @param selector  选择器
     * @param data      传入配置参数数据
     */
    table.updateTable = function (selector,data) {
        $(selector).datagrid(data);
    }
    return table;
});