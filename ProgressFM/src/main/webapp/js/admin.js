//var taskId;
//var access;
//var codes = [];

//function getUnevaluatedTasks() {
//    $.ajax({
//        type: "GET",
//        url: "api/admin/getunevaluated",
//        success: function(data) {
//            var list = JSON.parse(data);
//            var str = "";
//            str += "<table class=\"table table-hover table-bordered\" style='margin-top:10px; margin-bottom:10px;' >";
//            str += "<thead class='t-header'><tr>";
//            str += "<th class=\"col-md-3\">Email</th>";
//            str += "<th class=\"col-md-4\">Задание</th>";
//            str += "<th class=\"col-md-2\">Исходный код</th>";
//            str += "<th class=\"col-md-3\">Оценка</th>";
//            str += "</tr></thead>";
//            str += "<tbody class='t-cell'>";
//
//            ids_tasks = [];
//            for (var j = 0; j < list.length; ++j) {
//                ids_tasks[j] = list[j][0].taskId;
//                str += "<tr><td>";
//                str += list[j][1];
//                str += "</td><td>";
//                str += "<a href=\"#task/view/" + list[j][0].taskId + "\">" + list[j][2] + "</a>";
//                str += "</td><td>";
//                codes[j] = list[j][0].source;
//                str += "<a href=\"\" onclick=\"return viewCode(" + j + ");\">Просмотр кода</a>";
//                str += "</td><td align='center'>";
//                str += "<div class='btn-group'>";
//                str += "<button type='button' onclick=\"return checkSuccessTask(" + list[j][0].id + ");\" class='btn btn-success'>Верно</button>";
//                str += "<button type='button' onclick=\"return checkFailTask(" + list[j][0].id + ");\" class='btn btn-danger'>Неверно</button>";
//                str += "</div>";
//                str += "</td></tr>";
//            }
//            str += "</tbody></table>";
//            $("#adminContent").html(str);
//        },
//        error: function(data) {
//            $("#errorBlock").addClass("alert-danger");
//            $("#errorMessage").html(data.responseText);
//            $("#errorBlock").css("display", "block");
//            checkStatus();
//            return false;
//        }
//    });
//    return false;
//}

function getUsersList() {
    $.ajax({
        type: "GET",
        url: "api/admin/getallusers",
        success: function(data) {
            var list = JSON.parse(data);
            var str = "";
            str += "<table class=\"table table-hover table-bordered\" style='margin-top:10px; margin-bottom:10px;' >";
            str += "<thead class='t-header'><tr>";
            str += "<th class=\"col-md-1\">id</th>";
            str += "<th class=\"col-md-1\">Email</th>";
            str += "<th class=\"col-md-1\">Фамилия</th>";
            str += "<th class=\"col-md-1\">Имя</th>";
            str += "<th class=\"col-md-1\">Отчество</th>";
            str += "<th class=\"col-md-1\">Статус</th>";
            str += "</tr></thead>";
            str += "<tbody class='t-cell'>";

            for (var j = 0; j < list.length; ++j) {
                str += "<tr><td>";
                str += list[j][0];
                str += "</td><td>";
                str += list[j][1];
                str += "</td><td>";
                str += list[j][2];
                str += "</td><td>";
                str += list[j][3];
                str += "</td><td>";
                str += list[j][4];
                str += "</td><td>";
                if (list[j][6] == true) {
                    str += "<a href=\"\" onclick=\"return banUser(" + list[j][0] + ");\"><span class=\"label label-success\">Активен</span></a>";
                } else {
                    str += "<a href=\"\" onclick=\"return unBanUser(" + list[j][0] + ");\"><span class=\"label label-danger\">Заблокирован</span></a>";
                }
                str += "</td></tr>";
            }
            str += "</tbody></table>";
            $("#adminContent").html(str);
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

function banUser(id) {
    $.ajax({
        type: "POST",
        url: "api/admin/banuser",
        data: ({id: id}),
        success: function(data) {
            getUsersList();
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

function unBanUser(id) {
    $.ajax({
        type: "POST",
        url: "api/admin/unbanuser",
        data: ({id: id}),
        success: function(data) {
            getUsersList();
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

//function getModerationPage() {
//    $.ajax({
//        type: "GET",
//        url: "api/admin/getnonapprovedcourses",
//        success: function(data) {
//            var list = JSON.parse(data);
//            var str = "";
//            str += "<div><table class=\"table table-hover table-bordered\" style='margin-top:10px; margin-bottom:10px;'>";
//            str += "<thead class='t-header'><tr>";
//            str += "<th class='col-md-1'>№</th>";
//            str += "<th class='col-md-9'>Название курса</th>";
//            str += "<th class='col-md-2'>Состояние</th>";
//            str += "</tr></thead>";
//            str += "<tbody class='t-cell'>";
//            ids_courses = [];
//            for (var j = 0; j < list.length; ++j) {
//                ids_courses[j] = list[j].id;
//                str += "<tr><td>";
//                str += j + 1;
//                str += "</td><td>";
//                str += "<a href=\"#course/view/" + list[j].id + "\">" + list[j].title + "</a>";
//                str += "</td><td>";
//                var flag = true;
//                if (list[j].viewed == flag) {
//                    str += "<p class=\"text-success\">Просмотрен</p>";
//                }
//                else {
//                    str += "<p class=\"text-danger\">Не просмотрен</p>";
//                }
//                str += "</td></tr>";
//            }
//            str += "</tbody></table></div>\n";
//            $.ajax({
//                type: "GET",
//                url: "api/admin/getnonapprovedtasks",
//                success: function(data) {
//                    var list = JSON.parse(data);
//                    str += "<div><table class=\"table table-hover table-bordered\" style='margin-top:10px; margin-bottom:10px;' >";
//                    str += "<thead class='t-header'><tr>";
//                    str += "<th class='col-md-1'>№</th>";
//                    str += "<th class='col-md-9'>Название задания</th>";
//                    str += "<th class='col-md-2'>Состояние</th>";
//                    str += "</tr></thead>";
//                    str += "<tbody class='t-cell'>";
//                    ids_tasks = [];
//                    for (var j = 0; j < list.length; ++j) {
//                        ids_tasks[j] = list[j].id;
//                        str += "<tr><td class=\"col-md-1\">";
//                        str += j + 1;
//                        str += "</td><td>";
//                        str += "<a href=\"#task/view/" + list[j].id + "\">" + list[j].title + "</a>";
//                        str += "</td><td>";
//                        var flag = true;
//                        if (list[j].viewed == flag) {
//                            str += "<p class=\"text-success\">Просмотрено</p>";
//                        }
//                        else {
//                            str += "<p class=\"text-danger\">Не просмотрено</p>";
//                        }
//                        str += "</td></tr>";
//                    }
//                    str += "</tbody></table></div>";
//                    $("#adminContent").html(str);
//                }
//            });
//        }
//    });
//    return false;
//}

//function viewCode(j) {
//    $("#codeFormMessage").html(codes[j]);
//    $("#codeForm").modal('show');
//    return false;
//}

//function changePoints(id, j) {
//    $.ajax({
//        type: "POST",
//        url: "api/admin/chngpoints",
//        data: ({
//            id: id,
//            points: $("#userPoints" + j).val()
//        }),
//        success: function(data) {
//            getUsersList();
//        },
//        error: function(data) {
//            $("#errorBlock").addClass("alert-danger");
//            $("#errorMessage").html(data.responseText);
//            $("#errorBlock").css("display", "block");
//            checkStatus();
//            return false;
//        }
//    });
//    return false;
//}

//function checkSuccessTask(id) {
//    $.ajax({
//        type: "POST",
//        url: "api/admin/evaluatesuccess",
//        data: ({id: id}),
//        success: function() {
//            getUnevaluatedTasks();
//        },
//        error: function(data) {
//            $("#errorBlock").addClass("alert-danger");
//            $("#errorMessage").html(data.responseText);
//            $("#errorBlock").css("display", "block");
//            checkStatus();
//            return false;
//        }
//    });
//    return false;
//}
//
//function checkFailTask(id) {
//    $.ajax({
//        type: "POST",
//        url: "api/admin/evaluatefail",
//        data: ({id: id}),
//        success: function() {
//            getUnevaluatedTasks();
//        },
//        error: function(data) {
//            $("#errorBlock").addClass("alert-danger");
//            $("#errorMessage").html(data.responseText);
//            $("#errorBlock").css("display", "block");
//            checkStatus();
//            return false;
//        }
//    });
//    return false;
//}
//
//
//function getEditContentPage(_content, id) {
//    var permissions;
//    var userId;
//    $.ajax({
//        type: "GET",
//        url: "api/auth/validate",
//        success: function(data) {
//            permissions = data;
//            $.ajax({
//                type: "GET",
//                url: "api/auth/author",
//                success: function(data2) {
//                    userId = data2;
//                    $.ajax({
//                        type: "GET",
//                        url: "api/" + _content + "/get" + _content,
//                        data: ({id: id}),
//                        success: function(data3) {
//                            var content = JSON.parse(data3);
//                            if (_content == "course") {
//                                content.content = content.course;
//                            }
//                            if (_content == "task") {
//                                content.content = content.task;
//                            }
//
//                            if ((permissions == "3") || (content.content.author == userId)) {
//                                _editContent(_content, id, permissions);
//                            }
//                            else {
//                                showWarning("У вас недостаточно прав для совершения данного действия");
//                            }
//                        },
//                        error: function(data3) {
//                            showWarning(data3.responseText);
//                        },
//                    });
//                },
//                error: function(data2) {
//                    showWarning(data2.responseText);
//                },
//            });
//        },
//        error: function(data) {
//            showWarning(data.responseText);
//        },
//    });
//}
//
//var sourseEditor;
//var testEditor;
//function _editContent(_content, id, permissions) {
//    showFooterAbout();
//    $.get("create.html", function(data) {
//        $("#mainContainer").html(data);
//        initTinyMCE();
//        sourseEditor = initSourseEditor();
//        testEditor = initTestEditor();
//        if (permissions == "3") {
//            $("#approvingBlock").css("display", "none");
//        } else {
//            $("#approvingBlock").css("display", "inline");
//        }
//        $("#accessCheck").unbind();
//        $("#accessCheck").click(function() {
//            if (document.getElementById("accessCheck").checked) {
//                access = true;
//            } else {
//                access = false;
//            }
//        });
//        $("#approvingCheck").unbind();
//        $("#approvingCheck").click(function() {
//            if (document.getElementById("approvingCheck").checked) {
//                approving = true;
//            } else {
//                approving = false;
//            }
//        });
//        if (_content == "course") {
//            $("#step1Link").click(step1Click);
//            $("#step2Link").click(step2Click);
//            $("#readyLink").css("display", "inline");
//            $("#createPageTitle").html("Редактирование курса");
//            $.ajax({
//                type: "GET",
//                url: "api/course/getcourse",
//                data: ({id: id}),
//                success: function(data) {
//                    var content = JSON.parse(data);
//                    $('#contentName').val(content.course.title);
//                    $('#contentDesc').val(content.course.description);
//                    $('#contentTags').val(content.Tags);
//                    tinyMCE.get('content').setContent(content.course.content);
//                    $("#courseEditReadyLink").click(function() {
//                        if (($('#contentName').val() == "") || ($('#contentDesc').val() == "") ||
//                                ($('#contentTags').val() == "") ||
//                                (tinyMCE.get('content').getContent() == "")) {
//                            $("#errorMessage").html("Не все поля заполнены");
//                            $("#errorBlock").css("display", "block");
//                            return false;
//                        }
//                        $.ajax({
//                            type: "POST",
//                            url: "api/course/editcourse",
//                            data: ({
//                                id: id,
//                                name: $('#contentName').val(),
//                                desc: $('#contentDesc').val(),
//                                tags: $('#contentTags').val(),
//                                content: tinyMCE.get('content').getContent(),
//                                toapproving: approving
//                            }),
//                            success: function(data) {
//                                location.hash = "course";
//                            },
//                            error: function(data) {
//                                $("#errorMessage").html(data.responseText);
//                                $("#errorBlock").css("display", "block");
//                                checkStatus();
//                                return false;
//                            }
//                        });
//                    });
//                },
//                error: function(data) {
//                    $("#errorBlock").addClass("alert-danger");
//                    $("#errorMessage").html(data.responseText);
//                    $("#errorBlock").css("display", "block");
//                    checkStatus();
//                    return false;
//                }
//            });
//        }
//        if (_content == "task") {
//            $("#accessCheck").removeAttr("checked", "checked");
//            $("#accessBlock").css('display', 'inline');
//            $("#contentHelpBox").css("display", "block");
//            $("#readyLink").css("display", "inline");
//            $("#contentForTasks").css("display", "block");
//            $("#createPageTitle").html("Редактирование задания");
//
//            type = 0;
//            $("#step1Link").click(step1Click);
//            $("#step2Link").click(step2Click);
//            $("#step3Link").click(step3Click);
//
//            $.ajax({
//                type: "GET",
//                url: "api/task/gettask",
//                data: ({id: id}),
//                success: function(data) {
//                    taskId = id;
//                    var content = JSON.parse(data);
//                    $('#contentName').val(content.task.title);
//                    $('#contentDesc').val(content.task.description);
//                    $('#contentHelp').val(content.task.helpText);
//                    sourseEditor.setValue(content.task.sourceCode);
//                    $('#contentTags').val(content.Tags);
//                    $.ajax({
//                        type: "GET",
//                        url: "api/task/getreference",
//                        data: ({id: taskId}),
//                        success: function(data) {
//                            var ref = JSON.parse(data);
//                            testEditor.setValue(ref[2]);
//                            $('#exInput').val(ref[0]);
//                            $('#exOutput').val(ref[1]);
//                        }
//                    });
//
//                    $("#typeSelect").val(content.task.taskType);
//                    $("#diffSelect").val(content.task.difficulty);
//                    if (content.task.anonymousAccess == true) {
//                        document.getElementById("accessCheck").checked = true;
//                    } else {
//                        document.getElementById("accessCheck").checked = false;
//                    }
//                    if (content.task.taskType == 1) {
//                        type = 1;
//                        $("#step3Link").css("display", "none");
//                        $("#step2Link").removeClass("step1-2-noactive");
//                        $("#step2Link").addClass("step2-3-noactive");
//                        $("#exInputBlock").css("display", "block");
//                        $("#exOutputBlock").css("display", "block");
//                        $("#readyLink").css("display", "block");
//                        $("#readyLink").unbind();
//                        $("#readyLink").bind("click", editTaskType1);
//                    }
//                    if (content.task.taskType == 2) {
//                        type = 2;
//                        $("#step3Link").css("display", "block");
//                        $("#step2Link").removeClass("step2-3-noactive");
//                        $("#step2Link").addClass("step1-2-noactive");
//                        $("#exOutputBlock").css("display", "none");
//                        $("#exInputBlock").css("display", "none");
//                        $("#readyLink").css("display", "block");
//                        $("#readyLink").unbind();
//                        $("#readyLink").bind("click", editTaskType2);
//                    }
//                    if (content.task.taskType == 3) {
//                        type = 3;
//                        $("#step3Link").css("display", "none");
//                        $("#step2Link").removeClass("step1-2-noactive");
//                        $("#step2Link").addClass("step2-3-noactive");
//                        $("#exInputBlock").css("display", "none");
//                        $("#exOutputBlock").css("display", "none");
//                        $("#readyLink").css("display", "block");
//                        $("#readyLink").unbind();
//                        $("#readyLink").bind("click", editTaskType3);
//                    }
//                    tinyMCE.get('content').setContent(content.task.content);
//                },
//                error: function(data) {
//                    $("#errorBlock").addClass("alert-danger");
//                    $("#errorMessage").html(data.responseText);
//                    $("#errorBlock").css("display", "block");
//                    checkStatus();
//                    return false;
//                }
//            });
//        }
//
//        $("#typeSelect").unbind();
//        $("#typeSelect").change(function() {
//            if ($(this).val() == 1) {
//                type = 1;
//                $("#step3Link").css("display", "none");
//                $("#step2Link").removeClass("step1-2-noactive");
//                $("#step2Link").addClass("step2-3-noactive");
//                $("#exInputBlock").css("display", "block");
//                $("#exOutputBlock").css("display", "block");
//                $("#readyLink").css("display", "block");
//                $("#readyLink").unbind();
//                $("#readyLink").bind("click", editTaskType1);
//            }
//            if ($(this).val() == 2) {
//                type = 2;
//                $("#step3Link").css("display", "block");
//                $("#step2Link").removeClass("step2-3-noactive");
//                $("#step2Link").addClass("step1-2-noactive");
//                $("#exOutputBlock").css("display", "none");
//                $("#exInputBlock").css("display", "none");
//                $("#readyLink").css("display", "block");
//                $("#readyLink").unbind();
//                $("#readyLink").bind("click", editTaskType2);
//            }
//            if ($(this).val() == 3) {
//                type = 3;
//                $("#step3Link").css("display", "none");
//                $("#step2Link").removeClass("step1-2-noactive");
//                $("#step2Link").addClass("step2-3-noactive");
//                $("#exInputBlock").css("display", "none");
//                $("#exOutputBlock").css("display", "none");
//                $("#readyLink").css("display", "block");
//                $("#readyLink").unbind();
//                $("#readyLink").bind("click", editTaskType3);
//            }
//        });
//    });
//}
//
//function editTaskType1() {
//    if (($('#contentName').val() == "") || ($('#contentDesc').val() == "") ||
//            ($('#contentTags').val() == "") || ($('#contentHelp').val() == "") ||
//            (tinyMCE.get('content').getContent() == "") || ($("#exInput").val() == "") ||
//            ($("#exOutput").val() == "") || ($("#diffSelect").val() == 0) ||
//            ($("#typeSelect").val() == 0)) {
//        $("#errorBlock").addClass("alert-danger");
//        $("#errorMessage").html("Не все поля заполнены");
//        $("#errorBlock").css("display", "block");
//        return false;
//    }
//    $.ajax({
//        type: "POST",
//        url: "api/task/edittask",
//        data: ({
//            id: taskId,
//            name: $('#contentName').val(),
//            desc: $('#contentDesc').val(),
//            tags: $('#contentTags').val(),
//            sourse: sourseEditor.getValue(),
//            content: tinyMCE.get('content').getContent(),
//            help: $('#contentHelp').val(),
//            input: $("#exInput").val(),
//            output: $("#exOutput").val(),
//            access: access,
//            type: $("#typeSelect").val(),
//            diff: $("#diffSelect").val(),
//            toapproving: approving
//        }),
//        success: function(data) {
//            location.hash = "task";
//        },
//        error: function(data) {
//            $("#errorBlock").addClass("alert-danger");
//            $("#errorMessage").html(data.responseText);
//            $("#errorBlock").css("display", "block");
//            checkStatus();
//            return false;
//        }
//    });
//}
//
//function editTaskType2() {
//    if (($('#contentName').val() == "") || ($('#contentDesc').val() == "") ||
//            ($('#contentTags').val() == "") || ($('#contentHelp').val() == "") ||
//            (tinyMCE.get('content').getContent() == "") || (testEditor.getValue() == "") ||
//            ($("#diffSelect").val() == 0) || ($("#typeSelect").val() == 0)) {
//        $("#errorBlock").addClass("alert-danger");
//        $("#errorMessage").html("Не все поля заполнены");
//        $("#errorBlock").css("display", "block");
//        return false;
//    }
//    $.ajax({
//        type: "POST",
//        url: "api/task/edittask",
//        data: ({
//            id: taskId,
//            name: $('#contentName').val(),
//            desc: $('#contentDesc').val(),
//            tags: $('#contentTags').val(),
//            sourse: sourseEditor.getValue(),
//            content: tinyMCE.get('content').getContent(),
//            help: $('#contentHelp').val(),
//            test: testEditor.getValue(),
//            access: access,
//            type: $("#typeSelect").val(),
//            diff: $("#diffSelect").val(),
//            toapproving: approving
//        }),
//        success: function(data) {
//            location.hash = "task";
//        },
//        error: function(data) {
//            $("#errorBlock").addClass("alert-danger");
//            $("#errorMessage").html(data.responseText);
//            $("#errorBlock").css("display", "block");
//            checkStatus();
//            return false;
//        }
//    });
//}
//
//function editTaskType3() {
//    if (($('#contentName').val() == "") || ($('#contentDesc').val() == "") ||
//            ($('#contentTags').val() == "") || ($('#contentHelp').val() == "") ||
//            (tinyMCE.get('content').getContent() == "") ||
//            ($("#diffSelect").val() == 0) || ($("#typeSelect").val() == 0)) {
//        $("#errorBlock").addClass("alert-danger");
//        $("#errorMessage").html("Не все поля заполнены");
//        $("#errorBlock").css("display", "block");
//        return false;
//    }
//    $.ajax({
//        type: "POST",
//        url: "api/task/edittask",
//        data: ({
//            id: taskId,
//            name: $('#contentName').val(),
//            desc: $('#contentDesc').val(),
//            tags: $('#contentTags').val(),
//            sourse: sourseEditor.getValue(),
//            content: tinyMCE.get('content').getContent(),
//            help: $('#contentHelp').val(),
//            access: access,
//            type: $("#typeSelect").val(),
//            diff: $("#diffSelect").val(),
//            toapproving: approving
//        }),
//        success: function(data) {
//            location.hash = "task";
//        },
//        error: function(data) {
//            $("#errorBlock").addClass("alert-danger");
//            $("#errorMessage").html(data.responseText);
//            $("#errorBlock").css("display", "block");
//            checkStatus();
//            return false;
//        }
//    });
//}
//
//function removeContent(_content, id) {
//    $.ajax({
//        type: "GET",
//        url: "api/" + _content + "/get" + _content,
//        data: ({id: id}),
//        success: function(data) {
//            var content = JSON.parse(data);
//            if (_content == "course") {
//                content.content = content.course;
//            } else {
//                content.content = content.task;
//            }
//            $("#confirmationFormMessage").html("Вы действительно хотите удалить "
//                    + content.content.title + "?");
//            $("#confirmationForm").modal('show');
//            $("#confirmBtn").unbind();
//            $("#confirmBtn").bind("click", function() {
//                $.ajax({
//                    type: "POST",
//                    url: "api/" + _content + "/remove",
//                    data: ({id: id}),
//                    success: function(data) {
//                        $("#confirmationForm").modal('hide');
//                        if (_content == "course") {
//                            getCoursesPage();
//                        } else {
//                            getTasksPage();
//                        }
//                    },
//                    error: function(data) {
//                        $("#confirmErr").html(data.responseText);
//                        checkStatus();
//                        return false;
//                    }
//                });
//            });
//        },
//        error: function(data) {
//            $("#errorMessage").html(data.responseText);
//            $("#errorBlock").css("display", "block");
//            checkStatus();
//            return false;
//        }
//    });
//    return false;
//}
//
//function approveContent(_content, id) {
//    $.ajax({
//        type: "POST",
//        url: "api/" + _content + "/approve",
//        data: ({id: id}),
//        success: function(data) {
//            if (_content == "course") {
//                location.hash = "course";
//                getCoursesPage();
//            } else {
//                location.hash = "task";
//                getTasksPage();
//            }
//        },
//        error: function(data) {
//            $("#errorBlock").addClass("alert-danger");
//            $("#errorMessage").html(data.responseText);
//            $("#errorBlock").css("display", "block");
//            checkStatus();
//            return false;
//        }
//    });
//    return false;
//}
//
//function disApproveContent(_content, id) {
//    $.ajax({
//        type: "POST",
//        url: "api/" + _content + "/disapprove",
//        data: ({id: id}),
//        success: function(data) {
//            if (_content == "course") {
//                getCoursesPage();
//            } else {
//                getTasksPage();
//            }
//        },
//        error: function(data) {
//            $("#errorBlock").addClass("alert-danger");
//            $("#errorMessage").html(data.responseText);
//            $("#errorBlock").css("display", "block");
//            checkStatus();
//            return false;
//        }
//    });
//    return false;
//}
