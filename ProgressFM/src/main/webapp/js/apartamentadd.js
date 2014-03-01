function addApartament() {
    $.get("apartamentsadd.html", function(data) {
        $("#mainContainer").html(data);
        $("#errorBlock").css("display", "none");


        var city = $('[name="city"]');
        var street = $('[name="street"]');
        var building = $('[name="building"]');
        var buildingAdd = $('[name="building-add"]');
        // Подключение плагина для поля ввода города
        city.kladr({
            token: KLADR_token,
            key: KLADR_key,
            type: $.ui.kladrObjectType.CITY,
            withParents: true,
            label: Label,
            select: function(event, ui) {
                city.data("kladr-obj", ui.item.obj);
                city.parent().find('label').text(ui.item.obj.type);
                street.kladr('option', {parentType: $.ui.kladrObjectType.CITY, parentId: ui.item.obj.id});
                building.kladr('option', {parentType: $.ui.kladrObjectType.CITY, parentId: ui.item.obj.id});
                Log(ui.item.obj);
                AddressUpdate();
                MapUpdate();
            }
        });

// Подключение плагина для поля ввода улицы
        street.kladr({
            token: KLADR_token,
            key: KLADR_key,
            type: $.ui.kladrObjectType.STREET,
            label: Label,
            select: function(event, ui) {
                street.data("kladr-obj", ui.item.obj);
                street.parent().find('label').text(ui.item.obj.type);
                building.kladr('option', {parentType: $.ui.kladrObjectType.STREET, parentId: ui.item.obj.id});
                Log(ui.item.obj);
                AddressUpdate();
                MapUpdate();
            }
        });

// Подключение плагина для поля ввода номера дома
        building.kladr({
            token: KLADR_token,
            key: KLADR_key,
            type: $.ui.kladrObjectType.BUILDING,
            label: Label,
            select: function(event, ui) {
                building.data("kladr-obj", ui.item.obj);
                Log(ui.item.obj);
                AddressUpdate();
                MapUpdate();
            }
        });

// Проверка корректности названия города (если пользователь ввёл сам, а не выбрал в списке)
        city.change(function() {
            $.kladrCheck({
                token: KLADR_token,
                key: KLADR_key,
                value: city.val(),
                type: $.ui.kladrObjectType.CITY
            }, function(obj) {
                if (obj) {
                    city.val(obj.name);
                    city.data("kladr-obj", obj);
                    city.parent().find('label').text(obj.type);
                    street.kladr('option', {parentType: $.ui.kladrObjectType.CITY, parentId: obj.id});
                    building.kladr('option', {parentType: $.ui.kladrObjectType.CITY, parentId: obj.id});
                    Log(obj);
                } else {
                    city.data("kladr-obj", null);
                    city.css('color', 'red');
                    Log(null);
                }

                AddressUpdate();
                MapUpdate();
            });
        });

// Проверка корректности названия улицы (если пользователь ввёл сам, а не выбрал в списке)
        street.change(function() {
            var query = {
                token: KLADR_token,
                key: KLADR_key,
                value: street.val(),
                type: $.ui.kladrObjectType.STREET
            };

            var cityObj = city.data("kladr-obj");
            if (cityObj) {
                query['parentType'] = $.ui.kladrObjectType.CITY;
                query['parentId'] = cityObj.id;
            }

            $.kladrCheck(query, function(obj) {
                if (obj) {
                    street.val(obj.name);
                    street.data("kladr-obj", obj);
                    street.parent().find('label').text(obj.type);
                    building.kladr('option', {parentType: $.ui.kladrObjectType.STREET, parentId: obj.id});
                    Log(obj);
                } else {
                    street.data("kladr-obj", null);
                    street.css('color', 'red');
                    Log(null);
                }

                AddressUpdate();
                MapUpdate();
            });
        });

// Проверка названия строения
        building.change(function() {
            var query = {
                token: KLADR_token,
                key: KLADR_key,
                value: building.val(),
                type: $.ui.kladrObjectType.BUILDING
            };

            var cityObj = city.data("kladr-obj");
            if (cityObj) {
                query['parentType'] = $.ui.kladrObjectType.CITY;
                query['parentId'] = cityObj.id;
            }

            var streetObj = street.data("kladr-obj");
            if (streetObj) {
                query['parentType'] = $.ui.kladrObjectType.STREET;
                query['parentId'] = streetObj.id;
            }

            $.kladrCheck(query, function(obj) {
                if (obj && (obj.name == building.val())) {
                    building.val(obj.name);
                    building.data("kladr-obj", obj);
                    Log(obj);
                } else {
                    Log(null);
                }

                AddressUpdate();
                MapUpdate();
            });
        });

// Проверка названия корпуса
        buildingAdd.change(function() {
            Log(null);
            AddressUpdate();
            MapUpdate();
        });

        var fields = city.add(street);

// Отображение крутилки при отправке запроса к сервису
        fields.bind('downloadStart', function() {
            $(this).parent().find('.spinner').show();
        });

// Скрытие крутилки по получении ответа от сервиса
        fields.bind('downloadStop', function() {
            $(this).parent().find('.spinner').hide();
        });

        fields.keydown(function() {
            $(this).css('color', 'black');
        });

// Формирует подписи в autocomplete
        var Label = function(obj, query) {
            var label = '';

            var name = obj.name.toLowerCase();
            query = query.toLowerCase();

            var start = name.indexOf(query);
            start = start > 0 ? start : 0;

            if (obj.typeShort) {
                label += '<span class="ac-s2">' + obj.typeShort + '. ' + '</span>';
            }

            if (query.length < obj.name.length) {
                label += '<span class="ac-s2">' + obj.name.substr(0, start) + '</span>';
                label += '<span class="ac-s">' + obj.name.substr(start, query.length) + '</span>';
                label += '<span class="ac-s2">' + obj.name.substr(start + query.length, obj.name.length - query.length - start) + '</span>';
            } else {
                label += '<span class="ac-s">' + obj.name + '</span>';
            }

            if (obj.parents) {
                for (var k = obj.parents.length - 1; k > -1; k--) {
                    var parent = obj.parents[k];
                    if (parent.name) {
                        if (label)
                            label += '<span class="ac-st">, </span>';
                        label += '<span class="ac-st">' + parent.name + ' ' + parent.typeShort + '.</span>';
                    }
                }
            }

            return label;
        };

// Обновляет карту
        var MapUpdate = function() {
            var zoom = 12;
            var address = '';

            var cityObj = city.data("kladr-obj");
            if (cityObj) {
                if (address)
                    address += ', ';
                address += cityObj.typeShort + ' ' + cityObj.name;
                zoom = 12;
            }

            var streetObj = street.data("kladr-obj");
            if (streetObj) {
                if (address)
                    address += ', ';
                address += streetObj.typeShort + ' ' + streetObj.name;
                zoom = 14;
            }

            var buildingVal = $.trim(building.val());
            if (buildingVal) {
                if (address)
                    address += ', ';
                address += 'д. ' + buildingVal;
                zoom = 16;
            }

            var buildingAddVal = $.trim(buildingAdd.val());
            if (buildingAddVal) {
                if (address)
                    address += ', ';
                address += buildingAddVal;
                zoom = 16;
            }

            if (address && map_created) {
                var geocode = ymaps.geocode(address);
                geocode.then(function(res) {
                    map.geoObjects.each(function(geoObject) {
                        map.geoObjects.remove(geoObject);
                    });

                    var position = res.geoObjects.get(0).geometry.getCoordinates();
                    $("#apartamentLan").text(position[0]);
                    $("#apartamentLon").text(position[1]);
                    placemark = new ymaps.Placemark(position, {}, {});

                    map.geoObjects.add(placemark);
                    map.setCenter(position, zoom);
                });
            }
        };

// Обновляет текстовое представление адреса
        var AddressUpdate = function() {
            var address = '';
            var zip = '';

            var cityObj = city.data("kladr-obj");
            if (cityObj) {
                if (address)
                    address += ', ';
                address += cityObj.typeShort + '. ' + cityObj.name;
                $("#apartamentCity").text(cityObj.typeShort + '. ' + cityObj.name);
                if (cityObj.zip)
                    zip = cityObj.zip;
                $("#zipCode").text(zip);
            }

            var streetObj = street.data("kladr-obj");
            if (streetObj) {
                if (address)
                    address += ', ';
                address += streetObj.typeShort + '. ' + streetObj.name;
                $("#apartamentStreet").text(streetObj.typeShort + '. ' + streetObj.name);
                if (streetObj.zip)
                    zip = streetObj.zip;
                $("#zipCode").text(zip);
            }

            var buildingVal = $.trim(building.val());
            if (buildingVal) {
                var buildingObj = building.data("kladr-obj");

                if (address)
                    address += ', ';
                address += 'д. ' + buildingVal;
                $("#apartamentBuilding").text('д. ' + buildingVal);
                if (buildingObj && buildingObj.zip)
                    zip = buildingObj.zip;
                $("#zipCode").text(zip);
            }

            var buildingAddVal = $.trim(buildingAdd.val());
            if (buildingAddVal) {
                if (address)
                    address += ', ';
                address += 'к. ' + buildingAddVal;
                $("#apartamentBuildingAdd").text('к. ' + buildingAddVal);
            }
            address = (zip ? zip + ', ' : '') + address;
            $("#zipCode").text(zip);

            $('#address').text(address);
        };

// Обновляет лог текущего выбранного объекта
        var Log = function(obj) {
            var logId = $('#id');
            if (obj && obj.id) {
                logId.find('.value').text(obj.id);
                logId.show();
            } else {
                logId.hide();
            }

            var logName = $('#name');
            if (obj && obj.name) {
                logName.find('.value').text(obj.name);
                logName.show();
            } else {
                logName.hide();
            }

            var logZip = $('#zip');
            if (obj && obj.zip) {
                logZip.find('.value').text(obj.zip);
                logZip.show();
            } else {
                logZip.hide();
            }

            var logType = $('#type');
            if (obj && obj.type) {
                logType.find('.value').text(obj.type);
                logType.show();
            } else {
                logType.hide();
            }

            var logTypeShort = $('#type_short');
            if (obj && obj.typeShort) {
                logTypeShort.find('.value').text(obj.typeShort);
                logTypeShort.show();
            } else {
                logTypeShort.hide();
            }
        }

        ymaps.ready(function() {
            if (map_created)
                return;
            map_created = true;

            map = new ymaps.Map('map', {
                center: [55.76, 37.64],
                zoom: 12
            });

            map.controls.add('smallZoomControl', {top: 5, left: 5});
        });

        $("#apartamentAddReadyLink").css("display", "inline");
        $("#apartamentAddReadyLink").click(function() {
            if (
                    ($('#TypeOfSales').val() == "")
                    || ($('#TypeOfSales').val() == "")
                    || ($('#Price').val() == "")
                    || ($('#CityDistrict').val() == "")
                    || ($('#Floor').val() == "")
                    || ($('#Floors').val() == "")
                    || ($('#RoomNumber').val() == "")
                    || ($('#Material').val() == "")
                    || ($('#SizeApartament').val() == "")
                    || ($('#SizeLiving').val() == "")
                    || ($('#SizeKitchen').val() == "")
                    || ($('#Balcony').val() == "")
                    || ($('#Loggia').val() == "")
                    || ($('#DwellingType').val() == "")
                    ) {
                $("#errorBlock").addClass("alert-danger");
                $("#errorMessage").html("Не все поля заполнены");
                $("#errorBlock").css("display", "block");
                return false;
            }
            $.ajax({
                type: "POST",
                url: "api/apartament/addapartament",
                data: ({
                    typeofsales: $('#TypeOfSales').val(),
                    cityName: $('#apartamentCity').text(),
                    streetName: $('#apartamentStreet').text(),
                    houseNumber: $('#apartamentBuilding').text(),
                    buildingNumber: $('#apartamentBuildingAdd').text(),
                    rooms: $('#Rooms').val(),
                    dwellingType: $('#DwellingType').val(),
                    //FIXME!!
                    kladrId: $('#Price').val(),
                    shortAddress: $('#address').text(),
                    apartamentLan: $("#apartamentLan").text(),
                    apartamentLon: $("#apartamentLon").text(),
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
    });
}
