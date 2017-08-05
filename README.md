## 国电前端

### 项目使用的工具

* 使用腾讯开源工作流程框架weflow https://weflow.io/ 依赖nodejs https://nodejs.org/en/ 开发同学自行下载
* 使用require.js http://www.ruanyifeng.com/blog/2012/11/require_js.html
* 使用jquery库 http://jquery.cuishifeng.cn
* 使用less http://lesscss.cn
* CSS手册 http://css.cuishifeng.cn/

### 扩展知识
* jquery延迟对象deferred http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html
* require学习 http://www.imooc.com/learn/787
* 深入JavaScript http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html
* JavaScript 运行机制详解 http://www.ruanyifeng.com/blog/2014/10/event-loop.html
* css禅意花园 http://www.csszengarden.com/tr/zh-cn/
* JavaScript Promise http://liubin.org/promises-book/

### CSS 编写规范

#### CSS基本骨架

* CSS reset
* 通用CSS样式库（类似浮动，居中，边距等）
* 网站CSS样式库（文字链接颜色，背景样式，高度，宽度，margin等）
* 网站通用样式（按钮，导航，菜单，选项卡，文本框样式等）
* 网站公共结构样式（最外层div样式，导航外层样式，分栏样式）
* css sprite，图片，字体图片等

#### CSS命名

* 通用CSS样式和网站CSS样式采用，约定俗成的简化版方便使用和减小体积 例如
    ```
    dn -> display:none
    fl -> float:left
    ```
* 网站通用样式和网站公共结构采用语义化命名规则，-规则 例如
    ```
       member-content-auto
       pur-ul-li
    ```
* css sprite 和 图片 采用单独命名规则 小图标都采用i标签icon开头命名(小图标都存放在slice中统一生成雪碧图)，图片采用img开头名， 例如
    ```
       .icon-word {
           background-image: url('../slice/icon-twitter.png');
       }
       .img-test{
         background-image: url('../img/icon-twitter.png');
       }
    ```

### JavaScript 编写规范

#### 页面逻辑代码

* 业务相关的代码都写在js目录下的logic文件下，文件夹分类和命名周一确定，也希望大家给出解决方案
* 相关页面js代码编写规范 例如 (可以参考index.js)
```
/**
* Created by 周志豪 on 2017/7/30.
* xxx功能或者业务
*/
//相关require用法这里不多做说明，请看相关文档
require(['jquery'],function($){
    $(function(){
        page.init();
        //事件都写在这里，这里不过多说明
        $(document).on('click','.btn-page',function(){

        });
    });
    //初始化页面，为每一个页面创建一个模板
    var page = (function(module){
        //定义初始化数据
        var page = {

        };
        //定义内部调用函数
        var fn = {};
        //定义初始化函数
        module.init = function(){

        };
        fn.xx = function(){

        };
        return module;
    })(page || {});
});
```
* 相关公共模块js编写规范 例如(可以参考table.js)
```
/**
* Created by 刘泽举 on 2017/8/3.
* 表格插件
*/
define(['jquery','datagrid'],function($,datagrid){
    //定义一个内部使用对象
    var fn = {};
    //定义要抛出的模块名同时定义默认参数，命名规则此变量名与js文件名称保持一致，方便使用
    var table = {
        defaultOption：{
            //这里不做说明
        }
    }
    table.initTable = function () {

    };
    table.updateTable = function () {

    };
    fn.addCheckbox = function () {

    };
    fn.getCheckedData = function () {

    };
    return table;
});
```
