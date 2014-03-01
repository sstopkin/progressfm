var type;
var workersList = null;
var taskStatusListJSON = "[[0,\"Нет статуса\"],[1,\"Новый\"],[2,\"В работе\"],[3,\"Прогресс\"],[4,\"Заселился\"]]";
var taskStatusList = null;
var KLADR_token = '51dfe5d42fb2b43e3300006e';
var KLADR_key = '86a2c2a06f1b2451a87d05512cc2c3edfdf41969';
var KLADR_parentId = '5500000100000';


var map = null;
var placemark = null;
var map_created = false;
$(document).ready(function() {
    getAllWorkersList();
    $.ajax({
        type: "GET",
        url: "api/auth",
        async: false,
        success: function(data) {
            $("#profileLink").html(data);
            $("#logged").css("display", "block");
            if (workersList == null) {
                getAllWorkersList();
            }
        },
        error: function(data) {
            $("#loginForm").css("display", "block");
        }
    });
    parseUrl(location.href);
    $('#loginForm').keydown(function(event) {
        if (event.which == 13) {
            $('#loginBtn').click();
        }
    });
    $("#closeAlert").click(function() {
        $("#errorBlock").css("display", "none");
    });
    $("#closeInfo").click(function() {
        $("#helpInfoBlock").css("display", "none");
        $('#taskContentHelp').addClass("hiddenHelp");
    });
});

function getMainPage() {
    $.get("main.html", function(data) {
        $("#mainContainer").html(data);
    });
    getNews();
}

function getAboutPage() {
    $.get("about.html", function(data) {
        $("#mainContainer").html(data);
    });
}

function getAdminPage() {
    $.get("api/auth/validate", function(data) {
        if (data == "3") {
            $.get("admin.html", function(data) {
                $("#mainContainer").html(data);
                $("#usersLink").click(getUsersList);
                $("#verifyTasksLink").click(getUnevaluatedTasks);
                $("#moderationLink").click(getModerationPage);
                getUsersList();
                showFooterAbout();
            });
        }
        else {
            showWarning("У вас недостаточно прав для совершения данного действия");
        }
    });
}

function getNews() {
    var permissions = $.ajax({
        type: "GET",
        url: "api/auth/validate",
        async: false
    }).responseText;
    $.get("api/news", function(data) {
        var str = "<table class=\"table\"><tbody>\n";
        var list = JSON.parse(data);
        for (var i = 0; i < list.length; ++i) {
            str += "<tr><td>";
            str += "<p>" + list[i].lastModify + "</p>";
            str += "<h3><b>";
            if (permissions == "3") {
                str += "<button type=\"button\" onclick=\"editNewsById(" + list[i].id + ");\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-pencil\"></span></button>";
                str += "<button type=\"button\" onclick=\"deleteNewsById(" + list[i].id + ");\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-remove\"></span></button>";
            }
            str += list[i].header + "</b>"
            str += "</h3>";
            str += "<div class=\"row\">";
            str += "<div class=\"col-md-7 col-md-offset-1\">";
            str += "<p>" + list[i].text + "</p>";
            for (var it = 0; it < workersList.length; ++it) {
                var a = workersList[it];
                if (list[i].idWorker == a[0]) {
                    str += "<p><i>" + a[3] +" "+ a[1] + "</i></p>";
                }
            }
            str += "</div>";
            str += "</div>";
            str += "</tr></td>";
        }
        str += "\n</tbody>\n</table>\n";
        $("#news").html(str);
    });
}

function  editNewsById(id) {
    alert(editNewsById + " " + id);
}

function addNews() {
    $('#newsModal').modal('toggle');
    $.ajax({
        type: "POST",
        url: "api/news/addnews",
        data: ({
            header: $('#newsHeader').val(),
            text: $('#newsText').val()
        }),
        success: function(data) {
            $("#errorBlock").css("display", "none");
            location.reload();
        },
        error: function(data) {
            showDanger(data.responseText);
        }
    });
}

function showDanger(message) {
    $("#errorBlock").addClass("alert-danger");
    $("#errorMessage").html(message);
    $("#errorBlock").css("display", "block");
}

function showWarning(message) {
    $("#errorBlock").addClass("alert-warning");
    $("#errorMessage").html(message);
    $("#errorBlock").css("display", "block");
}

function checkStatus() {
    $.ajax({
        type: "GET",
        url: "api/auth",
        success: function(data) {
            $("#profileLink").html(data);
            $("#logged").css("display", "block");
            $("#loginForm").css("display", "none");
//            $.get("api/auth/validate", function(data3) {
//                var permissions = data3;
//                if (permissions == "3") {
//                    $('#adminTabLink').css("display", "block");
//                }
//            });
        },
        error: function(data) {
            $("#loginForm").css("display", "block");
            $("#logged").css("display", "none");
//            $('#adminTabLink').css("display", "none");
        }
    });
}

function deleteNewsById(newsId) {
    $.ajax({
        type: "POST",
        url: "api/news/deletenews",
        data: ({id: newsId}),
        success: function(data) {
            getMainPage();
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

function returnSearchResult() {
    $("#customerSearchModal").modal('hide');//FIXME toggle?
    console.log($(":radio[name=browser]").filter(":checked").val());
    var customerSearchResultField = $("#customerSearchResultField");
    $("#" + customerSearchResultField.val()).val($(":radio[name=browser]").filter(":checked").val());

}

function customersSearchAction(divName) {
    $.ajax({
        type: "GET",
        url: "api/customers/search?query=" + $("#customersSearchQuery").val(),
        success: function(data) {
            $("#errorBlock").css("display", "none");
            var array = JSON.parse(data);
            var str = "";
            str += "<table class=\"table table-striped table-bordered table-condensed\" style='margin-top:10px;'>";
            str += "<thead class='t-header'>Звонки<tr>";
            str += "<th>ID</th>";
            str += "<th>Фамилия</th>";
            str += "<th>Имя</th>";
            str += "<th>Отчество</th>";
            str += "</tr></thead>";
            str += "<tbody>";
            for (var j = 0; j < array.length; ++j) {
                str += "<tr>";
                str += "<td><input type=\"radio\" name=\"browser\" value=\"" + array[j].id + "\"> ";
                str += "</td><td>";
                str += array[j].customersLname;
                str += "</td><td>";
                str += array[j].customersFname;
                str += "</td><td>";
                str += array[j].customersMname;
                str += "</td></tr>";
            }
            str += "\n</tbody>\n</table>\n";
            $("#customerSearchResultTable").html(str);
            $("#customerSearchResultField").val(divName);
        },
        error: function(data) {
            showDanger(data.responseText);
            return false;
        }
    });
}

function customersShowModal(divName) {
    console.log("customersInitModal");
    $('#customerSearchModal').modal('show')
    customersSearchAction(divName);
}

function getAllWorkersList() {
    $.ajax({
        type: "GET",
        url: "api/auth/userslist",
        async: false,
        success: function(data) {
            workersList = JSON.parse(data);
            return true;
        },
        error: function(data) {
            showDanger(data.responseText);
            return false;
        }
    });
}