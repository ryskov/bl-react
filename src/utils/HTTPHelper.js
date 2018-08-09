// Because i am very anti-jquery
let _authToken = null;

const _getCompletedHeaders = (headers) => {
    if (!_authToken) return headers;

    return Object.assign({ Authorization: 'Bearer ' + _authToken }, headers);
};

export default class HTTPHelper {

    static getUrl() {
        // return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + (parseInt(window.location.port, 10) + 1) : '');
        return window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }

    static setAuthToken(authToken) {
        _authToken = authToken;
    }

    static put(uri, data, baseUrl, headers) {
        headers = _getCompletedHeaders(headers);

        return new Promise((resolve, reject) => {
            baseUrl = baseUrl || this.getUrl();

            var xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 201) {
                        try {
                            resolve(JSON.parse(xmlHttp.responseText));
                        }
                        catch (e) {
                            resolve(xmlHttp.responseText);
                        }
                    }
                    else 
                        reject(xmlHttp.status);
                }
            };

            xmlHttp.open("PUT", baseUrl + uri, true);
            xmlHttp.setRequestHeader("Content-Type", "application/json");

            for (let key in headers) {
                xmlHttp.setRequestHeader(key, headers[key]);
            }

            xmlHttp.send(JSON.stringify(data));
        });
    }

    static delete(uri, baseUrl, headers) {
        headers = _getCompletedHeaders(headers);

        return new Promise((resolve, reject) => {
            baseUrl = baseUrl || this.getUrl();

            var xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 204) {
                        try {
                            resolve(JSON.parse(xmlHttp.responseText));
                        }
                        catch (e) {
                            resolve(xmlHttp.responseText);
                        }
                    }
                    else
                        reject(xmlHttp.status);
                } 
            }

            xmlHttp.open("DELETE", baseUrl + uri, true); // true for asynchronous 

            for (let key in headers) {
                xmlHttp.setRequestHeader(key, headers[key]);
            }
            
            xmlHttp.send(null);
        });
    }

    static post(uri, data, baseUrl, headers) {
        headers = _getCompletedHeaders(headers);

        return new Promise((resolve, reject) => {
            baseUrl = baseUrl || this.getUrl();
            
            var xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState === 4) {
                    if ([200, 201].indexOf(xmlHttp.status) > -1) {
                        try {
                            resolve(JSON.parse(xmlHttp.responseText));
                        }
                        catch (e) {
                            resolve(xmlHttp.responseText);
                        }
                    }
                    else
                        reject(xmlHttp.status);
                } 
            }

            xmlHttp.open("POST", baseUrl + uri, true); // true for asynchronous 
            xmlHttp.setRequestHeader("Content-Type", "application/json");

            for (let key in headers) {
                xmlHttp.setRequestHeader(key, headers[key]);
            }

            xmlHttp.send(JSON.stringify(data));
        });
    }

    static get(uri, baseUrl, headers) {
        headers = _getCompletedHeaders(headers);

        return new Promise((resolve, reject) => {
            baseUrl = baseUrl || this.getUrl();

            var xmlHttp = new XMLHttpRequest();

            xmlHttp.onreadystatechange = () => {
                if (xmlHttp.readyState === 4) {
                    if (xmlHttp.status === 200) {
                        try {
                            resolve(JSON.parse(xmlHttp.responseText));
                        }
                        catch (e) {
                            resolve(xmlHttp.responseText);
                        }
                    }
                    else
                        reject(xmlHttp.status);
                } 
            }

            xmlHttp.open("GET", baseUrl + uri, true); // true for asynchronous 

            for (let key in headers) {
                xmlHttp.setRequestHeader(key, headers[key]);
            }
            
            xmlHttp.send(null);
        });
    }
}