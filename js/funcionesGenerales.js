window.addEventListener("load", function() {
        
    $(document).on("click", ".reload-captcha", function() {
        grecaptcha.reset();
    });

});