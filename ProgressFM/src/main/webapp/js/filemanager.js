var selected_files = []

function searchAndRemove(array, elt) {
    for (var i = array.length - 1; i >= 0; i--) {
        if (array[i] === elt) {
            array.splice(i, 1);
        }
    }
}

function refreshFileList() {
    getFolderList($('#mainFileManagerFullPathLabel').text());
}

function mkDir() {
    var basePath = $('#mainFileManagerFullPathLabel').text();
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
            $('#mainFileManagerFullPathLabel').text(parseFolderRevert(path));
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
    selected_files.push($(object).attr("id"))
}

function deselectFile(object) {
    searchAndRemove(selected_files, $(object).attr("id"))
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
    $.ajax({
        type: "POST",
        url: "api/fm/remove",
        data: {data: JSON.stringify(selected_files)},
        success: function() {
            getFolderList(parseFolder(basePath));
            selected_files = [];
            getFolderList($('#mainFileManagerFullPathLabel').text());
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
