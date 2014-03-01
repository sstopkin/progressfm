function getCustomersRentPage() {
    $("#addcustomersRent").css("display", "none");
    $.get("customersrentlist.html", function(data) {
        $("#mainContainer").html(data);
        var date = new Date();
        var day = date.getDate();
        day = (parseInt(day, 10) < 10) ? ('0' + day) : (day);
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        $('#customersRentSearchStartDate').datepicker({
            format: 'yyyy-mm-dd'
        });
        $('#customersRentSearchEndDate').datepicker({
            format: 'yyyy-mm-dd'
        });
        $("#customersRentSearchAuthor").append('<option value="">Все</option>');
        taskStatusList = JSON.parse(taskStatusListJSON);
        $("#customersRentSearchAuthor").empty();
        workersList.forEach(function(entry) {
            $("#customersRentSearchAuthor").append('<option value="' + entry[0] + '">' + entry[1] + " " + entry[2] + " " + entry[3] + '</option>');
        });
        $("#customersRentSearchAssigned").empty();
        $("#customersRentSearchAssigned").append('<option value="">Все</option>');
        workersList.forEach(function(entry) {
            $("#customersRentSearchAssigned").append('<option value="' + entry[0] + '">' + entry[1] + " " + entry[2] + " " + entry[3] + '</option>');
        });
        $("#customersRentSearchStatus").empty();
        taskStatusList.forEach(function(entry) {
            $("#customersRentSearchStatus").append('<option value="' + entry[0] + '">' + entry[1] + '</option>');
        });
        $.ajax({
            type: "GET",
            url: "api/auth",
            success: function(data) {
                $("#profileLink").html(data);
                $("#logged").css("display", "block");
                $.ajax({
                    type: "GET",
                    url: "api/customersrent/getallcustomersrent",
                    success: function(data) {
                        $("#errorBlock").css("display", "none");
                        writeToDivCustomersRentList(data);
                    },
                    error: function(data) {
                        showDanger(data.responseText);
                        return false;
                    }
                });
            },
            error: function(data) {
                $("#loginForm").css("display", "block");
            }
        });
    });
}

function addCustomersRent() {
    $('#customersRentAddMoadl').modal('toggle');
    if ($("#customersRentIdCustomer").val() == "") {
        $("#errorBlock").addClass("alert-warning");
        $("#errorMessage").html("Не выбран клиент");
        $("#errorBlock").css("display", "block");
        return false;
    }
    $.ajax({
        type: "POST",
        url: "api/customersrent/addcustomersrent",
        data: ({
            status: $('#customersRentStatus').val(),
            assigned: $('#customersRentAssigned').val(),
            idcustomer: $('#customersRentIdCustomer').val(),
            description: $('#customersRentDescription').val()
        }),
        success: function(data) {
            $("#errorBlock").css("display", "none");
        },
        error: function(data) {
            showDanger(data.responseText);
        }
    });
    window.location.reload();
}

function deleteCustomersRentById(customersRentId) {
    $.ajax({
        type: "POST",
        url: "api/customersrent/deletecustomersrent",
        data: ({id: customersRentId}),
        success: function(data) {
            window.location.reload();
        },
        error: function(data) {
            showDanger(data.responseText);
            checkStatus();
            return false;
        }
    });
    return false;
}

function searchCustomersRent() {
    $.ajax({
        type: "GET",
        url: "api/customersrent/search?" +
                "assigned=" + $('#customersRentSearchAssigned').val() +
                "&idworker=" + $('#customersRentSearchAuthor').val() +
                "&startdate=" + $('#customersRentSearchStartDate').val() +
                "&enddate=" + $('#customersRentSearchEndDate').val() +
                "&status=" + $('#customersRentSearchStatus').val(),
        success: function(data) {
            $("#errorBlock").css("display", "none");
            var array = JSON.parse(data);
            writeToDivCustomersRentList(data);
        },
        error: function(data) {
            showDanger(data.responseText);
            return false;
        }
    });
}

function writeToDivCustomersRentList(data) {
    var permissions = $.ajax({
        type: "GET",
        url: "api/auth/validate",
        async: false
    }).responseText;
    var array = JSON.parse(data);
    var str = array;
    var str = "<table class=\"table table-bordered\">";
    str += "<thead>";
    str += "<tr>";
    str += "<th>#</th>";
    str += "<th>Назначена</th>";
    str += "<th>Статус</th>";
    str += "<th>Клиент</th>";
    str += "<th>Описание</th>";
    str += "<th>Автор</th>";
    str += "<th>Дата</th>";
    if (permissions == "3") {
        str += "<th>Редактировать</th>";
        str += "<th>Удалить</th>";
    }
    str += "</tr>";
    str += "</thead>";
    str += "<tbody>";
    array.forEach(function(entry) {
        str += "<tr>";
        str += "<td><a href=\"#customersrent/view/" + entry.id + "\"\">" + entry.id + "</a></td>";
        for (var i = 0; i < workersList.length; ++i) {
            var a = workersList[i];
            if (entry.assigned == a[0]) {
                str += "<td>" + a[1] + " " + a[3] + "</td>";
            }
        }
        str += "<td>" + taskStatusList[entry.status][1] + "</td>";
        str += "<td>" + entry.idCustomer + "</td>";
        str += "<td>" + entry.description + "</td>";
        for (var i = 0; i < workersList.length; ++i) {
            var a = workersList[i];
            if (entry.idWorker == a[0]) {
                str += "<td>" + a[1] + " " + a[3] + "</td>";
            }
        }

        str += "<td>" + entry.creationDate + "</td>";
        if (permissions == "3") {
            str += "<td>" + "<button type=\"button\" onclick=\"customersRentShowAddCustomerModal(2," + entry.id + "," + entry.assigned + "," + entry.status + "," + entry.idCustomer + ",'" + entry.description + "');\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" + "</td>";
            str += "<td>" + "<button type=\"button\" onclick=\"deleteCustomersRentById(" + entry.id + ");\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-remove\"></span></button>" + "</td>";
        }
        str += "</tr>";
    });
    str += "</tbody>";
    $("#mainCustomersRentContainer").html(str);
}

function customersRentShowAddCustomerModal(mode, id, assigned, status, idcustomer, description) {
    $("#customersRentAddButton").css("display", "none");
    $("#customersRentAddEdit").css("display", "none");
    $('#customersRentAddMoadl').modal('show');

    $("#customersRentAssigned").append('<option value="">Все</option>');
    $("#customersRentAssigned").empty();
    workersList.forEach(function(entry) {
        $("#customersRentAssigned").append('<option value="' + entry[0] + '">' + entry[1] + " " + entry[2] + " " + entry[3] + '</option>');
    });
    $("#customersRentStatus").empty();
    taskStatusList.forEach(function(entry) {
        $("#customersRentStatus").append('<option value="' + entry[0] + '">' + entry[1] + '</option>');
    });
    if (mode == "1") {
        $("#customersRentAddButton").css("display", "block");
    } else if (mode == "2") {
        $("#customersRentAddEdit").css("display", "block");
        $("#customersRentIdEdit").val(id);
        $('#customersRentAssigned').val(assigned);
        $('#customersRentStatus').val(status);
        $('#customersRentIdCustomer').val(idcustomer);
        $('#customersRentDescription').val(description);
    }
}

function editCustomersRent() {
    $('#customersRentAddMoadl').modal('toggle');
    if ($("#customersRentIdCustomer").val() == "") {
        $("#errorBlock").addClass("alert-warning");
        $("#errorMessage").html("Не выбран клиент");
        $("#errorBlock").css("display", "block");
        return false;
    }
    $.ajax({
        type: "POST",
        url: "api/customersrent/editcustomersrent",
        data: ({
            id: $('#customersRentIdEdit').val(),
            status: $('#customersRentStatus').val(),
            assigned: $('#customersRentAssigned').val(),
            idcustomer: $('#customersRentIdCustomer').val(),
            description: $('#customersRentDescription').val()
        }),
        success: function(data) {
            $("#errorBlock").css("display", "none");
        },
        error: function(data) {
            showDanger(data.responseText);
        }
    });
    window.location.reload();
}