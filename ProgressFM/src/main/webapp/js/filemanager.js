var selected_files = []

/* Utility-functions */

function searchAndRemove(array, elt) {
  for (var i=array.length-1; i>=0; i--) {
    if (array[i] === elt) {
      array.splice(i, 1);
    }
  }
}


/* Actual code */

function  getFolderContent(path) {
    alert(path);
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
    $.post("api/fm/delete", JSON.stringify(selected_files),
        (function () { 
          getFolderList($('#mainFileManagerFullPathLabel').text());
          selected_files = [];
        }));
}

function parseFolder(path) {
    return path.replace(/\//g, ",");
}

function parseFolderRevert(path) {
    return path.replace(/,/g, "\/").replace(/\"/g, "").replace(/ /g, "");
}
