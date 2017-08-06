//发送Ajax请求
function postAjax(serverMethod, parameter, funCallback) {
    $.ajax(
        {
            type: "Post",
            url: serverMethod,
            data: JSON.stringify(parameter),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: funCallback,
            error: function (err) {
                alert(err.toString());
            }
        });
};

String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

$.format = function (source, params) {
    if (arguments.length == 1)
        return function () {
            var args = $.makeArray(arguments);
            args.unshift(source);
            return $.format.apply(this, args);
        };
    if (arguments.length > 2 && params.constructor != Array) {
        params = $.makeArray(arguments).slice(1);
    }
    if (params.constructor != Array) {
        params = [params];
    }
    $.each(params, function (i, n) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
    });
    return source;
};

//格式化xml字符串
function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function (index, node) {
        var indent = 0;
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        } else if (node.match(/^<\/\w/)) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted;
}

//格式化json字符串
function formatJson(jsonStr) {
    return JSON.stringify(JSON.parse(jsonStr), null, 2);
}

//格式化接口响应字符串
function formatResponse(responseStr) {
    var response;
    if (responseStr.indexOf("<") != -1) {
        response = formatXml(responseStr); //xml
    }
    else if (responseStr.indexOf("{") != -1) {
        response = formatJson(responseStr); //json
    }
    else {
        response = responseStr;
    }
    return response;
}

//获取输入框输入框内容
function getValue(elementId) {
    var v = $("#" + elementId).val();
    return $.trim(v);
}

function showWaitHint() {
    $("#wait_hint").show();
}

function hideWaitHint() {
    $("#wait_hint").hide();
}

function disable(elementId) {
    $("#" + elementId).attr("disabled", true);
}

function enable(elementId) {
    $("#" + elementId).attr("disabled", false);
}

function showElementsByIds(arrIds)
{
    $.each(arrIds, function (i, id) {
        $("#" + id).show();
    });
}

function hideElementsByIds(arrIds) {
    $.each(arrIds, function (i, id) {
        $("#" + id).hide();
    });
}