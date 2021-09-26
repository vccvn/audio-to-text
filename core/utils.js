'use strict';



// var Helper;
var global = this || window;
function addToGlobal(name, value) {
    global[name] = value;
}



// mang
var arr = [];

// var document = window.document;

// var div = document.createElement("div");

// var getProto = Object.getPrototypeOf;

var slice = arr.slice;

// var createElement = document.createElement;


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


var isFunction = function isFunction(obj) {

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
    return type == "string" || (type == "number" && !isNaN(variable));
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
    return getType(variable) == "array" || Array.isArray(variable);
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
 * kiềm tra có phải loat
 * @param {*} variable biến bất kỳ
 */
var isFloat = function isFloat(variable) {
    var type = getType(variable);
    return (type === "number" || type === "string") && !isNaN(variable - parseFloat(variable));
}

/**
 * kiềm tra có phải number
 * @param {*} variable biến bất kỳ
 */
var isInteger = function isInteger(variable) {
    return isNumber(variable) && String(parseInt(variable)) == String(variable);
}


/**
 * kiềm tra có phải boolean
 * @param {*} variable biến bất kỳ
 */
var isBoolean = function isBoolean(variable) {
    return getType(variable) == "boolean";
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

var isEmpty = function (obj) {

    if (typeof obj == "undefined") return true;

    // console.log(any.constructor)
    var type = getType(obj);

    if (type == "object") {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }
    else if (type == "array" || type == 'string') {
        return obj.length == 0;
    }
    else return !obj;
}
var emptyFunc = function () { };

var newObj = (obj) => {
    var d = isObject(obj) ? obj : {};
    var a = Object.create(d);
    for (const key in d) {
        if (Object.prototype.hasOwnProperty.call(d, key)) {
            const v = d[key];
            a[key] = v;
        }
    }
    return a;
}
var emptyObject = function () {
    return Object.create({});
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
    for (var i = 1; i < srclength; i++) {
        var srcObj = arguments[i];
        if (isObject(srcObj)) {
            for (var key in srcObj) {
                if (srcObj.hasOwnProperty(key)) {
                    var val = srcObj[key];
                    if ((isObject(val) || isArray(val)) && !isFormData(val) && val.constructor != Promise) {
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
 * sao chep gia tri trong mang
 * @param {array|object} src mang doi tuong  can sao chep
 */
var copyArray = function (src) {
    var arr = [];
    var t = getType(src);
    if (t == 'object' || t == 'array') {
        if (src.length) {
            for (var index = 0; index < src.length; index++) {
                if (typeof src[index] != "undefined") {
                    arr.push(src[index]);
                }
            }
        } else if (t == 'object') {
            for (var key in src) {
                if (src.hasOwnProperty(key)) {
                    var item = src[key];
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
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
    }
    return keys;
};
var objectValues = function (obj) {
    const values = Object.values(obj);
    // var values = [];
    // obj.a = 0;
    // if (isArray(obj) || isObject(obj)) {
    //     for (var key in obj) {
    //         if (obj.hasOwnProperty(key)) {
    //             values.push(obj[key]);
    //         }
    //     }
    // }
    return values;
};

var isProperty = function isProperty(obj, key) {
    return Object.hasOwnProperty.call(obj, key);
}
var isMethod = function isisMethod(obj, key) {
    var a = false;
    eval("a = typeof obj[key] == 'function'");
    return a;
}

/**
 * kiểm tra giá trị có trong mảng / object hay không
 * @param {array} arr mảng
 * @param {*} value
 * @returns {boolean}
 */
var hasValue = function hasValue(arr, value, checkType) {
    if (typeof arr == "undefined") return false;
    var t = getType(arr);
    if (t == 'array') {
        if (checkType == true) {
            for (var index = 0; index < arr.length; index++) {
                var v = arr[index];
                if (v === value) return true;
            }
        } else {
            return arr.indexOf(value) >= 0;
        }
    } else if (t == 'object') {
        if (checkType) {
            for (var key in arr) {
                if (arr.hasOwnProperty(key)) {
                    var v = arr[key];
                    if (v === value) {
                        return true;
                    }
                }
            }
        } else {
            for (var key in arr) {
                if (arr.hasOwnProperty(key)) {
                    var v = arr[key];
                    if (v == value) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

/**
 * kiểm tra giá trị có trong mảng / object hay không
 * @param {array} arr mảng
 * @param {*} value
 * @returns {boolean}
 */
var inArray = function inArray(arr, value, checkType) {
    if (typeof arr == "undefined") return false;
    var t = getType(arr);
    if (t != "array" && t != "object" && (isArray(value) || isObject(value))) {
        var c = arr;
        arr = value;
        value = c;
        t = getType(arr);
    }
    if (t == 'array') {
        if (checkType == true) {
            for (var index = 0; index < arr.length; index++) {
                var v = arr[index];
                if (v === value) return true;
            }
        } else {
            return arr.indexOf(value) >= 0;
        }
    } else if (t == 'object') {
        if (checkType) {
            for (var key in arr) {
                if (arr.hasOwnProperty(key)) {
                    var v = arr[key];
                    if (v === value) {
                        return true;
                    }
                }
            }
        } else {
            for (var key in arr) {
                if (arr.hasOwnProperty(key)) {
                    var v = arr[key];
                    if (v == value) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
};

var cutWithout = function cutWithout(obj, keys) {
    var newObj = Object.create({});
    var oldObj = Object.create(obj);
    if (isArray(obj) || isObject(obj)) {
        var list = [];
        if (isArray(keys)) list = keys;
        else if (isObject(keys)) {
            for (var key in keys) {
                if (keys.hasOwnProperty(key)) {
                    list.push(keys[key]);
                }
            }
        }

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!inArray(list, key)) {
                    newObj[key] = oldObj[key];
                }
            }
        }
    }
    return newObj;
}

var copyWithout = function copyWithout(obj, keys) {
    var newObj = Object.create({});
    var oldObj = Object.create(obj);

    if (isArray(obj) || isObject(obj)) {
        var list = [];
        if (isArray(keys)) list = keys;
        else if (isObject(keys)) {
            for (var key in keys) {
                if (keys.hasOwnProperty(key)) {
                    list.push(keys[key]);
                }
            }
        }

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!inArray(list, key)) {
                    newObj[key] = oldObj[key];
                }
            }
        }
    }
    return newObj;
};


var copyByList = function copyByList(obj, keys) {
    var newObj = {};
    var oldObj = Object.create(obj);
    if (isArray(obj) || isObject(obj)) {
        var list = [];
        if (isArray(keys)) list = keys;
        else if (isObject(keys)) {
            for (var key in keys) {
                if (keys.hasOwnProperty(key)) {
                    var v = keys[key];
                    list.push(key);
                }
            }
        }

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (inArray(list, key)) {
                    newObj[key] = oldObj[key];
                }
            }
        }
    }
    return newObj;
};

/**
 * kiểm tra toàn bộ kiểu dử liệu của các phần tử con
 * @param {string} type kiểu dử liệu
 * @param {array} object đối tượng cần kiểm tra
 */
var checkAllElementType = function checkAllElementType(type, object) {
    if (!(isString(type) || isArray(type)) || !(isArray(object) || isObject(object))) {
        return false;
    }
    var types = [];
    if (!isArray(type)) types = [type];
    else types = type.slice(0);
    var checked = false;
    if (isArray(object)) {
        let temp = Object.values(object);
        return temp.length && temp.length == temp.filter(function (value) { return types.indexOf(getType(value)) >= 0; }).length;
    }
    var nO = Object.create(object);
    for (var key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            if (types.indexOf(getType(nO[key])) < 0) return false;
            checked = true;
        }
    }
    return checked;

}
/**
 * trổn 2 mảng thành mảng kết hợp mới
 * @param {array[]} arrayArr mảng chứa các phần tử con là 1 mảng
 * @param {any[]} arrayAny mảng chứa các phần tử con có kiểu dử liệu là string hoặc number
 * @returns {array[]}
 */
var combineTwoArray = function combineTwoArray(arrayArr, arrayAny) {
    var newArr = [];
    for (var i = 0; i < arrayArr.length; i++) {
        var arr = arrayArr[i];

        for (var j = 0; j < arrayAny.length; j++) {
            var any = arrayAny[j];
            var v = arr.slice(0);
            v.push(any);
            newArr.push(v);
        }
    }
    return newArr;
};


/**
 * lấy tổ hợp các các phần từ com
 * @param {array} arr1 
 * @param {array} arr2 
 */
var combineElenentsToArrList = function combineElenentsToArrList() {
    var arrayList = [];
    for (var index = 0; index < arguments.length; index++) {
        var arg = arguments[index];
        if (!isArray(arg) || !checkAllElementType(['string', 'number'], arg)) return [];

        arrayList.push(arg);
    }
    if (arrayList.length < 2) return arrayList[0];
    var results = [];
    arrayList[0].map(function (str) {
        results.push([str]);
    });
    for (var i = 1; i < arrayList.length; i++) {
        var arr = arrayList[i];
        results = combineTwoArray(results, arr);
    }

    return results;
};

/**
 * trộn 2 hoặc nhiều mảng thành mảng tổ hợp các phần tử dược nối với nhau bằng delimiter
 * @param {string} deliniter ký tự nối
 * @param {string[]} arr1 mảng 1
 * @param {string[]} arr2 mảng 2
 * @param {string[]} ...arrN mảng 2
 * 
 * @returns {string[]}
 */
var combineElenentsJoinStringList = function combineElenentsJoinStringList(deliniter, arr1, arr2) {
    var arrayList = [];
    for (var index = 1; index < arguments.length; index++) {
        var arg = arguments[index];

        if (!isArray(arg) || !checkAllElementType(['string', 'number'], arg)) return [];

        arrayList.push(arg);
    }
    if (arrayList.length < 2) return arr1;
    var results = combineElenentsToArrList(...arrayList);
    if (!isString(deliniter)) deliniter = '';
    return results.map(function (arr) {
        return arr.join(deliniter);
    });
}


/**
 * lay ra gia tri nho nhat
 * @param {array|object} obj doi tuong mang chua cac gia tri 
 */
var minOf = function minOf(obj) {
    var min = NaN;
    if (arguments.length > 1 && !(isArray(obj) || isObject(obj))) {
        obj = copyArray(arguments);
    }
    if (isArray(obj)) {
        for (var index = 0; index < obj.length; index++) {
            if (!isNumber(obj[index])) continue;
            var n = Number(obj[index]);

            if (isNaN(min) || !index)
                min = n;
            else if (n < min) min = n;
        }
    }
    else if (isObject(obj)) {
        var index = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!isNumber(obj[index])) continue;
                else {
                    var n = Number(obj[index]);
                    if (isNaN(min) || !index) min = n;
                    else if (n < min) min = n;
                }
                index++;
            }
        }
    }
    return min;
};

/**
 * lay ra gia tri lon nhat
 * @param {array|object} obj doi tuong mang chua cac gia tri 
 */
var maxOf = function maxOf(obj) {
    var min = NaN;
    if (arguments.length > 1 && !(isArray(obj) || isObject(obj))) {
        obj = copyArray(arguments);
    }
    if (isArray(obj)) {
        for (var index = 0; index < obj.length; index++) {
            if (!isNumber(obj[index])) continue;
            else {
                var n = Number(obj[index]);
                if (isNaN(min) || !index) min = n;
                else if (n > min) min = n;
            }
        }
    }
    else if (isObject(obj)) {
        var index = 0;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (!isNumber(obj[index])) continue;
                else {
                    var n = Number(obj[index]);
                    if (isNaN(min) || !index) min = n;
                    else if (n > min) min = n;
                }
                index++;
            }
        }
    }
    return min;
};

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
};

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
};

function _defineProperties(target, props) {
    if (isArray(props)) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    else if (isObject(props)) {
        for (var key in props) {
            if (Object.hasOwnProperty.call(props, key)) {
                var val = props[key];
                Object.defineProperty(target, key, val);
            }
        }
    }

};

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
};

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
};

var checkType = function checkType(type, value, absolultely) {
    if (typeof type !== "string" || !type) return false;
    var tl = type.toLowerCase();
    if (tl == "float") tl = 'number';
    if (tl == 'mixed') return true;
    var t = type.substr(0, 1).toUpperCase() + type.substr(1).toLowerCase();
    var t2 = getType(value);
    return absolultely ? t2 === tl : t2 == tl;
};

/**
 * Kiểm tra tồn tại key hay ko?
 * @param {object|array} obj doi tuong can kiem tra
 * @param {string} key 
 * @returns {boolean}
 */
function objectHasKey(obj, key) {
    return (isObject(obj) && isString(key) && Object.hasOwnProperty.call(obj, key));
}

/**
 * kiểm tra sự tồn tại của thuộc tinh thông qua key và kiểu giá trị
 * @param {any} obj doi tuong can kiem tra
 * @param {string} key danh sach key kem kiey gia tri
 * @param {string} type kieu gia tri
 * @returns {boolean}
 */
var objectHasProperty = function objectHasProperty(obj, key, type) {
    if (!isObject(obj) || isEmpty(obj) || typeof key == "undefined" || (!isString(key) && !isArray(key))) return false;
    var keys = isArray(key) ? key : [key + (isString(type) ? ":" + type : "")];
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var ks = k.split(':');
        var kv = ks[0];
        if (!objectHasKey(obj, kv)) return false;
        if (ks.length == 2) {
            var b = ks[1].split('|').map(function (t) { return t.trim(); }).filter(function (vl) { return vl.length > 0; });
            if (b.length && !inArray(b, getType(obj[kv]))) return false;
        }
    }
    return true;
}

/**
 * joi các mảng vào làm một
 * @param {string[]|number[]} target mảng đầu vào cần join
 * @returns {array}
 */
function arrayJoin(target) {
    if (!isArray(target)) target = [];
    function addToTarget(arr) {
        arr.map(function (vl) {
            if (target.indexOf(vl) === -1) {
                target.push(vl);
            }
        })
    }
    var args = getArguments(arguments, 1);
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (isArray(arg)) addToTarget(arg);
        else if (isObject(arg)) addToTarget(objectValues(arg));
        else addToTarget(arg);
    }
    return target;
}







/**
 * 
 * @param obj 
 * @param key 
 * @param delimiter 
 * @returns 
 */
var getEl = function (obj, key, delimiter) {
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
    }
    return null;
};

var Num = {
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

var convertedArray = [];

var Str = {
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
        var t = getType(str);
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
        var a = getArguments(arguments);
        var t = a.length;
        if (t == 0) return '';
        if (typeof a[0] != 'string' || t < 2) {
            return a[0];
        }
        var str = a[0];

        var b = getType(a[1]);
        if (this.isSN(a[1])) {
            if (t >= 3 && this.isSN(a[2])) {
                var obj = Object.create({});
                obj[a[1]] = a[2];
                str = this.replaceByObj(str, obj);
            }
        } else if (b == 'array') {
            if (t >= 3 && getType(a[2]) == 'array') {
                str = this.replaceByArr(str, a[1], a[2]);
            } else if (t >= 3 && getType(a[2]) == 'string') {
                var obj = Object.create({}),
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
        var a = getArguments(arguments);
        var t = a.length;
        if (t == 0) return '';
        if (typeof a[0] != 'string' || t < 2) {
            return a[0];
        }
        var str = a[0];
        var b = getType(a[1]);
        if (b == 'object') {
            str = this.replaceByObj(str, a[1]);
        } else if (b == 'array') {
            var obj = emptyObject();
            if (t >= 3) {
                var f = getType(a[2]);
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
        var a = getArguments(arguments);
        // var a = arguments;
        var t = a.length;
        if (t == 0) return '';
        if (typeof a[0] != 'string' || t < 2) {
            return a[0];
        }
        var str = a[0];
        var b = getType(a[1]);
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
    escapeRegExp: function (str) {
        var s = "" + str + "";
        return s.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    },

    preg_replace: function (find, replace, str) {
        var str = "" + str + "";
        return str.replace(new RegExp(this.escapeRegExp(find), 'g'), replace);
    },

    /**
     * Tạo một chuỗi random Ngẫu nhiên
     * @param {string} charList chuỗi ký tự bổ xung
     * @returns {string}
     */
    rand: function (charList) {
        var st = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        if (charList && isString(charList)) st = st + String(charList);
        var sp = st.split('');
        var l = sp.length - 1;
        var s = '';
        for (var i = 0; i < 32; i++) {
            s += sp[Num.rand(0, l)];
        }
        return s;
    },
    /**
     * biến đổ chuỗi thành slug
     * @param {string} str chuỗi đầu vào
     * @param {string} joinKey ký tự nối
     * @returns {string}
     */
    camelToSlug: function (str, joinKey) {
        // if(typeof str == "undefined") str = "";
        var st = 'BCDEFGHIJKLMNOPQRSTUVWXYZ';
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
    upperToWord: function (str) {
        var st = 'abcdefghijklmnopqrstuvwxyz';
        var sp = st.split('');
        var l = sp.length - 1;
        var s = this.clearUnicode(String(str));
        var find = [];
        var replace = "";
        sp.map(function (c) {
            find.push(c);
        });

        return this.lower(s.substr(0, 1)) + this.lower(this.replace(s.substr(1), find, replace));
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

        if (inArray(convertedArray, object)) return root;

        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                if (typeof joinKey != "string") joinKey = ".";
                var val = object[key];
                var t = typeof val;
                var k = (typeof name != "undefined" && ("" + name).length) ? name + joinKey + key : key;
                if (val != null && (t == 'object' || t == "array")) {
                    root = this.convertTextObject(root, val, k, joinKey);
                } else {
                    root[k] = val;
                }
            }
        }
        convertedArray.push(object);
        return root;
    },
    upper: function (str) {
        if (typeof str == "undefined") return null;
        if (isString(str)) {
            var s = str.toUpperCase();
            return this.replace(s, this.unicode.lower, this.unicode.upper);
        }
        else if ((isObject(str) && typeof str.length != "undefined") || isArray(str)) {
            for (var i = 0; i < str.length; i++) {
                str[i] = this.upper(str[i]);
            }
            return str;
        }
        else if (isObject(str)) {
            for (var key in str) {
                if (str.hasOwnProperty(key)) {
                    var st = str[key];
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
            for (var i = 0; i < str.length; i++) {
                str[i] = this.upper(str[i]);
            }
        }
        else if (isObject(str)) {
            for (var key in str) {
                if (str.hasOwnProperty(key)) {
                    var st = str[key];
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
            for (var i = 0; i < str.length; i++) {
                str[i] = this.ucfirst(str[i]);
            }
        }
        else if (isObject(str)) {
            for (var key in str) {
                if (str.hasOwnProperty(key)) {
                    str[key] = this.ucfirst(str[key]);
                }
            }
        }
        return str;
    },
    ucword: function (str) {
        var self = this;
        if (isString(str)) {
            if (str.length) {
                str = str.split(" ").map(function (s) { return self.ucfirst(s) }).join(" ");
            }
        }
        else if ((isObject(str) && typeof str.length != "undefined") || isArray(str)) {
            for (var i = 0; i < str.length; i++) {
                str[i] = this.ucword(str[i]);
            }
        }
        else if (isObject(str)) {
            for (var key in str) {
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
        var l = 'BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var list = [];
        var n = 0;
        var t = this.replace(this.replace(
            this.clearUnicode(this.lower(s)),
            "[]{}();:'\"\\|,./?~!@#$%^&*+=".split(""),
            "-"
        ), '--', '-');
        for (var i = 0; i < t.length; i++) {
            var st = t[i];
            if (l.indexOf(st) == -1) {
                if (typeof list[n] != "undefined") {
                    if (l.indexOf(t[i - 1]) >= 0) n++;
                }
            } else {
                if (typeof list[n] == "undefined") {
                    list[n] = st;
                } else {
                    list[n] += st;
                }
            }
        };
        return list.join(key);
    },
    slugToCamel: function (str) {
        if (isString(str)) {
            var self = this;
            var t = this.replace(
                this.replace(
                    this.clearUnicode(str),
                    "[]{}();:'\"\\|,./?~!@#$%^&*+=".split(""),
                    "-"
                ),
                '--',
                '-'
            ).split("-")
                .map(s => s.trim())
                .filter(s => s.length > 0)
                .map((s, i) => i > 0 ? self.ucfirst(s) : s)
                .join("");
            str = t;


        }
        return str;
    },
    objectKey: function (str, key) {
        if (!key) key = '_';
        var s = String(str);
        var l = '$ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var list = [];
        var n = 0;
        var t = this.replace(this.replace(
            this.clearUnicode(s),
            "[]{}();:'\"\\|,./?~!@#$%^&*+=".split(""),
            "-"
        ), '--', '-');
        for (var i = 0; i < t.length; i++) {
            var st = t[i];
            if (l.indexOf(st) == -1) {
                if (typeof list[n] != "undefined") {
                    if (l.indexOf(t[i - 1]) >= 0) n++;
                }
            } else {
                if (typeof list[n] == "undefined") {
                    list[n] = st;
                } else {
                    list[n] += st;
                }
            }
        };
        return list.join(key);
    },
    orderCharList: [
        " ", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@",
        "A", "À", "Á", "Ạ", "Ả", "Ã", "Â", "Ầ", "Ấ", "Ậ", "Ẩ", "Ẫ", "Ă", "Ằ", "Ắ", "Ặ", "Ẳ", "Ẵ",
        "B", "C", "D", "Đ",
        "E", "È", "É", "Ẹ", "Ẻ", "Ẽ", "Ê", "Ề", "Ế", "Ệ", "Ể", "Ễ",
        "F", "G", "H",
        "I", "Ì", "Í", "Ị", "Ỉ", "Ĩ",
        "K", "L", "M", "N",
        "O", "Ò", "Ó", "Ọ", "Ỏ", "Õ", "Ô", "Ồ", "Ố", "Ộ", "Ổ", "Ỗ", "Ơ", "Ờ", "Ớ", "Ợ", "Ở", "Ỡ",
        "P", "Q", "R", "S", "T",
        "U", "Ù", "Ú", "Ụ", "Ủ", "Ũ", "Ư", "Ừ", "Ứ", "Ự", "Ử", "Ữ",
        "V", "W", "X",
        "Y", "Ỳ", "Ý", "Ỵ", "Ỷ", "Ỹ",
        "z",
        "[", "\\", "]", "^", "_",
        "a", "à", "á", "ạ", "ả", "ã", "â", "ầ", "ấ", "ậ", "ẩ", "ẫ", "ă", "ằ", "ắ", "ặ", "ẳ", "ẵ",
        "b", "c",
        "d", "d",
        "e", "è", "é", "ẹ", "ẻ", "ẽ", "ê", "ề", "ế", "ệ", "ể", "ễ",
        "f", "g", "h",
        "i", "ì", "í", "ị", "ỉ", "ĩ",
        "k", "l", "m", "n",
        "o", "ò", "ó", "ọ", "ỏ", "õ", "ô", "ồ", "ố", "ộ", "ổ", "ỗ", "ơ", "ờ", "ớ", "ợ", "ở", "ỡ",
        "p", "q", "r", "s", "t",
        "u", "ù", "ú", "ụ", "ủ", "ũ", "ư", "ừ", "ứ", "ự", "ử", "ữ",
        "v", "w", "x", "y", "ỳ", "ý", "ỵ", "ỷ", "ỹ",
        "z"
    ],
    compare: function (str1, str2) {
        var i1n = isNumber(str1)
        var i2n = isNumber(str2);
        if (i1n && i2n) {
            return str1 > str2 ? 1 : (str1 == str2 ? 0 : -1)

        }
        str1 = String(str1);
        str2 = String(str2);
        var s1l = str1.length, s2l = str2.length;
        var max = s1l < s2l ? s1l : s2l;
        for (var i = 0; i < max; i++) {
            var c1 = this.orderCharList.indexOf(str1[i]);
            var c2 = this.orderCharList.indexOf(str2[i]);

            if (c2 == -1 || c1 > c2) return 1;
            if (c1 == -1 || c1 < c2) return -1;

        }
        return s1l > s2l ? 1 : (s1l < s2l ? -1 : 0);

    }

};





var date = function (format, lang) {
    var offset = 0;
    var d = new Date();
    var t = emptyObject();
    var l = String(lang).toLowerCase() != 'en' ? 'vi' : 'en';

    var dl = newObj({
        en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        vi: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']
    });
    var ml = {
        en: ["", "Jan"]
    };


    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    d = new Date(utc + (3600000 * offset));



    t.ms = d.getMilliseconds();
    t.Y = d.getFullYear();
    t.y = d.getFullYear() - 1900;
    t.H = d.getHours();
    t.i = d.getMinutes();
    t.m = d.getMonth() + 1;
    t.s = d.getSeconds();
    t.time = d.getTime();
    t.d = d.getDate();
    t.w = dl[l][d.getDay()];
    if (!format) return t;
    var f = getType(format);
    if (f == 'string') {
        var txt = format;
        txt = Str.replace(txt, 'ms', t.ms);
        txt = Str.replace(txt, 'time', t.time);
        txt = Str.replace(txt, t);
        return txt;
    }
    return null;
};
var getTimeStamp = function () {
    var offset = 0;
    var d = new Date();
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    d = new Date(utc + (3600000 * offset));



    return d.getTime();
};

/**
 * 
 * @param {object} target đối  tượng cần gán thuộc tính
 * @param {object|string} key key hoặc object thuộc tính
 * @param {*} value giá trị
 * @returns {object}
 */
const assignValue = function (target, key, value) {
    if (!isArray(target) && !isObject(target)) return target;
    if (isObject(key)) {
        let objData = key;
        if (isArray(target)) {
            console.warn("Target khong cung kieu voi object");
            var a = target;
            target = assignValue({}, a);
        }
        for (var k in objData) {
            if (objData.hasOwnProperty(k)) {

                var s13 = String(k).substr(0, 13);
                if (s13 == "______rand_id" || s13 == "______unique_") {

                } else {
                    var v = objData[k];
                    assignValue(target, k, v);
                }


            }
        }
    } else if (isArray(key)) {
        let arrData = key;
        for (let i = 0; i < arrData.length; i++) {
            const vl = arrData[i];
            assignValue(target, i, vl);
        }
    }
    else if ((isString(key) || isNumber(key)) && String(key).length) {
        let sk = String(key);
        let ak = key;
        var s13 = sk.substr(0, 13);
        if (s13 == "______rand_id" || s13 == "______unique_") {
            // kong6 làm gì
        } else if (String(key).substr(0, 1) == '@') {
            var f = sk.substr(1);
            if (typeof target[f] == "function") {
                target[f].apply(target, isArray(value) ? value : [value]);
            }
        }
        else if (isObject(value)) {
            if (value.constructor == Object) {
                if (typeof target[ak] != "object") target[ak] = {};
                assignValue(target[ak], value);
            }
            else {
                target[ak] = value;
            }
        }
        else if (isArray(value)) {
            if (typeof target[ak] == "undefined" || !isArray(target[ak])) {
                target[ak] = [];
                assignValue(target[ak], value);
            } else {
                assignValue(target[ak], value);
            }
        }
        else {
            target[ak] = value;
        }
    }
    return target;
};

const assignWithout = (target, source) => {
    if (typeof target != "object" || typeof source != "object") return target;
    var il = [];
    var ignore = getArguments(arguments, 2);
    for (var index = 0; index < ignore.length; index++) {
        var list = ignore[index];
        if (isArray(list)) {
            for (var i = 0; i < list.length; i++) {
                let field = list[i];
                il.push(field);
            }
        } else if (isObject(list)) {
            for (var field in list) {
                if (list.hasOwnProperty(field)) {
                    var val = list[field];
                    il.push(field);
                }
            }
        }else{
            il.push(list)
        }
    }
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            var val = source[key];
            if (!inArray(il, key)) {
                assignValue(target, key, val);
            }
        }
    }
    return target;
};
var rgbToHex = function (rgb) {
    var hex = parseInt(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};
var colorToHex = function (r, g, b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return "#" + red + green + blue;
};

var invertHexColor = function invertHexColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1); // remove #
    color = parseInt(color, 16); // convert to integer
    color = 0xFFFFFF ^ color; // invert three bytes
    color = color.toString(16); // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color; // prepend #
    return color;
}

/**
 * xửu lý hàng đợi
 * @param {function} work hàm thục thi công việc
 * @param {Number} delay thời gian giữa 2 lần chạy task
 * @param {Number} step số lần thực hiện công việc nếu chưa bị reject hay resolve
 */
class Queue {
    status = "";
    result;

    e=null;
    
    constructor(work, delay, step) {
        if (typeof work == "undefined") return this;
        this.status = "pending";
        this.result = null;
        var d = (typeof delay == "undefined" || !isNumber(delay) || delay < 1) ? 10 : delay;
        var s = (typeof step == "undefined" || !isNumber(step) || step < 0) ? -1 : step;
        var self = this;
        var properties = newObj({
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
        });
        var methods = newObj({
            then: function (rs) {
                // App.log(rs);
            },
            catch: function (err) {
                console.log(err);
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

                    var id = setTimeout(() => {
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
                        return true;
                    }, time);
                    properties.timeId = id;
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
        });
        this.e = function (...args) {
            if (!args.length || typeof args[0] != "string") return null;
            var method = args[0];
            var r = null;
            if (typeof methods[method] == "function") {
                var args2 = [];
                for (var i = 1; i < args.length; i++) {
                    var arg = args[i];
                    args2.push(arg);
                }

                r = methods[method].apply(methods, args2);
            }
            return r;
        };
        setTimeout(function () {
            methods.run();
        }, 1);
    }

    delay(delay) {
        if (typeof delay == "undefined" || !isNumber(delay) || delay < 1) return;
        this.e("delay", delay);
        return this;
    }
    step(step) {
        if (typeof step == "undefined" || !isNumber(step) || step < -1 || step == 0) return;
        this.e("step", step);
        return this;
    }
    try(step) {
        if (typeof step == "undefined" || !isNumber(step) || step < -1 || step == 0) return;
        this.e("step", step);
        return this;
    }
    restart() {
        this.e("restart");
        return this;
    }
    then(fn) {
        if (typeof fn == "function") {
            this.e("addThen", fn);
        }
        return this;
    }
    catch(fn){
        if (typeof fn == "function") {
            this.e("addCatch", fn);
        }
        return this;
    }
}
/**
 * xửu lý hàng đợi
 * @param {function} work hàm thục thi công việc
 * @param {Number} delay thời gian giữa 2 lần chạy task
 * @param {Number} step số lần thực hiện công việc nếu chưa bị reject hay resolve
 */
function queueTask(work, delay, step) {
    return new Queue(work, delay, step);
}



/**
 * lấy danh sách tham số nội hàm khi dược gọi
 * @param {Arguments} args tham số nội hàm
 * @param {integer} start vị trí bắt đầu lấy tham số
 * @returns {mixed[]}
 */
function getArguments(args, start) {
    var a = [];
    if (!isNumber(start) || start < 0) start = 0;
    if (args && args.length) {
        for (let i = start; i < args.length; i++) {
            const arg = args[i];
            a.push(arg);
        }
    }
    return a;
}


function JsonToBase64(data) {
    return "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
}


function b64toBlob(b64Data, contentType, sliceSize) {
    if (!contentType) contentType = '';
    if (!sliceSize) sliceSize = 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}





/**
 * resize anh
 * @param {string|Element} img anh
 * @param {int} resizeWidth do rong 
 * @param {int} resizeHeight chieu cao
 * @param {function} callback ham call back
 */
function resizeImage(img, resizeWidth, resizeHeight, callback) {
    function fn(imgTag) {
        var canvas = document.createElement('canvas');
        canvas.setAttribute('width', resizeWidth);
        canvas.setAttribute('height', resizeHeight);


        var ctx = canvas.getContext("2d");

        var imageWidth = imgTag.width;
        var imageHeight = imgTag.height;

        var zoomWidth = imageWidth, zoomHeight = imageHeight;
        var imageRatio = imageWidth / imageHeight;
        var resizeRatio = resizeWidth / resizeHeight;
        // tỉ lệ là dài trên cao

        if (imageRatio < resizeRatio) { // Nếu rỉ lệ của ảnh nhỏ hơn tỷ lệ resize thì sẽ zoom ảnh theo chiều rộng resize
            zoomWidth = resizeWidth;
            zoomHeight = zoomWidth / imageRatio;
        } else { // nhược lại sẽ zoom ảnh theo chiều cao resize
            zoomHeight = resizeHeight;
            zoomWidth = zoomHeight * imageRatio;
        }

        // var image = new Image();
        // image.src = imgTag.src;
        // console.log(imageWidth, imageHeight, zoomWidth, zoomHeight, (resizeWidth - zoomWidth) / 2, (resizeHeight - zoomHeight) / 2);
        ctx.drawImage(imgTag, (resizeWidth - zoomWidth) / 2, (resizeHeight - zoomHeight) / 2, zoomWidth, zoomHeight);
        // console.log(canvas)
        var url = canvas.toDataURL("image/png");
        callback(url);

    }
    return isString(img) ? function () {
        var el = document.createElement('img');
        el.crossOrigin = "anonymous";
        el.onload = function () {
            // window['img00'] = el
            fn(el);

        }
        el.src = img;
        return el;
    }() :
        img instanceof Element ? fn(img) : null;
}

var degreeToRadians = function (degrees) {
    if (!isNumber(degrees) || isNaN(degrees) || degrees == "") degrees = 0;
    return degrees * Math.PI / 180;
};
var radianToDegrees = function (radians) {
    if (!isNumber(radians) || isNaN(radians) || radians == '') radians = 0;
    return radians * 180 / Math.PI;
}



/**
 * 
 * @param type loại input
 * @param name tên input
 * @param value gia tri
 * @param options option
 */
function getInputCfg (
    type,
    name,
    value,
    options
) {
    var t = Str.lower(type);
    return inArray([
        'text', 'number', 'select', 'range', 'radio', 'checkbox', 'switch', 
        'textarea', 'texteditor', 'vector2', 'vector3', 'vector4', 'texture', 
        'imagesurl', 'color' 
    ], t)? assignValue({
        type: t,
        name: name,
        value: value
    }, options) : null ;
}
module.exports= {
    _instanceof, _defineProperties, _createClass, _defineProperty, addToGlobal,
    getType, checkType, isArray, isBoolean, isObject, isString, isNumber, isInteger, isEmail, isNull, isFormData, isEmpty, isCallable, isFunction, isProperty, isMethod, hasValue, inArray,
    cutWithout, copyWithout, copyArray, objectKeys, objectValues, merge, combine, arrayJoin, objectHasKey, objectHasProperty,
    Num, Str, date, getEl, assignValue, assignWithout, colorToHex, invertHexColor, minOf, maxOf, copyByList, isFloat,
    Queue, queueTask, combineElenentsToArrList, combineElenentsJoinStringList, getArguments, JsonToBase64, b64toBlob, resizeImage, getTimeStamp,
    degreeToRadians, radianToDegrees, newObj, emptyObject, getInputCfg
};