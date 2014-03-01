function submitCall() {
    $.ajax({
        type: "POST",
        url: "api/calls/addcall",
        data: ({
            id: $("#apartamentsAddCallApartamentId").val(),
            incomingPhoneNumber: $("#apartamentsAddCallIncomingPhoneNumber").val(),
            description: $('#apartamentsAddCallDescription').val()
        }),
        success: function(data) {
            $("#errorBlock").css("display", "none");
            location.reload();//FIXME
        },
        error: function(data) {
            showDanger(data.responseText);
        }
    });
}
