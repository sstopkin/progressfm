function showPlannerAddTaskModal(taskId, typeId) {
    var date = new Date();
    var day = date.getDate();
    day = (parseInt(day, 10) < 10) ? ('0' + day) : (day);
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    $('#plannerAddTaskModalDate').datepicker({
        format: 'yyyy-mm-dd'
    });
    $('#plannerAddTaskModalDate').val(year + "-" + month + "-" + day);
    $("#plannerAddTaskTaskId").val(taskId);
    $("#plannerAddTaskTypeId").val(typeId);
    $('#plannerAddTaskModal').modal('show');
}

function addPlannerTask() {
    $('#plannerAddTaskModal').modal('toggle');
    $.ajax({
        type: "POST",
        url: "api/planner/addtask",
        data: ({
            tasktype: $('#plannerAddTaskTypeId').val(),
            taskid: $('#plannerAddTaskTaskId').val(),
            description: $('#plannerAddTaskModalDescription').val(),
            taskdate: $('#plannerAddTaskModalDate').val()
        }),
        success: function(data) {
            $("#errorBlock").css("display", "none");
            getАnnouncementsPage();
        },
        error: function(data) {
            showDanger(data.responseText);
        }
    });
}

function plannerGetWorkersTasks() {
    var permissions = $.ajax({
        type: "GET",
        url: "api/auth/validate",
        async: false
    }).responseText;
    $.ajax({
        type: "GET",
        url: "api/planner",
        success: function(data) {
            $("#errorBlock").css("display", "none");
            var array = JSON.parse(data);
            var str = "";
            array.forEach(function(entry) {
                str += "<div class = \"media\">";
                str += "<a class = \"pull-left\" href = \"#\">";
                str += "<img class=\"media-object\" src=\"images/IT-Icon.png\" alt=\"...\">";
                str += "</a>";
                str += "<div class=\"media-body\">";
                str += "<h6 class=\"media-heading\">";
                str += entry.creationDate;
                str += "</h4>";
                str += "<h4 class=\"media-heading\">";
                str += entry.taskDescription;
                str += "</h4>";
                str += "text";
                if (permissions == "3") {
                    str += "<div class=\"btn-toolbar\">";
                    str += "<div class=\"btn-group\">";
                    str += "<button type=\"button\" onclick=\"editHelpDeskRequestById(" + entry.id + ");\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-pencil\"></span></button>";
                    str += "<button type=\"button\" onclick=\"deleteHelpDeskRequestById(" + entry.id + ");\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-remove\"></span></button>";
                    str += "</div>";
                    str += "</div>";
                }
                for (var i = 0; i < workersList.length; ++i) {
                    var a = workersList[i];
                    if (entry.idWorker == a[0]) {
                        str += "<td>" + a[1] + " " + a[3] + "</td>";
                    }
                }
                str += "<a href=\"#\" onclick=\"return alert(\'" + entry.id + " \')\">ссылка</a>";
                str += "</div>";
                str += "</div>";
            });
            $("#profilePlannerTasksList").html(str);
        },
        error: function(data) {
            showDanger(data.responseText);
            return false;
        }
    });
}