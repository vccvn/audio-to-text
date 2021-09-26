// tạo class theo phong cách php và dùng cú pháp es5 =))))))))

var {
    isArray,
    Str,
    _defineProperties,
    _createClass,
    _defineProperty,
    _instanceof,
    isFunction,
    objectKeys,
    addToGlobal,
    assignValue,
    isEmpty,
    isString,
    isObject,
    inArray,
    getArguments,
    date,
    Num,
    copyArray,
    newObj
} = require('.utils.js');

"use strict";

const NORETURN_VALUE = date('time') + '-' + Str.rand(Str.rand(date('ms') + "-" + Num.rand(0, 999999)));
const getArgs = getArguments;

const objectCreated = {};

function createConstructor(name, checkFn) {
    var esc = null;
    var s = "try {"+
    "var " + name + " = function " + name + "(){" +
        "var classChecked = checkFn.call(this, getArgs(arguments));" +
        "if(classChecked!==NORETURN_VALUE) return classChecked;" +
    "};"+
    "esc = " + name + ";"+
    "} catch (error) {"+
        "console.log(\"lỗi\");"+
        "console.error(error);"+
    "}";
    eval(s);
    return esc;
}

/**
 * khoi tao class
 * @param {string} className
 * @param {boolean} isGlobal
 * @returns {class}
 */
const createClass = function createClass(className, isGlobal) {

    return function createClass($class, $isGlobal) {
        var $className = isString($class) ? Str.replace(Str.clearUnicode($class), [' ', '-', '+'], '') : (isFunction($class) ? $class.name : (isFunction($isGlobal) && $isGlobal.name ? $isGlobal.name : "Class" + Str.rand().substr(4, 4)));
        let hasClassName = isString($class);
        // if(typeof objectCreated[$className] == "undefined") objectCreated[$className] = 1;
        // else objectCreated[$className]++;
        // console.log(objectCreated);
        // khai báo hàm

        // tình trạng commit
        var commited = false;

        var oneTimeData = newObj({});

        // chứa dữ liệu hằng
        var $constants = newObj({});
        /**
         * chứa dữ liệu
         */
        var $data = newObj({});


        var $props = newObj({});

        var $dynamics = newObj({});

        /**
         * chứa các phương thức boot
         */
        var $boots = newObj({});

        var $inits = newObj({});

        var $calls = [];

        var $classData = newObj({
            extends: {},
            uses: {},
            methods: {},
            props: {},
            constructs: {},
            parents: {},
            parent: {},
            static: {},
            instances: [],
            constants: {},
            setgetMethods: {},
            events: {},
            inits: [],
            boots: [],
            calls: []

        });

        var __contructs = [];

        // khai báo  class
        /**
         * @var {class}
         */
        var ES5Class = function () {
            var checked = checkConstructorCalled.call(this, getArgs(arguments));
            if (checked !== NORETURN_VALUE) return checked;
        };

        function stdParent(instance, cn) {
            this.__instance = instance;
            var self = this;
            if ($classData.parents[cn]) {
                for (var pcl in $classData.parents[cn]) {
                    if ($classData.parents[cn].hasOwnProperty(pcl)) {
                        var props = $classData.parents[cn][pcl];
                        for (var key in props) {
                            if (props.hasOwnProperty(key)) {
                                var val = props[key];
                                if (typeof val == "function") {
                                    this[key] = function () {
                                        val.apply(self, arguments);
                                        self.instance[key].apply(self.instance, arguments);
                                        return self;
                                    }
                                } else {
                                    this[key] = val;
                                }
                            }
                        }
                        if ($classData.parents[pcl]) {
                            this.__parent = new stdParent(this, pcl);
                        }
                    }
                }
            }
        }

        var iof = _instanceof;


        // hàm gọi trong construct

        if(hasClassName){
            try {
                let esc = createConstructor($className, checkConstructorCalled);
                if(esc !== null){
                    ES5Class = esc;
                }
            } catch (error) {
                console.log("lỗi")
                console.error(error);
            }
        }
        

        function checkConstructorCalled(args) {
            if (!iof(this, ES5Class)) {
                if (commited) {
                    if ($calls.length) {
                        const caller = $calls[$calls.length - 1];
                        if (typeof caller == "function") {
                            return caller.apply(this, args);
                        }
                    }
                    if (checkCreateNewInstanceByStaticConstructorCall()) {
                        return newInstance(args);
                    }

                }
                return ES5Class.assign.apply(null, args);
            }
            else {
                classContructor.apply(this, args);
            }
            return NORETURN_VALUE;
        }


        if ($isGlobal === true) {
            // global[$className] = ES5Class;
            addToGlobal($className, ES5Class);
        }

        /**
         * ham dc goi trong constructor
         */
        function classContructor() {

            if (!commited) {
                ES5Class.commit();
            }

            this.__update__properties__(true);
            for (var key in $constants) {
                if (Object.hasOwnProperty.call($constants, key)) {
                    var constData = $constants[key];
                    Object.defineProperty(this, key, {
                        get: constData.get,
                        set: constData.set
                    });
                }
            }
            var instanceID = "a" + Str.rand() + "_" + date("time");
            __addSetGetValue(this, instanceID, '__instance__id__', instanceID);
            __addSetGetValue(this, instanceID, "static", ES5Class);
            this.__addSetGetValue__({
                key: 'noReturn',
                value: NORETURN_VALUE,
                set: function (value) {
                    console.error("Bạn không thể gán giá trị cho thuộc tính noReturn bời vì đây là giá trị của hệ thống");
                    return false
                }
            });
            if (!isEmpty($dynamics)) {
                for (var key in $dynamics) {
                    if (Object.hasOwnProperty.call($dynamics, key)) {
                        var val = $dynamics[key];
                        __addSetGetValue(this, instanceID, key, val);
                    }
                }
            }



            for (var key in $classData.parent) {
                if ($classData.parent.hasOwnProperty(key)) {
                    var parentOpt = $classData.parent[key];
                    __addSetGetValue(this, instanceID, "__parent", new stdParent(this, ES5Class.__class));
                }
            }



            if (oneTimeData && isObject(oneTimeData) && !isEmpty(oneTimeData)) {
                for (const key in oneTimeData) {
                    if (Object.hasOwnProperty.call(oneTimeData, key)) {
                        const value = oneTimeData[key];
                        this[key] = value;
                    }
                }
                oneTimeData = {};
            }







            if (typeof this.boot == "function") {
                this.boot();
                this.boot = function () {
                    console.warn(ES5Class.__class + " boot đã được gọi khi khởi tạo");
                };
            }
            if (!isEmpty($boots)) {
                for (var key in $boots) {
                    if (Object.hasOwnProperty.call($boots, key)) {
                        var params = $boots[key];
                        if (typeof this[key] == "function") {
                            this[key].apply(this, params);
                        }
                    }
                }

            }

            __contruct.apply(this, arguments);

            if (typeof this.init == "function") {
                // console.log(this)
                this.init();
                // this.boot = function () {
                //     console.warn(ES5Class.__class + " boot đã được gọi khi khởi tạo");
                // };
            }
            if (!isEmpty($inits)) {
                for (var key in $inits) {
                    if (Object.hasOwnProperty.call($inits, key)) {
                        var params = $inits[key];
                        if (typeof this[key] == "function") {
                            this[key].apply(this, params);
                        }
                    }
                }

            }

            $classData.instances.push(this);
        };

        // gán biên

        ES5Class.__class = $className;
        ES5Class.__type = 'class';




        if (isFunction($class)) {
            addConstructor($class);
        }
        else if (isFunction($isGlobal)) {
            addConstructor($isGlobal);
        }

        ES5Class.getExtends = function () {
            return $classData.extends;
        }
        ES5Class.getUses = function () {
            return $classData.uses;
        }
        ES5Class.getMethods = function () {
            return $classData.methods;
        }
        ES5Class.getProps = function () {
            return $classData.props;
        }
        ES5Class.getConstants = function () {
            return $classData.constants;
        }
        ES5Class.getContructs = function () {
            return $classData.constructs;
        }
        ES5Class.getParents = function () {
            return $classData.parents;
        }
        ES5Class.getParent = function () {
            return $classData.parent;
        }
        ES5Class.getStatic = function () {
            return $classData.static;
        }
        ES5Class.getIntances = function () {
            return $classData.instances;
        }
        ES5Class.getInits = function () {
            return $classData.inits;
        }
        ES5Class.getSetGetMethods = function () {
            return $classData.setgetMethods;
        }



        ES5Class.getBootMethods = function () {
            return $boots;
        }


        ES5Class.getInitMethods = function () {
            return $inits;
        }

        /**
         * kế thừa class
         * @param {function|object|class|ES5Class} superClass class cha
         * @returns {ES5Class}
         */
        ES5Class.inherit = function (superClass) {
            if (commited) {
                throw new Error("Không thể gọi hàm inherit sau khi đã khai báo phương thức cho class");
            }

            if (superClass) {
                var _parents = {};
                var _extends = {
                    props: {},
                    methods: {},
                    setgetMethods: {}
                };

                var cn = null;
                var _parent = newObj({});

                if (superClass.__type == 'class') {// trường hợp là std class
                    cn = superClass.__class;
                    _parent.__class = superClass;
                    var superContructs = superClass.getContructs();
                    var superExtends = superClass.getExtends();
                    var superInits = superClass.getInits();
                    var superContants = superClass.getConstants();
                    var superUses = superClass.getUses();
                    var superProps = superClass.getProps();
                    var superMethods = superClass.getMethods();
                    var superSetGetMethods = superClass.getSetGetMethods();
                    var superParents = superClass.getParents();
                    var superStatic = superClass.getStatic();
                    // console.log("set get", superSetGetMethods);

                    // lay danh sach construct
                    var bms = superClass.getBootMethods();
                    addBootMethod(bms);
                    var ims = superClass.getInitMethods();
                    addInitMethod(ims);

                    for (var fn in superContructs) {
                        if (superContructs.hasOwnProperty(fn)) {
                            $classData.constructs[fn] = superContructs[fn];
                        }
                    }
                    if (superMethods[cn]) {
                        $classData.constructs[cn] = superMethods[cn];

                    }
                    else if (superMethods.hasOwnProperty('constructor')) {
                        $classData.constructs[cn] = superMethods.constructor;
                    }


                    // ke thua
                    for (var cln in superExtends) {
                        if (superExtends.hasOwnProperty(cln)) {
                            var exts = superExtends[cln];
                            for (var k in exts.props) {
                                if (exts.props.hasOwnProperty(k)) {
                                    var p = exts.props[k];
                                    _extends.props[k] = p;
                                }
                            }

                            for (var m in exts.methods) {
                                if (exts.methods.hasOwnProperty(m)) {
                                    var mt = exts.methods[m];
                                    _extends.methods[m] = mt;
                                }
                            }

                            for (var m in exts.setgetMethods) {
                                if (exts.setgetMethods.hasOwnProperty(m)) {
                                    var mt = exts.setgetMethods[m];
                                    _extends.setgetMethods[m] = mt;
                                }
                            }
                        }
                    }


                    if (superInits && superInits.length) {
                        for (var i = 0; i < superInits.length; i++) {
                            $classData.inits.push(superInits[i]);
                        }
                    }


                    for (var key in superContants) {
                        if (Object.hasOwnProperty.call(superContants, key)) {
                            if (!isConst(key)) {
                                $classData.constants[key] = superContants[key];
                            } else {
                                throwConstError(superClass.__class, key, superContants[key])
                            }
                        }
                    }
                    // uses
                    for (var key in superUses) {
                        if (superUses.hasOwnProperty(key)) {
                            var vl = superUses[key];
                            // _extends.uses[key] = vl;
                            _parent[key] = vl;

                            if (isConst(key)) {
                                throwConstError(superClass.__class, key, vl)
                            }
                            else if (typeof vl == "function") {
                                _extends.methods[key] = vl;
                            }
                            else {
                                _extends.props[key] = vl;
                            }
                        }
                    }


                    // thuoc tinh
                    for (var key in superProps) {
                        if (superProps.hasOwnProperty(key)) {
                            var vl = superProps[key];

                            if (isConst(key)) {
                                throwConstError(superClass.__class, key, vl)
                            }
                            _extends.props[key] = vl;
                            if (!superExtends || !superExtends.props || !superExtends.props[key]) {
                                _parent[key] = vl;
                            }
                        }
                    }
                    // phuong thuc
                    for (var key in superMethods) {
                        if (superMethods.hasOwnProperty(key)) {
                            var vl = superMethods[key];

                            if (isConst(key)) {
                                throwConstError(superClass.__class, key, vl)
                            }
                            if (key != "constructor") {
                                _extends.methods[key] = vl;
                                _parent[key] = vl;
                            }
                            if (!superExtends || !superExtends.methods || !superExtends.methods[key] || key == "constructor") {
                                _parent[key] = vl;
                            }

                        }
                    }


                    for (var key in superSetGetMethods) {
                        if (superSetGetMethods.hasOwnProperty(key)) {
                            assignValue(_extends.setgetMethods, key, superSetGetMethods[key]);
                            _parent[key] = superSetGetMethods[key];
                            $classData.setgetMethods[key] = superSetGetMethods[key];

                        }
                    }

                    for (var fn in superParents) {
                        if (superParents.hasOwnProperty(fn)) {
                            $classData.parents[fn] = superParents[fn];
                        }
                    }



                    for (var fn in superStatic) {
                        if (superStatic.hasOwnProperty(fn)) {
                            $classData.static[fn] = superStatic[fn];

                            _defineProperty(ES5Class, fn, superStatic[fn]);
                        }
                    }


                    $classData.extends[superClass.__class] = _extends;
                }
                else if (typeof superClass == "function" && typeof superClass.prototype == "object") {
                    cn = superClass.name || "parent_" + Str.rand(8);
                    if (typeof superClass.prototype.constructor == "function") {
                        _parent.constructor = superClass.prototype.constructor;
                        _parent[cn] = superClass.prototype.constructor;
                        _extends.methods[cn] = superClass.prototype.constructor;
                        $classData.constructs[cn] = superClass.prototype.constructor;
                    }
                    for (let mt in superClass.prototype) {
                        if (superClass.prototype.hasOwnProperty(mt)) {
                            var method = superClass.prototype[mt];

                            if (isConst(key)) {
                                throwConstError(superClass.__class, key, vl)
                            }
                            if (mt == "constructor") {
                                _parent.constructor = method;
                                _parent[cn] = method;
                                _extends.methods[cn] = method;
                                $classData.constructs[cn] = method;
                            }
                            else if (typeof method == "function") {
                                _extends.methods[mt] = method;
                            }
                            else {
                                _extends.props[mt] = method;
                            }
                            _parent[mt] = method;
                        }
                    }

                    $classData.extends[cn] = _extends;
                }

                if (!isEmpty(_parent) && cn) {
                    if (typeof $classData.parents[ES5Class.__class] == "undefined") {
                        $classData.parents[ES5Class.__class] = {};
                    }
                    _parent.__class = cn;
                    $classData.parent[cn] = _parent;
                    $classData.parents[ES5Class.__class][cn] = _parent;
                }
            }
        };

        /**
         * kế thừa class
         * @param {function|object|class} superClass class cha
         * @returns {ES5Class}
         */
        ES5Class.extends = function (superClass) {
            if (commited) {
                throw new Error("Không thể gọi hàm extends sau khi đã khai báo phương thức cho class");
            }

            for (var index = 0; index < arguments.length; index++) {
                var arg = arguments[index];
                ES5Class.inherit(arg);
            }
            return ES5Class;
        };



        /**
         * kế thừa các trait
         * @param {object} trait các thuộc tính và phương thức
         * @returns {ES5Class}
         */
        ES5Class.uses = function (trait) {
            if (commited) {
                throw new Error("Không thể gọi hàm uses sau khi đã khai báo phương thức cho class");
            }

            function assignUses(props) {

                for (var key in props) {
                    if (props.hasOwnProperty(key)) {
                        var el = props[key];

                        if (inArray(['constructor', ES5Class.__class], key)) {

                        }
                        else if (isConst(key)) {
                            throwConstError("trait", key, el)
                        }

                        else if (inArray(['boots', 'bootmethods'], String(key).toLowerCase()) && typeof el != "function") {
                            addBootMethod(el);
                        }

                        else if (inArray(['inits', 'initmethods'], String(key).toLowerCase()) && typeof el != "function") {
                            addInitMethod(el);
                        }

                        else {
                            assignPropMethod('uses', key, el);
                            // $classData.uses[key] = el;
                        }
                    }
                }
            }
            var prototype = {};
            for (var index = 0; index < arguments.length; index++) {
                var props = arguments[index];
                if (typeof props == "object") {
                    assignUses(props);
                } else if (isFunction(props)) {
                    if (objectKeys(props.prototype).length > 1) {
                        Object.assign(prototype, props.prototype);
                    }
                }

            }

            assignUses(prototype);

            return ES5Class;
        };

        // khai báo

        /**
         * khai báo thuộc tính hoặc phương thức
         * @param {object} props thuộc tính hoặc phuong thức
         * @returns {ES5Class}
         */
        ES5Class.assign = function (props) {
            if (typeof props == "object") {
                for (var key in props) {
                    if (props.hasOwnProperty(key)) {
                        var el = props[key];

                        if (isConst(key)) {
                            throwConstError(ES5Class.__class, key, el)
                        }
                        else if ((key == "constructor" || key == ES5Class.__class)) {
                            if (typeof el == "function") addConstructor(el);
                        }

                        else if (inArray(['boots', 'bootmethods'], String(key).toLowerCase())) {
                            addBootMethod(el);
                        }

                        else if (inArray(['inits', 'initmethods'], String(key).toLowerCase()) && typeof el != "function") {
                            addInitMethod(el);
                        }

                        else if (typeof el == "function") {
                            assignPropMethod('methods', key, el);
                            // $classData.methods[key] = el;
                        }

                        else {
                            assignPropMethod('props', key, el);
                            // $classData.props[key] = el;
                        }
                    }
                }
            }
            ES5Class.commit();
            return ES5Class;
        };

        var $ignore = [
            'getClass', 'getType', 'getExtends', 'getUses', 'getMethods', 'getProps', 'getConstructs', 'getParents', 'getParent',
            'getStatic', 'getInstances', 'getInits', 'getSetGetMethods',
            'constructor', ES5Class.__class, 'extends', 'uses', 'assign', 'inherit', 'static', '__update__properties__',
            'resetBootMethods', 'resetInitMethods', 'commit', "getInstanceID"
        ];

        /**
         * khai báo static
         * @param {string|object} props
         * @param {mixed} value
         * @returns {ES5Class}
         */
        ES5Class.static = function (props, value) {

            if (typeof props == "object") {
                for (var key in props) {
                    if (props.hasOwnProperty(key)) {
                        var el = props[key];

                        if (!inArray($ignore, key)) {
                            $classData.static[key] = el;
                            _defineProperty(ES5Class, key, el);
                        }
                    }
                }
            }
            else if (typeof props == "string") {
                var key = props;
                if (!inArray($ignore, key)) {
                    $classData.static[key] = value;
                    _defineProperty(ES5Class, key, el);
                }
            }
            return ES5Class;
        };






        /**
         * Cập nhật các thuộc tính mới
         */
        ES5Class.commit = function () {
            if (commited) {
                return ES5Class;
            }

            for (var key in $classData.constants) {
                if (Object.hasOwnProperty.call($classData.constants, key)) {
                    if (typeof $classData.constants[key] != "function") {
                        addConstValue(key, $classData.constants[key]);
                    }
                    else {
                        _defineProperty(ES5Class.prototype, key, $classData.constants[key]);
                    }


                }
            }

            var methods = {};
            if ($classData.extends) {
                for (var std in $classData.extends) {
                    if ($classData.extends.hasOwnProperty(std)) {
                        var _extends = $classData.extends[std];
                        for (var method in _extends.methods) {
                            if (_extends.methods.hasOwnProperty(method)) {
                                var cb = _extends.methods[method];
                                methods[method] = cb;
                            }
                        }


                    }
                }
            }

            if ($classData.uses) {
                for (var key in $classData.uses) {
                    if ($classData.uses.hasOwnProperty(key)) {
                        var val = $classData.uses[key];
                        if (typeof val == "function") {
                            methods[key] = val;
                        }
                    }
                }
            }



            for (var method in $classData.methods) {
                if ($classData.methods.hasOwnProperty(method)) {
                    var cb = $classData.methods[method];
                    methods[method] = cb;
                }
            }

            var mts = {};
            Object.assign(mts, methods);
            for (var key in mts) {
                if (mts.hasOwnProperty(key) && key != "constructor") {
                    var mt = mts[key];
                    __addMethod(key, mt);
                }
            }

            commited = true;
            // __contructs = [];
            if ($classData.constructs) {
                for (var fn in $classData.constructs) {
                    if ($classData.constructs.hasOwnProperty(fn)) {
                        __contructs.push($classData.constructs[fn]);
                    }
                }
            }

            parseDataProps();
            return ES5Class;
        };




        /**
         * kiểm tra xem có phải là instance của StdClas không
         * @param {mixed} instance bien doi tuong can kiem tra
         */
        ES5Class.isInstance = function (instance) {
            if (_instanceof(instance, ES5Class)) return true;
            if (isObject(instance)) {
                if (typeof instance.constructor == "function") {
                    if (instance.constructor.__type == "class") {
                        var cl = instance.constructor;
                        var parents = instance.constructor.getParents();
                        if (!isEmpty(parents)) {
                            for (var key in parents) {
                                if (parents.hasOwnProperty(key)) {
                                    var pa = parents[key];
                                    if (pa.__class == ES5Class) return true;
                                }
                            }
                        }
                    }
                }
            }
            return false;
        };



        /**
         * cập nhật thuộc tính
         * @param {boolean} override ghi ghi đè
         */
        ES5Class.prototype.__update__properties__ = function updateProperties(override) {


            for (var key in $props) {
                if ($props.hasOwnProperty(key)) {
                    var val = $props[key];
                    _defineProperty(this, key, val);
                }
            }

        };


        ES5Class.prototype.__callStatic = function __callStatic(name, args) {
            if (typeof ES5Class[name] == "function") {
                return ES5Class[name].apply(ES5Class, isArray(args) ? args : []);
            }
            return false;
        };








        // boot

        /**
         * Thêm phương thức
         * @param {string|string[]|object|functiong} method 
         */
        ES5Class.prototype.addBootMethod = function (method) {
            addBootMethod.apply(this, arguments);
        }
        /**
         * Thêm phương thức
         * @param {string|string[]|object|functiong} method 
         */
        ES5Class.addBootMethod = function (method) {
            addBootMethod.apply(null, arguments);
        }
        /**
         * Thêm phương thức
         * @param {string|string[]|object|functiong} method 
         */
        ES5Class.removeBootMethod = function (method) {
            if (isString(method)) {
                if (typeof $boots[method]) {
                    delete $boots[method];
                }
            }
            else if (isArray(method)) {
                for (var i = 0; i < method.length; i++) {
                    var mt = method[i];
                    if (isString(mt)) {
                        if (typeof $boots[mt]) {
                            delete $boots[mt];
                        }
                    }
                }
            }
        }
        /**
         * Thêm phương thức
         * @param {string|string[]|object|functiong} method 
         */
        ES5Class.prototype.removeBootMethod = function (method) {
            ES5Class.removeBootMethod.apply(this, arguments);
        }
        /**
         * Thêm phương thức
         */
        ES5Class.prototype.resetBootMethods = function (method) {
            $boots = {};
        }

        ES5Class.resetBootMethods = function () {
            $boots = {};
        }




        function parseDataProps() {
            var props = {};
            if ($classData.extends) {
                for (var std in $classData.extends) {
                    if ($classData.extends.hasOwnProperty(std)) {
                        var _extends = $classData.extends[std];
                        for (var prop in _extends.props) {
                            if (_extends.props.hasOwnProperty(prop)) {
                                var cb = _extends.props[prop];
                                props[prop] = cb;

                            }
                        }

                    }
                }
            }

            if ($classData.uses) {
                for (var key in $classData.uses) {
                    if ($classData.uses.hasOwnProperty(key)) {
                        var val = $classData.uses[key];
                        if (typeof val != "function") {
                            // if ((!override && typeof this[key] == "undefined") || override == true) {
                            props[key] = val;
                            // }
                        }
                    }
                }
            }

            for (var prop in $classData.props) {
                if ($classData.props.hasOwnProperty(prop)) {
                    var cb = $classData.props[prop];
                    props[prop] = cb;
                    // if ((!override && typeof this[prop] == "undefined") || override == true) {
                    //     $props[prop] = cb;
                    // }
                }
            }

            for (var key in props) {
                if (props.hasOwnProperty(key)) {
                    var val = props[key];
                    if (key.substr(0, 1) == '$') {
                        var ks = key.substr(1);
                        // __addSetGetValue(this, ks, val);
                        $dynamics[ks] = val;
                    }
                    else {
                        $props[key] = val;
                        // _defineProperty(this, key, val);
                    }
                }
            }

        }


        function addBootMethod(method) {
            if (isString(method)) {
                $boots[method] = [];
            } else if (isArray(method)) {
                method.map(function (mt) {
                    if (isString(mt)) {
                        $boots[mt] = [];
                    }
                });
            } else if (isObject(method)) {
                for (var key in method) {
                    if (Object.hasOwnProperty.call(method, key)) {
                        var params = method[key];
                        $boots[key] = isArray(params) ? params : [params];
                    }
                }
            }
        }


        /**
        * Thêm phương thức
        * @param {string|string[]|object|functiong} method 
        */
        ES5Class.removeInitMethod = function (method) {
            if (isString(method)) {
                if (typeof $inits[method]) {
                    delete $inits[method];
                }
            }
            else if (isArray(method)) {
                for (var i = 0; i < method.length; i++) {
                    var mt = method[i];
                    if (isString(mt)) {
                        if (typeof $inits[mt]) {
                            delete $inits[mt];
                        }
                    }
                }
            }
        }
        /**
         * Thêm phương thức
         * @param {string|string[]|object|functiong} method 
         */
        ES5Class.prototype.removeInitMethod = function (method) {
            ES5Class.removeInitMethod.apply(this, arguments);
        }
        /**
         * Thêm phương thức
         */
        ES5Class.prototype.resetInitMethods = function (method) {
            $inits = {};
        }

        ES5Class.resetInitMethods = function () {
            $inits = {};
        }




        function addInitMethod(method) {
            if (isString(method)) {
                $inits[method] = [];
            } else if (isArray(method)) {
                method.map(function (mt) {
                    if (isString(mt)) {
                        $inits[mt] = [];
                    }
                });
            } else if (isObject(method)) {
                for (var key in method) {
                    if (Object.hasOwnProperty.call(method, key)) {
                        var params = method[key];
                        $inits[key] = isArray(params) ? params : [params];
                    }
                }
            }
        }




        function isConst(key) {
            return Object.hasOwnProperty.call($classData.constants, key);
        }

        function throwConstError(className, key, value) {
            throw new Error("Không thể kế thừa " + (typeof value == "function" ? "phương thức" : "thuộc tính") + " [" + key + "] từ class [" + className + "] do trùng vời hàng số đã được khai báo");
        }


        function addConstValue(key, value) {
            $constants[key] = {
                value: value,
                set: function (val) {
                    console.warn("bạn không thể set giá trị cho một hằng " + key);
                },
                get: function () {
                    return $constants[key] ? $constants[key].value : null;
                }
            };
        }

        /**
         * khai bao thuoc tinh hoac phuong thuc
         * @param {string} scope 
         * @param {string} key 
         * @param {*} value 
         */
        function assignPropMethod(scope, key, value) {
            if (!isString(key)) return false;
            var a = String(key).split("$");
            if (a.length == 2 && a[0].length) {
                var s = a[0].toLowerCase();
                if (s == "const" || s == "final") {
                    if (!isConst(a[1])) {
                        if (a[1] == "constructor") {
                            if (typeof value == 'function') addConstructor(value);
                        }

                        if (typeof value != "function" && !inArray($ignore, a[1])) {
                            _defineProperty(ES5Class, a[1], value);
                        }
                        if (typeof value == "function" && (a[1] == "call" || a[1] == "caller" || a[1] == "__call" || a[1] == "__call__")) {
                            $calls.push(value);
                        }
                        // else{
                        $classData.constants[a[1]] = value;
                        // }

                    } else {
                        throw new Error("Bạn không thể ghi đè một Hằng");
                    }
                }
                else if (s == 'onset') {
                    if (typeof value == "function") {
                        if (typeof $classData.setgetMethods[a[1]] == "undefined") {
                            $classData.setgetMethods[a[1]] = {};
                        }
                        $classData.setgetMethods[a[1]].set = value;
                    }

                }
                else if (s == 'onget') {
                    if (typeof value == "function") {
                        if (typeof $classData.setgetMethods[a[1]] == "undefined") {
                            $classData.setgetMethods[a[1]] = {};
                        }
                        $classData.setgetMethods[a[1]].get = value;
                    }
                }
                else if (s == 'static') {
                    ES5Class.static(a[1], value);
                }
                else if (!isConst(key)) {
                    $classData.constants[a[1]] = value;
                    if (typeof value == "function" && (a[1] == "call" || a[1] == "caller" || a[1] == "__call" || a[1] == "__call__")) {
                        $calls.push(value);
                    }
                    else if (typeof $classData[scope] == "object") {
                        if (typeof $classData.uses[key] != "undefined") delete $classData.uses[key];
                        if (typeof $classData.methods[key] != "undefined") delete $classData.methods[key];
                        if (typeof $classData.props[key] != "undefined") delete $classData.props[key];
                        $classData[scope][key] = value;
                    }
                }
            }
            else if (!isConst(key)) {
                let kl = String(key).toLowerCase();
                if (typeof value == "function" && (kl == "call" || kl == "caller" || kl == "__call" || kl == "__call__")) {
                    $calls.push(value);
                }

                else if (typeof $classData[scope] == "object") {
                    if (typeof $classData.uses[key] != "undefined") delete $classData.uses[key];
                    if (typeof $classData.methods[key] != "undefined") delete $classData.methods[key];
                    if (typeof $classData.props[key] != "undefined") delete $classData.props[key];
                    $classData[scope][key] = value;
                }
            }
        }


        /**
         * get Intance ID
         * @return {string}
         */
        ES5Class.prototype.getInstanceID = function getInstanceID() {
            return this.__instance__id__;
        };


        function __addSetGetValue(obj, instanceID, key, val) {
            var g, s;
            if (typeof $classData.setgetMethods[key] == "object") {
                if (typeof $classData.setgetMethods[key].get == "function")
                    g = $classData.setgetMethods[key].get;
                if (typeof $classData.setgetMethods[key].set == "function")
                    s = $classData.setgetMethods[key].set;
            }
            if (typeof $data[instanceID] == "undefined") $data[instanceID] = {};
            if (typeof $data[instanceID][key] != "undefined") return false;
            $data[instanceID][key] = val;
            if (typeof obj[key] != "undefined") return false;
            var da = {
                get: function () {
                    var value = $data[instanceID][key];
                    if (g) {
                        var r = g.apply(this, [value]);
                        if (typeof r != "undefined") return r;
                    }
                    return value;
                },
                set: function set(value) {
                    var stt = true;
                    var oldVal = $data[instanceID][key];

                    if (obj.isDomElement && key == "parent") {
                        $data[instanceID][key] = value;
                        if (s) {
                            var a = s.call(this, value, oldVal);
                            if (a === false) stt = false;
                        }
                        if (!stt) {
                            $data[instanceID][key] = oldVal;
                        }
                        return $data[instanceID][key];
                    }
                    if (s) {
                        var a = s.call(this, value, oldVal);
                        if (a === false) stt = false;
                    }

                    if (stt) $data[instanceID][key] = value;
                    return $data[instanceID][key];
                }
            };

            Object.defineProperty(obj, key, da);
        }



        ES5Class.prototype.__addSetGetValue__ = function (objectData) {
            if (isObject(objectData) && objectData.key) {
                var key = objectData.key;
                var g, s;
                if (typeof objectData.get == "function")
                    g = objectData.get;
                if (typeof objectData.set == "function")
                    s = objectData.set;
                var instanceID = this.__instance__id__;
                if (typeof $data[instanceID] == "undefined") $data[instanceID] = {};
                var isExists = typeof $data[instanceID][key] != "undefined";
                $data[instanceID][key] = typeof objectData.value != "undefined" ? objectData.value : null;
                if (isExists) return;
                var da = {
                    get: function () {
                        var value = $data[instanceID][key];
                        if (g) {
                            var r = g.apply(this, [value]);
                            if (typeof r != "undefined") return r;
                        }
                        return value;
                    },
                    set: function set(value) {
                        var stt = true;
                        var oldVal = $data[instanceID][key];

                        if (this.isDom && key == "parent") {
                            $data[instanceID][key] = value;
                            if (s) {
                                var a = s.call(this, value, oldVal);
                                if (a === false) stt = false;
                            }
                            if (!stt) {
                                $data[instanceID][key] = oldVal;
                            }
                            return $data[instanceID][key];
                        }
                        if (s) {
                            var a = s.call(this, value, oldVal);
                            if (a === false) stt = false;
                        }

                        if (stt) $data[instanceID][key] = value;
                        return $data[instanceID][key];
                    }
                };

                Object.defineProperty(this, key, da);
            }
        };

        ES5Class.prototype.__changeSetGetValue__ = function (key, value) {
            var instanceID = this.__instance__id__;
            if (typeof $data[instanceID] == "undefined") return false;
            if (isString(key)) {

                $data[instanceID][key] = value;
            }

            else if (isObject(key)) {
                for (var k in key) {
                    if (Object.hasOwnProperty.call(key, k)) {
                        this.__changeSetGetValue__(k, key[k]);
                    }
                }
            }
            return true;
        };

        function __addMethod(name, handle) {
            if (name.length > 6) {
                var pre = name.substr(0, 6).toLowerCase();

                var n = name.substr(6, 1).toLowerCase() + (name.length > 7 ? name.substr(7) : '');
                if (inArray(['$onset', 'onset$'], pre)) {
                    if (typeof $classData.setgetMethods[n] == "undefined") {
                        $classData.setgetMethods[n] = {};
                    }
                    $classData.setgetMethods[n].set = handle;
                    return;
                }
                else if (inArray(['$onget', 'onget$'], pre)) {
                    if (typeof $classData.setgetMethods[n] == "undefined") {
                        $classData.setgetMethods[n] = {};
                    }
                    $classData.setgetMethods[n].get = handle;
                    return;
                }
            }
            _defineProperty(ES5Class.prototype, name, handle);

        };


        function checkCreateNewInstanceByStaticConstructorCall() {
            if (commited && ($props.dynamicCreateMode || $dynamics.dynamicCreateMode || $constants.dynamicCreateMode)) {
                return true;
            }
            return false;
        }


        function newInstance(args) {
            var instance = null;
            // console.log("create intance of " + ES5Class.__class, args);
            var a = 'instance = new ES5Class(';
            if (args && args.length) {
                for (var index = 0; index < args.length; index++) {
                    a += 'args[' + index + ']' + (index < args.length - 1 ? ',' : '');
                }
            }
            a += ');';
            try {
                eval(a);
            } catch (error) {
                console.warn(error);

            }
            return instance;
        }

        var copyContructs = [];
        // hàm khởi tạo
        function __contruct() {
            var self = this;
            copyContructs = copyArray(__contructs);

            return (typeof this[$className] == "function" ? this[$className] : (
                copyContructs.length ? copyContructs.pop() : function () { console.log("create instance of " + ES5Class.__class) }
            )).apply(this, arguments);

        };

        /**
         * them ham khoi tao
         * @param {function(...args)} constructor ham khoi tao
         */
        function addConstructor(constructor) {

            $classData.methods.constructor = $classData.methods[$className] = function () {
                if (copyContructs.length) {
                    copyContructs = copyArray(__contructs);
                    _defineProperty(this, 'super', function parentConstructor() {
                        var args1 = getArguments(arguments);
                        var pConstructor = copyContructs.pop();
                        pConstructor.apply(this, args1);
                    });
                }
                constructor.apply(this, arguments);
            }
        }


        /**
         * thêm dữ liệu vho clSS trước khi tạo mới
         * @param {string} key key hoặc object
         * @param {mixed} value phần tử cha
         * @returns {ES5Class}
         */
        ES5Class.with = ES5Class.withData = function withData(key, value) {
            var self = this;
            if (isObject(key)) {
                for (const k in key) {
                    if (Object.hasOwnProperty.call(key, k)) {
                        const valu = key[k];
                        oneTimeData[k] = valu;
                    }
                }
            }
            else if (isString(key)) {
                oneTimeData[key] = value;
            }
            return self;
        };

        /**
         * thêm dữ liệu vho clSS trước khi tạo mới
         * @param {...} args key hoặc object
         * @returns {ES5Class}
         */
        ES5Class.create = function createInstance() {
            var self = this;
            return self.apply(null, arguments);
        };




        if(isObject($class)){
            ES5Class.assign($class);
        }


        // if(typeof $constants.noReturn == "undefined"){
        //     addConstValue('noReturn', NORETURN_VALUE)
        // }

        return ES5Class;

    }(className, isGlobal);
};

const _class = createClass;
module.export = createClass;
module.exports = { createClass, _class};
