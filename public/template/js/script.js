$(document).ready(function () {
    $(".lk-page-login-customer-submit").click(function (e) {
        e.preventDefault();
        var a = 0;
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ($("#email-input").val() === "") {
            $("#email-input").css("border-color", "red");
            $("#login-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
            a = -1;
        }
        else if (!regex.test($("#email-input").val())) {
            $("#login-alert").text("Email không hợp lệ!");
            a = -1;
        }
        if ($("#password-input").val() == "") {
            $("#password-input").css("border-color", "red");
            $("#login-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
            a = -1;
        }
        if (a == 0) {
            $("#login-form").submit();
        }
        a = 0;
        if ($("#email-input-register").val() === "") {
            $("#email-input-register").css("border-color", "red");
            $("#register-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
            a = -1;
        }
        else if (!regex.test($("#email-input-register").val())) {
            $("#register-alert").text("Email không hợp lệ!");
            a = -1;
        }
        if ($("#password-input-register").val() == "") {
            $("#password-input-register").css("border-color", "red");
            $("#register-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
            a = -1;
        }
        if ($("#first-name-input").val() == "") {
            $("#first-name-input").css("border-color", "red");
            $("#register-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
            a = -1;
        }
        if ($("#last-name-input").val() == "") {
            $("#last-name-input").css("border-color", "red");
            $("#register-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
            a = -1;
        }
        if ($("#phone-input").val() == "") {
            $("#phone-input").css("border-color", "red");
            $("#register-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
            a = -1;
        }
        if ($("#address-input").val() == "") {
            $("#address-input").css("border-color", "red");
            $("#register-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
            a = -1;
        }
        if (document.getElementById("prevent-register")) {
            a = -1;
        }
        if (a == 0) {
            $("#register-form").submit();
        }
    })
    $("#email-input").keydown(function () {
        $("#email-input").css("border-color", "#e8e8e8");
        $("#login-alert").text("");
    })
    $("#password-input").keydown(function () {
        $("#password-input").css("border-color", "#e8e8e8");
        $("#login-alert").text("");
    })
    $("#email-input-register").keydown(function () {
        $("#email-input-register").css("border-color", "#e8e8e8");
        $("#register-alert").text("");
    })
    $("#password-input-register").keydown(function () {
        $("#password-input-register").css("border-color", "#e8e8e8");
        $("#register-alert").text("");
    })
    $("#first-name-input").keydown(function () {
        $("#first-name-input").css("border-color", "#e8e8e8");
        $("#register-alert").text("");
    })
    $("#last-name-input").keydown(function () {
        $("#last-name-input").css("border-color", "#e8e8e8");
        $("#register-alert").text("");
    })
    $("#phone-input").keydown(function () {
        $("#phone-input").css("border-color", "#e8e8e8");
        $("#register-alert").text("");
    })
    $("#address-input").keydown(function () {
        $("#address-input").css("border-color", "#e8e8e8");
        $("#register-alert").text("");
    })
    $("#password-change").click(function () {
        if ($(this).hasClass("password-change-active")) {
            $(this).text("Mật khẩu");
            $(this).removeClass("password-change-active");
            $("#password-input").hide();
        } else {
            $(this).text("Hủy thay đổi");
            $(this).addClass("password-change-active");
            $("#password-input").show();
        }
    })
    var timeout = null;
    $("#email-input-register").keyup(function (e) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            $.ajax({
                url: "/check-email",
                data: { email: $('#email-input-register').val() },
                type: "POST",
                success: function (data) {
                    $("#register-alert").html(data);
                }
            });
        }, 500);
    })
    $("#edit-name-input").keydown(function () {
        $(this).css('border', '1px solid #C4C4C4');
        $("#edit-profile-alert").text("");
    })
    $("#edit-phone-input").keydown(function () {
        $(this).css('border', '1px solid #C4C4C4');
        $("#edit-profile-alert").text("");
    })
    $("#edit-address-input").keydown(function () {
        $(this).css('border', '1px solid #C4C4C4');
        $("#edit-profile-alert").text("");
    })
    $("#edit-old-pass-input").keydown(function () {
        $(this).css('border', '1px solid #C4C4C4');
        $("#edit-profile-alert").text("");
    })
    $("#new-pass").keydown(function () {
        $(this).css('border', '1px solid #C4C4C4');
        $("#edit-profile-alert").text("");
    })
    $("#confirm-password-edit").keydown(function () {
        $(this).css('border', '1px solid #C4C4C4');
        $("#edit-profile-alert").text("");
    })
    $("#edit-profile-submit-btn").click(function (e) {
        e.preventDefault();
        var a = 0;
        if ($("#edit-name-input").val() === "") {
            $("#edit-name-input").css("border-color", "red");
            $("#edit-profile-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
            a = -1;
        }
        if ($("#edit-phone-input").val() === "") {
            $("#edit-phone-input").css("border-color", "red");
            $("#edit-profile-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
            a = -1;
        }
        if ($("#edit-address-input").val() === "") {
            $("#edit-address-input").css("border-color", "red");
            $("#edit-profile-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
            a = -1;
        }
        if ($("#password-change").hasClass("password-change-active")) {
            if ($("#edit-old-pass-input").val() === "") {
                $("#edit-old-pass-input").css("border-color", "red");
                $("#edit-profile-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
                a = -1;
            }
            if ($("#new-pass").val() === "") {
                $("#new-pass").css("border-color", "red");
                $("#edit-profile-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
                a = -1;
            }
            if ($("#confirm-password-edit").val() === "") {
                $("#confirm-password-edit").css("border-color", "red");
                $("#edit-profile-alert").text("Vui lòng nhập đầy đủ thông tin yêu cầu!");
                a = -1;
            }
            var timeout = null;
            $("#confirm-password-edit").keyup(function () {
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    var pass = $("#new-pass").val();
                    var confirm_pass = $("#confirm-password-edit").val();
                    var pass_alert = $("#edit-profile-alert");
                    if (pass != confirm_pass) {
                        pass_alert.text("Mật khẩu xác nhận không hợp lệ!");
                        a = -1;
                    } else {
                        pass_alert.text("");
                    }
                }, 500);
            })
            if (a == 0) {
                $.ajax({
                    url: "/check-pass",
                    data: {
                        id: $("#edit-profile-submit-btn").data("id"),
                        email: $("#edit-profile-submit-btn").data("email"),
                        pass: $("#edit-old-pass-input").val(),
                    },
                    type: "POST",
                    success: function () {
                        $("#edit-profile-form").submit();
                    },
                    error: function (err) {
                        $("#edit-profile-alert").text("Mật khẩu cũ không chính xác");
                    }
                });
            }
        }
        if(a==0){
            $("#edit-profile-form").submit();
        }
        
    })
    $(".rx-quanty-order-right-body button:first-child").click(function(){
        var input = $(".rx-quanty-order-right-body input");
        var count = parseInt($(input).val())-1;
        count = count < 1 ? 1 : count;
        $(input).val(count);
        $(input).change();
        var url = $(".rx-action-addcart-mainbox");
        var s = $(url).attr("href");
        s = s.substring(0,s.lastIndexOf("quantity"));
        s = s + "quantity=" + count;
        $(url).attr("href",s);
    })
    $(".rx-quanty-order-right-body button:last-child").click(function(){
        var input = $(".rx-quanty-order-right-body input");
        var max = $(input).data("quantity");
        var count = parseInt($(input).val()) + 1;
        count = count > max ? max : count;
        $(input).val(count);
        $(input).change();
        var url = $(".rx-action-addcart-mainbox");
        var s = $(url).attr("href");
        s = s.substring(0,s.lastIndexOf("quantity"));
        s = s + "quantity=" + count;
        $(url).attr("href",s);
    })
    $(".rxmlkiconPlus").click(function(){
        if($(this).hasClass("mlkicon-Plus")){
            $(this).addClass("mlkicon-Minus");
            $(this).removeClass("mlkicon-Plus");
        }else 
        if($(this).hasClass("mlkicon-Minus")){
            $(this).addClass("mlkicon-Plus");
            $(this).removeClass("mlkicon-Minus");
        }
    })
    $("#category-btn").click(function(){
        if($(this).hasClass("mlkicon-Minus")){
            $(".rx-cat-bg").hide();
        }else if($(this).hasClass("mlkicon-Plus")){
            $(".rx-cat-bg").show();
        }
    })
    $("#price-btn").click(function(){
        if($(this).hasClass("mlkicon-Minus")){
            $(".filter-price").hide();
        }else if($(this).hasClass("mlkicon-Plus")){
            $(".filter-price").show();
        }
    })
})