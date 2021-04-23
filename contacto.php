<!-- saved from url=(0060)http://unimeunion.000webhostapp.com/paginas/php/contacto.php -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body></body></html>
<?php
$remitente = $_POST['email'];
$destinatario = 'Visas@elynconsultoriainternacional.com'; // en esta línea va el mail del destinatario.
$asunto = 'Consulta de union migrante'; // acá se puede modificar el asunto del mail
if (!$_POST){
?>

<?php
}else{

    $cuerpo = "Nombre: " . $_POST["nombre"] . "\r\n";
    $cuerpo .= "Email: " . $_POST["email"] . "\r\n";
  	$cuerpo .= "telefono: " . $_POST["telefono"] . "\r\n";
    $cuerpo .= "Ciudad: " . $_POST["ciudad"] . "\r\n";
    $cuerpo .= "pais: " . $_POST["pais"] . "\r\n";
    $cuerpo .= "mensaje: " . $_POST["mensaje"] . "\r\n";

	//las líneas de arriba definen el contenido del mail. Las palabras que están dentro de $_POST[""] deben coincidir con el "name" de cada campo.
	// Si se agrega un campo al formulario, hay que agregarlo acá.

    $headers  = "MIME-Version: 1.0\n";
    $headers .= "Content-type: text/plain; charset=utf-8\n";
    $headers .= "X-Priority: 3\n";
    $headers .= "X-MSMail-Priority: Normal\n";
    $headers .= "X-Mailer: php\n";
    $headers .= "From: \"".$_POST['nombre']." ".$_POST['email']."\" <".$remitente.">\n";

    mail($destinatario, $asunto, $cuerpo, $headers);

    //se debe crear un html que confirma el envío
    $mensaje = "correo enviado";
    echo "<script>";
    echo "if(confirm('$mensaje'));";
    echo "window.location = 'http://unionmigrante.elynconsultoriainternacional.com/index.html';";
    echo "</script>";
}
?>
