function getАnnouncementsRentPage() {
    $("#addannouncementsRent").css("display", "none");
    $.get("announcementsrentlist.html", function(data) {
        $("#mainContainer").html(data);
        var date = new Date();
        var day = date.getDate();
        day = (parseInt(day, 10) < 10) ? ('0' + day) : (day);
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        $('#announcementsRentSearchStartDate').datepicker({
            format: 'yyyy-mm-dd'
        });
        $('#announcementsRentSearchEndDate').datepicker({
            format: 'yyyy-mm-dd'
        });
        $("#announcementsRentSearchAuthor").append('<option value="">Все</option>');
        workersList.forEach(function(entry) {
            $("#announcementsRentSearchAuthor").append('<option value="' + entry[0] + '">' + entry[1] + " " + entry[2] + " " + entry[3] + '</option>');
        });

        $('#announcementsRentSearchStreet').kladr({
            token: KLADR_token,
            key: KLADR_key,
            type: $.ui.kladrObjectType.STREET,
            parentType: $.ui.kladrObjectType.CITY,
            parentId: KLADR_parentId
        });
        
        $('#announcementsRentStreet').kladr({
            token: KLADR_token,
            key: KLADR_key,
            type: $.ui.kladrObjectType.STREET,
            parentType: $.ui.kladrObjectType.CITY,
            parentId: KLADR_parentId
        });

        $.ajax({
            type: "GET",
            url: "api/auth",
            success: function(data) {
                $("#profileLink").html(data);
                $("#logged").css("display", "block");
                $.ajax({
                    type: "GET",
                    url: "api/announcementsrent/getallannouncementsrent",
                    success: function(data) {
                        $("#errorBlock").css("display", "none");
                        writeToDivAnnouncementsRentList(data);
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

function addAnnouncementsRent() {
    $('#announcementsRentAddMoadl').modal('toggle');
    $.ajax({
        type: "POST",
        url: "api/announcementsrent/addannouncementsrent",
        data: ({
            street: $('#announcementsRentStreet').val(),
            houseNumber: $('#announcementsRentHouseNumber').val(),
            rooms: $('#announcementsRentRooms').val(),
            floor: $('#announcementsRentFloor').val(),
            floors: $('#announcementsRentFloors').val(),
            price: $('#announcementsRentPrice').val(),
            phone: $('#announcementsRentPhone').val(),
            description: $('#announcementsRentDescription').val()
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

function deleteAnnouncementsRentById(announcementsRentId) {
    console.log("deleteAnnouncementsRentById " + announcementsRentId);
    $.ajax({
        type: "POST",
        url: "api/announcementsrent/deleteannouncementsrent",
        data: ({id: announcementsRentId}),
        success: function(data) {
            document.location.href = "#announcementsrent";
        },
        error: function(data) {
            showDanger(data.responseText);
            checkStatus();
            return false;
        }
    });
    return false;
}

function searchAnnouncementsRent() {
    $.ajax({
        type: "GET",
        url: "api/announcementsrent/search?" +
                "street=" + $('#announcementsRentSearchStreet').val() +
                "&housenumber=" + $('#announcementsRentSearchHouseNumber').val() +
                "&rooms=" + $("#announcementsRentSearchRooms").val() +
                "&floor=" + $('#announcementsRentSearchFloor').val() +
                "&floors=" + $('#announcementsRentSearchFloors').val() +
                "&idworker=" + $('#announcementsRentSearchAuthor').val() +
                "&startdate=" + $('#announcementsRentSearchStartDate').val() +
                "&enddate=" + $('#announcementsRentSearchEndDate').val(),
        success: function(data) {
            $("#errorBlock").css("display", "none");
            var array = JSON.parse(data);
            writeToDivAnnouncementsRentList(data);
        },
        error: function(data) {
            showDanger(data.responseText);
            return false;
        }
    });
}

function writeToDivAnnouncementsRentList(data) {
    var permissions = $.ajax({
        type: "GET",
        url: "api/auth/validate",
        async: false
    }).responseText;
    var array = JSON.parse(data);
    var str = "<table class=\"table table-bordered\">";
    str += "<thead>";
    str += "<tr>";
    str += "<th>#</th>";
    str += "<th>Улица</th>";
    str += "<th>Номер дома</th>";
    str += "<th>Кол-во комнат</th>";
    str += "<th>Этаж</th>";
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
        str += "<td><a href=\"#announcementsrent/view/"+entry.id+"\"\">" + entry.id + "</a></td>";
        str += "<td>" + entry.street + "</td>";
        str += "<td>" + entry.houseNumber + "</td>";
        str += "<td>" + entry.rooms + "</td>";
        str += "<td>" + entry.floor + " / " + entry.floors + "</td>";
        str += "<td>" + entry.description + "</td>";
        for (var i = 0; i < workersList.length; ++i) {
            var a = workersList[i];
            if (entry.idWorker == a[0]) {
                str += "<td>" + a[1] + " " + a[3] + "</td>";
            }
        }
        str += "<td>" + entry.creationDate + "</td>";

        if (permissions == "3") {
            str += "<td>" + "<button type=\"button\" onclick=\"editAnnouncementsRentById(" + entry.id + ");\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-pencil\"></span></button>" + "</td>";
            str += "<td>" + "<button type=\"button\" onclick=\"deleteAnnouncementsRentById(" + entry.id + ");\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-remove\"></span></button>" + "</td>";
        }
        str += "</tr>";
    });
    str += "</tbody>";
    $("#mainAnnouncementsRentContainer").html(str);
}