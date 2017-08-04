/**
 * Created by wangxiao on 2017/8/4.
 */
require(['jquery', 'validator'], function($){


    $('#form1').validator({
        msgClass: "n-bottom",
        msgIcon:'<span class="n-icon" style="display:block;position:absolute;margin-left:175px;top: -23px;"></span>',
        rules: {
            // 使用正则表达式定义规则
            mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"]
        },
        // display: function(elem){
        //         return $(elem).closest('.form-item').children('label:eq(0)').text();
        // },
        fields: {
            // 对字段 username 应用规则 mobile
            uname: {
                rule: "姓名:required; mobile",
                msg: {
                    // "姓名格式错误"
                },
                ok: "ok"
            },
            pwd: {
                rule: "密码:required;",
                ok: ""
            },
            mobile:{
                rule: "确认密码:required; match(password);",
                ok: ""
            }
        },
        timely: 1
    });
});