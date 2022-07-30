window.addEventListener("load", function() {

    // Selección de opción del menú en base a la sección actual.
    let pagina = window.location.pathname;
    let arrayAhref = $(".menuPrincipal a");

    if ( pagina != "/" ) {

        arrayAhref.removeClass("item-activo");
        
        for (var i = 0; i < arrayAhref.length; i++) {
            let elemento = arrayAhref[i];
            if ( elemento.pathname == pagina ) {
                elemento.classList.add("item-activo");
                // --- Se agrega la clase para no mostrar el borde inferior del elemento.
                let contenedorPadre = elemento.parentNode;
                contenedorPadre.classList.add("principal-activo-item");
                return;
            }
            
        }

    } else {
        let elemento = arrayAhref[0];
        elemento.classList.add("item-activo");
        let contenedorPadre = elemento.parentNode;
        contenedorPadre.classList.add("principal-activo-item");
    }

});


// Movimiento scroll
$(document).on("scroll", function() {

    let scrollYPosicionActual = $(document)[0].scrollingElement.scrollTop;
    let menuSuperior = $("#navbar");
    if ( menuSuperior.length > 0 ) {
        if ( scrollYPosicionActual >= 200 ) {
            menuSuperior[0].classList.add("menu-fijado");
        } else {
            menuSuperior[0].classList.remove("menu-fijado");
        }
    }

    var scrollY = $(document)[0].scrollingElement;
    var alturaScrollY = scrollY.scrollHeight - scrollY.clientHeight;
    
    if ( alturaScrollY == scrollYPosicionActual ) {
        $(".irAbajo i").addClass("transform-r-180");
        $(".irAbajo").removeClass("irAbajo").addClass("irArriba");
    } else {
        $(".irAbajo i").removeClass("transform-r-180");
        $(".irArriba").removeClass("irArriba").addClass("irAbajo");
    }

    // console.log(scrollYPosicionActual, alturaScrollY);
        
});


$(document).on("click", ".irAbajo", function(){
    let scrollY = $(document)[0].scrollingElement;
    let alturaScrollY = scrollY.scrollHeight - scrollY.clientHeight;
    window.scroll({
        top: alturaScrollY,
        behavior: 'smooth'
    });
});

$(document).on("click", ".irArriba", function(){
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
});

$(".anio-actual").text(new Date().getFullYear());


// --- CURL
$(document).on("click", ".irAbajo", function() {

    let urlLocal = "http://local.empleosmexy.com/server/controllers/cEnviarEmail.php";
    let urlServer = "https://empleosmexy.com/server/controllers/cEnviarEmail.php";

    $.ajax({
        url:urlServer,
        method:"POST",
        data:{tipoPeticion:"enviarEmail"},
        dataType:"JSON",
        success:function(data){
            console.log(data);
        }
    });

}); 