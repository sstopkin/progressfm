function getAnnouncementsRentViewPage(announcementsRentId) {
    $.get("announcementsrentview.html", function(data) {
        $("#mainContainer").html(data);
        $.ajax({
            type: "GET",
            url: "api/announcementsrentcalls/getcalls?id=" + announcementsRentId,
            success: function(data) {
                $("#errorBlock").css("display", "none");
                var array = JSON.parse(data);
                var str = "";
                str += "<input onclick=\"showAnnouncementsRentCallMoadl(" + announcementsRentId + ");\" type=\"button\" class=\"btn btn-primary pull-right\" value=\"Добавить звонок\" />";
                str += "<input onclick=\"showPlannerAddTaskModal(" + announcementsRentId + "," + 1 + ");\" type=\"button\" class=\"btn btn-warning pull-right\" value=\"Добавить в календарь\" />";
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
                            str += a[1] + " " + a[2] + " " + a[3];
                        }
                    }
                }
                str += "\n</tbody>\n</table>\n";
                $("#announcementsRentCalls").html(str);
            },
            error: function(data) {
                showDanger(data.responseText);
                return false;
            }
        });
    });
}

function showAnnouncementsRentCallMoadl(announcementsRentId) {
    console.log(announcementsRentId);
    $('#announcementsRentCallsAddMoadl').modal('show');
    $('#announcementsRentCallsId').val(announcementsRentId);
}

function submitAnnouncementsRentCall() {
    $('#announcementsRentCallsAddMoadl').modal('toggle');
    $.ajax({
        type: "POST",
        url: "api/announcementsrentcalls/addannouncementsrentcalls",
        data: ({
            id: $("#announcementsRentCallsId").val(),
            description: $('#announcementsRentCallsDescription').val()
        }),
        success: function(data) {
            $("#errorBlock").css("display", "none");
            document.location.href = "#announcementsrent";
        },
        error: function(data) {
            showDanger(data.responseText);
        }
    });
}