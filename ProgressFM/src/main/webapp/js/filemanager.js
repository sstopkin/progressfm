var selected_files = [];
var mainFullPath = "";

function searchAndRemove(array, elt) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === elt) {
            array.splice(i, 1);
        }
    }
}

function refreshFileList() {
    getFolderList(mainFullPath);
}

function mkDir() {
    var some_html = "<label class=\"control-label\">Имя папки</label>";
    some_html += "<input id=\"mainFileManagerNewPathName\" type=\"text\" class=\"form-control\">";
    bootbox.dialog({
        title: "<h4 class=\"modal-title\">Создать папку</h4></div>",
        message: some_html,
        buttons: {
            success: {
                label: "Создать",
                className: "btn-success",
                callback: function() {
                    var basePath = mainFullPath;
                    var newFolderName = $('#mainFileManagerNewPathName').val();
                    $.ajax({
                        type: "POST",
                        url: "api/fm/mkdir",
                        data: {path: basePath + "/" + newFolderName},
                        success: function(data) {
                            getFolderList(parseFolder(basePath));
                        },
                        error: function(data) {
                            showDanger(data.responseText);
                            return false;
                        }
                    });
                }
            },
            danger: {
                label: "Отмена",
                className: "btn-danger",
                callback: function() {
                }
            }
        }
    });
}

function getUpFolder() {
    var basePath = mainFullPath;
    var a = basePath.split('/');
    a.splice(-1, 1);
    getFolderList(a.toString());
}

function getHomeFolder() {
    getFolderList(",");
}

function getFolderList(path) {
    $.ajax({
        type: "POST",
        url: "api/fm/getfilelist",
        data: {path: parseFolderRevert(path)},
        success: function(data) {
            mainFullPath = parseFolderRevert(path);
            generateFullPathBreadcrumb(path);
            $("#errorBlock").css("display", "none");
            var array = JSON.parse(data);
            var str = "<table class=\"table table-bordered\">";
            str += "<thead>";
            str += "<tr>";
            str += "<th></th>";
            str += "<th>Имя</th>";
            str += "<th>Размер</th>";
            str += "<th>Дата</th>";
            str += "<th>Путь</th>";
            array.forEach(function(entry) {
                str += "<tr>";
                str += "<td>" + "<input type=\"checkbox\" class=\"file-select\" id=\"" + entry.path + "\">" + "</td>";
                if (entry.isFile) {
                    str += "<td>";
                    str += "<span class=\"glyphicon glyphicon-file\"></span> ";
                    str += "<a href=\"/api/fm/getfile/" + entry.path + "\">" + entry.name + "</a>"
                    str += "</td>";
                    str += "<td>" + entry.size + "</td>";
                }
                else {
                    str += "<td>";
                    str += "<span class=\"glyphicon glyphicon-folder-open\"></span> ";
                    str += "<a onclick=\"getFolderList('" + parseFolder(entry.path) + "');\" value=\"" + entry.name + "\">" + entry.name + "</a>";
                    str += "</td>";
                    str += "<td></td>";
                }
                str += "<td>" + entry.modifyTime + "</td>";
                str += "<td>" + entry.path + "</td>";
                str += "</tr>";
            });
            $("#mainFileManagerFileList").html(str);
            $(".file-select").click(function() {
                selectCheckboxClick(this);
            });
            $("#remove").click(function() {
                deleteSelectedFiles();
            });
        },
        error: function(data) {
            showDanger(data.responseText);
            return false;
        }
    });
}

function selectFile(object) {
    selected_files.push($(object).attr("id"));
}

function deselectFile(object) {
    searchAndRemove(selected_files, $(object).attr("id"));
}

function selectCheckboxClick(object) {
    if ($.inArray($(object).attr("id"), selected_files) === -1) {
        selectFile(object);
    } else
    {
        deselectFile(object);
    }
}

function deleteSelectedFiles() {
    var basePath = mainFullPath;
    $.ajax({
        type: "POST",
        url: "api/fm/remove",
        data: {data: selected_files.toString()},
        success: function() {
            getFolderList(parseFolder(basePath));
            selected_files = [];
        },
        error: function(data) {
            showDanger(data.responseText);
            return false;
        }
    });
}

function parseFolder(path) {
    return path.replace(/\//g, ",");
}

function parseFolderRevert(path) {
    return path.replace(/,/g, "\/").replace(/\"/g, "").replace(/ /g, "");
}

function generateFullPathBreadcrumb(path) {
    var arr = [];
    arr = path.split(",");
//    arr.splice(0, 1);
    var str = "<ol class=\"breadcrumb\">";
    var stack = [];
    if (path == "") {
        str += "<li>";
        str += "<a onclick=\"getFolderList(',');\">/</a>";
        str += "</li>";
    }
    else {
        var res = "";
        for (var i = 0; i < arr.length; i++) {
            stack += "," + arr[i];
            if (i === arr.length - 1) {
                res += "<li class=\"active\">";
                res += arr[i];
                res += "</li>";
            }
            else {
                res += "<li>";
                res += "<a onclick=\"getFolderList('" + stack.toString() + "');\">" + arr[i] + "</a>";
                res += "</li>";
            }
        }
        res += "</ol>";
        console.log("stack" + stack.toString());
    }
}

function uploadFile() {
    var some_html = "<form id=\"loadContent\" action=\"api/fileupload\" method=\"post\" enctype=\"multipart/form-data\" target=\"contentFrame\">";
    some_html += "<label class=\"control-label\">Файл</label>";
    some_html += "<input type=\"file\" name=\"file\" class=\"form-control\" id=\"fileName\">";
    some_html += "<label class=\"control-label\">Путь</label>";
    some_html += "<input id=\"filemanagerUploadFilePath\" name=\"path\" value=\"\" type=\"text\" class=\"form-control\">";
    some_html += "</form>";
    bootbox.dialog({
        title: "<h4 class=\"modal-title\">Загрузить файл</h4></div>",
        message: some_html,
        buttons: {
            success: {
                label: "Загрузить",
                className: "btn-success",
                callback: function() {
                    $("#filemanagerUploadFilePath").val(mainFullPath);
                    $('#loadContent').submit();
                }
            },
            danger: {
                label: "Отмена",
                className: "btn-danger",
                callback: function() {
                }
            }
        }
    });
}