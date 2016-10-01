'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Because i am very anti-jquery

var HTTPHelper = function () {
    function HTTPHelper() {
        _classCallCheck(this, HTTPHelper);
    }

    _createClass(HTTPHelper, null, [{
        key: 'getUrl',
        value: function getUrl() {
            return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + (parseInt(window.location.port, 10) + 1) : '');
            //return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
        }
    }, {
        key: 'post',
        value: function post(uri, data, baseUrl) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                baseUrl = baseUrl || _this.getUrl();

                var xmlHttp = new XMLHttpRequest();

                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState === 4) {
                        if (xmlHttp.status === 201) {
                            try {
                                resolve(JSON.parse(xmlHttp.responseText));
                            } catch (e) {
                                resolve(xmlHttp.responseText);
                            }
                        } else reject(xmlHttp.status);
                    }
                };

                xmlHttp.open("POST", baseUrl + uri, true); // true for asynchronous 
                xmlHttp.setRequestHeader("Content-Type", "application/json");
                xmlHttp.send(JSON.stringify(data));
            });
        }
    }, {
        key: 'get',
        value: function get(uri, baseUrl) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                baseUrl = baseUrl || _this2.getUrl();

                var xmlHttp = new XMLHttpRequest();

                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState === 4) {
                        if (xmlHttp.status === 200) {
                            try {
                                resolve(JSON.parse(xmlHttp.responseText));
                            } catch (e) {
                                resolve(xmlHttp.responseText);
                            }
                        } else reject(xmlHttp.status);
                    }
                };

                xmlHttp.open("GET", baseUrl + uri, true); // true for asynchronous 
                xmlHttp.send(null);
            });
        }
    }]);

    return HTTPHelper;
}();

exports.default = HTTPHelper;