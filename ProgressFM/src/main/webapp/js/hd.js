function getHelpDeskPage() {
    $.get("hd.html", function(data) {
        $("#mainContainer").html(data);
        var permissions = $.ajax({
            type: "GET",
            url: "api/auth/validate",
            async: false
        }).responseText;
        $.ajax({
            type: "GET",
            url: "api/helpdesk/getallrequest",
            success: function(data) {
                $("#errorBlock").css("display", "none");
                var array = JSON.parse(data);
                var str = "";
                array.forEach(function(entry) {
                    str += "<div class = \"media\">";
                    str += "<a class = \"pull-left\" href = \"#\">";
                    str += "<img class=\"media-object\" src=\"images/apple2.png\" alt=\"...\">";
                    str += "</a>";
                    str += "<div class=\"media-body\">";
                    str += "<h4 class=\"media-heading\">";
                    str += "<b>";
                    if (permissions === "3") {
///                        str += "<button type=\"button\" onclick=\"editHelpDeskRequestById(" + entry.id + ");\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-pencil\"></span></button>";
                        str += "<button type=\"button\" onclick=\"deleteHelpDeskRequestById(" + entry.id + ");\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-remove\"></span></button>";
                    }
                    str += entry.request;
                    str += "</b>";
                    str += "</h4>";
                    str += "<h5 class=\"media-heading\">";
                    str += entry.creationDate;
                    str += "</h5>";
                    str += entry.text;
                    for (var i = 0; i < workersList.length; ++i) {
                        var a = workersList[i];
                        if (entry.idWorker === a[0]) {
                            str += "<p><i>" + a[1] + " " + a[3] + "</i></p>";
                        }
                    }
//                    str += "<a href=\"#\" onclick=\"return alert(\'" + entry.id + " \')\">ссылка</a>";
                    str += "</div>";
                    str += "</div>";
                });
                $("#mainHelpDeskContainer").html(str);
            },
            error: function(data) {
                showDanger(data.responseText);
                return false;
            }
        });
    });
}

function addHelpDeskRequest() {
    $('#myModal').modal('toggle');
    $.ajax({
        type: "POST",
        url: "api/helpdesk/addrequest",
        data: ({
            request: $('#hdRequest').val(),
            text: $('#hdText').val()
        }),
        success: function(data) {
            location.reload();
        },
        error: function(data) {
            showDanger(data.responseText);
        }
    });
}

function deleteHelpDeskRequestById(hdRequestId) {
    $.ajax({
        type: "POST",
        url: "api/helpdesk/deleterequest",
        data: ({id: hdRequestId}),
        success: function(data) {
            location.reload();
        },
        error: function(data) {
            $("#errorBlock").addClass("alert-danger");
            $("#errorMessage").html(data.responseText);
            $("#errorBlock").css("display", "block");
            checkStatus();
            return false;
        }
    });
    return false;
}