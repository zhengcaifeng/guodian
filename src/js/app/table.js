/**
 * Created by 刘泽举 on 2017/8/3.
 */
define(['jquery','datagrid'], function ($,datagrid) {
    var fn = {};
    var table = {
        defaultOption:{//表格默认配置参数
            width:1000,
            height:460,
            data:{},
            columns:[],
            rowStyle:'',
            singleSelect:false,
            selectOnCheck:false,
            checkOnSelect:false,
            hasCheckbox:false,
            hasSortNumber:false
        }
    };

    table.initTable = function (options) {
        var settings = $.extend(true,table.defaultOption,options || {});
        fn.setTable(settings);
    };
    table.updateTable = function (data) {
        table.initTable(data);
    };

    table.getCheckedData = function (data) {
        return fn.getCheckedData(data);
    }

    fn.setTable = function(data){
        var columns = [];

        data.hasCheckbox && fn.addCheckbox(columns);
        data.hasSortNumber && fn.addSortNumber(columns);

        fn.addColumns(data,columns);
        console.log(columns);
        $(data.target).datagrid({
            width:data.width+'px',
            height:data.height+'px',
            data:data.data,
            columns:[columns],
            singleSelect:data.singleSelect,
            selectOnCheck:data.selectOnCheck,
            checkOnSelect:data.checkOnSelect,
            rowStyler:function () {
                return {class:data.rowStyle};
            }
        });
    };
    /**
     * 为表格添加checkbox
     * @param array
     * @returns {*}
     */
    fn.addCheckbox = function (array) {
        var itemCheckbox = {field:'',title:'',checkbox:true,resizable:false};
        array.push(itemCheckbox);
        return array;
    }

    /**
     * 为表格添加序号
     * @param array
     * @returns {*}
     */
    fn.addSortNumber = function (array) {
        var itemSortNumber = {field:'sortNumber',title:'序号',width:40,align:'center', resizable:false,
            formatter:function(v,r,i){
                return i+1;
            }
        };
        array.push(itemSortNumber);
        return array;
    }
    /**
     * 为表格添加列数据
     * @param array
     */
    fn.addColumns = function (data,array) {
        var defalutColumnsOption = {
            align:'center',
            resizable:false
        };
        $.each(data.columns,function (index,vlue) {
            var item = $.extend(true,vlue,defalutColumnsOption||{});
            array.push(item);
        });
        return array;
    }
    /**
     * 获取勾选行数据
     * @param data
     * @returns {jQuery}
     */
    fn.getCheckedData = function (data) {
        var array = $(data.target).datagrid("getChecked");
        return array;
    }
    return table;
});