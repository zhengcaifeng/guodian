/**
 * Created by liangqingzhu on 2017/8/2.
 */
define(['jquery','ztree'], function ($) {
        var _ztree={
            setting:{
                view: {
                    // showIcon: showIconForTree
                    showIcon:false//是否展示icon
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                }
            },
            zNodes:[]
        }
/*        function showIconForTree(treeId, treeNode) {
            return !treeNode.isParent;
        };*/
    _ztree.initzNodes = function (options) {
        var setNodes = $.extend(true,_ztree.zNodes,options || []);
        $.fn.zTree.init($("#treeDemo"), _ztree.setting,setNodes);
    };

    //fn.treeoption=function(){}

/*    $(document).ready(function(){
       $.fn.zTree.init($("#treeDemo"), _ztree.setting,setnodes);
    });*/

    return _ztree;


});