/********************
VALIDACIÓN DE LOS CAMPOS
*********************/
$(document).ready(function () {
    $("#basic-form").validate({
        rules: {
            name: {
                required: true,
                minlength: 5
            },
            surname: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true
            },
            cardNumber: {
                required: true,
                number: true,
                minlength: 16
            },
            cvv: {
                required: true,
                number: true,
                minlength: 3
            }
        },
        messages: {
            name: {
                minlength: "El Nombre debe tener al menos 5 caracteres"
            },
            surname: {
                minlength: "Los Apellidos deben tener al menos 5 caracteres"
            },
            email: {
                email: "El correo debe tener el formato: abc@dominio.def"
            },
            cardNumber: {
                required: "Ingresa tu número de tarjeta",
                minlength: "Deben ser 16 dígitos",                
            },
            cvv: {
                required: "Ingresa el CVV de tu tarjeta bancaria",
                minlength: "Deben ser 3 dígitos",                
            }
        }
    });
});
/**********************************************************************************/

/********************
MENSAJE DE CONFIRMACIÓN DE COMPRA CON SWEETALERT
*********************/
function mostrar(){
    Swal.fire({
        icon: 'success',
        title: '¡Compra realizada exitosamente!',
        text: 'Enviaremos la información a tu correo',        
        showConfirmButton: true,        
    })
}
/**********************************************************************************/

