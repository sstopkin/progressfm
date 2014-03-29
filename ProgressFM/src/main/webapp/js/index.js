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
    getFolderList(",");
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