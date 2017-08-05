/*! art-template@4.12.1 for browser | https://github.com/aui/art-template */
(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define([], factory);
    else if(typeof exports === 'object')
        exports["template"] = factory();
    else
        root["template"] = factory();
})(this, function() {
    return /******/ (function(modules) { // webpackBootstrap
        /******/ 	// The module cache
        /******/ 	var installedModules = {};
        /******/
        /******/ 	// The require function
        /******/ 	function __webpack_require__(moduleId) {
            /******/
            /******/ 		// Check if module is in cache
            /******/ 		if(installedModules[moduleId]) {
                /******/ 			return installedModules[moduleId].exports;
                /******/ 		}
            /******/ 		// Create a new module (and put it into the cache)
            /******/ 		var module = installedModules[moduleId] = {
                /******/ 			i: moduleId,
                /******/ 			l: false,
                /******/ 			exports: {}
                /******/ 		};
            /******/
            /******/ 		// Execute the module function
            /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ 		// Flag the module as loaded
            /******/ 		module.l = true;
            /******/
            /******/ 		// Return the exports of the module
            /******/ 		return module.exports;
            /******/ 	}
        /******/
        /******/
        /******/ 	// expose the modules object (__webpack_modules__)
        /******/ 	__webpack_require__.m = modules;
        /******/
        /******/ 	// expose the module cache
        /******/ 	__webpack_require__.c = installedModules;
        /******/
        /******/ 	// define getter function for harmony exports
        /******/ 	__webpack_require__.d = function(exports, name, getter) {
            /******/ 		if(!__webpack_require__.o(exports, name)) {
                /******/ 			Object.defineProperty(exports, name, {
                    /******/ 				configurable: false,
                    /******/ 				enumerable: true,
                    /******/ 				get: getter
                    /******/ 			});
                /******/ 		}
            /******/ 	};
        /******/
        /******/ 	// getDefaultExport function for compatibility with non-harmony modules
        /******/ 	__webpack_require__.n = function(module) {
            /******/ 		var getter = module && module.__esModule ?
                /******/ 			function getDefault() { return module['default']; } :
                /******/ 			function getModuleExports() { return module; };
            /******/ 		__webpack_require__.d(getter, 'a', getter);
            /******/ 		return getter;
            /******/ 	};
        /******/
        /******/ 	// Object.prototype.hasOwnProperty.call
        /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
        /******/
        /******/ 	// __webpack_public_path__
        /******/ 	__webpack_require__.p = "";
        /******/
        /******/ 	// Load entry module and return exports
        /******/ 	return __webpack_require__(__webpack_require__.s = 6);
        /******/ })
    /************************************************************************/
    /******/ ([
        /* 0 */
        /***/ (function(module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */(function(global) {module.exports = false;

// Only Node.JS has a process variable that is of [[Class]] process
                try {
                    module.exports = Object.prototype.toString.call(global.process) === '[object process]'
                } catch(e) {}

                /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

            /***/ }),
        /* 1 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var Compiler = __webpack_require__(8);
            var defaults = __webpack_require__(3);
            var TemplateError = __webpack_require__(23);

            var debugRender = function debugRender(error, options) {
                options.onerror(error, options);
                var render = function render() {
                    return '{Template Error}';
                };
                render.mappings = [];
                render.sourcesContent = [];
                return render;
            };

            /**
             * 编译模版
             * @param {string|Object} source   模板内容
             * @param {?Object}       options  编译选项
             * @return {function}
             */
            var compile = function compile(source) {
                var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


                if (typeof source !== 'string') {
                    options = source;
                } else {
                    options.source = source;
                }

                // 合并默认配置
                options = defaults.$extend(options);
                source = options.source;

                // debug 模式
                /* istanbul ignore if */
                if (options.debug === true) {
                    options.cache = false;
                    options.minimize = false;
                    options.compileDebug = true;
                }

                if (options.compileDebug) {
                    options.minimize = false;
                }

                // 转换成绝对路径
                if (options.filename) {
                    options.filename = options.resolveFilename(options.filename, options);
                }

                var filename = options.filename;
                var cache = options.cache;
                var caches = options.caches;

                // 匹配缓存
                if (cache && filename) {
                    var _render = caches.get(filename);
                    if (_render) {
                        return _render;
                    }
                }

                // 加载外部模板
                if (!source) {

                    try {
                        source = options.loader(filename, options);
                        options.source = source;
                    } catch (e) {

                        var error = new TemplateError({
                            name: 'CompileError',
                            path: filename,
                            message: 'template not found: ' + e.message,
                            stack: e.stack
                        });

                        if (options.bail) {
                            throw error;
                        } else {
                            return debugRender(error, options);
                        }
                    }
                }

                var fn = void 0;
                var compiler = new Compiler(options);

                try {
                    fn = compiler.build();
                } catch (error) {
                    error = new TemplateError(error);
                    if (options.bail) {
                        throw error;
                    } else {
                        return debugRender(error, options);
                    }
                }

                var render = function render(data, blocks) {

                    try {
                        return fn(data, blocks);
                    } catch (error) {

                        // 运行时出错以调试模式重载
                        if (!options.compileDebug) {
                            options.cache = false;
                            options.compileDebug = true;
                            return compile(options)(data, blocks);
                        }

                        error = new TemplateError(error);

                        if (options.bail) {
                            throw error;
                        } else {
                            return debugRender(error, options)();
                        }
                    }
                };

                render.mappings = fn.mappings;
                render.sourcesContent = fn.sourcesContent;
                render.toString = function () {
                    return fn.toString();
                };

                if (cache && filename) {
                    caches.set(filename, render);
                }

                return render;
            };

            compile.Compiler = Compiler;

            module.exports = compile;

            /***/ }),
        /* 2 */
        /***/ (function(module, exports) {

// Copyright 2014, 2015, 2016, 2017 Simon Lydell
// License: MIT. (See LICENSE.)

            Object.defineProperty(exports, "__esModule", {
                value: true
            })

// This regex comes from regex.coffee, and is inserted here by generate-index.js
// (run `npm run build`).
            exports.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g

            exports.matchToToken = function(match) {
                var token = {type: "invalid", value: match[0]}
                if (match[ 1]) token.type = "string" , token.closed = !!(match[3] || match[4])
                else if (match[ 5]) token.type = "comment"
                else if (match[ 6]) token.type = "comment", token.closed = !!match[7]
                else if (match[ 8]) token.type = "regex"
                else if (match[ 9]) token.type = "number"
                else if (match[10]) token.type = "name"
                else if (match[11]) token.type = "punctuator"
                else if (match[12]) token.type = "whitespace"
                return token
            }


            /***/ }),
        /* 3 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var detectNode = __webpack_require__(0);
            var runtime = __webpack_require__(12);
            var extend = __webpack_require__(13);
            var include = __webpack_require__(14);
            var onerror = __webpack_require__(15);
            var caches = __webpack_require__(16);
            var loader = __webpack_require__(17);
            var artRule = __webpack_require__(18);
            var nativeRule = __webpack_require__(19);
            var htmlMinifier = __webpack_require__(20);
            var resolveFilename = __webpack_require__(22);

            /** 模板编译器默认配置 */
            var settings = {

                // 模板内容。如果没有此字段，则会根据 filename 来加载模板内容
                source: null,

                // 模板名
                filename: null,

                // 模板语法规则列表
                rules: [nativeRule, artRule],

                // 是否开启对模板输出语句自动编码功能。为 false 则关闭编码输出功能
                // escape 可以防范 XSS 攻击
                escape: true,

                // 启动模板引擎调试模式。如果为 true: {cache:false, minimize:false, compileDebug:true}
                debug: detectNode ? process.env.NODE_ENV !== 'production' : false,

                // bail 如果为 true，编译错误与运行时错误都会抛出异常
                bail: true,

                // 是否开启缓存
                cache: true,

                // 是否开启压缩。它会运行 htmlMinifier，将页面 HTML、CSS、CSS 进行压缩输出
                // 如果模板包含没有闭合的 HTML 标签，请不要打开 minimize，否则可能被 htmlMinifier 修复或过滤
                minimize: true,

                // 是否编译调试版
                compileDebug: false,

                // 模板路径转换器
                resolveFilename: resolveFilename,

                // 子模板编译适配器
                include: include,

                // HTML 压缩器。仅在 NodeJS 环境下有效
                htmlMinifier: htmlMinifier,

                // HTML 压缩器配置。参见 https://github.com/kangax/html-minifier
                htmlMinifierOptions: {
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                    // 运行时自动合并：rules.map(rule => rule.test)
                    ignoreCustomFragments: []
                },

                // 错误事件。仅在 bail 为 false 时生效
                onerror: onerror,

                // 模板文件加载器
                loader: loader,

                // 缓存中心适配器（依赖 filename 字段）
                caches: caches,

                // 模板根目录。如果 filename 字段不是本地路径，则在 root 查找模板
                root: '/',

                // 默认后缀名。如果没有后缀名，则会自动添加 extname
                extname: '.art',

                // 忽略的变量。被模板编译器忽略的模板变量列表
                ignore: [],

                // 导入的模板变量
                imports: runtime

            };

            function Defaults() {
                this.$extend = function (options) {
                    options = options || {};
                    return extend(options, options instanceof Defaults ? options : this);
                };
            };
            Defaults.prototype = settings;

            module.exports = new Defaults();

            /***/ }),
        /* 4 */
        /***/ (function(module, exports) {

            var g;

// This works in non-strict mode
            g = (function() {
                return this;
            })();

            try {
                // This works if eval is allowed (see CSP)
                g = g || Function("return this")() || (1,eval)("this");
            } catch(e) {
                // This works if the window reference is available
                if(typeof window === "object")
                    g = window;
            }

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

            module.exports = g;


            /***/ }),
        /* 5 */
        /***/ (function(module, exports) {



            /***/ }),
        /* 6 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var render = __webpack_require__(7);
            var compile = __webpack_require__(1);
            var defaults = __webpack_require__(24);

            /**
             * 模板引擎
             * @param   {string}            filename 模板名
             * @param   {Object|string}     content  数据或模板内容
             * @return  {string|function}            如果 content 为 string 则编译并缓存模板，否则渲染模板
             */
            var template = function template(filename, content) {
                return content instanceof Object ? render({
                    filename: filename
                }, content) : compile({
                    filename: filename,
                    source: content
                });
            };

            template.render = render;
            template.compile = compile;
            template.defaults = defaults;

            module.exports = template;

            /***/ }),
        /* 7 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var compile = __webpack_require__(1);

            /**
             * 渲染模板
             * @param   {string|Object}     source  模板内容
             * @param   {Object}            data    数据
             * @param   {?Object}           options 选项
             * @return  {string}            渲染好的字符串
             */
            var render = function render(source, data, options) {
                return compile(source, options)(data);
            };

            module.exports = render;

            /***/ }),
        /* 8 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            var esTokenizer = __webpack_require__(9);
            var tplTokenizer = __webpack_require__(11);

            /** 传递给模板的数据引用 */
            var DATA = '$data';

            /** 外部导入的所有全局变量引用 */
            var IMPORTS = '$imports';

            /**  $imports.$escape */
            var ESCAPE = '$escape';

            /**  $imports.$each */
            var EACH = '$each';

            /** 文本输出函数 */
            var PRINT = 'print';

            /** 包含子模板函数 */
            var INCLUDE = 'include';

            /** 继承布局模板函数 */
            var EXTEND = 'extend';

            /** “模板块”读写函数 */
            var BLOCK = 'block';

            /** 字符串拼接变量 */
            var OUT = '$$out';

            /** 运行时逐行调试记录变量 [line, start, source] */
            var LINE = '$$line';

            /** 所有“模板块”变量 */
            var BLOCKS = '$$blocks';

            /** 截取模版输出“流”的函数 */
            var SLICE = '$$slice';

            /** 继承的布局模板的文件地址变量 */
            var FROM = '$$from';

            /** 编译设置变量 */
            var OPTIONS = '$$options';

            var has = function has(object, key) {
                return object.hasOwnProperty(key);
            };
            var stringify = JSON.stringify;

            var Compiler = function () {

                /**
                 * 模板编译器
                 * @param   {Object}    options
                 */
                function Compiler(options) {
                    var _internal,
                        _dependencies,
                        _this = this;

                    _classCallCheck(this, Compiler);

                    var source = options.source;
                    var minimize = options.minimize;
                    var htmlMinifier = options.htmlMinifier;

                    // 编译选项
                    this.options = options;

                    // 所有语句堆栈
                    this.stacks = [];

                    // 运行时注入的上下文
                    this.context = [];

                    // 模板语句编译后的代码
                    this.scripts = [];

                    // context map
                    this.CONTEXT_MAP = {};

                    // 忽略的变量名单
                    this.ignore = [DATA, IMPORTS, OPTIONS].concat(options.ignore);

                    // 按需编译到模板渲染函数的内置变量
                    this.internal = (_internal = {}, _internal[OUT] = '\'\'', _internal[LINE] = '[0,0]', _internal[BLOCKS] = 'arguments[1]||{}', _internal[FROM] = 'null', _internal[PRINT] = 'function(){var s=\'\'.concat.apply(\'\',arguments);' + OUT + '+=s;return s}', _internal[INCLUDE] = 'function(src,data){var s=' + OPTIONS + '.include(src,data||' + DATA + ',arguments[2]||' + BLOCKS + ',' + OPTIONS + ');' + OUT + '+=s;return s}', _internal[EXTEND] = 'function(from){' + FROM + '=from}', _internal[SLICE] = 'function(c,p,s){p=' + OUT + ';' + OUT + '=\'\';c();s=' + OUT + ';' + OUT + '=p+s;return s}', _internal[BLOCK] = 'function(){var a=arguments,s;if(typeof a[0]===\'function\'){return ' + SLICE + '(a[0])}else if(' + FROM + '){' + BLOCKS + '[a[0]]=' + SLICE + '(a[1])}else{s=' + BLOCKS + '[a[0]];if(typeof s===\'string\'){' + OUT + '+=s}else{s=' + SLICE + '(a[1])}return s}}', _internal);

                    // 内置函数依赖关系声明
                    this.dependencies = (_dependencies = {}, _dependencies[PRINT] = [OUT], _dependencies[INCLUDE] = [OUT, OPTIONS, DATA, BLOCKS], _dependencies[EXTEND] = [FROM, /*[*/INCLUDE /*]*/], _dependencies[BLOCK] = [SLICE, FROM, OUT, BLOCKS], _dependencies);

                    this.importContext(OUT);

                    if (options.compileDebug) {
                        this.importContext(LINE);
                    }

                    if (minimize) {
                        try {
                            source = htmlMinifier(source, options);
                        } catch (error) {}
                    }

                    this.source = source;
                    this.getTplTokens(source, options.rules, this).forEach(function (tokens) {
                        if (tokens.type === tplTokenizer.TYPE_STRING) {
                            _this.parseString(tokens);
                        } else {
                            _this.parseExpression(tokens);
                        }
                    });
                }

                /**
                 * 将模板代码转换成 tplToken 数组
                 * @param   {string} source
                 * @return  {Object[]}
                 */


                Compiler.prototype.getTplTokens = function getTplTokens() {
                    return tplTokenizer.apply(undefined, arguments);
                };

                /**
                 * 将模板表达式转换成 esToken 数组
                 * @param   {string} source
                 * @return  {Object[]}
                 */


                Compiler.prototype.getEsTokens = function getEsTokens(source) {
                    return esTokenizer(source);
                };

                /**
                 * 获取变量列表
                 * @param {Object[]} esTokens
                 * @return {string[]}
                 */


                Compiler.prototype.getVariables = function getVariables(esTokens) {
                    var ignore = false;
                    return esTokens.filter(function (esToken) {
                        return esToken.type !== 'whitespace' && esToken.type !== 'comment';
                    }).filter(function (esToken) {
                        if (esToken.type === 'name' && !ignore) {
                            return true;
                        }

                        ignore = esToken.type === 'punctuator' && esToken.value === '.';

                        return false;
                    }).map(function (tooken) {
                        return tooken.value;
                    });
                };

                /**
                 * 导入模板上下文
                 * @param {string} name
                 */


                Compiler.prototype.importContext = function importContext(name) {
                    var _this2 = this;

                    var value = '';
                    var internal = this.internal;
                    var dependencies = this.dependencies;
                    var ignore = this.ignore;
                    var context = this.context;
                    var options = this.options;
                    var imports = options.imports;
                    var contextMap = this.CONTEXT_MAP;

                    if (!has(contextMap, name) && ignore.indexOf(name) === -1) {

                        if (has(internal, name)) {
                            value = internal[name];

                            if (has(dependencies, name)) {
                                dependencies[name].forEach(function (name) {
                                    return _this2.importContext(name);
                                });
                            }

                            // imports 继承了 Global，但是继承的属性不分配到顶级变量中，避免占用了模板内部的变量名称
                        } else if (name === ESCAPE || name === EACH || has(imports, name)) {
                            value = IMPORTS + '.' + name;
                        } else {
                            value = DATA + '.' + name;
                        }

                        contextMap[name] = value;
                        context.push({
                            name: name,
                            value: value
                        });
                    }
                };

                /**
                 * 解析字符串（HTML）直接输出语句
                 * @param {Object} tplToken
                 */


                Compiler.prototype.parseString = function parseString(tplToken) {

                    var source = tplToken.value;

                    if (!source) {
                        return;
                    }

                    var code = OUT + '+=' + stringify(source);
                    this.scripts.push({
                        source: source,
                        tplToken: tplToken,
                        code: code
                    });
                };

                /**
                 * 解析逻辑表达式语句
                 * @param {Object} tplToken
                 */


                Compiler.prototype.parseExpression = function parseExpression(tplToken) {
                    var _this3 = this;

                    var source = tplToken.value;
                    var script = tplToken.script;
                    var output = script.output;
                    var escape = this.options.escape;
                    var code = script.code;

                    if (output) {
                        if (escape === false || output === tplTokenizer.TYPE_RAW) {
                            code = OUT + '+=' + script.code;
                        } else {
                            code = OUT + '+=' + ESCAPE + '(' + script.code + ')';
                        }
                    }

                    var esToken = this.getEsTokens(code);
                    this.getVariables(esToken).forEach(function (name) {
                        return _this3.importContext(name);
                    });

                    this.scripts.push({
                        source: source,
                        tplToken: tplToken,
                        code: code
                    });
                };

                /**
                 * 检查解析后的模板语句是否存在语法错误
                 * @param  {string} script
                 * @return {boolean}
                 */


                Compiler.prototype.checkExpression = function checkExpression(script) {

                    // 没有闭合的块级模板语句规则
                    // 基于正则规则来补全语法不能保证 100% 准确，
                    // 但是在绝大多数情况下足以满足辅助开发调试的需要
                    var rules = [

                        // <% } %>
                        // <% }else{ %>
                        // <% }else if(a){ %>
                        [/^\s*}[\w\W]*?{?[\s;]*$/, ''],

                        // <% fn(c,function(a,b){ %>
                        // <% fn(c, a=>{ %>
                        // <% fn(c,(a,b)=>{ %>
                        [/(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/, '$1})'],

                        // <% if(a){ %>
                        // <% for(var i in d){ %>
                        [/(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/, '$1}']];

                    var index = 0;
                    while (index < rules.length) {
                        if (rules[index][0].test(script)) {
                            var _script;

                            script = (_script = script).replace.apply(_script, rules[index]);
                            break;
                        }
                        index++;
                    };

                    try {
                        new Function(script);
                        return true;
                    } catch (e) {
                        return false;
                    }
                };

                /**
                 * 编译
                 * @return  {function}
                 */


                Compiler.prototype.build = function build() {

                    var options = this.options;
                    var context = this.context;
                    var scripts = this.scripts;
                    var stacks = this.stacks;
                    var source = this.source;
                    var filename = options.filename;
                    var imports = options.imports;
                    var mappings = [];
                    var extendMode = has(this.CONTEXT_MAP, EXTEND);

                    var offsetLine = 0;

                    // Create SourceMap: mapping
                    var mapping = function mapping(code, _ref) {
                        var line = _ref.line,
                            start = _ref.start;

                        var node = {
                            generated: {
                                line: stacks.length + offsetLine + 1,
                                column: 1
                            },
                            original: {
                                line: line + 1,
                                column: start + 1
                            }
                        };

                        offsetLine += code.split(/\n/).length - 1;
                        return node;
                    };

                    // Trim code
                    var trim = function trim(code) {
                        return code.replace(/^[\t ]+|[\t ]$/g, '');
                    };

                    stacks.push('function(' + DATA + '){');
                    stacks.push('\'use strict\'');
                    stacks.push(DATA + '=' + DATA + '||{}');
                    stacks.push('var ' + context.map(function (_ref2) {
                        var name = _ref2.name,
                            value = _ref2.value;
                        return name + '=' + value;
                    }).join(','));

                    if (options.compileDebug) {

                        stacks.push('try{');

                        scripts.forEach(function (script) {

                            if (script.tplToken.type === tplTokenizer.TYPE_EXPRESSION) {
                                stacks.push(LINE + '=[' + [script.tplToken.line, script.tplToken.start].join(',') + ']');
                            }

                            mappings.push(mapping(script.code, script.tplToken));
                            stacks.push(trim(script.code));
                        });

                        stacks.push('}catch(error){');

                        stacks.push('throw {' + ['name:\'RuntimeError\'', 'path:' + stringify(filename), 'message:error.message', 'line:' + LINE + '[0]+1', 'column:' + LINE + '[1]+1', 'source:' + stringify(source), 'stack:error.stack'].join(',') + '}');

                        stacks.push('}');
                    } else {
                        scripts.forEach(function (script) {
                            mappings.push(mapping(script.code, script.tplToken));
                            stacks.push(trim(script.code));
                        });
                    }

                    if (extendMode) {
                        stacks.push(OUT + '=\'\'');
                        stacks.push(INCLUDE + '(' + FROM + ',' + DATA + ',' + BLOCKS + ')');
                    }

                    stacks.push('return ' + OUT);
                    stacks.push('}');

                    var renderCode = stacks.join('\n');

                    try {
                        var result = new Function(IMPORTS, OPTIONS, 'return ' + renderCode)(imports, options);
                        result.mappings = mappings;
                        result.sourcesContent = [source];
                        return result;
                    } catch (error) {

                        var index = 0;
                        var line = 0;
                        var start = 0;
                        var generated = void 0;

                        while (index < scripts.length) {
                            var current = scripts[index];
                            if (!this.checkExpression(current.code)) {
                                line = current.tplToken.line;
                                start = current.tplToken.start;
                                generated = current.code;
                                break;
                            }
                            index++;
                        };

                        throw {
                            name: 'CompileError',
                            path: filename,
                            message: error.message,
                            line: line + 1,
                            column: start + 1,
                            source: source,
                            generated: generated,
                            stack: error.stack
                        };
                    }
                };

                return Compiler;
            }();

            ;

            /**
             * 模板内置常量
             */
            Compiler.CONSTS = {
                DATA: DATA,
                IMPORTS: IMPORTS,
                PRINT: PRINT,
                INCLUDE: INCLUDE,
                EXTEND: EXTEND,
                BLOCK: BLOCK,
                OPTIONS: OPTIONS,
                OUT: OUT,
                LINE: LINE,
                BLOCKS: BLOCKS,
                SLICE: SLICE,
                FROM: FROM,
                ESCAPE: ESCAPE,
                EACH: EACH
            };

            module.exports = Compiler;

            /***/ }),
        /* 9 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var isKeyword = __webpack_require__(10);
            var jsTokens = __webpack_require__(2).default;
            var matchToToken = __webpack_require__(2).matchToToken;

            /**
             * 将逻辑表达式解释为 Tokens
             * @param {string} code
             * @return {Object[]}
             */
            var esTokenizer = function esTokenizer(code) {
                var tokens = code.match(jsTokens).map(function (value) {
                    jsTokens.lastIndex = 0;
                    return matchToToken(jsTokens.exec(value));
                }).map(function (token) {
                    if (token.type === 'name' && isKeyword(token.value)) {
                        token.type = 'keyword';
                    }
                    return token;
                });

                return tokens;
            };

            module.exports = esTokenizer;

            /***/ }),
        /* 10 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


// List extracted from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords
            var reservedKeywords = {
                'abstract': true,
                'await': true,
                'boolean': true,
                'break': true,
                'byte': true,
                'case': true,
                'catch': true,
                'char': true,
                'class': true,
                'const': true,
                'continue': true,
                'debugger': true,
                'default': true,
                'delete': true,
                'do': true,
                'double': true,
                'else': true,
                'enum': true,
                'export': true,
                'extends': true,
                'false': true,
                'final': true,
                'finally': true,
                'float': true,
                'for': true,
                'function': true,
                'goto': true,
                'if': true,
                'implements': true,
                'import': true,
                'in': true,
                'instanceof': true,
                'int': true,
                'interface': true,
                'let': true,
                'long': true,
                'native': true,
                'new': true,
                'null': true,
                'package': true,
                'private': true,
                'protected': true,
                'public': true,
                'return': true,
                'short': true,
                'static': true,
                'super': true,
                'switch': true,
                'synchronized': true,
                'this': true,
                'throw': true,
                'transient': true,
                'true': true,
                'try': true,
                'typeof': true,
                'var': true,
                'void': true,
                'volatile': true,
                'while': true,
                'with': true,
                'yield': true
            };

            module.exports = function(str) {
                return reservedKeywords.hasOwnProperty(str);
            };


            /***/ }),
        /* 11 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var TYPE_STRING = 'string';
            var TYPE_EXPRESSION = 'expression';
            var TYPE_RAW = 'raw';
            var TYPE_ESCAPE = 'escape';

            function Match(content, line, start, end) {
                var match = new String(content);
                match.line = line;
                match.start = start;
                match.end = end;
                return match;
            }

            /**
             * 将模板转换为 Tokens
             * @param {string}      source
             * @param {Object[]}    rules     @see defaults.rules
             * @param {Object}      context
             * @return {Object[]}
             */
            var tplTokenizer = function tplTokenizer(source, rules) {
                var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


                var tokens = [{
                    type: TYPE_STRING,
                    value: source,
                    line: 0,
                    start: 0,
                    end: source.length
                }];

                var walk = function walk(rule) {

                    var flags = rule.test.ignoreCase ? 'ig' : 'g';
                    var pattern = rule.test.source + '|^$|[\\w\\W]';
                    var group = new RegExp(pattern, flags);

                    for (var index = 0; index < tokens.length; index++) {

                        if (tokens[index].type !== TYPE_STRING) {
                            continue;
                        }

                        var line = tokens[index].line;
                        var start = tokens[index].start;
                        var end = tokens[index].end;

                        var matchs = tokens[index].value.match(group);
                        var substitute = [];

                        for (var m = 0; m < matchs.length; m++) {
                            var value = matchs[m];

                            rule.test.lastIndex = 0;

                            var values = rule.test.exec(value);
                            var type = values ? TYPE_EXPRESSION : TYPE_STRING;
                            var lastSubstitute = substitute[substitute.length - 1];
                            var lastToken = lastSubstitute || tokens[index];
                            var lastValue = lastToken.value;

                            if (lastToken.line === line) {
                                start = lastSubstitute ? lastSubstitute.end : start;
                            } else {
                                start = lastValue.length - lastValue.lastIndexOf('\n') - 1;
                            }

                            end = start + value.length;

                            var token = { type: type, value: value, line: line, start: start, end: end };

                            if (type === TYPE_STRING) {

                                if (lastSubstitute && lastSubstitute.type === TYPE_STRING) {

                                    lastSubstitute.value += value;
                                    lastSubstitute.end += value.length;
                                } else {

                                    substitute.push(token);
                                }
                            } else {

                                values[0] = new Match(values[0], line, start, end);
                                var script = rule.use.apply(context, values);
                                token.script = script;
                                substitute.push(token);
                            }

                            line += value.split(/\n/).length - 1;
                        }

                        tokens.splice.apply(tokens, [index, 1].concat(substitute));
                        index += substitute.length - 1;
                    }
                };

                for (var i = 0; i < rules.length; i++) {
                    walk(rules[i]);
                }

                return tokens;
            };

            tplTokenizer.TYPE_STRING = TYPE_STRING;
            tplTokenizer.TYPE_EXPRESSION = TYPE_EXPRESSION;
            tplTokenizer.TYPE_RAW = TYPE_RAW;
            tplTokenizer.TYPE_ESCAPE = TYPE_ESCAPE;

            module.exports = tplTokenizer;

            /***/ }),
        /* 12 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";
            /* WEBPACK VAR INJECTION */(function(global) {

                /*! art-template@runtime | https://github.com/aui/art-template */

                var detectNode = __webpack_require__(0);
                var runtime = Object.create(detectNode ? global : window);
                var ESCAPE_REG = /["&'<>]/;

                /**
                 * 编码模板输出的内容
                 * @param  {any}        content
                 * @return {string}
                 */
                runtime.$escape = function (content) {
                    return xmlEscape(toString(content));
                };

                /**
                 * 迭代器，支持数组与对象
                 * @param {array|Object} data
                 * @param {function}     callback
                 */
                runtime.$each = function (data, callback) {
                    if (Array.isArray(data)) {
                        for (var i = 0, len = data.length; i < len; i++) {
                            callback(data[i], i);
                        }
                    } else {
                        for (var _i in data) {
                            callback(data[_i], _i);
                        }
                    }
                };

// 将目标转成字符
                function toString(value) {
                    if (typeof value !== 'string') {
                        if (value === undefined || value === null) {
                            value = '';
                        } else if (typeof value === 'function') {
                            value = toString(value.call(value));
                        } else {
                            value = JSON.stringify(value);
                        }
                    }

                    return value;
                };

// 编码 HTML 内容
                function xmlEscape(content) {
                    var html = '' + content;
                    var regexResult = ESCAPE_REG.exec(html);
                    if (!regexResult) {
                        return content;
                    }

                    var result = '';
                    var i = void 0,
                        lastIndex = void 0,
                        char = void 0;
                    for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {

                        switch (html.charCodeAt(i)) {
                            case 34:
                                char = '&#34;';
                                break;
                            case 38:
                                char = '&#38;';
                                break;
                            case 39:
                                char = '&#39;';
                                break;
                            case 60:
                                char = '&#60;';
                                break;
                            case 62:
                                char = '&#62;';
                                break;
                            default:
                                continue;
                        }

                        if (lastIndex !== i) {
                            result += html.substring(lastIndex, i);
                        }

                        lastIndex = i + 1;
                        result += char;
                    }

                    if (lastIndex !== i) {
                        return result + html.substring(lastIndex, i);
                    } else {
                        return result;
                    }
                };

                module.exports = runtime;
                /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

            /***/ }),
        /* 13 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var toString = Object.prototype.toString;
            var toType = function toType(value) {
                // Null: 兼容 IE8
                return value === null ? 'Null' : toString.call(value).slice(8, -1);
            };

            /**
             * 快速继承默认配置
             * @param   {Object}    options
             * @param   {?Object}   defaults
             * @return  {Object}
             */
            var extend = function extend(target, defaults) {
                var object = void 0;
                var type = toType(target);

                if (type === 'Object') {
                    object = Object.create(defaults || {});
                } else if (type === 'Array') {
                    object = [].concat(defaults || []);
                }

                if (object) {
                    for (var index in target) {
                        if (target.hasOwnProperty(index)) {
                            object[index] = extend(target[index], object[index]);
                        }
                    }
                    return object;
                } else {
                    return target;
                }
            };

            module.exports = extend;

            /***/ }),
        /* 14 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            /**
             * 载入子模板
             * @param   {string}    filename
             * @param   {Object}    data
             * @param   {Object}    blocks
             * @param   {Object}    options
             * @return  {string}
             */
            var include = function include(filename, data, blocks, options) {
                var compile = __webpack_require__(1);
                options = options.$extend({
                    filename: options.resolveFilename(filename, options),
                    bail: true,
                    source: null
                });
                return compile(options)(data, blocks);
            };

            module.exports = include;

            /***/ }),
        /* 15 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            /**
             * 调试器
             * @param   {Object}    error
             * @param   {?Object}   options
             * @return  {string}
             */
            var onerror = function onerror(error /*, options*/) {
                console.error(error.name, error.message);
            };

            module.exports = onerror;

            /***/ }),
        /* 16 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var caches = {
                __data: Object.create(null),

                set: function set(key, val) {
                    this.__data[key] = val;
                },

                get: function get(key) {
                    return this.__data[key];
                },

                reset: function reset() {
                    this.__data = {};
                }
            };

            module.exports = caches;

            /***/ }),
        /* 17 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var detectNode = __webpack_require__(0);

            /**
             * 读取模板内容（同步方法）
             * @param   {string}    filename   模板名
             * @param   {?Object}   options
             * @return  {string}
             */
            var loader = function loader(filename /*, options*/) {
                /* istanbul ignore else  */
                if (detectNode) {
                    var fs = __webpack_require__(5);
                    return fs.readFileSync(filename, 'utf8');
                } else {
                    var elem = document.getElementById(filename);
                    return elem.value || elem.innerHTML;
                }
            };

            module.exports = loader;

            /***/ }),
        /* 18 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            /**
             * 简洁模板语法规则
             */
            var artRule = {
                test: /{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/,
                use: function use(match, raw, close, code) {

                    var compiler = this;
                    var options = compiler.options;
                    var esTokens = compiler.getEsTokens(code);
                    var values = esTokens.map(function (token) {
                        return token.value;
                    });
                    var result = {};

                    var group = void 0;
                    var output = raw ? 'raw' : false;
                    var key = close + values.shift();

                    // 旧版语法升级提示
                    var warn = function warn(oldSyntax, newSyntax) {
                        console.warn((options.filename || 'anonymous') + ':' + (match.line + 1) + ':' + (match.start + 1) + '\n' + ('Template upgrade: {{' + oldSyntax + '}} -> {{' + newSyntax + '}}'));
                    };

                    // v3 compat: #value
                    if (raw === '#') {
                        warn('#value', '@value');
                    }

                    switch (key) {

                        case 'set':

                            code = 'var ' + values.join('').trim();
                            break;

                        case 'if':

                            code = 'if(' + values.join('').trim() + '){';

                            break;

                        case 'else':

                            var indexIf = values.indexOf('if');

                            if (~indexIf) {
                                values.splice(0, indexIf + 1);
                                code = '}else if(' + values.join('').trim() + '){';
                            } else {
                                code = '}else{';
                            }

                            break;

                        case '/if':

                            code = '}';
                            break;

                        case 'each':

                            group = artRule._split(esTokens);
                            group.shift();

                            if (group[1] === 'as') {
                                // ... v3 compat ...
                                warn('each object as value index', 'each object value index');
                                group.splice(1, 1);
                            }

                            var object = group[0] || '$data';
                            var value = group[1] || '$value';
                            var index = group[2] || '$index';

                            code = '$each(' + object + ',function(' + value + ',' + index + '){';

                            break;

                        case '/each':

                            code = '})';
                            break;

                        case 'block':

                            group = artRule._split(esTokens);
                            group.shift();
                            code = 'block(' + group.join(',').trim() + ',function(){';
                            break;

                        case '/block':

                            code = '})';
                            break;

                        case 'echo':
                            key = 'print';
                            warn('echo value', 'value');
                        case 'print':
                        case 'include':
                        case 'extend':

                            if (values.join('').trim().indexOf('(') !== 0) {
                                // 执行函数省略 `()` 与 `,`
                                group = artRule._split(esTokens);
                                group.shift();
                                code = key + '(' + group.join(',') + ')';
                                break;
                            }

                        default:

                            if (~values.indexOf('|')) {

                                var v3split = ':'; // ... v3 compat ...

                                // 将过滤器解析成二维数组
                                var _group = esTokens.reduce(function (group, token) {
                                    var value = token.value,
                                        type = token.type;

                                    if (value === '|') {
                                        group.push([]);
                                    } else if (type !== 'whitespace' && type !== 'comment') {
                                        if (!group.length) {
                                            group.push([]);
                                        }
                                        if (value === v3split && group[group.length - 1].length === 1) {
                                            warn('value | filter: argv', 'value | filter argv');
                                        } else {
                                            group[group.length - 1].push(token);
                                        }
                                    }
                                    return group;
                                }, []).map(function (g) {
                                    return artRule._split(g);
                                });

                                // 将过滤器管道化
                                code = _group.reduce(function (accumulator, filter) {
                                    var name = filter.shift();
                                    filter.unshift(accumulator);

                                    return '$imports.' + name + '(' + filter.join(',') + ')';
                                }, _group.shift().join(' ').trim());
                            }

                            output = output || 'escape';

                            break;
                    }

                    result.code = code;
                    result.output = output;

                    return result;
                },

                // 将多个 javascript 表达式拆分成组
                // 支持基本运算、三元表达式、取值、运行函数，不支持 `typeof value` 操作
                // 只支持 string、number、boolean、null、undefined 这几种类型声明，不支持 function、object、array
                _split: function _split(esTokens) {

                    esTokens = esTokens.filter(function (_ref) {
                        var type = _ref.type;

                        return type !== 'whitespace' && type !== 'comment';
                    });

                    var current = 0;
                    var lastToken = esTokens.shift();
                    var punctuator = 'punctuator';
                    var close = /\]|\)/;
                    var group = [[lastToken]];

                    while (current < esTokens.length) {
                        var esToken = esTokens[current];

                        if (esToken.type === punctuator || lastToken.type === punctuator && !close.test(lastToken.value)) {
                            group[group.length - 1].push(esToken);
                        } else {
                            group.push([esToken]);
                        }

                        lastToken = esToken;

                        current++;
                    }

                    return group.map(function (g) {
                        return g.map(function (g) {
                            return g.value;
                        }).join('');
                    });
                }
            };

            module.exports = artRule;

            /***/ }),
        /* 19 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            /**
             * 原生模板语法规则
             */
            var nativeRule = {
                test: /<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/,
                use: function use(match, comment, output, code /*, trimMode*/) {

                    output = {
                        '-': 'raw',
                        '=': 'escape',
                        '': false,
                        // v3 compat: raw output
                        '==': 'raw',
                        '=#': 'raw'
                    }[output];

                    // ejs compat: comment tag
                    if (comment) {
                        code = '/*' + code + '*/';
                        output = false;
                    }

                    // ejs compat: trims following newline
                    // if (trimMode) {}

                    return {
                        code: code,
                        output: output
                    };
                }
            };

            module.exports = nativeRule;

            /***/ }),
        /* 20 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var detectNode = __webpack_require__(0);

            /**
             * HTML 压缩器
             * @param  {string}     source
             * @param  {Object}     options
             * @return {string}
             */
            var htmlMinifier = function htmlMinifier(source, options) {
                if (detectNode) {
                    var _htmlMinifierOptions$;

                    var _htmlMinifier = __webpack_require__(21).minify;
                    var htmlMinifierOptions = options.htmlMinifierOptions;
                    var ignoreCustomFragments = options.rules.map(function (rule) {
                        return rule.test;
                    });
                    (_htmlMinifierOptions$ = htmlMinifierOptions.ignoreCustomFragments).push.apply(_htmlMinifierOptions$, ignoreCustomFragments);
                    source = _htmlMinifier(source, htmlMinifierOptions);
                }

                return source;
            };

            module.exports = htmlMinifier;

            /***/ }),
        /* 21 */
        /***/ (function(module, exports) {

            (function(exports) {
                exports.noop = function(){};
            })(typeof module === 'object' && typeof module.exports === 'object' ? module.exports : window);


            /***/ }),
        /* 22 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            var detectNode = __webpack_require__(0);
            var LOCAL_MODULE = /^\.+\//;

            /**
             * 获取模板的绝对路径
             * @param   {string} filename
             * @param   {Object} options
             * @return  {string}
             */
            var resolveFilename = function resolveFilename(filename, options) {

                /* istanbul ignore else  */
                if (detectNode) {
                    var path = __webpack_require__(5);
                    var root = options.root;
                    var extname = options.extname;

                    if (LOCAL_MODULE.test(filename)) {
                        var from = options.filename;
                        var self = !from || filename === from;
                        var base = self ? root : path.dirname(from);
                        filename = path.resolve(base, filename);
                    } else {
                        filename = path.resolve(root, filename);
                    }

                    if (!path.extname(filename)) {
                        filename = filename + extname;
                    }
                }

                return filename;
            };

            module.exports = resolveFilename;

            /***/ }),
        /* 23 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

            function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

            function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

            /**
             * 模板错误处理类
             * @param   {Object}    options
             */
            var TemplateError = function (_Error) {
                _inherits(TemplateError, _Error);

                function TemplateError(options) {
                    _classCallCheck(this, TemplateError);

                    var _this = _possibleConstructorReturn(this, _Error.call(this, options.message));

                    _this.name = 'TemplateError';
                    _this.message = formatMessage(options);
                    if (Error.captureStackTrace) {
                        Error.captureStackTrace(_this, _this.constructor);
                    }
                    return _this;
                }

                return TemplateError;
            }(Error);

            ;

            function formatMessage(_ref) {
                var name = _ref.name,
                    source = _ref.source,
                    path = _ref.path,
                    line = _ref.line,
                    column = _ref.column,
                    generated = _ref.generated,
                    message = _ref.message;


                if (!source) {
                    return message;
                }

                var lines = source.split(/\n/);
                var start = Math.max(line - 3, 0);
                var end = Math.min(lines.length, line + 3);

                // Error context
                var context = lines.slice(start, end).map(function (code, index) {
                    var number = index + start + 1;
                    var left = number === line ? ' >> ' : '    ';
                    return '' + left + number + '| ' + code;
                }).join('\n');

                // Alter exception message
                return (path || 'anonymous') + ':' + line + ':' + column + '\n' + (context + '\n\n') + (name + ': ' + message) + (generated ? '\n   generated: ' + generated : '');
            }

            module.exports = TemplateError;

            /***/ }),
        /* 24 */
        /***/ (function(module, exports, __webpack_require__) {

            "use strict";


            module.exports = __webpack_require__(3);

            /***/ })
        /******/ ]);
});