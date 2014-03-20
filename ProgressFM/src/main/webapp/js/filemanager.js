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
    var basePath = mainFullPath;
    var newFolderName = $('#mainFileManagerNewPathName').val();
    $('#filemanagerCreateFolder').modal('hide');
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

function getUpFolder() {
    var basePath = mainFullPath;
    var a = basePath.split('/');
    a.splice(-1, 1);
    getFolderList(a.toString());
}

function getHomeFolder() {
    $.ajax({
        type: "GET",
        url: "api/fm/gethome",
        success: function(data) {
            getFolderList(parseFolder(JSON.parse(data)[0]));
        },
        error: function(data) {
            showDanger(data.responseText);
            return false;
        }
    });
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
                    str += "<a href=\"/api/fm/getfile" + entry.path + "\">" + entry.name + "</a>"
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
            $("#filemanagerUploadFilePath").val(mainFullPath);
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
    arr.splice(0, 1);
    var str = "<ol class=\"breadcrumb\">";
    var stack = [];
    for (var i = 0; i < arr.length; i++) {
        stack += "," + arr[i];
        if (i === arr.length - 1) {
            str += "<li class=\"active\">";
            str += arr[i];
            str += "</li>";
        }
        else {
            str += "<li>";
            str += "<a onclick=\"getFolderList('" + stack.toString() + "');\">" + arr[i] + "</a>";
            str += "</li>";
        }
    }
    str += "</ol>";
    $('#mainFileManagerFullPathLabel').html(str);
}

function uploadFile(){
    $('#loadContent').submit();
    $('#filemanagerUploadFile').modal('toggle');
}