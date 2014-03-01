function parseUrl(str) {
    // http://kevin.vanzonneveld.net
    // +      original by: Steven Levithan (http://blog.stevenlevithan.com)
    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
    // + input by: Lorenzo Pisani
    // + input by: Tony
    // + improved by: Brett Zamir (http://brett-zamir.me)
    // %          note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: blog post at http://blog.stevenlevithan.com/archives/parseuri
    // %          note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
    // %          note: Does not replace invalid characters with '_' as in PHP, nor does it return false with
    // %          note: a seriously malformed URL.
    // %          note: Besides function name, is essentially the same as parseUri as well as our allowing
    // %          note: an extra slash after the scheme/protocol (to allow file:/// as in PHP)
    // *     example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
    // *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
    var query, key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
        'relative', 'path', 'directory', 'file', 'query', 'fragment'],
            ini = (this.php_js && this.php_js.ini) || {},
            mode = (ini['phpjs.parse_url.mode'] &&
                    ini['phpjs.parse_url.mode'].local_value) || 'php',
            parser = {
                php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
            };

    var m = parser[mode].exec(str),
            uri = {},
            i = 14;
    while (i--) {
        if (m[i]) {
            uri[key[i]] = m[i];
        }
    }
    if (mode !== 'php') {
        var name = (ini['phpjs.parse_url.queryKey'] &&
                ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
        parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
        uri[name] = {};
        query = uri[key[12]] || '';
        query.replace(parser, function($0, $1, $2) {
            if ($1) {
                uri[name][$1] = $2;
            }
        });
    }
    delete uri.source;
//    ##################
    var pathFileManager = "filemanager";

    if (!uri.fragment) {
        getMainPage();
        return;
    }
    var arr = trim(JSON.stringify(uri.fragment)).split('/');
    if (!arr) {
        getMainPage();
        return;
    }

    if (arr[0] === pathFileManager) {
        helpParseUrl(uri, arr, "filemanager");
        return;
    }

    get404Page();
//    ##################
}

function trim(str) {
    return str.replace(/"/g, "");
}

function helpParseUrl(uri, arr, type) {
    if (!arr[1]) {
        if (type === "filemanager") {
            getFileManagerPage();
            return;
        }

        get404Page(uri);
        return;
    }
    else {
        if ((arr[1]) && (type === "filemanager")) {
            if (!arr[2]) {
                showDanger();
                return;
            }
            getFolderContent(arr[2]);
            return;
        }

        if ((arr[1] === "view") && (type === "announcements")) {
            if (!arr[2]) {
                showDanger();
                return;
            }
            getAnnouncementsViewPage(arr[2]);
            return;
        }
        if ((arr[1] === "list") && (type === "apartaments"))
        {
            getApartamentsListPage();
            return;
        }
        get404Page(uri);
        return;
    }
}

function get404Page(uri) {
    console.log(uri);
    $.get("404.html", function(data) {
        $("#mainContainer").html(data);
        //FIXME
        $("#currentLocation").text();
        location.hash = "404";
    });
}

$(document).ready(function() {
    $(window).bind('hashchange', function() {
        parseUrl(location.hash);
    });
});