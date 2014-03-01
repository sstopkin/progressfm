$(document).ready(function() {
    parseUrl(location.href);
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