function getAnnouncementsViewPage(announcementsId) {
    $.get("announcementsview.html", function(data) {
        $("#mainContainer").html(data);
        $.ajax({
            type: "GET",
            url: "api/announcementscalls/getcalls?id=" + announcementsId,
            success: function(data) {
                $("#errorBlock").css("display", "none");
                var array = JSON.parse(data);
                var str = "";
                str += "<input onclick=\"showAnnouncementsCallMoadl(" + announcementsId + ");\" type=\"button\" class=\"btn btn-primary pull-right\" value=\"Добавить звонок\" />";
                str += "<table class=\"table table-striped table-bordered table-condensed\" style='margin-top:10px;'>";
                str += "<thead class='t-header'>Звонки<tr>";
                str += "<th>Дата</th>";
                str += "<th>Комментарий</th>";
                str += "<th>Автор</th>";
                str += "</tr></thead>";
                str += "<tbody>";
                for (var j = 0; j < array.length; ++j) {
                    str += "<tr><td>";
                    str += array[j].creationDate;
                    str += "</td><td>";
                    str += array[j].description;
                    str += "</td><td>";
                    for (var i = 0; i < workersList.length; ++i) {
                        var a = workersList[i];
                        if (array[j].idWorker == a[0]) {
                            str +=a[1] + " " + a[2] + " " + a[3];
                        }
                    }
                }
                str += "\n</tbody>\n</table>\n";
                $("#announcementsCalls").html(str);
            },
            error: function(data) {
                showDanger(data.responseText);
                return false;
            }
        });
    });
}

function showAnnouncementsCallMoadl(announcementsId) {
    console.log(announcementsId);
    $('#announcementsCallsAddMoadl').modal('show');
    $('#announcementsCallsId').val(announcementsId);
}

function submitAnnouncementsCall() {
    $('#announcementsCallsAddMoadl').modal('toggle');
    $.ajax({
        type: "POST",
        url: "api/announcementscalls/addannouncementscalls",
        data: ({
            id: $("#announcementsCallsId").val(),
            description: $('#announcementsCallsDescription').val()
        }),
        success: function(data) {
            $("#errorBlock").css("display", "none");
            document.location.href = "#announcements";
        },
        error: function(data) {
            showDanger(data.responseText);
        }
    });
}