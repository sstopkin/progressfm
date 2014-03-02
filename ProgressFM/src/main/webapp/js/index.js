$(document).ready(function() {
    parseUrl(location.href);
    $(window).bind('hashchange', function() {
        parseUrl(location.hash);
    });
    $("#closeAlert").click(function() {
        $("#errorBlock").css("display", "none");
    });
    $("#closeInfo").click(function() {
        $("#helpInfoBlock").css("display", "none");
    });
});

function getMainPage() {
    $.get("main.html", function(data) {
        $("#mainContainer").html(data);
    });
}

function getFileManagerPage() {
    $.get("fm.html", function(data) {
        $("#mainContainer").html(data);
    });
    getFolderList(",tmp");
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
