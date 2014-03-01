function  getFolderContent(path) {
    alert(path);
}

function getRootFolder() {
    $.ajax({
        type: "GET",
        url: "api/fm/getroot",
        success: function(data) {
            $("#errorBlock").css("display", "none");
            var array = JSON.parse(data);
            var str = "<table class=\"table table-bordered\">";
            str += "<thead>";
            str += "<tr>";
            str += "<th>Имя</th>";
            str += "<th>Путь</th>";
            array.forEach(function(entry) {
                str += "<tr>";
                str += "<td><span class=\"glyphicon ";
                if (entry.isFile) {
                    str += "glyphicon-file";
                }
                else {
                    str += "glyphicon-folder-open";
                }
                str += "\"></span> " + entry.name + "</td>";
                str += "<td>" + entry.path + "</td>";
                str += "</tr>";
            });
            $("#mainFileManagerContainer").html(str);
        },
        error: function(data) {
            showDanger(data.responseText);
            return false;
        }
    });
}