//GuadarProv 
function ModalGuardarCliente() {
    $('#modal-guardaprov').modal('show');
}

//GuadarProveedor
function GuadarCliente() {

    $('#modal-guardaprov').modal('hide');

    let nit = $('#nit').val();
    let cliente = $('#cliente').val();
    let direccion = $('#direccion').val();
    let id_vendedor = $('#prospecto_id_vendedor').val();
    let tipo = $('#prospecto_tipo').val();
    let contacto = $('#contacto').val();
    let telefono = $('#telefono').val();
    let dias = $('#dias').val();
    let limite = $('#limite').val();
    let comision = $('#comision').val();
    let coor = $('#coor').val();
    let email = $('#email').val();
    let observaciones = $('#observaciones').val();

    if (nit == '' || nit == null) {
        $("#mensaje").html("Debe ingresar un NIT");
        $('#modal-generico').modal('show');
        return;
    }

    if (cliente == '' || cliente == null) {
        $("#mensaje").html("Debe ingresar un nombre de Cliente");
        $('#modal-generico').modal('show');
        return;
    }

    direccion = (direccion == '' || direccion == null) ? '' : direccion;
    id_vendedor = (id_vendedor == '' || id_vendedor == null) ? '' : id_vendedor;
    tipo = (tipo == '' || tipo == null) ? '' : tipo;
    contacto = (contacto == '' || contacto == null) ? '' : contacto;
    telefono = (telefono == '' || telefono == null) ? '' : telefono;
    dias = (dias == '' || dias == null) ? '0' : dias;
    limite = (limite == '' || limite == null) ? '0' : limite;
    comision = (comision == '' || comision == null) ? '0' : comision;
    coor = (coor == '' || coor == null) ? '' : coor;
    email = (email == '' || email == null) ? '' : email;
    observaciones = (observaciones == '' || observaciones == null) ? '' : observaciones;



    $.ajax({
        async: true,
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded",
        url: "/IngresoClientes/IngCliente",
        data: { nit, cliente, direccion, id_vendedor, tipo, contacto, telefono, dias, limite, comision, coor, email, observaciones },
        success: function (response) {
            var arreglo = response;

            if (response.CODIGO == "ERROR") {

                if (response.PRODUCTO == "") {
                    $('#Error').html("EL CODIGO DE PRODUCTO NO SE ENCUENTRA EN LA BASE DE DATOS");
                    $('#ModalError').modal('show');
                    return;
                }
                else {
                    $('#Error').html(response.PRODUCTO);
                    $('#ModalError').modal('show');
                    return;
                }
            }

            //document.getElementById("nit").value = "";
            //document.getElementById("cliente").value = "";
            //document.getElementById("direccion").value = "";
            //document.getElementById("nombre_contacto").value = "";
            //document.getElementById("telefono").value = "";
            //document.getElementById("dias").value = "";
            //document.getElementById("limite").value = "";
            //document.getElementById("email").value = "";
            //document.getElementById("telefono").value = "";
            window.location.href = "/IngresoClientes/IngresoClientes";

        },
        error: function () {
            alert("Ocurrio un Error");
        }
    });


}

