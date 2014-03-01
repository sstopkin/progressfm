$(document).ready(function() {
    $("#chngPwdBtn").click(function() {
        if ($("#chngPassword").val() == $("#chngPasswordCurrent").val()) {
            $("#chngPwdErr").html("Новый пароль не должен совпадать с текущим");
            return false;
        }
        if (($("#chngPassword").val() == "") || ($("#chngPassword2").val() == "")) {
            $("#chngPwdErr").html("Введите новый пароль");
            return false;
        }
        if ($("#chngPassword").val() == $("#chngPassword2").val()) {
            $.ajax({
                type: "POST",
                url: "api/auth/chngpwd",
                data: ({
                    oldpwd: $("#chngPasswordCurrent").val(),
                    newpwd: $("#chngPassword").val()
                }),
                success: function(data) {
                    $("#chngPasswordCurrent").val("");
                    $("#chngPassword").val("");
                    $("#chngPassword2").val("");
                    $("#chngPwdErr").html("");
                    $("#chngPwdModal").modal("hide");
                },
                error: function(data) {
                    $("#chngPwdErr").html(data.responseText);
                    return false;
                }
            });
        } else {
            $("#chngPwdErr").html("Введенные пароли не совпадают");
        }
    });
});

function getProfilePage() {
    $.get("profile.html", function(data) {
        $("#mainContainer").html(data);
        $('#chngPwd').validate({
            rules: {
                oldPassword: {
                    required: true,
                    minlength: 6,
                    maxlength: 50
                },
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 50
                },
                password2: {
                    equalTo: '#chngPassword'
                }
            },
            highlight: function(element, errorClass, validClass) {
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            unhighlight: function(element, errorClass, validClass) {
                $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
            },
            success: function(label) {
                $(label).closest('form').find('.valid').removeClass("invalid");
            },
            errorPlacement: function(error, element) {
                error.text(element.closest('.form-group').find('.help-block'));
            }
        });
        $.ajax({
            type: "GET",
            url: "api/auth/info",
            success: function(data) {
                $("#errorBlock").css("display", "none");
                $("#tags").css("display", "none");
                $("#userProfile").css("display", "block");

                var value = JSON.parse(data);
                $("#profileEmail").html(value.email);
                $("#profileFName").html(value.fName);
                $("#profileMName").html(value.mName);
                $("#profileLName").html(value.lName);
                $("#profilePoints").html(value.points);
                plannerGetWorkersTasks();
            },
            error: function(data) {
                showDanger(data.responseText);
                return false;
            }
        });
    });
}
