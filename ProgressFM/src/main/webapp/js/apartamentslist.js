function getApartamentsListPage() {
    $.get("apartamentslist.html", function(data) {
        var permissions = $.ajax({
            type: "GET",
            url: "api/auth/validate",
            async: false
        }).responseText;
        if ((permissions === "3") || (permissions === "2")) {
            $("#addApartamentBtn").css("display", "block");
            $("#genApartamentsPriceBtn").css("display", "block");
        } else {
            $("#addApartamentBtn").css("display", "none");
            $("#genApartamentsPriceBtn").css("display", "none");
        }
        $("#mainContainer").html(data);
        var userId;
        $.get("api/auth/author", function(data2) {
            userId = data2;
        });
        $.ajax({
            type: "GET",
            url: "api/apartament/getallapartament",
            success: function(data) {
                $("#errorBlock").css("display", "none");
                var array = JSON.parse(data);
                var str = "<table class=\"table table-bordered\">";
                str += "<thead>";
                str += "<tr>";
                str += "<th>#</th>";
                str += "<th>Адрес</th>";
                str += "<th>Площадь О/К/Ж</th>";
                str += "<th>Этаж</th>";
                str += "<th>Цена</th>";
                str += "<th>Автор</th>";
                str += "<th>Дата</th>";
                str += "<th>Звонок</th>";
                if (permissions == "3") {
                    str += "<th>Редактировать</th>";
                    str += "<th>Удалить</th>";
                }
                str += "</tr>";
                str += "</thead>";
                str += "<tbody>";

                var apartsArray = [];
                var dormitoryArray = [];
                var barchelorArray = [];
                var subrentalArray = [];

                array.forEach(function(entry) {
                    switch (entry.dwellingType) {
                        case 1:
                            apartsArray.push(entry);
                            break;
                        case 2:
                            dormitoryArray.push(entry);
                            break;
                        case 3:
                            barchelorArray.push(entry);
                            break;
                        case 4:
                            subrentalArray.push(entry);
                            break;
                    }
                });
                if (barchelorArray.length !== 0) {
                    str += draw(barchelorArray, permissions, "Малосемейки");
                }
                if (subrentalArray.length !== 0) {
                    str += draw(subrentalArray, permissions, "Подселение");
                }
                if (dormitoryArray !== 0) {
                    str += draw(dormitoryArray, permissions, "Гостинки");
                }
                if (apartsArray !== 0) {
                    str += draw(apartsArray, permissions, "Квартиры");
                }
                str += "</tbody>";
                $("#divApartamentsList").html(str);
            },
            error: function(data) {
                showDanger(data.responseText);
                return false;
            }
        });
    });
}

function draw(array, permissions, catName) {
    var flag1 = false;
    var flag2 = false;
    var flag3 = false;
    var flag4 = false;
    var flag5 = false;

    var str = "<tr><td COLSPAN=10><h5><b>" + catName + "</b></h5></td></tr>";

    array.forEach(function(entry) {
        switch (entry.rooms) {
            case 1:
                if (flag1 == false) {
                    str += "<tr><td COLSPAN=10><h5><b>1-комнатные</b></h5></td></tr>";
                    flag1 = true;
                }
                break;
            case 2:
                if (flag2 == false) {
                    str += "<tr><td COLSPAN=10><h5><b>2-комнатные</b></h5></td></tr>";
                    flag2 = true;
                }
                break;
            case 3:
                if (flag3 == false) {
                    str += "<tr><td COLSPAN=10><h5><b>3-комнатные</b></h5></td></tr>";
                    flag3 = true;
                }
                break;
            case 4:
                if (flag4 == false) {
                    str += "<tr><td COLSPAN=10><h5><b>4-комнатные</b></h5></td></tr>";
                    flag4 = true;
                }
                break;
            case 5:
                if (flag5 == false) {
                    str += "<tr><td COLSPAN=10><h5><b>5-комнатные</b></h5></td></tr>";
                    flag5 = true;
                }
                break;
        }
        str += "<tr>";
        str += "<td><a href=\"#apartaments/view/" + entry.id + "\" class=\"btn btn-default\"><b>" + entry.id + "</b></a></td>";
        str += "<td>" + entry.cityName + " "
                + entry.streetName + " "
                + entry.houseNumber + " "
                + entry.buildingNumber + "</td>";
        str += "<td>" + entry.sizeApartament + " / " + entry.sizeKitchen + " / " + entry.sizeLiving + "</td>";
        str += "<td>" + entry.floor + " / " + entry.floors + "</td>";
        str += "<td>" + entry.price + "</td>";
        for (var i = 0; i < workersList.length; ++i) {
            var a = workersList[i];
            if (entry.idWorker == a[0]) {
                str += "<td>" + a[1] + " " + a[3] + "</td>";
            }
        }
        str += "<td>" + entry.сreationDate + "</td>";
        str += "<td>" + "<button type=\"button\" onclick=\"apartamentsAddCallById(" + entry.id + ");\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-earphone\"></span></button>" + "</td>";
        if (permissions == "3") {
            str += "<td><a href=\"#apartaments/edit/" + entry.id + "\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-pencil\"></span></a></td>";
            str += "<td>" + "<button type=\"button\" onclick=\"apartamentsDeleteById(" + entry.id + ");\" class=\"btn btn-default\"><span class=\"glyphicon glyphicon-remove\"></span></button>" + "</td>";
        }
        str += "</tr>";
    });
    return str;
}

function apartamentsDeleteById(apartamentsId) {
    $.ajax({
        type: "POST",
        url: "api/apartament/remove",
        data: ({id: apartamentsId}),
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

function apartamentsEditById(apartamentId) {
    $.get("apartamentsadd.html", function(data) {
        $("#mainContainer").html(data);
        $.ajax({
            type: "GET",
            url: "api/apartament/getapartament?id=" + apartamentId,
            success: function(data) {
                $("#errorBlock").css("display", "none");
                var array = JSON.parse(data);
                $('#TypeOfSales').val(array.typeOfSales);

                $('#apartamentCity').text(array.cityName);
                $('#apartamentStreet').text(array.streetName);
                $('#apartamentBuilding').text(array.houseNumber);
                $('#apartamentBuildingAdd').text(array.buildingNumber);

                $('#Rooms').val(array.rooms);
                $('#address').text(array.shortAddress);
                $("#apartamentLan").text(array.apartamentLan);
                $("#apartamentLon").text(array.apartamentLon);
                $('#Price').val(array.price);
                $('#CityDistrict').val(array.cityDistrict);
                $('#Floor').val(array.floor);
                $('#Floors').val(array.floors);
                $('#RoomNumber').val(array.roomNumber);
                $('#Material').val(array.material);
                $('#SizeApartament').val(array.sizeApartament);
                $('#SizeLiving').val(array.sizeLiving);
                $('#SizeKitchen').val(array.sizeKitchen);
                $('#Balcony').val(array.balcony);
                $('#Loggia').val(array.loggia);
                $('#YearOfConstruction').val(array.yearOfConstruction);
                $('#Description').val(array.description);
                $('#IdCustomer').val(array.idCustomer);
                $('#DwellingType').val(array.dwellingType);

                $('#PureSale').prop("checked", array.MethodOfPurchase_PureSale);
                $('#Mortgage').prop("checked", array.MethodOfPurchase_Mortgage);
                $('#Exchange').prop("checked", array.MethodOfPurchase_Exchange);
                $('#Rent').prop("checked", array.MethodOfPurchase_Rent);
                $('#RePlanning').prop("checked", array.rePplanning);

                $("#apartamentEditReadyLink").css("display", "block");
                $("#apartamentEditReadyLink").click(function() {
                    $.ajax({
                        type: "POST",
                        url: "api/apartament/editapartament",
                        data: ({
                            id: apartamentId,
                            typeofsales: $('#TypeOfSales').val(),
                            rooms: $('#Rooms').val(),
                            dwellingType: $('#DwellingType').val(),
                            //FIXME!!
                            price: $('#Price').val(),
                            citydistrict: $('#CityDistrict').val(),
                            floor: $('#Floor').val(),
                            floors: $('#Floors').val(),
                            roomnumber: $('#RoomNumber').val(),
                            material: $('#Material').val(),
                            sizeapartament: $('#SizeApartament').val(),
                            sizeliving: $('#SizeLiving').val(),
                            sizekitchen: $('#SizeKitchen').val(),
                            balcony: $('#Balcony').val(),
                            loggia: $('#Loggia').val(),
                            yearofconstruction: $('#YearOfConstruction').val(),
                            description: $('#Description').val(),
                            puresale: $('#PureSale').prop("checked"),
                            mortgage: $('#Mortgage').prop("checked"),
                            exchange: $('#Exchange').prop("checked"),
                            rent: $('#Rent').prop("checked"),
                            replanning: $('#RePlanning').prop("checked"),
                            idCustomer: $("#IdCustomer").val()
                        }),
                        success: function(data) {
                            document.location.href = "#apartaments/list";
                            $("#errorBlock").css("display", "none");
                        },
                        error: function(data) {
                            showDanger(data.responseText);
                        }
                    });
                });
            }
        });
    });

}

function apartamentsAddCallById(apartamentId) {
    $('#apartamentsAddCall').modal('toggle');
    $('#apartamentsAddCallApartamentId').val(apartamentId);
}