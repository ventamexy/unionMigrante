window.addEventListener("load", function() {
    
    $(document).on("click", ".btnEnviarPrecalificacion", function(){

        $(".cargaSpinner").removeClass("d-none");
        $(".btnEnviarPrecalificacion").attr({disabled:true});
        let imgNotificacion = "img/iconos-notificaciones/success.png";
        let typeButton = "btn btn-danger";
        let estadoEnvio = false;

        try {
            
            /**
             * 
             * Validaciones
             * 
             */

            let nombre = $("input[name='nombre']");
            let valorNombre = nombre.val().trim();
            if ( valorNombre == "" ) {
                nombre.addClass("campoValidacion");
                throw "El nombre no puede ser vacío.";
            } nombre.removeClass("campoValidacion");


            let apellidoPaterno = $("input[name='apellidoPaterno']");
            let valorApellidoPaterno = apellidoPaterno.val().trim();
            if ( valorApellidoPaterno == "" ) {
                apellidoPaterno.addClass("campoValidacion");
                throw "El apellido paterno no puede ser vacío.";
            } apellidoPaterno.removeClass("campoValidacion");


            let email = $("input[name='email']");
            let expRegularEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if ( !expRegularEmail.test(email.val().trim()) ) {
                email.addClass("campoValidacion");
                throw "El correo electrónico es incorrecto.";
            } email.removeClass("campoValidacion");


            let mensaje = $("textarea[name='mensaje']");
            let valorMensaje = mensaje.val().trim();
            if ( valorMensaje == "" || ( valorMensaje.length < 200 || valorMensaje.length > 3500 ) ) {
                mensaje.addClass("campoValidacion");
                throw "El contenido del mensaje no puede ser vacío y debe de tener una longitud mínima de 200 caracteres y máxima de 3500.";
            } mensaje.removeClass("campoValidacion");


            let frmPreCalificacion = $(".frmPrecalificacion").serialize();

            let urlServidor = "https://empleosmexy.com/server/controllers/cEnviarEmail.php";
            if ( window.location.host === "local.unionmigrante.com" ) {
                urlServidor = "http://local.empleosmexy.com/server/controllers/cEnviarEmail.php";
            }

            $.ajax({

                data:frmPreCalificacion+"&tipoPeticion=enviarEmail",
                url:urlServidor,
                method:"POST",
                dataType:"JSON",
                success:function(data) {
                    
                    try {
                        
                        if ( data["validaciones"] ) {
                            imgNotificacion = "img/iconos-notificaciones/warning.png";
                        }

                        if ( data["estadoEnvioCorreo"] == true ) {
                            typeButton = "btn btn-success";
                            $("input, textarea").val("");
                            estadoEnvio = true;
                        } else {
                            imgNotificacion = "img/iconos-notificaciones/error.png";
                        }

                        throw data["mensaje"];

                    } catch (error) {
                        
                        bootbox.alert({
                            message: error,
                            className: 'd-flex align-items-center'
                        });
                        
                        $(".bootbox-accept").addClass(typeButton);
                        $(".btnEnviarPrecalificacion").attr({disabled:false});
                        $(".cargaSpinner").addClass("d-none");

                        addImageNotificacion(imgNotificacion, estadoEnvio);

                    }

                }

            });

        } catch (error) {

            imgNotificacion = "img/iconos-notificaciones/warning.png";

            bootbox.alert({
                message: error,
                className: 'd-flex align-items-center'
            });

            $(".bootbox-accept").addClass("btn "+typeButton);
            $(".btnEnviarPrecalificacion").attr({disabled:false});
            $(".cargaSpinner").addClass("d-none");

            addImageNotificacion(imgNotificacion, estadoEnvio);

        }

    });

    function addImageNotificacion( imgNotificacion = "", estadoEnvio) {

        let contenedorImagenNotificacion = $("<div>").attr({class:"contenedor-img-notificacion"});
        let imagenNotificacion = $("<img>").attr({class:"icono-notificacion", src:imgNotificacion});
        contenedorImagenNotificacion.append(imagenNotificacion);
        let botonCierre = ".bootbox-accept.btn-danger";
        if ( estadoEnvio ) {
            botonCierre = ".bootbox-accept.btn-success";
        }

        contenedorImagenNotificacion.insertBefore(botonCierre);

    }

});