window.addEventListener("load", function() {
        
    $(document).on("click", ".reload-captcha", function() {
        grecaptcha.reset();
    });

});

// --- Carga del recaptcha.
function CaptchaCallback() {

    grecaptcha.render("g-recaptcha", {
        sitekey: '6LelCfshAAAAAD64THju_2gNagBLsfiFv0aLfzG_',
        callback: function () {
            console.log('recaptcha callback');
        }
    });

};