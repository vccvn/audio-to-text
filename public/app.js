// cài obj hệ thống
(function (global, docs) {
    if (global.App) {
        return global.App;
    }



    // console log
    var cl = function () {
        console.log.apply(console, arguments);
    };


    // mang
    var arr = [];

    var document = window.document;

    var div = document.createElement("div");

    // var getProto = Object.getPrototypeOf;

    var slice = arr.slice;

    // var concat = arr.concat;

    // var push = arr.push;

    // var indexOf = arr.indexOf;

    // var class2type = {};

    // var toString = class2type.toString;

    // var hasOwn = class2type.hasOwnProperty;

    // var fnToString = hasOwn.toString;

    // var ObjectFunctionString = fnToString.call(Object);

    // var support = {};

    var createElement = document.createElement;

    // var $$;
    if (typeof Object.assign != 'function') {
        Object.assign = function (target, varArgs) { // .length của function là 2
            'use strict';
            if (target == null) { // TypeError nếu undefined hoặc null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Bỏ qua nếu undefined hoặc null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        };
    }

    // if(typeof Object.prototype.isEmpty != "function"){
    //     Object.prototype.isEmpty = function() {
    //         for(var key in this) {
    //             if(this.hasOwnProperty(key))
    //                 return false;
    //         }
    //         return true;
    //     }

    // }

    var isFunction = function isFunction(obj) {

        // Support: Chrome <=57, Firefox <=52
        // In some browsers, typeof returns "function" for HTML <object> elements
        // (i.e., `typeof document.createElement( "object" ) === "function"`).
        // We don't want to classify *any* DOM node as a function.
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };

    var isCallable = function (variable) {
        return typeof variable === "function";
    };

    /**
     * lấy kiểu giá trị của biến
     * @param {*} obj 
     * @return {string}
     */
    var getType = function (obj) {
        var t = 'null';
        var type = typeof obj;
        if (type == 'object') {
            if (obj === null) {
                t = 'null';
            } else if (obj.constructor == FormData) {
                t = 'formdata';
            } else if (obj.constructor == Array) {
                t = 'array';
            } else if (obj.constructor == Object) {
                t = 'object';
            } else if (obj.constructor == Number) {
                t = 'number';
            } else {
                t = 'object';
            }
        } else {
            t = type;
        }
        return t;
    };
    /**
     * kiềm tra có phải chuỗi
     * @param {*} variable biến bất kỳ
     */
    var isString = function isString(variable) {
        var type = getType(variable);
        return type == "string" || type == "number";
    }
    /**
     * kiềm tra có phải null
     * @param {*} variable biến bất kỳ
     */
    var isNull = function isNull(variable) {
        return getType(variable) == "null";
    }
    /**
     * kiềm tra có phải array
     * @param {*} variable biến bất kỳ
     */
    var isArray = function isArray(variable) {
        return getType(variable) == "array";
    }
    /**
     * kiềm tra có phải object
     * @param {*} variable biến bất kỳ
     */
    var isObject = function isObject(variable) {
        return getType(variable) == "object";
    }
    /**
     * kiềm tra có phải number
     * @param {*} variable biến bất kỳ
     */
    var isNumber = function isNumber(variable) {
        var type = getType(variable);
        return (type === "number" || type === "string") && !isNaN(variable - parseFloat(variable));
    }
    /**
     * kiềm tra có phải Formdata
     * @param {*} variable biến bất kỳ
     */
    var isFormData = function isFormData(variable) {
        return getType(variable) == "formdata";
    }

    /**
     * kiềm tra có phải chuỗi
     * @param {*} variable biến bất kỳ
     */
    var isEmail = function isEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    var checkEmptyType = {
        object: function (object) {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        },
        array: function (ar) { return ar.length == 0; },
        string: function (ar) { return ar.length == 0; }
    };
    var isEmpty = function (any) {
        if (typeof any == "undefined") return true;
        var type = getType(any);

        return typeof checkEmptyType[type] == "function" ? checkEmptyType[type](any) : (!any);
    }
    var emptyFunc = function () { };

    /**
     * gán sự kiện cho đối tượng dom
     * @param {Element} el đối tượng dom
     * @param {string} event sự kiện
     * @param {dunction} HandlerCallbackFunction hàm xử lý sự kiện
     */
    var addEventListener = function addEventListener(el, event, HandlerCallbackFunction) {
        if (!(el instanceof Element) && el != document) return false;
        let cb = (typeof HandlerCallbackFunction == "function") ? HandlerCallbackFunction : function (e) {
            App.func.call(HandlerCallbackFunction, [e.target]);
        };
        if (el.addEventListener) {
            el.addEventListener(event, cb);
        } else if (el.attachEvent) {
            el.attachEvent(event, cb);
        }
    }
    /**
     * Hủy một sự kiện trong dom
     * @param {Element} el 
     * @param {string} event 
     * @param {function} callback 
     */
    var removeEventListener = function removeEventListener(el, event, callback) {
        if (!(el instanceof Element) && el != document) return false;
        let cb = (typeof callback == "function") ? callback : function (e) {
            App.func.call(callback, [e.target]);
        };
        if (el.removeEventListener) {
            el.removeEventListener(event, cb);
        }
    }


    /**
     * 
     * @param {object} dst 
     * @param {object} src 
     * @returns {object}
     */
    var merge = function (dst, src) {
        if (!dst || !isObject(dst)) dst = {};
        var to = Object(dst);
        var srclength = arguments.length;
        for (let i = 1; i < srclength; i++) {
            const srcObj = arguments[i];
            if (isObject(srcObj)) {
                for (const key in srcObj) {
                    if (srcObj.hasOwnProperty(key)) {
                        const val = srcObj[key];
                        if ((isObject(val) || isArray(val)) && !isFormData(val) && val.constructor != CrazyXHR && val.constructor != CrazyAJAX && val.constructor != Promise && val.constructor != App.dom.HtmlQuery && val.constructor != App.dom.Form) {
                            var d = {};
                            to[key] = merge(d, val);
                        } else {
                            to[key] = val;
                        }
                    }
                }
            }
        }
        return dst;
    }

    /**
     * sao chép toàn bp65 thuộc tính của một object sang 1 onject mới
     * @param {object} src 
     * @returns {object}
     */
    var deepCopy = function (src) {
        var dst = {};
        var srclength = arguments.length;
        for (let i = 0; i < srclength; i++) {
            const srcObj = arguments[i];
            if (isArray(srcObj) && srclength == 1) {
                dst = [];
                for (let i = 0; i < srcObj.length; i++) {
                    const val = srcObj[i];
                    if ((isObject(val) || isArray(val)) && !isFormData(val) && val.constructor != CrazyXHR && val.constructor != CrazyAJAX && val.constructor != Promise && val.constructor != App.dom.HtmlQuery && val.constructor != App.dom.Form) {
                        dst[i] = deepCopy(val);
                    }
                    else {
                        dst[i] = val;
                    }
                }
            }
            else if (isObject(srcObj)) {
                for (const key in srcObj) {
                    if (srcObj.hasOwnProperty(key)) {
                        const val = srcObj[key];
                        if ((isObject(val) || isArray(val)) && !isFormData(val) && val.constructor != CrazyXHR && val.constructor != CrazyAJAX && val.constructor != Promise && val.constructor != App.dom.HtmlQuery && val.constructor != App.dom.Form) {
                            dst[key] = deepCopy(val);
                        }
                        else {
                            dst[key] = val;
                        }
                    }
                }
            }
        }
        return dst;
    };

    var copyArray = function (src) {
        var arr = [];
        var t = getType(src);
        if (t == 'object' || t == 'array') {
            if (src.length) {
                for (let index = 0; index < src.length; index++) {
                    if (typeof src[index] != "undefined") {
                        arr.push(src[index]);
                    }
                }
            } else if (t == 'object') {
                for (const key in src) {
                    if (src.hasOwnProperty(key)) {
                        const item = src[key];
                        arr.push(item);
                    }
                }
            }
        }
        return arr;
    };


    var combine = function combine(list) {
        var sth = function (lst, i) {
            if (!i) i = 0;
            var ls = [];
            if (lst.length <= i) return [];
            var arr = lst[i];
            arr.map(function (c) {
                var s = c;
                if (i < lst.length - 1) {
                    var tl = sth(lst, i + 1);
                    if (tl.length) {
                        tl.map(function (t) {
                            ls.push(c + "" + t);
                        });
                    } else {
                        ls.push(c);
                    }
                } else {
                    ls.push(c);
                }
            });
            return ls;
        };
        return sth(list);
    };


    var objectKeys = function (obj) {
        var keys = [];
        if (isArray(obj) || isObject(obj)) {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        return keys;
    };
    var objectValues = function (obj) {
        var values = [];
        if (isArray(obj) || isObject(obj)) {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    values.push(obj[key]);
                }
            }
        }
        return values;
    };

    var documentReady = function () {
        if (document.readyState !== 'complete') return;
        return true;


    };

    var isGlobalOrRoot = function (obj) {
        return obj == global || obj == document;
    };


    /**
     * xửu lý hàng đợi
     * @param {function} work hàm thục thi công việc
     * @param {Number} delay thời gian giữa 2 lần chạy task
     * @param {Number} step số lần thực hiện công việc nếu chưa bị reject hay resolve
     */
    var Queue = function (work, delay, step) {
        if (typeof work == "undefined") return this;
        this.status = "pending";
        this.result = null;
        var d = (typeof delay == "undefined" || !isNumber(delay) || delay < 1) ? 10 : delay;
        var s = (typeof step == "undefined" || !isNumber(step) || step < 0) ? -1 : step;
        var self = this;
        var properties = {
            timeDelay: d,
            stepCount: s,
            resolved: false,
            rejected: false,
            cancelled: false,
            stopped: false,
            status: "pending",
            timeId: null,
            turn: 1,
            count: 1
        };
        var methods = {
            then: function (rs) {
                // App.log(rs);
            },
            catch: function (err) {
                App.log(err);
            },
            clear: function () {
                if (properties.timeId) {
                    clearTimeout(properties.timeId);
                    self.status = properties.status;
                }

            },
            run: function () {
                var comtext = this;
                var time = properties.timeDelay || 10;
                var stop = properties.stepCount;
                var resolve = function (rs) {
                    properties.resolved = rs;
                    if (properties.status == "pending") {
                        properties.status = "resolved";
                        self.result = rs;
                        comtext.clear();
                        return comtext.then(rs);
                    }
                    comtext.clear();
                    return true;

                };
                var reject = function (err) {
                    properties.rejected = err;
                    if (properties.status == "pending") {
                        properties.status = "rejected";
                        self.result = err;
                        comtext.catch(err);
                    }
                    comtext.clear();
                    return err;

                };
                var runtask = function () {
                    properties.timeId = setTimeout(function () {
                        if (properties.stepCount > -1 && properties.turn > properties.stepCount) {
                            properties.status = "stoped";
                            properties.stopped = "time out";
                            comtext.clear();
                            return false;
                        } else if (properties.status != "pending") {
                            return false;
                        } else {
                            try {
                                var stt = work(resolve, reject, properties.turn);
                                if (stt !== undefined) {
                                    if (properties.status == "pending") {
                                        comtext.stop();
                                        return false;
                                    }
                                }
                                properties.turn++;
                            } catch (error) {
                                comtext.stop();
                                comtext.catch(error);
                                return false;
                            }
                        }

                        properties.count++;
                        runtask();
                    }, time);
                };
                runtask();
            },
            stop: function () {
                properties.stepCount = 0;
                properties.status = "stopped";
                this.clear();
            },
            delay: function (delay) {
                if (typeof delay == "undefined" || !isNumber(delay) || delay < 1) return;
                properties.timeDelay = delay;
                this.clear();
                this.run();
            },
            step: function (step) {
                if (typeof step == "undefined" || !isNumber(step) || step < -1 || step == 0) return;
                properties.stepCount = step;
                this.clear();
                this.run();
            },
            restart: function () {
                this.clear();
                properties.turn = 1;
                this.run();
            },
            getData: function () {
                return this;
            },
            addThen: function (fn) {
                if (typeof fn == "function") {
                    this.then = fn;
                }
            },
            addCatch: function (fn) {
                if (typeof fn == "function") {
                    this.catch = fn;
                }
            },
            getData: function () {
                return properties;
            }
        };
        this.e = function () {
            if (!arguments.length || typeof arguments[0] != "string") return null;
            var method = arguments[0];
            var r = null;
            if (typeof methods[method] == "function") {
                var args = [];
                for (let i = 1; i < arguments.length; i++) {
                    const arg = arguments[i];
                    args.push(arg);
                }

                r = methods[method].apply(methods, args);
            }
            return r;
        };
        setTimeout(function () {
            methods.run();
        }, 10);
    };

    Queue.prototype = {
        constructor: Queue,
        delay: function (delay) {
            if (typeof delay == "undefined" || !isNumber(delay) || delay < 1) return;
            this.e("delay", delay);
            return this;
        },
        step: function (step) {
            if (typeof step == "undefined" || !isNumber(step) || step < -1 || step == 0) return;
            this.e("step", step);
            return this;
        },
        try: function (step) {
            if (typeof step == "undefined" || !isNumber(step) || step < -1 || step == 0) return;
            this.e("step", step);
            return this;
        },
        restart: function () {
            this.e("restart");
            return this;
        },
        stop: function () {
            this.e("stop");
            return this;
        },
        then: function (fb) {
            if (typeof fn == "function") {
                this.e("addThen", fn);
            }
            return this;
        },
        catch: function (fb) {
            if (typeof fn == "function") {
                this.e("addCatch", fn);
            }
            return this;
        },
        getData: function () {
            return this.e("getData");
        }
    };



    /**
     * Quản lý tiến trình chạy ngầm
     */
    var background = {
        // trạng thái của document
        documentReady: false,
        tasks: {},
        /**
         * thêm task
         * @param {string} name tên task
         * @param {function} task
         */
        addTask: function (name, task) {
            // do somthing
        },
        /**
         * Xóa task
         * @param {string} name tên task
         */
        removeTask: function (name) { },
        /**
         * kiểm tra app đã dc chạy hay chưa
         */
        checkReady: function () {
            if (this.documentReady) return true;
            var self = this;
            // var tid = setInterval(function () {
            //     if (document.readyState !== 'complete') return;
            //     clearInterval(tid);
            //     self.documentReady = true;
            // }, 50);
            var queue = new Queue(function (resolve, reject) {
                if (document.readyState !== 'complete') return;
                self.documentReady = true;
                resolve(true);
            }, 50, 500);
        },
        /**
         * Đưa vào hàng đợi
         * @param {function} work 
         * @param {number} time default 10ms
         */
        queue: function (work, time) {
            if (typeof work == "undefined" || !isCallable(work)) return false;
            if (typeof time == "undefined" || !isNumber(time) || time <= 0) time = 10;
            var tid = setInterval(function () {
                var resolve = function (status) {
                    if (status) {
                        clearInterval(tid);
                    }
                }
                var reject = function () {
                    clearInterval(tid);
                }
                var st = work(resolve, reject);
                if (st !== undefined) clearInterval(tid);
            }, time);
        }
    };




    /**
     * Lớp ứng dụng nền tảng
     * @param {string} mod 
     * @param {object} options 
     */
    var App = function App(mod, options) {
        // thêm module và trả về luôn module đó

        var isConstructor = false;
        if (this instanceof App || this.constructor == App) {
            isConstructor = true;
        }
        var m = mod || null;
        var o = options || null;

        // nếu không được sử sụng từ khóa new
        if (!isConstructor) {
            if (isObject(m)) {

            }
            return App.parse(m, o);
        } else {
            if (typeof m == "object") o = m;
            if (isObject(m)) {
                for (const key in o) {
                    if (o.hasOwnProperty(key)) {
                        const v = o[key];
                        this[key] = v;
                    }
                }
            } else {
                if (isString(m) && m) {
                    this[m] = p;
                }
            }
        }

    };

    /**
     * thuộc tính và phương thức ẩn
     */
    var initOptions = {
        getType: getType,
        isArray: isArray,
        isObject: isObject,
        isString: isString,
        isNumber: isNumber,
        isEmail: isEmail,
        isNull: isNull,
        isFormData: isFormData,
        isEmpty: isEmpty,
        isCallable: isCallable,
        isFunction: isFunction,

        oeiginModules: [],
        log: cl,
        deepCopy: deepCopy,
        copyArray: copyArray,
        objectKeys: objectKeys,
        objectValues: objectValues,
        merge: merge,
        combine: combine,
        addModule: function (name, options) {
            if (!App.exists(name) && !App.isOrigin(name)) {
                if (isObject(options) && typeof options.init != "object") {
                    if (!options.init_list) options.init_list = [];
                    options.init = function (args) {
                        if (!args || typeof args == 'undefined') return;
                        for (var key of this.init_list) {
                            if (typeof args[key] != 'undefined') {
                                var d = args[key];
                                var t = App.getType(d);

                                var t2 = (typeof (this[key]) != 'undefined') ? App.getType(this[key]) : "string";
                                if ((t == 'array' && t2 == 'array') || (t == 'object' && t2 == 'object')) {
                                    for (var k in d) {
                                        var v = d[k];
                                        this[key][k] = v;
                                    }
                                } else {
                                    this[key] = d;
                                }
                            }
                        }
                    }
                }
                App[name] = App.prototype[name] = options;
            }
        },
        parse: function (name, options) {
            if (!name) return null;
            if (isObject(name)) {
                for (const key in name) {
                    if (name.hasOwnProperty(key)) {
                        const opt = name[key];
                        App.parse(key, opt);
                    }
                }
                return true;
            }
            if (App.exists(name)) return App[name];
            App.addModule(name, options);
            if (App.exists(name)) return App[name];
            return null;
        },
        extend: function (name, options) {
            return this.parse(name, options);
        },
        exists: function (name) {
            return typeof App[name] != "undefined";
        },
        isOrigin: function (name) {
            return (App.oeiginModules.indexOf(name) >= 0);
        },
        isReady: function () {
            return background.documentReady;
        },
        setDefault: function (object, data) {
            if (!data || typeof data == 'undefined') return;
            for (var key of object.init_list) {
                if (typeof data[key] != 'undefined') {
                    var d = data[key];
                    var t = this.getType(d);

                    var t2 = (typeof (object[key]) != 'undefined') ? this.getType(object[key]) : "string";
                    if ((t == 'array' && t2 == 'array') || (t == 'object' && t2 == 'object')) {
                        for (var k in d) {
                            var v = d[k];
                            object[key][k] = v;
                        }
                    } else {
                        object[key] = d;
                    }
                }
            }
            return object;
        }
    };
    App.modules = App.prototype;

    for (const key in initOptions) {
        if (initOptions.hasOwnProperty(key)) {
            const val = initOptions[key];
            App[key] = App.modules[key] = App.prototype[key] = val;
        }
    }

    App.queue = App.prototype.queue = function (work, delay, step) {
        if (typeof work == "undefined") return new Faker();
        var d = (typeof delay == "undefined" || !isNumber(delay) || delay < 1) ? 10 : delay;
        var s = (typeof step == "undefined" || !isNumber(step) || step < 0) ? -1 : step;
        return new Queue(work, delay, step);
    };





    /**
     * thiet lap hệ thống
     */
    var systemOptions = {
        cssClassPrefix: "crazy-",
        test: "test",
        domQuery: "D",
        queryEngine: "App.query"
    };


    App.getSystemOption = App.prototype.getSystemOption = function (key) {
        return (typeof key == "undefined") ? systemOptions : (
            isString(key) && typeof systemOptions[key] != "undefined" ? systemOptions[key] : null
        );
    };

    App.setSystemOption = App.prototype.setSystemOption = function (key, value) {
        var self = this;
        if (typeof key == "undefined") return this;
        if (isString(key)) {
            if (key == "domQuery") {
                let t = systemOptions[key];
                if (global[t] == App.query) {
                    delete global[t];
                    global[value] = App.query;
                }
            }
            systemOptions[key] = value;
        }
        else if (isObject(key)) {
            App.setup(key);
        }
        return this;
    };




    App.setup = App.prototype.setup = function (options) {
        if (options && isObject(options)) {
            for (const key in options) {
                if (options.hasOwnProperty(key)) {
                    const value = options[key];
                    this.setSystemOption(key, value);
                }
            }
        }
        return this;
    };


    // doi tượng fake de tranh bi mot vai loi
    var Faker = function () {
        this.then = function () {
            // test
            return this;
        };
        this.catch = function () {
            //
            return this;
        }
    };



    var httpMethods = ["get", "post", "put", "patch", "delete", "head", "options"];

    var crazyRequestApi = {
        getStatus: function () {
            return this.e("get", "status");
        },
        done: function (fn) {
            if (fn) {
                this.e("done", fn);
            }
            return this;
        },
        success: function (fn) {
            if (fn) {
                this.e("done", fn);
            }
            return this;
        },
        then: function (fn) {
            if (fn) {
                this.e("done", fn);
            }
            return this;
        },
        catch: function (fn) {
            if (fn) {
                this.e("error", fn);
            }
            return this;
        },
        error: function (fn) {
            if (fn) {
                this.e("error", fn);
            }
            return this;
        },
        progress: function (fn) {
            if (fn) {
                this.e("progress", fn);
            }
            return this;
        },

        onAbort: function (fn) {
            if (fn) {
                this.e("onAbort", fn);
            }
            return this;
        },

        beforeSend: function (fn) {
            if (fn) {
                this.e("beforeSend", fn);
            }
            return this;
        },
        transform: function (fn) {
            if (fn) {
                this.e("transform", fn);
            }
            return this;
        },
        abort: function (fn) {
            return this.e("abort", fn || null);
        },
        cancel: function (fn) {
            return this.e("abort", fn || null);
        }
    };


    if (!XMLHttpRequest.prototype.sendAsBinary) {
        XMLHttpRequest.prototype.sendAsBinary = function (sData) {
            var nBytes = sData.length, ui8Data = new Uint8Array(nBytes);
            for (var nIdx = 0; nIdx < nBytes; nIdx++) {
                ui8Data[nIdx] = sData.charCodeAt(nIdx) & 0xff;
            }
            /* send as ArrayBufferView...: */
            this.send(ui8Data);
            /* ...or as ArrayBuffer (legacy)...: this.send(ui8Data.buffer); */
        };
    }

    var CrazyXHR = function (url, optionData) {

        var status = null;
        var self = this;

        var xhr = null;
        var isAbort = false;
        var properties = {
            status: 0,
            response: null,
            result: null,
            message: ""
        };

        var events = {
            done: [],
            error: [],
            progress: [],
            abort: [],
            beforeSend: [],
            transform: []
        };
        var options = optionData || {};

        setTimeout(function () {
            if (isAbort) {
                var ab = events.abort.length ? events.abort.shift() : emptyFunc;
                ab("Bị hủy");
                return;
            }
            var eventList = ["done", "success", "error", "transform", "progress", "beforeSend"];
            eventList.map(function (evt) {
                if (evt == "success") evt = "done";
                if (options[evt] && events[evt] != undefined && events[evt].length == 0 && isCallable(options[evt])) {
                    events[evt].push(options[evt]);
                }
            });

            if (url) {
                if (isObject(url)) {
                    options = url;
                }
                else {
                    options.url = url;
                }
                var method = options.method ? options.method.toUpperCase() : "GET";
                var dataType = options.dataType || options.responseType || "";
                dataType = (dataType + "").toLowerCase();
                var sUrl = options.url || null;
                var headers = App.request.getHeaders();
                var data = options.data || options.body || {};
                var isUpload = options.isUpload || false;
                var responseType = options.responseType || dataType || "";
                responseType = (responseType + "").toLowerCase();
                if (["arraybuffer", "blob", "document", "json", "text"].indexOf(responseType) == -1) responseType = "";

                if (dataType == "json") {
                    data = JSON.stringify(data);
                }
                else if (!isFormData(data) && (isArray(data) || isObject(data)) && !isUpload) data = App.request.toEncodedData(data);
                else if (isUpload) {
                    var d = options.segments || data;
                    data = d;
                }
                if (options.headers && isObject(options.headers)) {
                    for (const key in options.headers) {
                        if (options.headers.hasOwnProperty(key)) {
                            const value = options.headers[key];
                            let k = App.request.strHeaderKey(key);
                            if (typeof headers[k] != "undefined") {
                                if (headers[k].indexOf(value) == -1) {
                                    headers[k] += "; " + value;
                                }
                            } else {
                                headers[k] = value;
                            }
                        }
                    }
                }

                if (dataType == "json") {
                    headers["Content-Type"] = "application/json; charset=UTF-8";
                }
                else if (!Headers["Content-Type"] && isString(data)) {
                    headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
                }
                if (!headers.Accept) {
                    headers.Accept = "application/json; text/javascript; text/html; */*";
                }


                xhr = new XMLHttpRequest();

                xhr.responseType = responseType;

                // progress on transfers from the server to the client (downloads)
                xhr.addEventListener("progress", function (oEvent) {
                    if (oEvent.lengthComputable) {
                        var percentComplete = oEvent.loaded / oEvent.total * 100;
                        var pfn = events.progress.length ? events.progress[0] : emptyFunc;
                        pfn(percentComplete);
                    } else {
                        // Unable to compute progress information since the total size is unknown
                    }
                });
                // load thanh cong
                xhr.addEventListener("load", function (evt) {
                    // console.log("The transfer finished (although we don't know if it succeeded or not).");
                    var success = events.done.length ? events.done.shift() : (typeof options.success == "function" ? options.success : emptyFunc);
                    var error = events.error.length ? events.error.shift() : (typeof options.error == "function" ? options.error : emptyFunc);
                    var transform = events.transform.length ? events.transform.shift() : (typeof options.transform == "function" ? options.transform : null);
                    var progress = events.progress.length ? events.progress.shift() : (typeof options.progress == "function" ? options.progress : emptyFunc);
                    var d = responseType == "text" ? this.responseText : this.response;
                    var data = transform ? transform(d) : d;
                    properties.response = d;
                    properties.result = data;
                    properties.status = this.status;
                    // kết quả trả về từ success
                    var rs = success(data, this);
                    if (rs !== undefined) {

                        var parseResult = function (result) {
                            if (result) {
                                // nếu là promiss hoặc xhr
                                if (result.constructor == CrazyXHR || (("Promise" in global) && result.constructor == Promise)) {
                                    if (events.done.length) {
                                        do {
                                            result.then(events.done.shift());
                                        } while (events.done.length > 0);
                                    }
                                    if (events.error.length) {
                                        do {
                                            result.catch(events.error.shift());
                                        } while (events.error.length > 0);
                                    } else {
                                        result.catch(error);
                                    }
                                    if (result.constructor == CrazyXHR) {
                                        if (events.transform.length) {
                                            do {
                                                result.transform(events.transform.shift());
                                            } while (events.transform.length > 0);
                                        }
                                        if (events.progress.length) {
                                            do {
                                                result.progress(events.progress.shift());
                                            } while (events.progress.length > 0);
                                        } else {
                                            result.progress(progress);
                                        }

                                    }
                                }
                                else if (events.done.length) {
                                    var succeeded = events.done.shift();
                                    result = succeeded(result);
                                }
                            }
                            else if (events.done.length && result !== undefined) {
                                do {
                                    var succeeded = events.done.shift();
                                    result = parseResult(succeeded(result));
                                    if (result === undefined) {
                                        events.done = [];
                                        break;
                                    }
                                } while (events.done.length);
                            }
                            if (result === undefined) {
                                events.done = [];
                            }
                            return result;
                        }
                        // gọi hàm chuẩ kết quả
                        parseResult(rs);
                    }

                });
                // lỗi
                xhr.addEventListener("error", function (evt) {
                    var error = events.error.length ? events.error.shift() : emptyFunc;
                    error(new Error("Lỗi không xác định"));
                });
                // hủy
                xhr.addEventListener("abort", function (evt) {
                    properties.status = -1;
                    var ab = events.abort.length ? events.abort.shift() : emptyFunc;
                    ab(evt);
                });
                // kết thúc
                xhr.addEventListener("loadend", function (e) {

                });
                xhr.open(method, sUrl);
                for (const key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        const value = headers[key];
                        xhr.setRequestHeader(key, value);
                    }
                }
                if (isUpload) {
                    var sBoundary = "---------------------------" + Date.now().toString(16);

                    var fdata = isArray(data) ? data.join("--" + sBoundary + "\r\n") : "";
                    xhr.setRequestHeader("Content-Type", "multipart\/form-data; boundary=" + sBoundary);
                    xhr.sendAsBinary("--" + sBoundary + "\r\n" + fdata + "--" + sBoundary + "--\r\n");
                } else {
                    xhr.send(data);
                }

            } else {
                var error1 = events.error.length ? events.error.shift() : emptyFunc;
                error1(new Error("URL ko hợp lệ"));
            }
        }, 10);

        var methods = {
            set: function (prop, vai) {
                properties[prop] = value;
            },
            get: function (prop) {
                if (prop) {
                    return typeof properties[prop] != "undefined" ? properties[prop] : null;
                }
                return properties;
            },
            done: function (fn) {
                if (typeof fn == "function") {
                    events.done.push(fn);
                }
            },
            error: function (fn) {
                if (typeof fn == "function") {
                    events.error.push(fn);
                }
            },
            onAbort: function (fn) {
                if (typeof fn == "function") {
                    events.abort.push(fn);
                }
            },
            beforeSend: function (fn) {
                if (typeof fn == "function") {
                    events.beforeSend.push(fn);
                }
            },
            progress: function (fn) {
                if (typeof fn == "function") {
                    events.progress.push(fn);
                }
            },

            getXHR: function () {
                return xhr;
            },
            abort: function (fn) {
                isAbort = true;
                if (xhr) {
                    xhr.abort();
                    if (typeof fn == "function") {
                        return fn(xhr);
                    }
                } else {
                    if (typeof fn == "function") {
                        events.abort.push(fn);
                    }
                }

            },
            transform: function (fn) {
                if (typeof fn == "function") {
                    events.transform.push(fn);
                }
            },
            getEvents: function () {
                return events;
            }

        };

        this.e = function () {
            if (!arguments.length || typeof arguments[0] != "string") return null;
            var method = arguments[0];
            var r = null;
            if (typeof methods[method] == "function") {
                var args = [];
                for (let i = 1; i < arguments.length; i++) {
                    const arg = arguments[i];
                    args.push(arg);
                }

                r = methods[method].apply(methods, args);
            }
            return r;
        };


    };


    CrazyXHR.prototype = deepCopy(crazyRequestApi);
    CrazyXHR.prototype.constructor = CrazyXHR;


    // ajax

    var CrazyAJAX = function (url, optionData) {
        var status = null;
        var self = this;

        var $ajax = null;
        var isAbort = false;
        var properties = {
            status: 0,
            response: null,
            result: null,
            message: ""
        };

        var events = {
            done: [],
            error: [],
            progress: [],
            abort: [],
            beforeSend: [],
            transform: []
        };

        var options = typeof url == "object" ? url : (typeof optionData == "object" ? optionData : {});

        setTimeout(function () {
            if (isAbort) {
                var ab = events.abort.length ? events.abort.shift() : emptyFunc;
                ab("Bị hủy");
                return;
            }


            if (url) {

                if (!isObject(url)) {
                    options.url = url;
                }
                var eventList = ["done", "success", "error", "transform", "progress", "beforeSend"];
                eventList.map(function (evt) {
                    if (evt == "success") evt = "done";
                    if (options[evt] && events[evt] != undefined && events[evt].length == 0 && isCallable(options[evt])) {
                        events[evt].push(options[evt]);
                    }
                });

                var data = options.data || options.body || {};
                var method = options.method || options.type || "GET";
                method = method.toUpperCase();
                var sUrl = options.url || null;

                var responseType = options.responseType || options.dataType || "JSON";
                responseType = (responseType + "").toLowerCase();
                if (["arraybuffer", "blob", "document", "json", "text"].indexOf(responseType) == -1) responseType = "JSON";



                var ajaxData = {
                    url: sUrl,
                    type: method,
                    cookie: true,
                    data: data
                };
                if (options.headers) {
                    ajaxData.headers = options.headers;
                }
                if (responseType) {
                    ajaxData.dataType = responseType;
                }
                ajaxData.success = function (res) {
                    // console.log("The transfer finished (although we don't know if it succeeded or not).");
                    var success = events.done.length ? events.done.shift() : (typeof options.success == "function" ? options.success : emptyFunc);
                    var error = events.error.length ? events.error.shift() : (typeof options.error == "function" ? options.error : emptyFunc);
                    var transform = events.transform.length ? events.transform.shift() : (typeof options.transform == "function" ? options.transform : null);
                    var progress = events.progress.length ? events.progress.shift() : (typeof options.progress == "function" ? options.progress : emptyFunc);
                    var d = res;
                    var data = transform ? transform(d) : d;
                    properties.response = d;
                    properties.result = data;
                    // kết quả trả về từ success
                    var rs = success(data);
                    if (rs !== undefined) {

                        var parseResult = function (result) {
                            if (result) {
                                // nếu là promiss hoặc xhr
                                if (result.constructor == CrazyXHR || (("Promise" in global) && result.constructor == Promise) || result.constructor == CrazyAJAX) {
                                    if (events.done.length) {
                                        do {
                                            result.then(events.done.shift());
                                        } while (events.done.length > 0);
                                    }
                                    if (events.error.length) {
                                        do {
                                            result.catch(events.error.shift());
                                        } while (events.error.length > 0);
                                    } else {
                                        result.catch(error);
                                    }
                                    if (result.constructor == CrazyXHR || result.constructor == CrazyAJAX) {
                                        if (events.transform.length) {
                                            do {
                                                result.transform(events.transform.shift());
                                            } while (events.transform.length > 0);
                                        }
                                        if (events.progress.length) {
                                            do {
                                                result.progress(events.progress.shift());
                                            } while (events.progress.length > 0);
                                        } else {
                                            result.progress(progress);
                                        }

                                    }
                                }
                                else if (events.done.length) {
                                    var succeeded = events.done.shift();
                                    result = succeeded(result);
                                }
                            }
                            else if (events.done.length && result !== undefined) {
                                do {
                                    var succeeded = events.done.shift();
                                    result = parseResult(succeeded(result));
                                    if (result === undefined) {
                                        events.done = [];
                                        break;
                                    }
                                } while (events.done.length);
                            }
                            if (result === undefined) {
                                events.done = [];
                            }
                            return result;
                        }
                        // gọi hàm chuẩ kết quả
                        parseResult(rs);
                    }
                };

                ajaxData.error = function (err) {
                    var error1 = events.error.length ? events.error.shift() : emptyFunc;
                    error1(err);
                };
                $ajax = global.jQuery.ajax(ajaxData);


            } else {
                var error1 = events.error.length ? events.error.shift() : emptyFunc;
                error1(new Error("URL ko hợp lệ"));
            }
        }, 10);

        var methods = {
            set: function (prop, vai) {
                properties[prop] = value;
            },
            get: function (prop) {
                if (prop) {
                    return typeof properties[prop] != "undefined" ? properties[prop] : null;
                }
                return properties;
            },
            done: function (fn) {
                if (typeof fn == "function") {
                    events.done.push(fn);
                }
            },
            error: function (fn) {
                if (typeof fn == "function") {
                    events.error.push(fn);
                }
            },
            onAbort: function (fn) {
                if (typeof fn == "function") {
                    events.abort.push(fn);
                }
            },
            beforeSend: function (fn) {
                if (typeof fn == "function") {
                    events.beforeSend.push(fn);
                }
            },
            progress: function (fn) {
                if (typeof fn == "function") {
                    events.progress.push(fn);
                }
            },

            getXHR: function () {
                return $ajax;
            },
            abort: function (fn) {
                isAbort = true;
                if (xhr) {
                    xhr.abort();
                    if (typeof fn == "function") {
                        return fn(xhr);
                    }
                } else {
                    if (typeof fn == "function") {
                        events.abort.push(fn);
                    }
                }

            },
            transform: function (fn) {
                if (typeof fn == "function") {
                    events.transform.push(fn);
                }
            },
            getEvents: function () {
                return events;
            }

        };

        this.e = function () {
            if (!arguments.length || typeof arguments[0] != "string") return null;
            var method = arguments[0];
            var r = null;
            if (typeof methods[method] == "function") {
                var args = [];
                for (let i = 1; i < arguments.length; i++) {
                    const arg = arguments[i];
                    args.push(arg);
                }

                r = methods[method].apply(methods, args);
            }
            return r;
        };


    };

    CrazyAJAX.prototype = deepCopy(crazyRequestApi);
    CrazyAJAX.prototype.constructor = CrazyAJAX;

    App.xhr = App.prototype.xhr = function (url, optionData) {
        if (typeof url == "undefined") return new Faker();
        return new CrazyXHR(url, optionData || {});
    }

    /**
     * fetch data
     */
    App.fetch = App.prototype.fetch = function (url, optionData) {
        if (typeof url == "undefined") return new Faker();
        var data = typeof url == "object" ? url : (typeof optionData == "object" ? optionData : {});
        if (!('fetch' in global)) {
            return App.xhr(url, data);
        }
        if (isObject(url)) {
            date = url;
            url = data.url || null;

        }// set các tham so
        data.headers = new Headers(merge(App.request.getHeaders(), data.headers || {}));
        data.body = data.body || data.data || data.segments || null
        // header, abc 
        var f = fetch(url, data);
        if (typeof data.success == "function") {
            f.then(data.success);
        }
        if (typeof data.error == "function") {
            f.catch(data.error);
        }
        return f;
    }

    App.ajax = App.prototype.ajax = function (url, optionData) {
        if (typeof url == "undefined") return new Faker();

        var data = typeof url == "object" ? url : (typeof optionData == "object" ? optionData : {});

        if (!('jQuery' in global)) {
            return App.xhr(url, data);
        }
        if (isString(url)) {
            data.url = url;
        }
        data.headers = merge(App.request.getHeaders(), data.headers || {});
        // làm gì đó
        return new CrazyAJAX(data);
    }



    App.axios = App.prototype.axios = function (url, optionData) {
        if (typeof url == "undefined") return new Faker();
        var data = optionData || {};
        if (!('axios' in global)) {
            return App.xhr(url, data);
        }
        if (isObject(url)) {
            date = url;
            url = data.url || null;
        } else if (isString(url)) {
            data.url = url;
        }
        data.headers = merge(App.request.getHeaders(), data.headers || {});
        var success, error;
        if (data.method && data.method.toUpperCase() == "GET") {
            data.params = data.body || data.data || {};
        }
        if (typeof data.success == "function") {
            success = data.success;
            delete data.success;
        }
        if (typeof data.error == "function") {
            error = data.error;
            delete data.error;
        }

        // làm gì đó

        var axiosPromiss = global.axios(url, data);
        if (success) {
            axiosPromiss.then(success);
        }
        if (error) {
            axiosPromiss.catch(error);
        }
        return axiosPromiss;
    }





    App.axiosUpload = App.prototype.axiosUpload = function (url, data, optionData) {
        if (typeof url == "undefined") return new Faker();
        var options = optionData || {};
        var body = null;
        if (isObject(url)) {
            options = url;
            url = options.url || null;
            body = options.body || options.data || data || null;
        } else if (isString(url)) {
            if (optionData) {
                body = data;
            } else {
                if (isFormData(data)) {
                    body = data;
                } else if (data.body || data.data) {
                    body = data.body || data.data;
                    if (typeof data.body != "undefined") delete data.body;
                    if (typeof data.data != "undefined") delete data.data;
                    options = data;
                } else {
                    body = options;
                }
            }
        }

        if (!('axios' in global)) {
            options.data = body;
            options.url = url;
            return App.xhr(options);
        }
        options.headers = merge(App.request.getHeaders(), options.headers || {});

        var success, error;
        if (typeof options.success == "function") {
            success = options.success;
            delete options.success;
        }
        if (typeof options.error == "function") {
            error = options.error;
            delete options.error;
        }

        var axiosPromiss = global.axios.post(url, body, options);
        if (success) {
            axiosPromiss.then(success);
        }
        if (error) {
            axiosPromiss.catch(error);
        }
        return axiosPromiss;
    }



    App.request = App.prototype.request = {
        headers: {},
        engine: "xhr",
        engineList: ["xhr", "axios", "fetch", "ajax"],
        setHeaders: function (key, value) {
            if (!key) return this;
            if (isString(key)) {
                key = this.strHeaderKey(key);
                if (value) {

                    if (typeof this.headers[key] == "undefined") {
                        this.headers[key] = [];
                    }
                    if (this.headers[key].indexOf(value) == -1) {
                        this.headers[key].push(value);
                    }
                }
            } else if (isObject(key)) {
                var s;
                for (const k in key) {
                    if (key.hasOwnProperty(k)) {
                        const v = key[k];
                        // s = this.strHeaderKey(k);
                        this.setHeaders(k, v);
                    }
                }
            }
            return this;
        },
        getHeaders: function () {
            var headers = {};
            for (const key in this.headers) {
                if (this.headers.hasOwnProperty(key)) {
                    const values = this.headers[key];
                    headers[key] = values.join("; ");
                }
            }
            return headers;
        },
        toFormData: function (data) {
            var f = new FormData();
            if (typeof data == "undefined") return f;
            if (isFormData(data)) return data;
            if (data) {
                if (isObject(data)) {
                    for (const key in data) {
                        if (data.hasOwnProperty(key)) {
                            const value = data[key];
                            f.append(key, value);
                        }
                    }
                } else if (isArray(data)) {
                    data.map(function (d) {
                        if (isObject(d) && d.name && typeof d.value != "undefined") {
                            f.append(d.name, d.value);
                        }
                    });
                }
            }
            return f;
        },
        strHeaderKey: function (key) {
            return App.str.replace(App.str.ucword(App.str.replace(key, "-", " ")), " ", "-");
        },
        toEncodedData: function (data) {
            var s = [];
            var addData = function (d) {
                if (d && isObject(d)) {
                    for (const fn in d) {
                        if (d.hasOwnProperty(fn)) {
                            const dat = d[fn];
                            if (isArray(dat)) {
                                if (dat && dat.length) {
                                    for (let i = 0; i < dat.length; i++) {
                                        const d = dat[i];
                                        if (isArray(d)) {
                                            var fname = fn.substring(fn.length - 2) == '[]' ? fn : fn + '[]';
                                            for (let j = 0; j < d.length; j++) {
                                                const vd = d[j];
                                                s.push(encodeURIComponent(fname) + "=" + encodeURIComponent(vd));
                                            }
                                        } else {
                                            s.push(encodeURIComponent(fn) + "=" + encodeURIComponent(d));
                                        }
                                    }
                                }
                            } else {
                                if (isArray(dat)) {
                                    var fname = fn.substring(fn.length - 2) == '[]' ? fn : fn + '[]';
                                    for (let j = 0; j < dat.length; j++) {
                                        const vd = dat[j];
                                        s.push(encodeURIComponent(fname) + "=" + encodeURIComponent(vd));
                                    }
                                } else {
                                    s.push(encodeURIComponent(fn) + "=" + encodeURIComponent(dat));
                                }


                            }
                        }
                    }

                }
            }
            if (isObject(data)) addData(data);
            else if (isArray(data)) {
                data.map(function (t) {
                    if (t.name && typeof t.value != "undefined") {
                        var d = {};
                        d[t.name] = t.value;
                        addData(d);
                    } else {
                        addData(t);
                    }

                })
            }
            return s.join("&");
        },
        setEngine: function (engine) {
            if (engine && isString(engine)) {
                var eng = engine.toLowerCase();
                if (this.engineList.indexOf(eng) >= 0) {
                    this.engine = eng;
                }
            }
            return this;
        },
        getEngine: function () {
            var eng = this.engine.toLowerCase();
            var engineFunc = this.engineList.indexOf(eng) >= 0 ? App[eng] : App.xhr;
            return engineFunc;
        }
    };

    httpMethods.map(function (method) {
        var mt = method.toUpperCase();
        /**
         * gửi request dạng {mt} 
         * @param {string|option} url url hoặc option
         * @param {object|null|undefined} options tham số tùy chọn
         */

        App.request[method] = function (url, options) {
            if (typeof url == "undefined") return new Faker();
            var data = options || {};
            if (isObject(url)) {
                date = deepCopy(url);
                url = data.url || null;
            }
            data.method = mt;
            return this.getEngine()(url, data);
        }
    });

    App.request.axiosUpload = App.axiosUpload;


    App.request.queryString = function queryString(key) {
        var pairs = window.location.search.substring(1).split("&"),
            obj = {},
            pair,
            i;

        for (i in pairs) {
            if (pairs.hasOwnProperty(i)) {
                if (pairs[i] === "") continue;

                pair = pairs[i].split("=");
                obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);

            }
        }

        if (typeof key != "undefined") {
            return typeof obj[key] != "undefined" ? obj[key] : null;
        }
        return obj;
    };



    /**
     * thao tác với dom thông qua html query gần giống jquery nhưng ít chức năng hơn
     */
    var domEvents = ("blur focus focusin focusout resize scroll click dblclick " +
        "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
        "change select submit keydown keypress keyup contextmenu load").split(" ");


    /**
     * cái này là thao tác dom ảo
     */


    App.dom = App.prototype.dom = {
        simpleTags: ['img', 'meta', 'link', 'input', 'br', 'hr'],
        parse: function (str) {
            var div = document.createElement('div');
            if ((str instanceof Element)) return str;
            else if (typeof str == "object") {
                if (str instanceof App.dom.DomQuery || str.constructor == App.dom.Query || str.constructor == App.dom.Form || str.constructor == App.query) {
                    if (str.length > 0) {
                        return str[0];
                    } else {
                        return div;
                    }
                }
                else {
                    return this.create(str);
                }
            }
            var div = document.createElement('div');

            div.innerHTML = str.trim();

            // Change this to div.childNodes to support multiple top-level nodes
            return div.firstChild;
        },
        create: function (tag, content, attrs) {
            var tagName = 'div';
            var isSimple = false;
            if (typeof tag == "object") {
                attrs = {};
                for (const kk in tag) {
                    if (tag.hasOwnProperty(kk)) {
                        const vv = tag[kk];
                        let tt = kk.toLowerCase();
                        if (tt == "tag" || tt == "tagname") {
                            tagName = vv.toLowerCase();
                        }
                        else if (tt == "content") {
                            content = vv;
                        }
                        else {
                            attrs[kk] = vv;
                        }
                    }
                }
                if (this.simpleTags.indexOf(tagName.toLowerCase()) >= 0) {
                    isSimple = true;
                }

            } else if (typeof tag == "string") {
                tagName = tag;
            }
            if (isSimple || this.simpleTags.indexOf(tagName.toLowerCase()) >= 0) {
                attrs = content;
                isSimple = true;
            }

            var htmlObject = document.createElement(tagName);
            if (attrs && typeof attrs == "object") {
                for (const prop in attrs) {
                    if (attrs.hasOwnProperty(prop)) {
                        let val = attrs[prop];
                        let key = prop.toLowerCase();
                        let k = key;
                        let f = k.substring(0, 1);
                        let f2 = k.substring(0, 2);
                        let isEvent = domEvents.indexOf(key) >= 0;
                        if (f == '@' || f2 == 'on' || isEvent) {
                            let a = isEvent ? key : k.substring(f == '@' ? 1 : 2);
                            let cb = (typeof val == "function") ? val : function (e) {
                                App.func.call(val, [e.target]);
                            };
                            if (htmlObject.addEventListener) {
                                htmlObject.addEventListener(a, cb);
                            } else if (htmlObject.attachEvent) {
                                htmlObject.attachEvent(a, cb);
                            }
                        } else if (typeof val == 'object') {
                            let attrObj = App.str.convertTextObject({}, val, prop, '-');
                            for (const ak in attrObj) {
                                if (attrObj.hasOwnProperty(ak)) {
                                    const v = attrObj[ak];
                                    htmlObject.setAttribute(ak, v);
                                }
                            }
                        } else if (key == 'class' || key == 'classname') {
                            htmlObject.className = val;
                        }
                        else {
                            htmlObject.setAttribute(prop, val);
                        }
                    }
                }
            }
            if (!isSimple) {
                var cnt = null;
                if (tagName.toLowerCase() == 'textarea') {
                    htmlObject.innerText = content;
                } else if (content instanceof Element) {
                    htmlObject.appendChild(content);
                } else if (content && (typeof content == "object" || content.constructor == Array)) {
                    if (isArray(content)) {
                        for (let i = 0; i < content.length; i++) {
                            const el = content[i];
                            if (el instanceof Element) {
                                htmlObject.appendChild(el);
                            } else if (isObject(el) || isString(el)) {
                                htmlObject.appendChild(this.parse(el));
                            }
                        }
                    }
                    else {
                        htmlObject.appendChild(this.parse(content));
                    }

                } else if (typeof content == "string") {
                    htmlObject.appendChild(this.parse(content));
                }
            }
            return htmlObject;
        },
        input: function (args) {
            if (typeof args == "object") {
                var tagName = 'input';
                var attrs = {};
                var content = null;
                var value = null;
                var type = "text";
                var ignore = [];
                var data = [];
                for (const prop in args) {
                    if (args.hasOwnProperty(prop)) {
                        const val = args[prop];
                        let p = prop.toLowerCase();
                        if (p == 'type') {
                            let v = (typeof val == 'string') ? val.toLowerCase() : 'text';
                            type = v;
                            if (v == 'textarea') {
                                tagName = v;
                                ignore.push("type", "value");
                            } else if (v == "select") {
                                tagName = "select";
                                ignore.push("type", "value", "data");
                            } else {
                                attrs[p] = v;
                            }
                        } else if (ignore.indexOf(p) >= 0) {
                            // next
                        } else {
                            attrs[prop] = val;
                        }
                        if (p == 'value') {
                            value = val;
                        } else if (p == 'data') {
                            data = val;
                        }
                    }
                }
                var attributes = {};
                for (const key in attrs) {
                    if (attrs.hasOwnProperty(key)) {
                        const va = attrs[key];
                        if (ignore.indexOf(key.toLowerCase()) >= 0) {
                            // next
                        } else {
                            attributes[key] = va;
                        }
                    }
                }
                if (type == 'select') {
                    content = [];
                    if (typeof data == "object") {
                        for (const vl in data) {
                            if (data.hasOwnProperty(vl)) {
                                const text = data[vl];
                                let option = { value: vl };
                                if (vl == value) {
                                    option.selected = "selected";
                                }
                                content.push(this.create('option', text, option));
                            }
                        }
                    }
                } else if (type == "textarea") {
                    content = value;
                } else {
                    content = attributes;
                }
                return this.create(tagName, content, attributes);
            }
            return null;
        },
        encode: function (html) {
            var div = document.createElement("div");
            div.appendChild(this.make(html));
            return div.innerHTML;
        },
        decode: function (html) {
            return this.make(html);
        },
        render: function (html, root) {
            if (root instanceof Element) {
                root.appendChild(this.parse(html));
            } else {
                document.body.appendChild(this.parse(html));
            }
        },
        parseClass: function (className) {
            var prefix = App.getSystemOption("cssClassPrefix");
            var cls = '';
            cls += prefix + className;
            if (arguments.length > 1) {
                for (let i = 1; i < arguments.length; i++) {
                    const cln = arguments[i];
                    cls += " " + prefix + cln;
                }
            }
            return cls;
        },
        make: function (tag, content, attributes) {
            return new this.jDom(tag, content, attributes);
        },
        jDom: function (tag, content, attributes) {
            var $html = App.dom;
            this.el = $html.create(tag, content, attributes);
            this.children = [];
            this.parent = null;
            var self = this;
            this.addClass = function (className) {
                this.el.classList.add(className);
                return this;
            };
            this.removeClass = function (className) {
                if (className) {
                    this.el.classList.remove(className);
                } else {
                    this.el.className = "";
                }
                return this;
            };
            this.append = function (child) {
                if (child.constructor == App.dom.jDom) {
                    this.children.push(child);
                    this.el.appendChild(child.el);
                } else {
                    this.el.appendChild($html.parse(child));
                }

                return this;
            };
            this.prepend = function (child) {
                if (child.constructor == App.dom.jDom) {
                    this.children.unshift(child);
                    this.el.insertBefore($html.parse(child.el), this.el.firstChild);
                } else {
                    this.el.insertBefore($html.parse(child), this.el.firstChild);
                }
                return this;
            };

            this.toHTML = function () {
                return $html.encode(this.el);
            };

            this.html = function () {
                return this.el.innerHTML;
            };
            this.text = function () {
                return this.el.innerText;
            };
            this.appendTo = function (parent) {
                if (parent.constructor == App.dom.jDom) {
                    this.parent = parent;
                    parent.append(this);
                } else if (parent instanceof Element) {
                    parent.appendChild(this.el);
                }
                return this;
            }
            this.prependTo = function (parent) {
                if (parent.constructor == App.dom.jDom) {
                    this.parent = parent;
                    parent.prepend(this);
                } else if (parent instanceof Element) {
                    parent.insertBefore(this.el, parent.firstChild);
                }
                return this;
            }
            this.render = function (root) {
                if (root instanceof Element) {
                    root.appendChild(this.el);
                } else {
                    document.body.appendChild(this.el);
                }
            };
            this.remove = function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                } else if (this.el.parentNode) {
                    this.el.parentNode.removeChild(this.el);

                } else {
                    this.el.innerHTML = "";
                    this.el.style.display = "none";
                }
            };
            this.on = function (envent, callback) {
                addEventListener(this.el, envent, callback);
            };
            if (this.el.tagName == "input") {
                this.val = function (value) {
                    if (typeof value != "undefined") {
                        this.el.value = value;
                    }
                    return this.el.value;
                };
            } else if (this.el.tagName == "input") {
                this.val = function (value) {
                    if (typeof value != "undefined") {
                        this.el.innerText = value;
                    }
                    return this.el.innerText;
                }
            } else if (this.el.tagName == "select") {
                this.val = function (value) {
                    if (typeof value != "undefined") {
                        this.el.value = value;
                    }
                    return this.el.value;
                }
            }
        }

    };


    var eventHandler = function (e) {
        console.log(e.target);
    };

    /**
     * mảng chứ các event sự kiện
     * mỗi phần tử trong mảng chứa element, tên sự kiện, handle, và task
     * task là một danh sách gồm callback và data
     */
    App.dom.events = [];
    // thêm sự kiện 

    /**
     * them su kien cho element
     * @param {Element} element dom element
     * @param {string} event ten su kien
     * @param {function} callback
     * @param {string} data 
     * @return {boolean}
     */
    App.dom.addEvent = function (element, event, callback, data) {
        if (!element || !event || (!(element instanceof Element) && !isGlobalOrRoot(element)) || !isString(event) || !callback || !isCallable(callback)) return false;
        event = event.toLowerCase();
        data = data || null;

        // tìm trong danh sách sự kiện có tồn tại sự kiện này chưa
        for (let i = 0; i < this.events.length; i++) {
            const eventData = this.events[i];
            // một cặp element và event là key của một bản ghi dom event
            if (eventData.element === element && eventData.event === event) {
                for (let j = 0; j < eventData.tasks.length; j++) {
                    const evCallback = eventData.tasks[j];
                    if (data) {
                        if (data == evCallback.data && evCallback.callback === callback) return true;
                    } else if (evCallback.callback === callback) return true;
                }
                addEventListener(element, event, callback);
                this.events[i].tasks.push({
                    callback: callback,
                    data: data
                });


                return true;
            }
        }
        addEventListener(element, event, callback);
        this.events.push({
            element: element,
            event: event,
            data: data,
            tasks: [
                {
                    callback: callback,
                    data: data
                }
            ]
        });
        return true;
    };

    /**
     * them su kien cho element
     * @param {Element} element dom element
     * @param {string} event ten su kien
     * @param {function} callback
     * @param {string} data 
     * @return {boolean}
     */

    App.dom.removeEvent = function (element, event, callback, data) {
        // trưởng hợp không gửi element nào thì xóa tất cả
        if (!element || (!(element instanceof Element) && !isGlobalOrRoot(element)) || !isString(event)) {
            for (let i = 0; i < this.events.length; i++) {
                const eventData = this.events[i];
                if (eventData.tasks.length) {
                    eventData.tasks.map(function (task) {
                        removeEventListener(eventData.element, eventData.event, task.callback);
                    });
                }

            }
            this.events = [];

            // 
            return false;
        }
        event = event ? event.toLowerCase() : null;
        data = data || null;
        // duyệt mảng để tím element và event phù hợp
        for (let i = 0; i < this.events.length; i++) {
            const eventData = this.events[i];
            if (eventData.element === element) {
                if (!event) {
                    if (eventData.tasks.length) {
                        eventData.tasks.map(function (task) {
                            removeEventListener(eventData.element, eventData.event, task.callback);
                        });
                    }
                    this.events.splice(i, 1);
                    i--;
                }
                else if (eventData.event === event) {
                    for (let j = 0; j < eventData.tasks.length; j++) {
                        const evCallback = eventData.tasks[j];
                        if (data) {
                            if (data == evCallback.data) {
                                if (callback && isFunction(callback)) {
                                    if (evCallback.callback === callback) {
                                        removeEventListener(eventData.element, eventData.event, evCallback.callback);
                                        this.events[i].tasks.splice(j, 1);
                                        j--;
                                    }
                                }
                            }
                        } else if (callback && isFunction(callback)) {
                            if (evCallback.callback === callback) {
                                removeEventListener(eventData.element, eventData.event, evCallback.callback);
                                this.events[i].tasks.splice(j, 1);
                                j--;
                            }
                        } else {
                            removeEventListener(eventData.element, eventData.event, evCallback.callback);
                            this.events[i].tasks.splice(j, 1);
                            j--;
                        }
                    }
                    if (!this.events[i].tasks.length) {
                        // removeEventListener(eventData.element, eventData.event, eventData.handle);
                        this.events.splice(i, 1);
                        i--;
                    }
                }
            }
        }
    };
    App.dom.getEvents = function (element, event, data) {
        event = event || null;
        element = element || null;
        data = data || null;
        var list = [];
        if (!element && !event) return this.events;
        for (let i = 0; i < this.events.length; i++) {
            const eventData = this.events[i];
            if ((!element || element == eventData.element) && (!event || event == eventData.event)) {
                list.push(eventData);
            }
        }
        return list;
    };
    App.dom.getEventData = function (element, event, data) {
        event = event || null;
        element = element || null;
        data = data || null;
        if (!element && !event) return null;
        for (let i = 0; i < this.events.length; i++) {
            const eventData = this.events[i];
            if ((!element || element == eventData.element) && (!event || event == eventData.event)) {
                return eventData;
            }
        }
        return null;
    };
    var $window = null, $root = null;
    /**
     * lớp bao đối tượng
     * @param {syting|Element|DomQuery} selector 
     * @param {object} options 
     */
    var DomQuery = App.dom.DomQuery = function DomQuery(selector, options) {
        var elements = this.getDomElements(selector);
        let n = 0;
        for (let index = 0; index < elements.length; index++) {
            const el = elements[index];
            this[n] = el;
            n++;
        }
        this.length = n;
        var self = this;

        var data = {};
        var methods = {
            all: function () {
                return elements;
            }
        };
        this.e = function () {
            if (!arguments.length || typeof arguments[0] != "string") return null;
            var method = arguments[0];
            var r = null;
            if (typeof methods[method] == "function") {
                var args = [];
                for (let i = 1; i < arguments.length; i++) {
                    const arg = arguments[i];
                    args.push(arg);
                }
                r = methods[method].apply(this, args);
            }
            return r;

        };
    };

    App.query = App.prototype.query = App.dom.query = App.$ = App.prototype.$ = App.dom.$ = function (selector, options) {
        var a;
        if (selector == document) {
            if ($root) {
                a = $root;
            } else {
                $root = a = new App.dom.DomQuery(selector, options);
            }
        } else if (selector == global) {
            if ($window) {
                a = $window;
            } else {
                a = $window = new App.dom.DomQuery(selector, options);
            }
        } else {
            a = new App.dom.DomQuery(selector, options);
        }
        return a;
    }



    DomQuery.prototype = {
        simpleTags: ['img', 'meta', 'link', 'input', 'br', 'hr'],
        splice: arr.splice,
        constructor: App.dom.DomQuery,
        length: 0,
        toArray: function () {
            return slice.call(this);
        },
        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function (num) {

            // Return all the elements in a clean array
            if (num == null) {
                return slice.call(this);
            }

            // Return just the one element from the set
            return num < 0 ? this[num + this.length] : this[num];
        },

        slice: function () {
            return slice.apply(this, arguments);
        },


        getDomElements: function (selector) {
            if (typeof selector == "undefined") return [];
            var elements = [];
            if (typeof selector == "string") {
                if (selector[0] == "<" && selector[selector.length - 1] == ">") {
                    elements.push(App.dom.parse(selector));
                } else if (selector.indexOf(" ") < 0 && selector.indexOf(">") < 0 && selector.indexOf("]") < 0 && selector.indexOf("[") < 0 && selector.indexOf(",") < 0 && selector.split(".").length < 3 && selector.split(",").length < 2 && selector.split("#").length < 2) {
                    if (selector[0] == "#") {
                        var el = document.getElementById(selector.slice(1));
                        if (el) {
                            elements.push(el);
                        }
                    } else if (selector[0] == "." && selector.lastIndexOf(".") == 0) {
                        var elems = document.getElementsByClassName(selector.slice(1));
                        if (elems && elems.length) {
                            elements = elems;
                        }
                    } else {
                        var els = document.getElementsByTagName(selector);
                        if (els && els.length) {
                            elements = els;
                        }
                    }

                } else {
                    elements = document.querySelectorAll(selector) || [];
                }
            }
            else if (selector instanceof Element || selector.constructor == HTMLHeadingElement || selector.constructor == HTMLElement || isGlobalOrRoot(selector)) {
                elements.push(selector);
            }
            else if (selector.constructor == App.dom.jDom) {
                elements.push(selector.el);
            }
            else if (selector.constructor == App.query || selector.constructor == App.dom.DomQuery || selector.constructor == DomQuery || selector.constructor == App.dom.Form) {
                elements = selector.e("all");
            }
            else if (isArray(selector)) {
                for (let i = 0; i < selector.length; i++) {
                    const elm = selector[i];
                    if (elm instanceof Element || elm == document || elm == global) {
                        elements.push(elm);
                    }
                    else if (elm instanceof App.dom.jDom || elm.constructor == App.dom.jDom) {
                        elements.push(elm.el);
                    }
                }
            }
            return elements;
        },
        on: function () {
            if (this.length) {
                var args = [];
                var event = typeof arguments[0] == "string" ? arguments[0] : "error";
                for (let i = 0; i < arguments.length; i++) {
                    const arg = arguments[i];
                    args.push(arg)
                }
                var self = this;
                for (let j = 0; j < this.length; j++) {
                    const element = this[j];
                    let selector = null;

                    let fn = null;

                    if (args.length == 3) {
                        if (typeof args[2] == "function") {
                            fn = args[2];
                        }
                        if (args[1] instanceof App.dom.DomQuery || args[1].constructor == App.dom.DomQuery || isString(args[1]) || args[1] instanceof Element || isGlobalOrRoot(arg[1])) {
                            selector = args[1];
                            if (!fn) fn = args[2];
                        } else if (isFunction(args[1]) && !fn) {
                            fn = args[1];
                        }
                        if (!fn) {
                            // doan này chưa xong
                            App.func.check();
                        }
                    } else if (args.length == 2) {
                        fn = args[1];
                    }

                    let fnc = fn ? fn : function (e) {
                        console.log(e);
                    };


                    let fnt = fnc;

                    if (typeof fn == "string") {
                        fnt = function (e) {
                            return App.func.call(fn, [e]);
                        };
                    }
                    let cb = fnt;
                    if (selector) {
                        cb = function (e) {
                            let tag = e.target;
                            let evtag = null;
                            // danh sách phần tữ con dược giới hạn bởi phần tử element
                            let children = self.getParentNodes(tag, [tag], element);
                            // danh sách phần tữ con trùng khớp với selector
                            var matchChild = App.query(children).filter(selector).getElements();

                            if (children.length) {
                                for (let n = 0; n < children.length; n++) {
                                    const child = children[n];
                                    for (let m = 0; m < matchChild.length; m++) {
                                        const em = matchChild[m];
                                        if (child == em && em) {
                                            evtag = em;
                                            m += matchChild.length;
                                            n += children.length;
                                        }
                                    }
                                }
                            }
                            if (evtag) {
                                e.stopPropagation();
                                return fnt.apply(evtag, [e, element]);
                            }
                        };
                    }
                    event.split(" ").filter(function (evt) { return (domEvents.indexOf(evt) >= 0); }).map(function (evt) {
                        App.dom.addEvent(element, evt, cb, selector);
                    });

                }
            }
        },
        off: function (events, data) {
            data = data || null;
            if (this.length) {
                var evs = (events && events.length) ? events.split(" ") : domEvents;
                if (evs.length) {
                    for (let i = 0; i < this.length; i++) {
                        const el = this[i];
                        for (let j = 0; j < evs.length; j++) {
                            const ev = evs[j];
                            App.dom.removeEvent(el, ev, null, data);
                        }
                    }

                }
            }
            return this;
        },
        unbind: function () {
            this.off.apply(this, arguments);
            return this;
        },
        getElements: function (selector, filter) {
            if (!this.length) {
                return [];
            }
            var elements = [];
            for (let i = 0; i < this.length; i++) {
                if (typeof this[i] != "undefined") {
                    const element = this[i];
                    elements.push(element);
                }

            }
            if (typeof filter == "function") {
                return elements.filter(filter);
            }
            return elements;
        },
        map: function (mapFunc) {
            if (typeof mapFunc != "function") return [];
            var mapArr = [];
            for (let i = 0; i < this.length; i++) {
                if (typeof this[i] != "undefined") {
                    const element = this[i];
                    let mapEl = mapFunc(element, i);
                    if (mapEl !== undefined) mapArr.push();
                }
            }
            return mapArr;

        },
        each: function (eachFunc) {
            if (typeof eachFunc != "function") return [];
            var mapArr = [];
            for (let i = 0; i < this.length; i++) {
                if (typeof this[i] != "undefined") {
                    const element = this[i];
                    let mapEl = eachFunc(i, element);
                    if (mapEl !== undefined) mapArr.push();
                }
            }
            return mapArr;
        },
        filter: function (selector) {
            var elems = this.getElements();
            var listMatch = App.query(selector).getElements().filter(function (el) {
                for (let i = 0; i < elems.length; i++) {
                    const elem = elems[i];
                    if (el == elem) return true;
                }
                return false;
            });
            return App.query(listMatch);
        },
        children: function (selector) {
            if (!this.length) return App.query();
            var childList = [];
            this.map(function (el) {
                if (el.children.length) {
                    for (let i = 0; i < el.children.length; i++) {
                        const element = el.children[i];
                        childList.push(element);
                    }
                }
            });
            if (!childList.length) return App.query();
            var children = App.query(childList);
            if (typeof selector == "undefined" || selector == null) return children;
            return children.filter(selector);

        },
        getTree: function (elem, list) {
            if (typeof elem == "undefined") return [];
            if (typeof list == "undefined" || !isArray(list)) {
                list = [];
            }
            if (elem instanceof Element) {
                var self = this;
                if (!elem.children.length) return list;
                for (let i = 0; i < elem.children.length; i++) {
                    const child = elem.children[i];
                    list.push(child);
                    if (child.children.length) {
                        list = self.getTree(child, list);
                    }
                }
            }
            return list;
        },
        getParentNodes: function (elem, list, elementStop) {
            if (typeof elem == "undefined") return [];
            if (typeof list == "undefined" || !isArray(list)) {
                list = [];
            }
            if (elem instanceof Element) {
                if (!elem.parentNode || (elementStop && elementStop == elem)) return list;
                var self = this;
                list.push(elem.parentNode);
                list = self.getParentNodes(elem.parentNode, list, elementStop);
            }
            return list;
        },
        parent: function (selector) {
            var list = [];
            this.map(function (el) {
                if (el.parentNode) {
                    list.push(el.parentNode);
                }
            });
            if (!selector) return App.query(list);
            var finders = App.query(selector).getElements();
            var filterList = (finders.length && list.length) ? list.filter(function (el) {
                for (let i = 0; i < finders.length; i++) {
                    const element = finders[i];
                    if (el == element) return true;
                }
                return false;
            }) : [];
            return App.query(filterList);
        },
        closest: function (selector) {
            if (selector == undefined) return this.parent();
            var finder = App.query(selector).getElements();
            var closestList = [];
            var findLength = finder.length;
            if (findLength) {
                var elements = this.getElements();
                var elementLength = elements.length;
                var parents = [];
                var parentLength = 0;
                var parent, find;
                if (findLength == 1) {

                    finder = finder[0];
                    if (elementLength == 1) {
                        parents = this.getParentNodes(elements[0]);
                    } else {
                        for (let i = 0; i < elementLength; i++) {
                            const element = elements[i];
                            let ps = this.getParentNodes(element);
                            ps.map(function (p) {
                                parents.push(p);
                            });
                        }
                    }
                    parentLength = parents.length;
                    for (let n = 0; n < parentLength; n++) {
                        parent = parents[n];
                        if (parent == finder) {
                            if (closestList.indexOf(parent) < 0) {
                                closestList.push(parent);
                            }

                            n += parentLength;
                            break;
                        }
                    }
                } else {
                    if (elementLength == 1) {
                        parents = this.getParentNodes(elements[0]);
                    } else {
                        for (let i = 0; i < elementLength; i++) {
                            const element = elements[i];
                            let ps = this.getParentNodes(element);
                            ps.map(function (p) {
                                parents.push(p);
                            });
                        }
                    }
                    parentLength = parents.length;

                    for (let n = 0; n < parentLength; n++) {
                        parent = parents[n];
                        for (let m = 0; m < findLength; m++) {
                            find = finder[m];
                            if (parent == find) {
                                if (closestList.indexOf(parent) < 0) {
                                    closestList.push(parent);
                                }

                                m += findLength;
                            }
                        }
                    }
                }
            }
            return App.query(closestList);
        },
        is: function (selector) {
            if (this.length == 1) {

                if (isString(selector) && selector.length > 1 && selector.substring(0, 1) == ":") {
                    return (typeof this[0][selector.substring(1)] != 'undefined' && this[0][selector.substring(1)]) ? true : false;
                }
                var $list = App.query(selector);
                if ($list.filter(this[0]).length == 1) {
                    return true;
                }
            }
            return false;
        },
        find: function (selector) {
            if (typeof selector == "undefined" || !selector) return App.query();
            var listChild = [];
            var self = this;
            this.map(function (el) {
                var ch = el.querySelectorAll(selector) || [];
                var l = ch.length;
                if (l) {
                    for (let i = 0; i < l; i++) {
                        const c = ch[i];
                        listChild.push(c);
                    }
                }

            });
            return App.query(listChild);
        },
        get: function get(index) {
            if (typeof index == "undefined") return this;
            if (isNumber(index)) {
                var elements = this.getElements();
                if (typeof elements[index] != "undefined") {
                    return App.query(elements[index]);
                }
            }
            return App.query();
        },
        first: function () {
            return App.query(this.length ? this.getElements(null, function (el, i) {
                return i == 0;
            }) : [])
        },
        last: function () {
            var elements = this.getElements();
            return App.query(elements.length ? elements[elements.length - 1] : []);
        },

        append: function (child) {
            if (child.constructor == App.dom.jDom) {
                this.map(function (el) {
                    el.appendChild(child.el);
                });
            } else {
                this.map(function (el) {
                    el.appendChild(App.dom.parse(child));
                });

            }

            return this;
        },
        prepend: function (child) {
            if (child.constructor == App.dom.jDom) {
                this.map(function (el) {
                    el.insertBefore(App.dom.parse(child.el), el.firstChild);
                });
            } else {
                this.map(function (el) {
                    el.insertBefore(App.dom.parse(child), el.firstChild);
                });

            }
            return this;
        },
        remove: function () {
            this.map(function (el) {
                if (el.parentNode) {
                    el.parentNode.removeChild(el);
                } else if (el.remove && isFunction(el.remove)) {
                    el.remove();
                }
            });
            return this;
        },

        getProp: function (prop, all) {
            if (!this.length) return "";
            if (!all) {
                return (typeof this[0][prop] != "undefined") ? this[0][prop] : null;
            } else {
                var p = [];
                this.map(function (el) {
                    p.push(el[prop]);
                });
                return p;
            }
        },
        setProp: function (prop, value) {
            if (!this.length) return this;
            var props = {};
            if (typeof prop == "object") {
                props = pros
            } else {
                props[prop] = value;
            }
            var elements = this.getElements();
            for (const p in props) {
                if (props.hasOwnProperty(p)) {
                    const val = props[p];
                    elements.map(function (element, index) {
                        element[prop] = val;
                    });
                }
            }

            return this;
        },
        removeProp: function (prop) {
            if (typeof prop != "undefined") {
                var elements = this.e("all");
                if (isString(prop)) prop = [prop];
                if (isArray(prop)) {
                    elements.map(function (el) {
                        prop.map(function (p) {
                            if (isString(p)) {
                                delete el[p];
                            }
                        })
                    });
                }
            }
            return this;
        },
        prop: function (prop, value) {
            if (prop) {
                if (typeof value != "undefined") {
                    if (!this.length) return this;
                    this.map(function (el) {
                        if (value === false) delete el[prop];
                        else el[prop] = value;
                    });
                } else {
                    if (!this.length) return null;
                    return this[0][prop] || null;
                }
            } else {
                if (!this.length) return {};
                var props = {};
                for (const key in this[0]) {
                    if (this[0].hasOwnProperty(key)) {
                        const propVal = this[0][key];
                        props[key] = propVal;
                    }
                }
                return props;
            }
        },
        val: function (value) {
            if (typeof value == "undefined" || value === null) {
                if (!this.length) return null;
                var inputs = this.getElements().filter(function (el) {
                    if (isGlobalOrRoot(el)) return false;
                    var tag = el.tagName.toLowerCase();
                    return (["input", "select", "textarea"].indexOf(tag) >= 0);
                });
                if (inputs.length) {
                    for (let i = 0; i < inputs.length; i++) {
                        const input = inputs[i];
                        let tag = input.tagName.toLowerCase();
                        let type = input.getAttribute("type");
                        if (tag == "textarea" || type == "textarea") {
                            return input.value || input.innerText;
                        } else if (["rasio", "checkbox"].indexOf(type) >= 0) {
                            if (input.checked) {
                                if (input.value != undefined) {
                                    return input.value;
                                } else {
                                    return "on";
                                }
                            }
                            return null;
                        }
                        else {
                            return input.value;
                        }

                    }
                }
                return null;
            } else {
                var inputs = this.getElements().filter(function (el) {
                    if (isGlobalOrRoot(el)) return false;
                    var tag = el.tagName.toLowerCase();
                    return (["input", "select", "tetxtarea"].indexOf(tag) >= 0);
                });
                if (inputs.length) {
                    for (let i = 0; i < inputs.length; i++) {
                        const input = inputs[i];
                        let tag = input.tagName.toLowerCase();
                        if (tag == "textarea") {
                            input.innerText = value
                        } else {
                            input.value = value;
                        }

                    }
                }
            }

            return this;
        },
        serialize: function () {
            if (!this.length || isGlobalOrRoot(this[0]) || this[0].tagName.toLowerCase() != "form") return "";
            var form = this[0];

            // Setup our serialized data
            var serialized = [];

            // Loop through each field in the form
            for (var i = 0; i < form.elements.length; i++) {

                var field = form.elements[i];

                // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
                if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

                // If a multi-select, get all selections
                if (field.type === 'select-multiple') {
                    for (var n = 0; n < field.options.length; n++) {
                        if (!field.options[n].selected) continue;
                        serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
                    }
                }

                // Convert field data to a query string
                else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                    serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
            }

            return serialized.join('&');

        },
        /*!
        * Serialize all form data into a array
        * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
        * @param  {Node}   form The form to serialize
        * @return {array}      The serialized form data
        */
        serializeArray: function () {
            if (!this.length || isGlobalOrRoot(this[0]) || this[0].tagName.toLowerCase() != "form") return [];
            var form = this[0];
            // Setup our serialized data
            // Setup our serialized data
            var serialized = [];
            // Loop through each field in the form
            for (var i = 0; i < form.elements.length; i++) {
                var field = form.elements[i];
                // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
                if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'button') continue;
                // If a multi-select, get all selections
                if (field.type === 'select-multiple') {
                    for (var n = 0; n < field.options.length; n++) {
                        if (!field.options[n].selected) continue;
                        serialized.push({
                            name: field.name,
                            value: field.options[n].value
                        });
                    }
                }

                // Convert field data to a query string
                else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                    serialized.push({
                        name: field.name,
                        value: field.value
                    });
                }
            }
            return serialized;
        },


        formdata: function () {
            if (!this.length || isGlobalOrRoot(this[0]) || this[0].tagName.toLowerCase() != "form") return [];
            var form = this[0];
            // Setup our serialized data

            // Setup our serialized data
            var f = new FormData(form);
            return f;

        },
        serializeObject: function () {
            var serialized = this.serializeArray();
            var data = {};
            serialized.map(function (inp) {
                if (typeof data[inp.name] != undefined) {
                    if (App.getType(data[inp.name] == 'array')) {
                        data[inp.name].push(inp.value);
                    } else {
                        data[inp.name] = [data[inp.name]];
                    }
                } else {
                    data[inp.name] = inp.value;
                }
            });
            return data;
        },

        getHtml: function (all, joinKey) {
            if (!this.length) return "";
            if (!all && !isGlobalOrRoot(this[0])) {
                return this[0].innerHTML;
            } else {
                var html = "";
                if (!joinKey) joinKey = "";
                html = this.getElements().map(function (el) { return (isGlobalOrRoot(el)) ? "" : el.innerHTML; }).join(joinKey);
                return html;
            }
        },
        html: function (str, all) {
            if (this.length) {
                if (typeof str == "undefined" || str === null) {
                    return this.getHtml(all, "");
                } else {
                    var self = this;
                    var elements = this.getElements(null, function (el) {
                        if (isGlobalOrRoot(el)) return false;
                        var tag = el.tagName.toLowerCase();
                        return self.simpleTags.indexOf(tag) < 0;
                    }).map(function (el) {
                        el.innerHTML = str;
                    });

                }
            }
            return this;
        },
        getAttribute: function (attr) {
            return this.length > 0 ? this[0].getAttribute(attr) : null;
        },
        setAttribute: function (attr, value) {
            this.getElements().map(function (el) { el.setAttribute(attr, value) });
            return this;
        },
        attr: function (attr, value) {
            if ((typeof value == "undefined" || value === null) && typeof attr != "object") {
                return this.getAttribute(attr);
            }
            else if (typeof attr != "undefined" && getType(attr) == "object") {
                var elements = this.getElements();
                for (const key in attr) {
                    if (attr.hasOwnProperty(key)) {
                        const ava = attr[key];
                        elements.map(function (t) {
                            t.setAttribute(key, ava);
                        })
                    }
                }
            }
            else if (typeof attr == "undefined" || attr === null) {
                return this.length ? this[0].attributes : {};
            }

            return this.setAttribute(attr, value)
        },
        data: function (key) {
            if (!this.length) return null;
            if (!this.__data) {
                var data = {};
                var dataRaw = {};

                var attrs = this[0].attributes;
                if (attrs.length) {
                    for (let i = 0; i < attrs.length; i++) {
                        const attr = attrs[i];
                        if (attr.name.toLowerCase().indexOf("data-") === 0) {
                            let a = attr.name.substring(5);
                            dataRaw[a] = attr.value;
                            let b = a.split("-");
                            let c = b.shift();
                            let d = b.map(function (v) { return App.str.ucfirst(v) });
                            let k = c + (d.length ? d.join("") : "");
                            data[k] = attr.value;
                        }
                    }
                }
                this.__data = {
                    raw: dataRaw,
                    parse: data
                };
            }
            if (typeof key == "undefined" || key == null) {
                return this.__data.parse;
            }
            if (typeof key == "string") {
                return (typeof this.__data.raw[key] != "undefined") ? this.__data.raw[key] : null;
            }
            if (isArray(key)) {
                var arrData = {};
                for (let i = 0; i < key.length; i++) {
                    const kk = key[i];
                    if (typeof this.__data.raw[kk] != "undefined") {
                        arrData[kk] = this.__data.raw[kk];
                    }
                }
                return arrData;
            }
            return null;
        },
        addClass: function (classname) {
            var classlist = [];
            var mapFunc = function (val) {
                if (isString(val)) {
                    classlist.push(val);
                } else if (isArray(val)) {
                    val.map(mapFunc);
                }
            };
            if (arguments.length) {
                for (let i = 0; i < arguments.length; i++) {
                    const arg = arguments[i];
                    mapFunc(arg);
                }

            }
            this.getElements(null, function (el) { return !isGlobalOrRoot(el); }).map(function (el) {
                classlist.map(function (str) {
                    el.classList.add(str);
                });
            });
            return this;
        },
        removeClass: function (classname) {
            var elems = this.getElements(null, function (el) { return !isGlobalOrRoot(el); });
            var classlist = [];
            var mapFunc = function (val) {
                if (isString(val)) {
                    classlist.push(val);
                } else if (isArray(val)) {
                    val.map(mapFunc);
                }
            };
            var args = [];

            if (arguments.length) {
                for (let i = 0; i < arguments.length; i++) {
                    const arg = arguments[i];
                    mapFunc(arg);
                }
                elems.map(function (el) {
                    classlist.map(function (str) {
                        el.classList.remove(str);
                    });
                });
            } else {
                elems.map(function (el) {
                    el.className = "";
                });
            }
            return this;
        },
        hasClass: function (classname) {
            if (this.length) {
                return this.length == this.getElements(null, function (el) { return (!isGlobalOrRoot(el) && el.classList.contains(classname)) }).length;
            }
            return false;
        },
        setCssProp: function (element, prop, value) {
            if (element instanceof Element && isString(prop) && isString(value)) {
                element.style[prop] = value;
            }
        },
        getCssProp: function (element, prop) {
            if (element instanceof Element && isString(prop)) {
                return typeof element.style[prop] != "undefined" ? String(element.style[prop]) : "";
            }
            return "";
        },
        css: function (prop, value) {
            var self = this;
            if (!prop || isEmpty(value) || !this.length) {
                return this;
            }
            if (isString(prop)) {
                this.map(function (e) {
                    self.setCssProp(e, App.str.camelToSlug(prop), value);
                });
            } else if (isObject(prop)) {
                var props = {};
                for (const key in prop) {
                    if (prop.hasOwnProperty(key)) {
                        const v = prop[key];
                        var p = App.str.camelToSlug(key);
                        props[p] = v;

                    }
                }
                this.map(function (e) {
                    for (const key in props) {
                        if (props.hasOwnProperty(key)) {
                            const v = props[key];
                            self.setCssProp(e, key, v);
                        }
                    }
                });
            }
            return this;
        },
        show: function (time, callback) {
            var self = this;
            var t = isNumber(time) ? parseInt(time) : 0;
            var cb = isCallable(time) ? time : (isCallable(callback) ? callback : emptyFunc);
            this.css("display", "block");
            if (t > 0) {
                var vpt = 1 / time;
                var opc = 0;
                this.map(function (e) {
                    var opacity = self.getCssProp(e, "opacity");
                    if (opacity == "1") {
                        setTimeout(function () {
                            cb.call(e);
                        }, t);
                        return;
                    }
                    self.setCssProp(e, "opacity", 0);
                    for (let i = 0; i < t; i++) {
                        setTimeout(function () {
                            opc += vpt;
                            self.setCssProp(e, "opacity", opc);
                        }, i + 1);
                    }
                    setTimeout(function () {
                        self.setCssProp(e, "opacity", 1);
                        cb.call(e);
                    }, t);
                });
            } else {
                this.map(function (e) {
                    var opacity = self.getCssProp(e, "opacity");
                    if (opacity == "1") {
                        cb.call(e);
                        return;
                    }
                    self.setCssProp(e, "opacity", 1);
                    cb.call(e);
                });
            }
            return this;
        },
        hide: function (time, callback) {
            var self = this;
            var t = isNumber(time) ? parseInt(time) : 0;
            var cb = isCallable(time) ? time : (isCallable(callback) ? callback : emptyFunc);

            if (t > 0) {
                var vpt = 1 / time;
                var opc = 1;
                this.map(function (e) {
                    var opacity = self.getCssProp(e, "opacity");
                    if (opacity == "0" || opacity == "") {
                        setTimeout(function () {
                            cb.call(e);
                            self.setCssProp(e, "display", "none");
                        }, t);
                        return;
                    }
                    for (let i = 0; i < t; i++) {
                        setTimeout(function () {
                            opc -= vpt;
                            self.setCssProp(e, "opacity", opc);
                        }, i + 1);
                    }
                    setTimeout(function () {
                        self.setCssProp(e, "opacity", 0);
                        self.setCssProp(e, "display", "none");
                        cb.call(e);
                    }, t);
                });
            } else {
                this.map(function (e) {
                    self.setCssProp(e, "opacity", 0);
                    self.setCssProp(e, "display", "none");
                    cb.call(e);
                });
            }

            return this;
        }


    };

    for (let i = 0; i < domEvents.length; i++) {
        const ev = domEvents[i];
        DomQuery.prototype[ev] = function (fn) {
            var args = [ev];
            for (let i = 0; i < arguments.length; i++) {
                const param = arguments[i];
                args.push(param);
            }
            if (args.length == 1) {
                this.map(function (el) {
                    if (el[ev] != undefined && isFunction(el[ev])) {
                        el[ev].call(el);
                    }
                });
                return this;
            }
            return this.on.apply(this, args);

        }
    }



    /**
     * triển khai thêm module
     * @param {object|string} moduleName
     * @param {*} moduleData
     */
    App.addQueryModule = App.prototype.addQueryModule = App.dom.addQueryModule = DomQuery.prototype.extends = function (moduleName, moduleData) {
        if (moduleName) {
            if (isString(moduleName) && !isNumber(moduleName)) {
                DomQuery.prototype[moduleName] = moduleData;
            } else if (isObject(moduleName)) {
                for (const key in moduleName) {
                    if (moduleName.hasOwnProperty(key)) {
                        const val = moduleName[key];
                        DomQuery.prototype[key] = val;
                    }
                }
            }
        }
    }



    var Validator = {

        rules: {
            required: function (value) {
                return typeof value == "undefined" ? undefined : ((isString(value) || isArray(value)) ? value.length > 0 : true);
            },
            email: function (value) {
                return typeof value == "undefined" ? undefined : (isString(value) && isEmail(value));
            },
            number: function (value) {
                return typeof value == "undefined" ? undefined : isNumber(value);
            },
            array: function (value) {
                return typeof value == "undefined" ? undefined : isArray(value);
            },
            min: function (value, params) {
                if (typeof value == "undefined") {
                    return undefined;
                } else if (!isNumber(value)) {
                    return 0;
                } else if (typeof params == "undefined" || !isArray(params) || !params.length || !isNumber(params[0])) {
                    return null;
                }
                return parseFloat(value) >= parseFloat(params[0]);
            },
            max: function (value, params) {
                if (typeof value == "undefined") {
                    return undefined;
                } else if (!isNumber(value)) {
                    return 0;
                } else if (typeof params == "undefined" || !isArray(params) || !params.length || !isNumber(params[0])) {
                    return null;
                }
                return parseFloat(value) <= parseFloat(params[0]);
            },
            not: function (value, params) {
                if (typeof value == "undefined") {
                    return undefined;
                } else if (typeof params == "undefined" || !isArray(params) || !params.length) {
                    return null;
                }
                for (var i = 0, val = params[i]; i < params.length; i++) {
                    if (value === val) return false;
                }
                return true;
            },
            equalTo: function (value, params) {
                if (typeof value == "undefined") {
                    return undefined;
                } else if (typeof params == "undefined" || !isArray(params) || !params.length) {
                    return null;
                }
                for (var i = 0, val = params[i]; i < params.length; i++) {
                    if (value === val) return true;
                }
                return false;
            },
            minlength: function (value, params) {
                if (typeof value == "undefined") {
                    return undefined;
                } else if (typeof params == "undefined" || !isArray(params) || !params.length || !isNumber(params[0])) {
                    return null;
                }
                return String(value).length >= parseFloat(params[0]);
            },
            maxlength: function (value, params) {
                if (typeof value == "undefined") {
                    return undefined;
                } else if (typeof params == "undefined" || !isArray(params) || !params.length || !isNumber(params[0])) {
                    return null;
                }
                return String(value).length <= parseFloat(params[0]);
            },
            mimes: function (value, params) {
                if (typeof value == "undefined") {
                    return undefined;
                } else if (typeof params == "undefined" || !isArray(params) || !params.length) {
                    return null;
                }
                for (let i = 0; i < params.length; i++) {
                    const v = params[i];
                    if (value == v) return true;
                }
                return false;
            }
        },
        messages: {
            required: ":label Không được bỏ trống",
            email: ":label không đúng định dạng email",
            number: ":label phải là số",
            min: ":label phải nhỏ hơn :params",
            min_number: ":label không phải là số",
            min_null: "Tham số validate.min không hợp lệ",
            max: ":label phải lớn hơn :params",
            max_number: ":label không phải là số",
            max_null: "Tham số validate.max không hợp lệ",
            minlength: ":label phải chứa tối thiểu :params ký tự",
            minlength_null: "Tham số validate.minlength không hợp lệ",
            maxlength: ":label không được vượt quá :params ký tự",
            maxlength_null: "Tham số validate.maxlength không hợp lệ",
            not: ":label phải khác :params",
            not_null: "Tham số validate.maxlength không hợp lệ",
            equalTo: ":label phải nằm trong các giá trị :params",
            equalTo_null: "Tham số validate.equalTo không hợp lệ",
        },
        currentMessages: {},
        /**
         * 
         * @param {string|object} rule teên rule
         * @param {function} func hàn thực thi
         * @param {string} message thông báo looi64
         */
        extend: function (rule, func, message) {
            if (!rule) return;
            if (isObject(rule)) {
                if (typeof rule.name == "string" && typeof rule.rule == "function") {
                    this.rules[rule.name] = rule.rule;
                    if (typeof rule.message == "string") this.messages[rule.name] = rule.message;
                } else {
                    for (const n in rule) {
                        if (rule.hasOwnProperty(n)) {
                            const r = rule[n];
                            if (isObject(r) || isCallable(r)) {
                                this.extend(n, r);
                            }
                        }
                    }
                }
                return;
            }
            if (isCallable(rule) && rule.name) {
                this.rules[rule.name] = rule;
                return;
            }
            if (!isString(rule)) return;
            if (!func) return;
            if (isCallable(func)) {
                this.rules[rule] = func;
                if (typeof message == "string") this.messages[rule] = message;
                return;
            }
            if (!isObject(func)) return;
            if (typeof func.rule != "function") return;
            this.rules[rule] = func;
            if (typeof func.message == "string")
                this.messages[rule] = func.message;
        },
        /**
         * lấy về đối tượng chứ các tên hàm được gán kèm tham số
         * @param {string} str chuỗi rule gồm tên và tham số
         */
        parseRule: function (str) {
            if (!str) return null;
            var rule = App.str.replace(str, " ", "").split("|");
            var rules = {};
            var paramStr, params, ruleName = "";

            for (let i = 0; i < rule.length; i++) {
                const rp = rule[i];
                if (rp.length == 0) continue;
                var st = rp.indexOf(":");
                if (st < 1 || st == rp.length - 1) {
                    var rn = App.str.replace(rp, ":", "0");
                    rules[rn] = { rule: rn, str_params: "", params: [] };
                    continue;
                }
                var rps = rp.split(":");
                ruleName = rps[0];
                paramStr = rps[1];
                params = paramStr.split(",");
                rules[ruleName] = {
                    rule: ruleName,
                    str_params: paramStr,
                    params: params
                };
            }
            return rules;
        },
        /**
         * lấy thông báo lỗi
         * @param {string} slug key truy cập data hoặc rule, mwssage
         * @param {string} rule tên rule
         * @param {string} ruleExt phần mở rộng
         * @param {string} label nhãn input
         * @param {strimh} params tham số của rule dạng chuỗi
         * @param {Element} elem 
         * @returns {string}
         */
        parseMessage: function (slug, rule, ruleExt, label, params, elem) {
            var msg = "";
            if (!slug || !isString(slug)) return "";
            ruleExt = ruleExt ? rule + "_" + ruleExt : rule;
            if (!rule) msg = this.currentMessages[slug] || "";
            else if (this.currentMessages[slug + "_" + rule]) msg = this.currentMessages[slug + "_" + rule];
            else if (this.currentMessages[slug]) msg = this.currentMessages[slug];
            else if (this.messages[ruleExt]) msg = this.messages[ruleExt];
            else if (this.messages[rule]) msg = this.messages[rule];
            label = label || slug;
            params = params || label;
            return App.str.replace(msg, { ":label": label, ":params": String(params) });
        },
        /**
         * lấy đói tượng validator
         * @param {object} data dữ liệu lấy từ form
         * @param {object} rules các rule dưới dạng chuỗi key:"rule:tham số"
         * @param {object} messages thông báo lỗi
         */
        make: function (data, rules, messages) {
            rules = (rules && isObject(rules)) ? rules : null;
            var validate = {
                status: true,
                messages: [],
                errors: {},
                errorMap: {},
                errorData: {},
                fields: {},
                allMessage: function () {
                    var list = [];
                    for (const key in this.errors) {
                        if (this.errors.hasOwnProperty(key)) {
                            const msg = this.errors[key];
                            list.push(msg);
                        }
                    }
                    return list;
                }
            };
            if (!rules) return validate;
            var firstError = function () {
                for (const rk in this.errors) {
                    if (this.errors.hasOwnProperty(rk)) {
                        const mess = this.errors[rk];
                        if (isArray(mess)) {
                            if (mess.length) return mess[0];
                        } else {
                            return mess;
                        }

                    }
                }
                return "";
            }
            var getMessage = function (ruleKey, index) {
                var isKey = typeof ruleKey == "string" && ruleKey.length;
                var IsIndex = typeof index == "undefined" && isNumber(index);
                var list = [];
                for (const rk in this.errors) {
                    if (this.errors.hasOwnProperty(rk)) {
                        const mess = this.errors[rk];
                        if (isArray(mess)) {
                            if (isKey && ruleKey == rk) {
                                if (IsIndex) {
                                    if (typeof mess[index] != "undefined") {
                                        return mess[index];
                                    }
                                    return "";
                                } else {
                                    return mess.join(", ");
                                }
                            } else {
                                list.push(mess.join(", "));
                            }
                        } else {
                            if (isKey && ruleKey == rk) {
                                return mess;
                            } else {
                                list.push(mess);
                            }
                        }
                    }
                }
                return list;
            };
            var addFieldError = function (field, name, rule, message) {
                if (!(field instanceof Element)) return;
                name = name || field.name;
                if (typeof validate.fields[name] == "undefined") {
                    validate.fields[name] = {
                        field: field,
                        errors: {},
                        firstError: firstError,
                        getMessage: getMessage
                    }
                }
                validate.fields[name].errors[rule] = message;
            };
            this.currentMessages = (messages && isObject(messages)) ? deepCopy(this.messages, messages) : this.messages;
            isEmptyData = typeof data != "object";
            for (const name in rules) {
                if (rules.hasOwnProperty(name)) {
                    var input = data[name] || null;
                    const ruleStr = rules[name];
                    var ruleObj = this.parseRule(ruleStr);
                    if (ruleObj) {
                        var isRequired = (typeof ruleObj.required != "undefined");

                        // nếu data trống
                        if (isEmptyData) {
                            if (isRequired) {
                                validate.status = false;
                                var msg = this.parseMessage(name, "required");
                                if (msg) {
                                    validate.messages.push(msg);
                                    validate.errors[name] = msg;

                                }
                            }
                        }
                        else if (isRequired && (typeof data[name] == "undefined" || !this.rules.required(data[name].value))) {
                            validate.status = false;
                            var msg = this.parseMessage(name, "required", null, input ? (input.label || input.name) : null);
                            if (msg) {
                                validate.messages.push(msg);
                                validate.errors[name] = msg;
                                validate.errorMap[name + "_required"] = msg;
                                if (typeof validate.errorData[name] == "undefined") validate.errorData[name] = {};
                                validate.errorData[name].required = msg;
                                if (input) {
                                    addFieldError(input.el, nameR, "required", msg);
                                }
                            }

                        }
                        else {
                            // duyệt qua các mãng chứa rules
                            for (const ruleKey in ruleObj) {
                                if (ruleObj.hasOwnProperty(ruleKey)) {
                                    const ruleData = ruleObj[ruleKey];
                                    var f = ruleData.rule;
                                    var check = true;
                                    if (f != "required" && typeof this.rules[f] == "function") {
                                        if (name.lastIndexOf("*") == NamedNodeMap.length - 1 && isArray(input.value) && f != "array") {
                                            var ts = true;
                                            var nameR = name.substring(0, name.length - 2);
                                            for (let n = 0; n < input.value.length; n++) {
                                                const v = input.value[n];
                                                var ruleExt;
                                                var nameN = nameR + "." + n;
                                                check = this.rules[f].call(this.rules, v, ruleData.params, input ? input.el : null);
                                                if (!check) {
                                                    ts = false;
                                                    ruleExt = typeof check == "undefined" ? "undefined" : getType(check);
                                                    var msg = this.parseMessage(nameN, f, ruleExt == "boolean" ? null : ruleExt, input.label || input.name, ruleData.str_params, input.el);
                                                    if (msg) {
                                                        if (validate.messages.indexOf(msg) < 0) validate.messages.push(msg);
                                                        // validate.errors[nameN] = msg;
                                                        if (typeof validate.errorData[nameR] == "undefined") {
                                                            validate.errorData[nameR] = {};
                                                        }
                                                        if (typeof validate.errorData[nameR][n] == "undefined") {
                                                            validate.errorData[nameR][n] = {};
                                                        }
                                                        validate.errorData[nameR][n][f] = msg;
                                                        validate.errorMap[nameR + '_' + n + "_" + "_" + f] = msg;
                                                    }
                                                    validate.status = false;
                                                }
                                            }
                                            if (!ts) {
                                                var msg = this.parseMessage(name, f, ruleExt == "boolean" ? null : ruleExt, input.label || input.name, ruleData.str_params, input.el);
                                                if (msg) {
                                                    if (validate.messages.indexOf(msg) < 0) validate.messages.push(msg);
                                                    addFieldError(input.el, nameR, f, msg);
                                                    validate.errors[name] = msg;
                                                    // validate.errors[nameR] = msg;
                                                    validate.errorMap[nameR + "_" + f] = msg;
                                                    if (typeof validate.errorData[nameR] == "undefined") {
                                                        validate.errorData[nameR] = {};
                                                    }
                                                    validate.errorData[nameR][f] = msg;

                                                }


                                            }
                                        } // if end of name  
                                        else {
                                            check = this.rules[f].call(this.rules, input.value, ruleData.params, input ? input.el : null);
                                            if (!check) {
                                                if ((check === undefined || input.value.length == 0) && !isRequired) {
                                                    // không làm gì cả
                                                }
                                                else {
                                                    var ruleExt = typeof check == "undefined" ? "undefined" : getType(check);
                                                    var msg = this.parseMessage(name, f, ruleExt == "boolean" ? null : ruleExt, input.label || input.name, ruleData.str_params, input.el);
                                                    if (msg) {
                                                        validate.messages.push(msg);
                                                        addFieldError(input.el, name, f, msg);
                                                        validate.errors[name] = msg;
                                                        validate.status = false;

                                                        if (typeof validate.errorData[name] == "undefined") {
                                                            validate.errorData[name] = {};
                                                        }
                                                        validate.errorData[name][f] = msg;
                                                        validate.errorMap[name + '_' + f] = msg;
                                                    }

                                                }
                                            } // end if check fail
                                        } // end if end name condition
                                    } // end if rule in rule object is function
                                } // end if rule has own property (by key)
                            } // end for in rule object
                        } // end if rule item and data condition
                    } // end if rule objext available
                } // end if has own property
            } // end for in rules
            return validate;
        }
    };

    App.validator = App.prototype = Validator;
    App.validate = App.prototype.validate = function (data, rules, messages, fails) {
        var valid = Validator.make(
            data || null,
            rules || null,
            messages || messages
        );
        if (!valid.status) {
            if (typeof fails == "function") {
                return fails(valid);
            }
            console.log(valid);
        }
        return valid.status;
    }/**
 * quản lý form
 */



    var Form = App.dom.Form = function (selector, opts) {
        var elements = this.getDomElements(selector);
        let n = 0;
        for (let index = 0; index < elements.length; index++) {
            const el = elements[index];
            this[n] = el;
            n++;
        }
        this.length = n;
        var current = this.length ? this[0] : null;


        var $data = {};
        var self = this;
        var options = {
            url: null,
            submitType: 'redirect',
            dataType: null,
            validate: null,
            method: null,
            test: ""
        };
        var eventListeners = {};
        var methods = {
            all: function () {
                return elements;
            },
            el: function (num) {
                if (typeof num == "undefined") {
                    return self.length ? self[0] : null
                } else if (isNumber(num)) {
                    return (typeof self[num] != "undefined") ? self[num] : null;
                }
                return null;
            },
            form: function (num) {
                if (typeof num == "undefined") {
                    num = this.getCurrentIndex();
                    return self.length < 2 ? self : self.get(num);
                } else if (isNumber(num)) {
                    return (typeof self[num] != "undefined") ? App.query(self[num]) : App.query();
                }
                else if (num == 'all') {
                    return $form;
                }
                App.query();
            },
            setCurrent: function (element) {
                if (element && element instanceof Element) current = element;
                return self;
            },
            getCurrent: function () {
                return current;
            },
            getCurrentIndex: function () {
                var index = -1;
                if (current) {
                    for (let i = 0; i < elements.length; i++) {
                        const element = elements[i];
                        if (element == current) {
                            index = i;
                            break;
                        }
                    }
                }
                return index;
            },
            getCurrentData: function () {
                var ci = this.getCurrentIndex();
                return (ci >= 0 && typeof $data[ci] != "undefined") ? $data[ci] : null;
            },
            updateCurrentData: function (data) {
                var ci = this.getCurrentIndex();
                if (ci >= 0 && typeof $data[ci] != "undefined") {
                    $data[ci] = data;
                }
            },
            get: function (key) {
                var d = this.getCurrentData();
                if (d == null) return null;
                if (typeof key == "undefined") {
                    return d.data;
                } else if (isString(key)) {
                    return (typeof d.data[key] != "undefined") ? d.data[key] : null;
                }
                return null;
            },
            set: function (key, value) {
                var d = this.getCurrentData();
                if (d == null) return self;
                if (typeof key == "undefined") {
                    return self;
                } else if (isString(key)) {
                    d.data[key] = value;
                }
                else if (isObject(key)) {
                    for (const k in key) {
                        if (key.hasOwnProperty(k)) {
                            const v = key[k];
                            d.data[k] = v;
                        }
                    }
                }
                this.updateCurrentData(d);
                return this;
            },
            getFile: function (key) {
                var d = this.getCurrentData();
                if (d == null) return [];
                if (typeof key == "undefined") {
                    return d.filedata;
                } else if (isString(key)) {
                    return (typeof d.filedata[key] != "undefined") ? d.filedata[key] : [];
                }
                return [];
            },
            setFile: function (key, value) {
                var d = this.getCurrentData();
                if (d == null || typeof key == "undefined") return self;
                else if (isString(key)) {
                    d.filedata[key] = value;
                }
                else if (isObject(key)) {
                    for (const k in key) {
                        if (key.hasOwnProperty(k)) {
                            const v = key[k];
                            d.filedata[k] = v;
                        }
                    }
                }
                this.updateCurrentData(d);
                return self;
            },
            getEvent: function (event) {
                if (typeof event == "undefined") {
                    return eventListeners;
                } else if (isString(event)) {
                    return (typeof eventListeners[event] != "undefined") ? eventListeners[event] : null;
                }
                return null;
            },
            addEvent: function (event, handler) {
                if (typeof event == "undefined") {
                    return self;
                } else if (isString(event) && typeof handler == "function") {
                    eventListeners[event] = handler;
                }
                else if (isObject(event)) {
                    for (const k in event) {
                        if (key.hasOwnProperty(k)) {
                            const v = event[k];
                            if (typeof v == "function")
                                eventListeners[k] = v;
                        }
                    }
                }
                return this;
            },
            setOption: function (key, value) {
                if (typeof key == "undefined") return this;
                if (isObject(key)) {
                    for (const k in key) {
                        const v = key[k];
                        if (key.hasOwnProperty(k)) {
                            if (["done", "error", "then", "catch", "transform", "beforeSenf"].indexOf(k) != -1) {
                                if (typeof v == "function") {
                                    if (typeof self[k] == "function") {
                                        self[k].call(self, v);
                                    }
                                }
                            } else {

                                options[k] = v;
                            }

                        }
                    }
                } else if (typeof value != "undefined") {
                    if (["done", "error", "then", "catch", "transform", "beforeSenf"].indexOf(key) != -1) {
                        if (typeof value == "function") {
                            if (typeof self[key] == "function") {
                                self[key].call(self, value);
                            }
                        }
                    } else {
                        options[key] = value;
                    }

                }
            },
            getOption: function (key) {
                if (typeof key == "undefined") return options;
                return ((isString(key) || isNumber(key)) && typeof options[key] != "undefined") ? options[key] : null;
            },
            getContext: function () {
                return self;
            }
        };
        this.e = function () {
            if (!arguments.length || typeof arguments[0] != "string") return null;
            var method = arguments[0];
            var r = null;
            if (typeof methods[method] == "function") {
                var args = [];
                for (let i = 1; i < arguments.length; i++) {
                    const arg = arguments[i];
                    args.push(arg);
                }
                r = methods[method].apply(methods, args);
            }
            return r;

        };

        methods.setOption(opts);

        this.off("submit").on("submit", function (e) {
            self.e("setCurrent", e.target);
            try {
                var rs = self.onSubmit(e);
                if (methods.getOption("submitType") == "redirect") {
                    return rs;
                }
                else {
                    e.preventDefault();
                    return false;
                }

            } catch (error) {
                cl(error)
                return false;
            }

        });

        this.off("change").on("change", function (e) {
            self.e("setCurrent", App.query(e.target).closest("form")[0]);
            return self.onChange(e);
        });

        for (let i = 0; i < elements.length; i++) {
            const f = elements[i];
            $data[i] = {
                data: {},
                filedata: {}
            };
        }
        $data.length = elements.length;
    };

    Form.prototype = deepCopy(DomQuery.prototype, {
        constructor: App.dom.Form,
        /**
         * Lắng nghe sự kiện change
         * @param {Event} e 
         */
        onChange: function (e) {
            var self = this;
            var tag = e.target;
            var tagname = tag.tagName.toLowerCase();
            var type = tag.type.toLowerCase();
            var $form = this.e("form");
            if (["input", "textarea", "select"].indexOf(tagname) >= 0) {
                if ((this.e("getOption", "serializeFile") || $form.attr("submit-type") == "ajax") && type == "file") {
                    var test = App.files.readFileInput(tag, function (list) {
                        self.e("setFile", tag.name, list);
                    });
                }

            }
        },
        /**
         * Lắng nghe sự kiện submit
         * @param {Event} e sự kiện
         */
        onSubmit: function (e) {
            // lấy môi trường thực thi
            var self = this.e("getContext");
            // lấy sự kiện đính kèm
            var handler = this.e('getEvent', 'submit');
            // lấy form hiện tại
            var currentForm = this.e("getCurrent") || e.target;
            // kết quả dược trả về từ handle sự kiễm submit
            var rs = null;

            try {
                // các thiết lập form
                var options = self.e("getOption");

                var $form = App.query(currentForm); // dối dome query không phải jquery
                // kiểu gửi data
                var submitType = $form.data("submit-type") || $form.attr("submit-type") || options.submitType || "redirect";
                submitType = submitType.toLowerCase();
                var firstSubmitType = submitType;

                var validateData = this.e("getOption", "validate") || this.e("getOption", "validation");
                if (typeof validateData.rules == "object") {
                    var vs = this.validate(
                        validateData.rules,
                        typeof validateData.messages == "object" ? validateData.messages : {},
                        typeof validateData.fails == "function" ? validateData.fails : function (validator) {
                            cl(validator);
                        }
                    );
                    if (!vs) {
                        e.preventDefault();
                        return false;
                    }
                }

                // nếu  sử dụng form api
                if (isCallable(handler)) {
                    rs = handler.apply(currentForm, [e]);
                }
                if (["fetch", "api", "ajax", "xhr", "axios"].indexOf(submitType) == -1) {
                    return rs;
                }
                if (submitType == "ajax" && !globalThis.jQuery && $form.attr("submit-type") == "ajax") {
                    $form.attr("submit-type", "xhr");
                    submitType = "xhr";
                }

                // dường dẫn gửi data
                var url = $form.attr("submit-url") || $form.attr("ajax-url") || $form.data("ajax-url") || options.url || $form.attr("action");

                // kiểu data gửi đi
                var dataType = $form.data("type") || options.dataType || "raw";
                dataType = isString(dataType) ? dataType.toLowerCase() : "raw";

                // phương thức
                var method = options.method || $form.attr("method");
                method = isString(method) ? method.toUpperCase() : "GET";

                // kiểm tra hợp lệ
                if (["POST", "PUT", "PATCH", "DELETE", "OPTIONS", "GET", "HEAD"].indexOf(method) === -1) method = "GET";


                var IsPost = method.toLowerCase() === "post";
                /* console.log("AJAXSubmit - Serializing form..."); */
                var contentType = IsPost && currentForm.enctype ? currentForm.enctype : "application/x-www-form-urlencoded";

                var isUpload = contentType.toLowerCase() == "multipart/form-data" || options.isUpload || false;

                // thân form
                var body = null;


                var responseType = $form.attr("response-type") || options.responseType || "";
                responseType = (responseType + "").toLowerCase();
                if (["arraybuffer", "blob", "document", "json", "text"].indexOf(responseType) == -1) responseType = "";
                // content type
                var contentTypes = [];
                var accept = [];

                if (method == "GET" || dataType == "encoded") {
                    body = self.serialize();
                    contentTypes.push("application/x-www-form-urlencoded", "charset=UTF-8")
                    if (method == "GET") url += ((url.indexOf("?") >= 0) ? "&" : "?") + body;
                }
                else if (!isUpload || submitType == "ajax") {
                    body = self.serializeArray();
                    if (submitType != "ajax") {
                        accept.push("application/json", "text/javascript", "text/html");
                    }
                }
                else if (!isUpload && dataType == "json") {
                    contentTypes.push("application/json");
                    accept.push("application/json")
                    body = self.serializeObject();
                }
                else {
                    body = self.toFormData();
                    accept.push("application/json", "text/javascript", "text/html");
                }



                var headers = {};
                if (contentTypes.length) {
                    headers['Content-type'] = contentTypes.join("; ");
                }

                if (responseType == "json" && accept.indexOf("application/json") == -1) {
                    accept.push("application/json");
                }

                if (accept.length) {
                    headers.Accept = accept.join("; ")
                }
                var eventListeners = self.e("getEvent");
                var success = eventListeners.success || emptyFunc;
                var error = eventListeners.error || emptyFunc;
                var transform = eventListeners.transform || function (rs) { return rs; };
                var beforeSend = eventListeners.beforeSend || emptyFunc;

                var params = {
                    method: method, // 'GET', 'PUT', 'DELETE', etc.
                    responseType: responseType,
                    success: success,
                    error: error,
                    transform: transform,
                    beforeSend: beforeSend,
                    requestApi: firstSubmitType
                };
                if (headers) {
                    params.headers = headers;
                }

                if (submitType == "fetch" || submitType == "api") {
                    params.credentials = "same-origin";
                    params.headers = new Headers(headers);
                    if (["GET", "HEAD"].indexOf(method) == -1) {
                        if (dataType == "json") body = JSON.stringify(body);
                        params.body = body;
                    }
                    var fetchdata = App.fetch(url, params);
                }
                else if (submitType == "xhr" || !submitType) {
                    var xhr;
                    if (["GET", "HEAD"].indexOf(method) == -1) {
                        params.body = body;
                    }
                    xhr = App.xhr(url, params);
                }
                else if (submitType == "axios") {
                    var axiosData;
                    if (isUpload) {
                        axiosData = App.axiosUpload(url, body, params);
                    } else {
                        params.body = body;
                        axiosData = App.axios(url, params);
                    }

                }
                else if (submitType == "ajax") {
                    var ajax;

                    params.data = body;
                    params.url = url;
                    ajax = App.ajax(params);

                }

            } catch (error) {
                cl(error);
                e.preventDefault();
            }



            e.preventDefault();
            return false;

        },
        segments: [],
        fileload: 0,
        fileloadSuccess: 0,
        readComplete: false,
        callback: cl,
        segmentList: [],
        segmentsDone: function () {
            var self = this;
            if (self.fileload == self.fileloadSuccess && !self.readComplete) {
                self.callback(self.segments.map(function (t) {
                    return t;
                }));
                self.readComplete = true;
            }

        },
        pushSegments: function (form, callback) {
            var self = this;
            self.segments = [];
            self.segmentList = [];
            self.fileload = 0;
            self.fileloadSuccess = 0;
            self.readComplete = false;
            if (!form) return;
            if (isCallable(form)) {
                callback = form;
                form = self.e("getCurrent");
            }
            if (!callback || !isCallable(callback)) {
                callback = cl;
            }

            self.callback = callback;
            var elements = form.elements;
            var elength = elements.length;
            var field, n, oFile, fileReader, sFieldType;
            function onFileLoad(oFREvt) {
                this.owner.segments[this.segmentIdx] += oFREvt.target.result + "\r\n";
                self.fileloadSuccess++;
                self.segmentList.push(this.segmentIdx);
                self.segmentsDone();

            }
            for (var i = 0; i < elength; i++) {
                field = elements[i];
                if (!field.hasAttribute("name") || field.disabled) { continue; }

                sFieldType = field.nodeName.toUpperCase() === "INPUT" ? field.getAttribute("type").toUpperCase() : "TEXT";
                if (sFieldType === "FILE" && field.files.length > 0) {

                    /* enctype is multipart/form-data */
                    for (n = 0; n < field.files.length; n++) {
                        oFile = field.files[n];
                        fileReader = new FileReader();
                        /* (custom properties:) */
                        fileReader.segmentIdx = this.segments.length;
                        fileReader.owner = this;
                        /* (end of custom properties) */
                        fileReader.onload = onFileLoad;
                        this.segments.push("Content-Disposition: form-data; name=\"" +
                            field.name + "\"; filename=\"" + oFile.name +
                            "\"\r\nContent-Type: " + oFile.type + "\r\n\r\n");
                        self.fileload++;
                        fileReader.readAsBinaryString(oFile);
                    }

                }
                else if ((sFieldType !== "RADIO" && sFieldType !== "CHECKBOX") || field.checked) {
                    this.segments.push(
                        "Content-Disposition: form-data; name=\"" + field.name + "\"\r\n\r\n" + field.value + "\r\n"

                    );
                }
            }
            if (self.fileload == self.fileloadSuccess) {
                self.segmentsDone();
            }

        },

        hasFile: function () {
            var form = this.e("getCurrent");
            var elements = form.elements;
            var elength = elements.length;

            if (elength == 0) return false;

            for (var i = 0; i < elength; i++) {
                var field = elements[i];
                if (field.type === 'file') {
                    if (field.files.length) {
                        return true;
                    }

                }
            }
            return true;
        },
        toFormData: function () {

            var form = this.e("getCurrent");
            // Setup our serialized data
            var formData = new FormData();
            // Loop through each field in the form
            for (var i = 0; i < form.elements.length; i++) {
                var field = form.elements[i];
                // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
                if (!field.name || field.disabled || field.type === 'reset' || field.type === 'button') continue;
                if (field.type === 'file') {
                    let files = field.files;
                    if (files.length) {
                        for (let j = 0; j < files.length; j++) {
                            const file = files[j];
                            formData.append(field.name, file);
                        }
                    }
                }
                // If a multi-select, get all selections
                else if (field.type === 'select-multiple') {
                    for (var n = 0; n < field.options.length; n++) {
                        if (!field.options[n].selected) continue;
                        formData.append(field.name, field.options[n].value);
                    }
                }

                // Convert field data to a query string
                else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                    formData.append(field.name, field.value);
                }
            }
            return formData;

        },
        getValidateData: function () {

            var form = this.e("getCurrent");
            // Setup our serialized data
            var formData = {};
            var addDataValue = function (field, value) {
                if (!field) return;
                var slug = App.str.formSlug(field.name);
                if (typeof formData[slug] == "undefined") {
                    formData[slug] = {
                        el: field,
                        name: field.name,
                        type: field.type,
                        value: value
                    };
                    return true;
                }
                if (!isArray(formData[slug].value)) {
                    formData[slug].value = [formData[slug].value];
                }
                formData[slug].value.push(value);
            }
            // Loop through each field in the form
            for (var i = 0; i < form.elements.length; i++) {
                var field = form.elements[i];
                var inputType = field.type.toLowerCase();
                // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
                if (!field.name || field.disabled || field.type === 'reset' || field.type === 'button') continue;
                if (field.type === 'file') {
                    let files = field.files;
                    var fieldvals = [];
                    if (files.length) {
                        for (let j = 0; j < files.length; j++) {
                            const file = files[j];
                            fieldvals.push({ name: file.name, type: file.type, size: file.size });
                        }
                    }
                    addDataValue(field, fieldvals);
                }
                // If a multi-select, get all selections
                else if (field.type === 'select-multiple') {
                    var fieldvals = [];
                    for (var n = 0; n < field.options.length; n++) {
                        if (!field.options[n].selected) continue;
                        fieldvals.push(field.options[n].value);
                    }
                    addDataValue(field, fieldvals);
                }

                // Convert field data to a query string
                else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                    addDataValue(field, field.value);
                }
            }
            return formData;

        },
        serialize: function (serializeFile) {
            serializeFile = typeof serializeFile == "undefined" ? null : serializeFile;
            var self = this;
            var $form = this.e("form");
            var form = self.e("getCurrent");
            // Setup our serialized data
            var serialized = [];

            // Loop through each field in the form
            for (var i = 0; i < form.elements.length; i++) {

                var field = form.elements[i];

                // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
                if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

                // If a multi-select, get all selections
                if (field.type === 'select-multiple') {
                    for (var n = 0; n < field.options.length; n++) {
                        if (!field.options[n].selected) continue;
                        serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
                    }
                }

                // Convert field data to a query string
                else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                    serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
            }
            if (this.e("getOption", "serializeFile")) {
                var filedata = self.e("getFile");
                if (filedata) {
                    for (const fn in filedata) {
                        if (filedata.hasOwnProperty(fn)) {
                            const data = filedata[fn];
                            if (isArray(data)) {
                                if (data && data.length) {
                                    for (let i = 0; i < data.length; i++) {
                                        const d = data[i];
                                        serialized.push(encodeURIComponent(fn) + "=" + encodeURIComponent(d));
                                    }
                                }
                            } else {
                                serialized.push(encodeURIComponent(fn) + "=" + encodeURIComponent(data));
                            }

                        }
                    }
                }
            }

            return serialized.join('&');
        },
        serializeArray: function (serializeFile) {
            serializeFile = typeof serializeFile == "undefined" ? null : serializeFile;
            var self = this;
            var form = self.e("getCurrent");
            var $form = self.e("form");

            var serialized = [];
            // Loop through each field in the form
            for (var i = 0; i < form.elements.length; i++) {
                var field = form.elements[i];
                // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
                if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'button') continue;
                // If a multi-select, get all selections
                if (field.type === 'select-multiple') {
                    for (var n = 0; n < field.options.length; n++) {
                        if (!field.options[n].selected) continue;
                        serialized.push({
                            name: field.name,
                            value: field.options[n].value
                        });
                    }
                }

                // Convert field data to a query string
                else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                    serialized.push({
                        name: field.name,
                        value: field.value
                    });
                }
            }

            if (this.e("getOption", "serializeFile") || $form.attr("submit-type") == "ajax" || this.e("getOption", "submitType") == "ajax") {
                var filedata = self.e("getFile");
                if (filedata) {
                    for (const fn in filedata) {
                        if (filedata.hasOwnProperty(fn)) {
                            const data = filedata[fn];

                            if (data && data.length) {
                                serialized.push({
                                    name: fn,
                                    value: data
                                });
                            }
                        }
                    }

                }
            }
            return serialized;
        },
        serializeObject: function () {
            var serialized = this.serializeArray();
            var data = {};
            serialized.map(function (inp) {
                if (typeof data[inp.name] != undefined) {
                    if (App.getType(data[inp.name] == 'array')) {
                        data[inp.name].push(inp.value);
                    } else {
                        data[inp.name] = [data[inp.name]];
                    }
                } else {
                    data[inp.name] = inp.value;
                }
            });
            return data;
        },
        formdata: function () {
            var self = this;
            var $form = this.e("form");
            var $data = $form.formdata();
            return $data;
        },
        /**
         * submit hoặc thêm sự kiện
         * @param {function} fn 
         */
        submit: function (fn) {
            if (typeof fn == "undefined") {
                var form = this.e('form');
                if (form.length) {
                    form[0].submit();
                }
            } else if (isCallable(fn)) {
                this.e('addEvent', 'submit', fn);
            }
            return this;
        },
        /**
         * thêm sự kiện
         * @param {function} fn 
         */
        change: function (fn) {
            if (typeof fn == "undefined") {
                return this;
            } else if (isCallable(fn)) {
                this.e('addEvent', 'change', fn);
            }
            return this;
        },
        done: function (fn) {
            if (typeof fn != "undefined" && isCallable(fn)) {
                this.e('addEvent', 'success', fn);
            }
            return this;
        },
        success: function (fb) {
            return this.done.apply(this, arguments);
        },
        then: function (fb) {
            return this.done.apply(this, arguments);
        },
        transform: function (fn) {
            if (typeof fn != "undefined" && isCallable(fn)) {
                this.e('addEvent', 'transform', fn);
            }
            return this;
        },
        beforeSend: function (fn) {
            if (typeof fn != "undefined" && isCallable(fn)) {
                this.e('addEvent', 'beforeSend', fn);
            }
            return this;
        },

        error: function (fn) {
            if (typeof fn != "undefined" && isCallable(fn)) {
                this.e('addEvent', 'error', fn);
            }
            return this;
        },
        catch: function (fb) {
            return this.error.apply(this, arguments);
        },
        setOption: function (key, value) {
            var k = key || null,
                v = (typeof value != "undefined") ? value : null;
            if (k) {
                this.e("setOption", k, v);
            }
            return this;
        },
        /**
         * thêm các rule để validate
         * @param {object} rules thêm các rule để validate
         */
        validate: function (rules, messages, fails) {
            var validateData = this.e("getOption", "validate") || this.e("getOption", "validation");
            var isValidate = typeof validateData == "object";
            var r = typeof rules == "object" ? rules : ((isValidate && typeof validateData.rules == "object") ? validateData.rules : null)
            var m = typeof messages == "object" ? messages : ((isValidate && typeof validateData.messages == "object") ? validateData.messages : {});
            if (!r) return true;
            var validator = Validator.make(this.getValidateData(), r, m);
            if (!validator.status) {
                var f = typeof fails == "function" ? fails : (
                    typeof rules == "function" ? rules : (
                        typeof messages == "function" ? messages : (
                            (isValidate && typeof validateData.fails == "function") ? validateData.fails : emptyFunc
                        )
                    )
                );
                f.call(this, validator);
            }
            return validator.status;

        },
        /**
         * thao tác trước khi gọi api
         * @param {function} callback 
         */
        beforeSend: function (callback) {
            this.e("addEvent", "beforeSend", callback);
            return this;
        }

    });



    App.addQueryModule("form", function (options) {
        return new App.dom.Form(this.getElements(), options || {});
    });


    App.form = App.prototype.form = function (selector, options) {
        var s = selector || null,
            o = options || {};
        return new App.dom.Form(s, 0);
    };




    App.files = App.prototype.files = {
        data: {},
        readFileInput: function (input, callback) {
            if (!input || !(input instanceof Element) || input.type != "file") return null;
            var tagname = input.tagName.toLowerCase();
            var type = input.type.toLowerCase();
            var self = this;
            var dataList = [];
            var segments = [];
            var files = input.files;
            if (window.File && window.FileList && window.FileReader && files && files.length) {

                var l = files.length;
                var base64 = false;
                var binary = false;

                for (var i = 0; i < l; i++) {
                    (function (file, index, coumt) {
                        let fileReader = new FileReader();
                        fileReader.onload = function (f) {
                            let src = f.target.result;
                            dataList.push(src);
                            if (index == coumt) {
                                if (!input.multiple) dataList = dataList.length ? dataList[0] : null;
                                self.data[input.name] = dataList;
                                if (callback && isCallable(callback)) {
                                    callback(dataList);
                                }
                            }
                        };
                        fileReader.readAsDataURL(file);
                    })(files[i], i, files.length - 1);
                }
            }
            else {
                self.data[input.name] = dataList;
                if (callback && isCallable(callback)) {
                    callback(dataList, segments);
                }
            }
            return dataList;
        }
    }; var listApi = ["xhr", "ajax", "axios", "fetch", "dom", "form", "request"];
    listApi.map(function (fnc) {
        if (App[fnc]) {
            App.query[fnc] = App[fnc];
        }
    })
    App.ready = App.prototype.ready = App.run = App.prototype.run = App.task = App.prototype.task = function (task) {
        if (typeof task == "function") {
            var queryEngine = App.getSystemOption("queryEngine");

            if (documentReady()) {
                var query = isString(queryEngine) && queryEngine.toLowerCase() == "jquery" && global.jQuery ? global.jQuery : App.query;
                try {
                    task(query);
                } catch (error) {
                    App.log(error);
                }

            } else {
                window.Apptask = App.queue(function (resolve, reject) {
                    try {
                        if (documentReady()) {
                            var query = isString(queryEngine) && queryEngine.toLowerCase() == "jquery" && global.jQuery ? global.jQuery : App.query;
                            task(query);
                            return resolve("thành công");
                            // return false;
                        }
                    } catch (error) {
                        return reject(error);
                    }

                }, 50).step(500).catch(rs => App.log(rs));
            }

        }
    };




    var getEl = App.getEl = App.prototype.getEl = function (obj, key, delimiter) {
        if (typeof obj == 'undefined') {
            return null;
        }
        if (typeof key == 'undefined') {
            return obj;
        }
        var tpo = getType(obj);
        var tpk = getType(key);
        if (tpo == 'array') {
            var k = NaN;
            if (tpk == 'number') {
                k = key;
            } else if (parseInt(key) != NaN) {
                k = parseInt(key);
            }
            if (!isNaN(k)) {
                if (typeof obj[k] != 'undefined') {
                    return obj[k];
                }
            }
        } else if (tpo == 'object' || obj == App) {
            if (tpk == 'number') {
                if (typeof obj[key] != 'undefined') {
                    return obj[key];
                }
            } else if (tpk == 'string') {
                if (typeof delimiter == 'undefined') {
                    delimiter = '.';
                } else {
                    var t = getType(delimiter);
                    if (t != 'string' && t != 'number') {
                        delimiter = '.';
                    }
                }
                var _keys = key.split(delimiter);
                var d = obj;
                for (var i = 0; i < _keys.length; i++) {
                    var k = _keys[i];
                    if (typeof d[k] != 'undefined') {
                        d = d[k];
                    } else {
                        d = null;
                        i += _keys.length;
                    }
                }
            }
            return d;
        }
        return null;
    };


    App.str = App.prototype.str = {
        html_char_raw: ['%', '&', '=', '?', '#', '+', ':', '/', ' ', '\n', '{', '}'],
        html_char_enc: ['%25', '%26', '%3D', '%3F', '%23', '%2B', '%3A', '%2F', '+', '%0D%0A', '%7B', '%7D'],
        urlcode: { '%': '%25', '&': '%26', '=': '%3D', '?': '%3F', '#': '%23', '+': '%2B', ':': '%3A', '/': '%2F', ' ': '%20', '\n': '%0D%0A', '{': '%7B', '}': '%7D' },
        unicode: {
            js: ["\\u00e0", "\\u00e1", "\\u1ea1", "\\u1ea3", "\\u00e3", "\\u00e2", "\\u1ea7", "\\u1ea5", "\\u1ead", "\\u1ea9", "\\u1eab", "\\u0103", "\\u1eb1", "\\u1eaf", "\\u1eb7", "\\u1eb3", "\\u1eb5", "\\u00e8", "\\u00e9", "\\u1eb9", "\\u1ebb", "\\u1ebd", "\\u00ea", "\\u1ec1", "\\u1ebf", "\\u1ec7", "\\u1ec3", "\\u1ec5", "\\u00ec", "\\u00ed", "\\u1ecb", "\\u1ec9", "\\u0129", "\\u00f2", "\\u00f3", "\\u1ecd", "\\u1ecf", "\\u00f5", "\\u00f4", "\\u1ed3", "\\u1ed1", "\\u1ed9", "\\u1ed5", "\\u1ed7", "\\u01a1", "\\u1edd", "\\u1edb", "\\u1ee3", "\\u1edf", "\\u1ee1", "\\u00f9", "\\u00fa", "\\u1ee5", "\\u1ee7", "\\u0169", "\\u01b0", "\\u1eeb", "\\u1ee9", "\\u1ef1", "\\u1eed", "\\u1eef", "\\u1ef3", "\\u00fd", "\\u1ef5", "\\u1ef7", "\\u1ef9", "\\u0111", "\\u00c0", "\\u00c1", "\\u1ea0", "\\u1ea2", "\\u00c3", "\\u00c2", "\\u1ea6", "\\u1ea4", "\\u1eac", "\\u1ea8", "\\u1eaa", "\\u0102", "\\u1eb0", "\\u1eae", "\\u1eb6", "\\u1eb2", "\\u1eb4", "\\u00c8", "\\u00c9", "\\u1eb8", "\\u1eba", "\\u1ebc", "\\u00ca", "\\u1ec0", "\\u1ebe", "\\u1ec6", "\\u1ec2", "\\u1ec4", "\\u00cc", "\\u00cd", "\\u1eca", "\\u1ec8", "\\u0128", "\\u00d2", "\\u00d3", "\\u1ecc", "\\u1ece", "\\u00d5", "\\u00d4", "\\u1ed2", "\\u1ed0", "\\u1ed8", "\\u1ed4", "\\u1ed6", "\\u01a0", "\\u1edc", "\\u1eda", "\\u1ee2", "\\u1ede", "\\u1ee0", "\\u00d9", "\\u00da", "\\u1ee4", "\\u1ee6", "\\u0168", "\\u01af", "\\u1eea", "\\u1ee8", "\\u1ef0", "\\u1eec", "\\u1eee", "\\u1ef2", "\\u00dd", "\\u1ef4", "\\u1ef6", "\\u1ef8", "\\u0110"],
            vi: ["\u00e0", "\u00e1", "\u1ea1", "\u1ea3", "\u00e3", "\u00e2", "\u1ea7", "\u1ea5", "\u1ead", "\u1ea9", "\u1eab", "\u0103", "\u1eb1", "\u1eaf", "\u1eb7", "\u1eb3", "\u1eb5", "\u00e8", "\u00e9", "\u1eb9", "\u1ebb", "\u1ebd", "\u00ea", "\u1ec1", "\u1ebf", "\u1ec7", "\u1ec3", "\u1ec5", "\u00ec", "\u00ed", "\u1ecb", "\u1ec9", "\u0129", "\u00f2", "\u00f3", "\u1ecd", "\u1ecf", "\u00f5", "\u00f4", "\u1ed3", "\u1ed1", "\u1ed9", "\u1ed5", "\u1ed7", "\u01a1", "\u1edd", "\u1edb", "\u1ee3", "\u1edf", "\u1ee1", "\u00f9", "\u00fa", "\u1ee5", "\u1ee7", "\u0169", "\u01b0", "\u1eeb", "\u1ee9", "\u1ef1", "\u1eed", "\u1eef", "\u1ef3", "\u00fd", "\u1ef5", "\u1ef7", "\u1ef9", "\u0111", "\u00c0", "\u00c1", "\u1ea0", "\u1ea2", "\u00c3", "\u00c2", "\u1ea6", "\u1ea4", "\u1eac", "\u1ea8", "\u1eaa", "\u0102", "\u1eb0", "\u1eae", "\u1eb6", "\u1eb2", "\u1eb4", "\u00c8", "\u00c9", "\u1eb8", "\u1eba", "\u1ebc", "\u00ca", "\u1ec0", "\u1ebe", "\u1ec6", "\u1ec2", "\u1ec4", "\u00cc", "\u00cd", "\u1eca", "\u1ec8", "\u0128", "\u00d2", "\u00d3", "\u1ecc", "\u1ece", "\u00d5", "\u00d4", "\u1ed2", "\u1ed0", "\u1ed8", "\u1ed4", "\u1ed6", "\u01a0", "\u1edc", "\u1eda", "\u1ee2", "\u1ede", "\u1ee0", "\u00d9", "\u00da", "\u1ee4", "\u1ee6", "\u0168", "\u01af", "\u1eea", "\u1ee8", "\u1ef0", "\u1eec", "\u1eee", "\u1ef2", "\u00dd", "\u1ef4", "\u1ef6", "\u1ef8", "\u0110"],
            en: ["a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "a", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "i", "i", "i", "i", "i", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "o", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "u", "y", "y", "y", "y", "y", "d", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "A", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E", "I", "I", "I", "I", "I", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "O", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "U", "Y", "Y", "Y", "Y", "Y", "D"],
            upper: ["À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă", "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ", "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ", "Ì", "Í", "Ị", "Ỉ", "Ĩ", "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ", "Ờ", "Ớ", "Ợ", "Ở", "Ỡ", "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ", "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ", "Đ"],
            lower: ["à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă", "ằ", "ắ", "ặ", "ẳ", "ẵ", "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề", "ế", "ệ", "ể", "ễ", "ì", "í", "ị", "ỉ", "ĩ", "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ", "ờ", "ớ", "ợ", "ở", "ỡ", "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ", "ỳ", "ý", "ỵ", "ỷ", "ỹ", "đ"]
        },
        clearUnicode: function (str) {
            return this.replace(str, this.unicode.vi, this.unicode.en);
        },
        isSN: function (str) {
            if (typeof str == 'undefined') return null;
            var t = App.getType(str);
            if (t == 'string' || t == 'number') return true;
            return false;
        },
        /**
         * thay the chuoi trong chuoi bang mot chuoi =)))))
         * @param {string} str  chuoi dau vao
         * @param {string|object|array} find  tham so tim kiem
         * @param {string|object|array} replace  tham so thay the
         */
        replace: function () {
            var a = arguments;
            var t = a.length;
            if (t == 0) return '';
            if (typeof a[0] != 'string' || t < 2) {
                return a[0];
            }
            var str = a[0];

            var b = App.getType(a[1]);
            if (this.isSN(a[1])) {
                if (t >= 3 && this.isSN(a[2])) {
                    var obj = {};
                    obj[a[1]] = a[2];
                    str = this.replaceByObj(str, obj);
                }
            } else if (b == 'array') {
                if (t >= 3 && App.getType(a[2]) == 'array') {
                    str = this.replaceByArr(str, a[1], a[2]);
                } else if (t >= 3 && App.getType(a[2]) == 'string') {
                    var obj = {},
                        val = a[2];
                    var d = a[1];
                    for (var k in d) {
                        obj[d[k]] = val;
                    }
                    str = this.replaceByObj(str, obj);
                }
            } else if (b == 'object') {
                str = this.replaceByObj(str, a[1]);
            }
            return str;
        },
        replaceByArr: function () {
            var a = arguments;
            var t = a.length;
            if (t == 0) return '';
            if (typeof a[0] != 'string' || t < 2) {
                return a[0];
            }
            var str = a[0];
            var b = App.getType(a[1]);
            if (b == 'object') {
                str = this.replaceByObj(str, a[1]);
            } else if (b == 'array') {
                var obj = {};
                if (t >= 3) {
                    var f = App.getType(a[2]);
                    if (f == 'string') {
                        for (var k in a[1]) {
                            obj[a[1][k]] = a[2];
                        }
                    } else if (f == 'array') {
                        var e = a[1].length,
                            g = a[2].length;
                        var max = (e > g) ? e : g;
                        for (var i = 0; i < max; i++) {
                            obj[a[1][i]] = a[2][i];
                        }
                    }
                }
                str = this.replaceByObj(str, obj);
            }
            return str;
        },
        replaceByObj: function () {
            var a = arguments;
            var t = a.length;
            if (t == 0) return '';
            if (typeof a[0] != 'string' || t < 2) {
                return a[0];
            }
            var str = a[0];
            var b = App.getType(a[1]);
            if (b == 'object') {
                var max = null;
                if (typeof a[2] == 'number') {
                    max = a[2];
                }
                var i = 1;
                var sts = a[1];
                for (var key in sts) {
                    var txt = sts[key];
                    str = this.preg_replace(key, txt, str);
                    if (max && i >= max) break;
                    i++;
                }
            }
            return str;
        },
        escapeRegExp: function (string) {
            var str = "" + string + "";
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        },

        preg_replace: function (find, replace, string) {
            var string = "" + string + "";
            return string.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
        },

        rand: function () {
            var st = 'ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwyz0123456789';
            var sp = st.split('');
            var l = sp.length - 1;
            var s = '';
            for (var i = 0; i < 32; i++) {
                s += sp[App.number.rand(0, l)];
            }
            return s;
        },
        camelToSlug: function (str, joinKey) {
            var st = 'ABCDEFGHIJKLMNOPQRSTUVWYZ';
            var sp = st.split('');
            var l = sp.length - 1;
            var s = '';
            var find = [];
            var replace = [];
            var k = isString(joinKey) ? joinKey : "-";
            sp.map(function (c) {
                find.push(c);
                replace.push(k + c.toLowerCase());
            });
            return this.replace(str, find, replace);
        },
        urlencode: function (str) {
            var t = this.html_char_raw.length;
            for (var i = 0; i < t; i++) str = this.replace(str, this.html_char_raw[i], this.html_char_enc[i]);
            return str;
        },
        urldecode: function (str) {
            var t = this.html_char_raw.length;
            for (var i = t - 1; i >= 0; i--) str = this.replace(str, this.html_char_enc[i], this.html_char_raw[i]);
            return str;
        },
        eval: function (template, data) {
            var t = typeof data;
            var tpl = template;
            if (t == 'object' || t == "array") {
                data = this.convertTextObject({}, data);
                for (var k in data) {
                    var val = data[k];
                    if (val === null) val = '';
                    var f = "\{\$" + k + "\}";
                    tpl = this.replace(tpl, f, val);
                }
            }
            return tpl;
        },
        convertTextObject: function (root, object, name, joinKey) {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    if (typeof joinKey != "string") joinKey = ".";
                    const val = object[key];
                    var t = typeof val;
                    var k = (typeof name != "undefined" && ("" + name).length) ? name + joinKey + key : key;
                    if (val != null && (t == 'object' || t == "array")) {
                        root = this.convertTextObject(root, val, k, joinKey);
                    } else {
                        root[k] = val;
                    }
                }
            }
            return root;
        },
        upper: function (str) {
            if (typeof str == "undefined") return null;
            if (isString(str)) {
                var s = str.toUpperCase();
                return this.replace(s, this.unicode.lower, this.unicode.upper);
            }
            else if ((isObject(str) && typeof str.length != "undefined") || isArray(str)) {
                for (let i = 0; i < str.length; i++) {
                    str[i] = this.upper(str[i]);
                }
                return str;
            }
            else if (isObject(str)) {
                for (const key in str) {
                    if (str.hasOwnProperty(key)) {
                        const st = str[key];
                        str[key] = this.upper(st);
                    }
                }
                return str;

            }
        },
        lower: function (str) {
            if (typeof str == "undefined") return null;
            if (isString(str)) {
                var s = str.toLowerCase();
                str = this.replace(s, this.unicode.upper, this.unicode.lower);
            }
            else if ((isObject(str) && typeof str.length != "undefined") || isArray(str)) {
                for (let i = 0; i < str.length; i++) {
                    str[i] = this.upper(str[i]);
                }
            }
            else if (isObject(str)) {
                for (const key in str) {
                    if (str.hasOwnProperty(key)) {
                        const st = str[key];
                        str[key] = this.upper(st);
                    }
                }
            }

            return str;
        },
        ucfirst: function (str) {
            if (isString(str)) {
                if (str.length) {
                    var first = str.substring(0, 1);
                    str = this.upper(first) + str.substring(1);
                }
            }
            else if ((isObject(str) && typeof str.length != "undefined") || isArray(str)) {
                for (let i = 0; i < str.length; i++) {
                    str[i] = this.ucfirst(str[i]);
                }
            }
            else if (isObject(str)) {
                for (const key in str) {
                    if (str.hasOwnProperty(key)) {
                        str[key] = this.ucfirst(str[key]);
                    }
                }
            }
            return str;
        },
        ucword: function (str) {
            if (isString(str)) {
                if (str.length) {
                    str = str.split(" ").map(function (s) { return App.str.ucfirst(s) }).join(" ");
                }
            }
            else if ((isObject(str) && typeof str.length != "undefined") || isArray(str)) {
                for (let i = 0; i < str.length; i++) {
                    str[i] = this.ucword(str[i]);
                }
            }
            else if (isObject(str)) {
                for (const key in str) {
                    if (str.hasOwnProperty(key)) {
                        str[key] = this.ucword(str[key]);
                    }
                }
            }
            return str;
        },

        htmlentities: function (str) {
            return this.eval(str, {
                "<": "&lt;",
                ">": "&gt;",
                "\"": "&quote;",
                "&": "&amp;"
            });
        },
        formSlug: function (str) {
            return typeof str != "string" ? str : this.replace(this.replace(str, "[]", '.*'), { "[": ".", "]": "" });
        },
        slug: function (str, key) {
            if (!key) key = '-';
            var s = String(str);
            var l = 'ABCDEFGHIJKLMNOPQRSTUVWYZabcdefghijklmnopqrstuvwyz0123456789';
            var list = [];
            var n = 0;
            var t = this.replace(this.replace(
                this.clearUnicode(this.lower(s)),
                "[]{}();:'\"\\|,./?~!@#$%^&*+=".split(""),
                "-"
            ), '--', '-');
            for (let i = 0; i < t.length; i++) {
                const st = t[i];
                if (l.indexOf(st) == -1) {
                    if (n > 0) {
                        if (l.indexOf(t[i - 1]) >= 0) n++;
                    }
                } else {
                    if (typeof list[n] == "undefined") {
                        list[n] = st;
                    } else {
                        list[n] += st;
                    }
                }
            }
            return list.join(key);
        }

    };


    App.number = App.prototype.number = {
        rand: function (from, to) {
            if (!from) from = 0;
            if (!to) to = 0;
            if (from == 0) to++;
            var rand = Math.floor(Math.random() * to) + from;
            return rand;
        },
        currency: function (x) {
            return x.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1\.");
        }
    };



    App.date = App.prototype.date = function (format, offset) {
        if (!offset) offset = 0;
        var d = new Date();
        var t = {};
        var dl = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


        // convert to msec
        // add local time zone offset 
        // get UTC time in msec
        utc = d.getTime() + (d.getTimezoneOffset() * 60000);

        // create new Date object for different city
        // using supplied offset
        d = new Date(utc + (3600000 * offset));



        t.ms = d.getMilliseconds();
        t.Y = d.getFullYear();
        t.y = d.getYear();
        t.H = d.getHours();
        t.i = d.getMinutes();
        t.m = d.getMonth() + 1;
        t.s = d.getSeconds();
        t.time = d.getTime();
        t.d = d.getDate();
        t.D = dl[d.getDay()];
        if (!format) return t;
        var f = App.getType(format);
        if (f == 'string') {
            var txt = format;
            txt = this.str.replace(txt, 'ms', t.ms);
            txt = this.str.replace(txt, 'time', t.time);
            txt = this.str.replace(txt, t);
            return txt;
        }
        return null;
    };

    App.fn = App.prototype.fn = function () {
        this.timeout_status = true;
        this.args_type = 'array';
        this.calling = null;
        this.system_list = {};

        this.disableTimeout = function () {
            this.timeout_status = false;
        };
        this.enableTimeout = function () {
            this.timeout_status = true;
            if (this.args_type == 'list') {
                this.args_type = 'array';
            }
        };
        this.setArgsType = function () {
            var a = arguments;
            var t = 'array';
            var tt = 0;
            if (a.length > 0) {
                t = a[0];
            }
            if (typeof t == 'string') {
                var t2 = t.toLowerCase();
                if (t2 != 'array' && t2 != '0') {
                    tt = 1;
                }
            } else if (t) {
                tt = 1;
            } else {
                tt = 0;
            }
            if (tt) {
                this.args_type = 'list';
                this.disableTimeout();
            } else {
                this.args_type = 'array';
            }
        };

        this.getFuncPath = function (fn) {
            if (!fn) return null;
            var t = App.getType(fn);
            var f = '';
            if (t == 'function') {
                f = 'fn';
            } else if (t == 'string') {
                var a = App.str.replace(fn, ' ', '');
                if (!a) return null;

                if (App.getType(App.getEl(this, a)) == 'function') {
                    f = '_this.' + a;
                }
                else if (App.getType(App.getEl(App, a)) == 'function') {
                    f = 'App.' + a;
                }
                else {
                    var func_paths = a.split('.');
                    if (func_paths.length < 2) {
                        if (typeof window[a] == 'function') {
                            f = a;
                        }
                    } else {
                        var kk = func_paths[0];
                        if (typeof window[kk] == 'object' || kk == "App") {
                            var kz = '';
                            for (var i = 1; i < func_paths.length; i++) {
                                var dt = '';
                                if (i > 1) dt = '.';
                                kz += (dt + func_paths[i]);
                                dt = '';
                            }
                            if (App.getType(App.getEl(window[kk], kz)) == 'function') {
                                f = a;
                            }
                        }

                    }
                }
            }
            return f;
        };
        this.get = function (fn) {
            var r = function () { console.log(arguments); };
            if (!fn) return r;
            var t = App.getType(fn);
            var f = '';
            var _this = this;
            if (t == 'function') {
                f = 'fn';
            } else if (t == 'string') {
                var fp = this.getFuncPath(fn);
                if (fp) {
                    f = fp;
                }
            }

            if (f) {
                eval('r = ' + f + ";");
            }
            return r;
        };
        this.check = function (fn) {
            if (typeof fn != 'string') return false;
            // console.log(this.getFuncPath(fn));
            if (this.getFuncPath(fn)) {
                return true;
            }
            return false;
        };
        this.add = function (func_name, fn, main) {
            if (typeof func_name != 'string' || typeof fn != 'function') return false;
            var s = false;
            if (!this.system_list[func_name]) {
                this[func_name] = fn;
                s = true;
            }


            return s;
        };
        this.remove = function (fn) {
            if (typeof fn != 'string') return false;
            if (!this.system_list[fn] && typeof this[fn] == 'function') {
                this[fn] = undefined;
                delete this[fn];
            }
            return true;
        };
        this.call = function (fn, args, time) {
            if (!fn) return null;
            var t = App.getType(fn);
            var f = '';
            var agm = arguments;
            if (t == 'function') {
                f = 'fn';
            } else if (t == 'string') {
                var fp = this.getFuncPath(fn);
                if (fp) {
                    f = fp;
                }
            }
            if (!f) return undefined;
            var _this = this;
            var arg = [];
            if (this.args_type == 'array') {
                if (typeof args != 'undefined') {
                    if (App.getType(args) == 'array') {
                        arg = args;
                    } else {
                        arg[0] = args;
                    }
                }
            } else {
                var n = 0;
                for (var i = 1; i < agm.length; i++) {
                    arg[n] = agm[i];
                    n++;
                }
            }
            var t = arg.length;
            f += "(";
            for (var i = 0; i < t; i++) {
                f += "arg[" + i + "]";
                if (i < t - 1) f += ",";
            }
            f += ");";
            var r = null;
            var o = "r = " + f;

            if (this.timeout_status && time) {
                if (App.getType(time) == 'number' && time > 0) {
                    this.calling = setTimeout(function () {
                        eval(o);
                        return r;
                    }, time);
                    return true;
                }
            }
            try {
                eval(o);
            } catch (error) {
                // ..
            }
            return r;
        };
        this.parse = function (fn) {
            var f = function () {

            };
            if (!fn) return f;
            var t = App.getType(fn);

            if (t == 'function') {
                f = fn;
            }
            else if (t == 'string') {
                if (this.check(fn)) {
                    f = this.get(fn);
                }
            }
            return f;
        };
        this.goTo = function (url) {
            window.open(url, '_blank');
        };

        this.openWindow = function (url, title, width, height, x, y) {
            var swidth = screen.width,
                sheight = screen.height;
            if (!width) width = 600;
            if (!height) height = 300;
            var left = (x) ? x : ((swidth - width) / 2),
                top = (y) ? y : ((sheight - height) / 2 - 100);
            if (top < 0) top = 0;
            if (!title) title = 'Blank Page';
            window.open(url, title, 'targetWindow,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left);
        };
        var a = this;
        var st = {};
        for (var k in a) {
            st[k] = k;
        }
        this.system_list = st;
    };


    App.func = App.prototype.func = new App.fn();

    App.videos = App.prototype.videos = {
        getVideoUrlData: function (url) {
            if (!url) return {};
            var data = {};
            var u1 = url.match(/.*youtu\.be\/(.*?)($|\?|#)/i);
            var u2 = url.match(/youtube\.com\/watch\?.*v=(.*?)($|&|#)/i);
            var u3 = url.match(/\.*vimeo.com\/(.*?)($|\?)/i);
            var u4 = url.match(/.*facebook.com\/(.*?)\/videos\/(.*?)\//i);

            if (u1) {
                var id = u1[1];
                data = {
                    id: id,
                    server: 'youtube',
                    thumbnail: 'http://img.youtube.com/vi/' + id + '/hqdefault.jpg',
                    embed_url: "http://www.youtube.com/embed/" + id + "?rel=0&wmode=opaque"
                };
            } else if (u2) {
                var id = u2[1];
                data = {
                    id: id,
                    server: 'youtube',
                    thumbnail: 'http://img.youtube.com/vi/' + id + '/hqdefault.jpg',
                    embed_url: "http://www.youtube.com/embed/" + id + "?rel=0&wmode=opaque"
                };
            } else if (u3) {
                var d = u3[1].split("/");
                var id = d[d.length - 1];
                data = {
                    id: id,
                    server: 'vimeo',
                    thumbnail: null,
                    embed_url: "http://player.vimeo.com/video/" + id + "?rel=0&wmode=opaque"
                };
            }
            else if (u4) {
                var page_id = u4[1];
                var id = u4[2];
                data = {
                    id: id,
                    server: 'vimeo',
                    thumbnail: 'http://img.youtube.com/vi/' + id + '/hqdefault.jpg',
                    embed_url: "https://www.facebook.com/v2.0/plugins/video.php?allowfullscreen=true&container_width=620&href=$ac%2F" + page_id + "%2Fvideos%2Fvb." + page_id + "%2F" + id + "%2F%3Ftype%3D3&locale=en_US&sdk=joey"
                };
            }
            return data;
        }
    };





    for (const prop in App.prototype) {
        if (App.prototype.hasOwnProperty(prop)) {
            const opt = App.prototype[prop];
            App.oeiginModules.push(prop);
        }
    }
    background.checkReady();

    global.App = App;
    global.D = App.query;
}(window, document));