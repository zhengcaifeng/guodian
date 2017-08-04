/**
 * Created by wangxiao on 2017/8/4.
 * 表单验证插件
 */
require(['jquery', 'validator'], function($){
    $('#form1').validator({
        msgClass: "n-bottom", //提示信息的class，一般用n-top\right，代表天提示在输入框的位置
        msgIcon:'<i class="n-icon"></i>',//提示图标标签
       /*定义验证规则*/
        rules: {
            // 使用正则表达式定义规则
            mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"],
        },
        // display: function(elem){
        //         return $(elem).closest('.form-item').children('label:eq(0)').text();
        // },
        /*fields - 配置字段规则及参数*/
        fields: {
            // 对字段 username 应用插件自带规则require和自定义规则mobile
            //单个字段的验证规则和提示信息、样式等参数同整个表单参数设置相同，同样有验证成功回调等方法
            username: {
                rule: "姓名:required; mobile",
                msg: {
                    required:"111",
                    mobile:"222"
                },
                tip: "填写真实姓名有助于朋友找到你",
                ok: "ok",
                valid: function(){},
                timely: 1,
            },
            pwd: {
                rule: "密码:required;",
                ok: ""
            },
            confirmPwd:{
                rule: "确认密码:required; match(pwd);",
                ok: ""
            }
        },
        /*自定义消息提示,如果不自定义会有默认提示语*/
        messages: {
            required: "Please fill in this field",
            email: "Please enter a valid email address.",
        },
        /*  实时验证
        0：关闭实时验证，只在提交表单的时候执行验证
        1：输入框失去焦点（focusout）时执行验证
        2：输入框改变值（input）时执行验证
        3：输入框失去焦点和改变值（综合 1 + 2） (v0.8.0+)
        */
        timely: 1,
        /*表单验证通过callback*/
        valid: function(form){
            // 表单验证通过，提交表单
            $.post("path/to/server", $(form).serialize())
                .done(function(d){
                    // some code
                });
        },
        /*表单验证不通过callback*/
        invalid: function(form, errors){

        },
    });
});