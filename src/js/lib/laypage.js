/*!
 
 @Name : layPage v1.3- 分页插件
 @Author: 贤心
 @Site：http://sentsin.com/layui/laypage
 @License：MIT
 
 */

;!function(){
"use strict";

function laypage(options){
    var skin = 'laypagecss';
 /*   laypage.dir = 'dir' in laypage ? laypage.dir : Page.getpath + '/skin/laypage.css';*/
    new Page(options);
/*    if(laypage.dir && !doc[id](skin)){
        Page.use(laypage.dir, skin);
    }*/
}

laypage.v = '1.3';

var doc = document, id = 'getElementById', tag = 'getElementsByTagName',classname = 'getElementsByClassName';
var index = 0, Page = function(options){
    var that = this;
    var conf = that.config = options || {};
    conf.item = index++;
    that.render(true);
};

Page.on = function(elem, even, fn){
    elem.attachEvent ? elem.attachEvent('on'+ even, function(){
        fn.call(elem, window.even); //for ie, this指向为当前dom元素
    }) : elem.addEventListener(even, fn, false);
    return Page;
};

Page.getpath = (function(){
    var js = document.scripts, jsPath = js[js.length - 1].src;
    return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
}())

Page.use = function(lib, id){
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = laypage.dir;
    id && (link.id = id);
    doc[tag]('head')[0].appendChild(link);
    link = null;
};

//判断传入的容器类型
Page.prototype.type = function(){
    var conf = this.config;
    if(typeof conf.ele === 'object'){
        return conf.ele.length === undefined ? 2 : 3;
    }
};

//分页视图
Page.prototype.view = function(){
    var that = this, conf = that.config, view = [], dict = {};
    conf.pages = conf.pages|0;
    conf.curr = (conf.curr|0) || 1;
    conf.groups = 'groups' in conf ? (conf.groups|0) : 5;
    conf.first = 'first' in conf ? conf.first : '&#x9996;&#x9875;';
    conf.last = 'last' in conf ? conf.last : '&#x5C3E;&#x9875;';
    conf.prev = 'prev' in conf ? conf.prev : '&#x4E0A;&#x4E00;&#x9875;';
    conf.next = 'next' in conf ? conf.next : '&#x4E0B;&#x4E00;&#x9875;';
    
    if(conf.pages <= 1){
        return '';
    }
    
    if(conf.groups > conf.pages){
        conf.groups = conf.pages;
    }
    
    //计算当前组
    dict.index = Math.ceil((conf.curr + ((conf.groups > 1 && conf.groups !== conf.pages) ? 1 : 0))/(conf.groups === 0 ? 1 : conf.groups));
    
    //当前页非首页，则输出上一页
    if(conf.curr > 1 && conf.prev){
        view.push('<a href="javascript:;" class="laypage_prev" data-page="'+ (conf.curr - 1) +'">'+ conf.prev +'</a>');
    }
    
    //当前组非首组，则输出首页
    if(dict.index > 1 && conf.first && conf.groups !== 0){
        view.push('<a href="javascript:;" class="laypage_first" data-page="1"  title="&#x9996;&#x9875;">'+ conf.first +'</a><span>&#x2026;</span>');
    }
    
    //输出当前页组
    dict.poor = Math.floor((conf.groups-1)/2);
    dict.start = dict.index > 1 ? conf.curr - dict.poor : 1;
    dict.end = dict.index > 1 ? (function(){
        var max = conf.curr + (conf.groups - dict.poor - 1);
        return max > conf.pages ? conf.pages : max;
    }()) : conf.groups;
    if(dict.end - dict.start < conf.groups - 1){ //最后一组状态
        dict.start = dict.end - conf.groups + 1;
    }
    for(; dict.start <= dict.end; dict.start++){
        if(dict.start === conf.curr){
            view.push('<span class="laypage_curr" '+ (/^#/.test(conf.skin) ? 'style="background-color:'+ conf.skin +'"' : '') +'>'+ dict.start +'</span>');
        } else {
            view.push('<a href="javascript:;" data-page="'+ dict.start +'">'+ dict.start +'</a>');
        }
    }
    
    //总页数大于连续分页数，且当前组最大页小于总页，输出尾页
    if(conf.pages > conf.groups && dict.end < conf.pages && conf.last && conf.groups !== 0){
         view.push('<span class="laypage_more">&#x2026;</span><a href="javascript:;" class="laypage_last" title="&#x5C3E;&#x9875;"  data-page="'+ conf.pages +'">'+ conf.last +'</a>');
    }
    
    //当前页不为尾页时，输出下一页
    dict.flow = !conf.prev && conf.groups === 0;
    if(conf.curr !== conf.pages && conf.next || dict.flow){
        view.push((function(){
            return (dict.flow && conf.curr === conf.pages) 
            ? '<span class="page_nomore" title="&#x5DF2;&#x6CA1;&#x6709;&#x66F4;&#x591A;">'+ conf.next +'</span>'
            : '<a href="javascript:;" class="laypage_next" data-page="'+ (conf.curr + 1) +'">'+ conf.next +'</a>';
        }()));
    }
    //当multiterm为true时,开启选择每页多少条主要用于后台
    if(conf.multiterm){
        view.push('<div class="laypage_select"><span class="laypage_selected js_selectpage">10&#26465;/&#39029;</span><ul class="selectpage_main" ><li>10&#26465;/&#39029;</li><li>20&#26465;/&#39029;</li><li>30&#26465;/&#39029;</li></ul><i class="glyphicon-select"></i></div>');
    }
    //输出当前一共多少页
    if(conf.isshowtotal){
        view.push('<span class="laypage_pages">共'+conf.pages+'页</span>');
    }
    //输出共计多少条
    if(conf.totalrecord){
        view.push('<span class="laypage_record">共'+conf.totalrecord+'页</span>');
    }
    return '<div name="laypage'+ laypage.v +'" class="laypage_main laypageskin_'+ (conf.skin ? (function(skin){
        return /^#/.test(skin) ? 'molv' : skin;
    }(conf.skin)) : 'default') +'" id="laypage_'+ that.config.item +'">'+ view.join('') + function(){
        return conf.skip 
        ?'<span class="laypage_total"><label>&#36339;&#33267;</label><input type="text" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="laypage_skip"><label>&#x9875;</label>'
        + '<button type="button" class="laypage_btn">&#x786e;&#x5b9a;</button></span>' 
        : '';
    }() +'</div>';
};

//跳页
Page.prototype.jump = function(elem){
    if(!elem) return;
    var that = this, conf = that.config, childs = elem.children;
    var btn = elem[tag]('button')[0];
    var input = elem[tag]('input')[0];
    var jsselect=elem[classname]('js_selectpage')[0];
    var jsselectmain=elem[classname]('selectpage_main')[0];
    var jsselect_li=elem[tag]('li');
    for(var i = 0, len = childs.length; i < len; i++){
        if(childs[i].nodeName.toLowerCase() === 'a'){
            Page.on(childs[i], 'click', function(){
                var curr = this.getAttribute('data-page')|0;
                conf.curr = curr;
                that.render();
                
            });
        }
    }
    if(btn){
        Page.on(btn, 'click', function(){
            var curr = input.value.replace(/\s|\D/g, '')|0;
            if(curr && curr <= conf.pages){
                conf.curr = curr;
                that.render();
            }
        });
    }
    if(jsselect){
        Page.on(jsselect,'click',function(){
            if(jsselectmain.style.display=="block"){
                jsselectmain.style.display="none";
            }else{
                jsselectmain.style.display="block";
            }
        })
    }
    if(jsselectmain){
        Page.on(jsselectmain,'click',function(event){
            event = event ? event : window.event;
            var obj = event.srcElement ? event.srcElement : event.target;
            jsselect.innerText=obj.innerText;
            jsselectmain.style.display="none";
        })
    }


};

//渲染分页
Page.prototype.render = function(load){
    var that = this, conf = that.config, type = that.type();
    var view = that.view();
    if(type === 2){
        conf.ele.innerHTML = view;
    } else if(type === 3){
        conf.ele.html(view);
    } else {
        doc[id](conf.ele).innerHTML = view;
    }
    conf.jump && conf.jump(conf, load);
    that.jump(doc[id]('laypage_' + conf.item));
    if(conf.hash && !load){
        location.hash = '!'+ conf.hash +'='+ conf.curr;
    }
};

//for 页面模块加载、Node.js运用、页面普通应用
"function" === typeof define ? define(function() {
    return laypage;
}) : "undefined" != typeof exports ? module.exports = laypage : window.laypage = laypage;

}();