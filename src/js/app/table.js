/**
 * Created by 刘泽举 on 2017/8/3.
 */
;(function($){
    var fn = {};
    var table = {
        defaultOption:{                             //表格默认配置参数
            width:1000,                             //表格宽度
            height:460,                             //表格高度
            data:{},                                //传入表格中的数据
            columns:[],                             //表格列格式
            rowStyle:'',                            //行样式
            singleSelect:false,                    //是否单选
            selectOnCheck:false,                   //true：点击复选框将会选中该行；false:选中该行将不会选中复选框。（该参数不用管）
            checkOnSelect:false,                   //true：当用户点击某一行时，则会选中/取消选中复选框；false:只有当用户点击了复选框时，才会选中/取消选中复选框。
            hasCheckbox:false,                     //是否存在checkbox列（true:存在   false:不存在）
            hasSortNumber:false                    //是否存在序号列（true:存在    false:不存在）
        }
    };

    $.initTable = function (options) {
        var settings = $.extend(true,table.defaultOption,options || {});
        fn.setTable(settings);
    };
    $.updateTable = function (data) {
        table.initTable(data);
    };

    $.getCheckedData = function (data) {
        return fn.getCheckedData(data);
    }

    fn.setTable = function(data){
        var columns = [];

        data.hasCheckbox && fn.addCheckbox(columns);
        data.hasSortNumber && fn.addSortNumber(columns);

        fn.addColumns(data,columns);
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
})(jQuery);