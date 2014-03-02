function  getHomeFolder() {
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

function refreshFileList(){
    getFolderList($('#mainFileManagerFullPathLabel').text());
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
            str += "<th>Имя</th>";
            str += "<th>Размер</th>";
            str += "<th>Дата</th>";
            str += "<th>Путь</th>";
            array.forEach(function(entry) {
                str += "<tr>";
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