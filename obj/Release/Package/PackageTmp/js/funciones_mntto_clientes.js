$(document).ready(InicioEventos);

// Panel
const panel_crud = document.querySelector("#panel_crud");
const panel_datos = document.querySelector("#panel_datos");

// Buttons
const btnAgregar = document.querySelector('#btnAgregar');
const btnCreate = document.querySelector('#btnCreate');
const btnUpdate = document.querySelector('#btnUpdate');
const btn_newSearch = document.querySelector('#btn_newSearch');

// Inputs
const inp_codclie = document.querySelector("#inp_codclie");
const inp_nit = document.querySelector("#inp_nit");
const inp_nombre = document.querySelector("#inp_nombre");
const inp_direccion = document.querySelector("#inp_direccion");
const inp_telefono = document.querySelector("#inp_telefono");
const inp_email = document.querySelector("#inp_email");
//const inp_atencion = document.querySelector("#inp_atencion");
const inp_clasificacion = document.querySelector("#inp_clasificacion");
const inp_ruta = document.querySelector("#inp_ruta");
const inp_diascre = document.querySelector("#inp_diascre");
const inp_limcre = document.querySelector("#inp_limcre");

// Label
const modal_mensaje = document.querySelector("#modal_mensaje");

var inp_status = $("#inp_status").data("kendoDropDownList");

function InicioEventos() {
    GetList();
    GetListDropStatus();
    GetListDropClasificacion();
    GetListDropRuta();
}

// FUNCION OBTIENE LISTADO TELERIK
const GetList = () => {

    $.ajax({
        async: false,
        type: "POST",
        dataType: "HTML",
        contentType: "application/x-www-form-urlencoded",
        url: "/ModClientes/GetList",
        data: {},
        beforeSend: InicioConsulta,
        success: ResultadoConsulta
    });

    function InicioConsulta() {
        //$('#mostrar_consulta').html('Cargando por favor espere...');
    }

    function ResultadoConsulta(data) {

        //Para vaciar lo que tiene la tabla
        document.querySelector("#gridContainer").innerHTML = "";

        const json = eval(data);
        cjsonData = json;

        var gridDataSource = new kendo.data.DataSource({
            data: cjsonData,
            schema: {
                model: {
                    fields: {
                        id_codigo: { type: "number" },
                        cliente: { type: "string" },
                        nit: { type: "string" },
                        status: { type: "string" },
                        facturar: { type: "string" },
                        direccion: { type: "string" },
                        telefono: { type: "string" },
                        email: { type: "string" },
                    }
                }
            },
            height: 550,
            pageSize: 12,
        });

        $("#gridContainer").kendoGrid({
            toolbar: ["excel", "pdf", "search"],
            excel: {
                fileName: "Clientes.xlsx",
                filterable: true
            },
            pdf: {
                allPages: true,
                avoidLinks: true,
                paperSize: "letter",
                margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                landscape: true,
                repeatHeaders: true,
                template: $("#page-template").html(),
                scale: 0.8
            },
            search: {
                fields: [
                    { name: "id_codigo", operator: "eq" },
                    { name: "cliente", operator: "contains" },
                    { name: "nit", operator: "contains" },
                    { name: "email", operator: "contains" },
                ]
            },

            dataSource: gridDataSource,
            height: 1000,
            resizable: true,
            groupable: true,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            filterable: true,
            columns: [
                {
                    field: "OTROS",
                    title: "Opciones",
                    width: 150,
                    template: "<table border='0'> <tr> " +
                        "<td style=\"border:none;\"><a data-toggle='modal' style='cursor:pointer;' onclick='GetData(#=(id_codigo)#)'; ><img src='/images/edit.png' width='35' height='35'></a></td>" +
                        "<td style=\"border:none;\"><a data-toggle='modal' style='cursor:pointer;' value=''  ><img src='/images/delete.png' width='30' height='30'></a></td>" +
                        "</tr></table>",
                    stickable: true,
                    locked: true,
                    lockable: false,
                    headerAttributes: { style: "text-align: center; justify-content: center" },
                },
                {
                    field: "id_codigo",
                    title: "Código",
                    width: 130,
                    stickable: true,
                    headerAttributes: { style: "text-align: center; justify-content: center" },
                    attributes: { style: "text-align: center" }
                },
                {
                    field: "cliente",
                    title: "Cliente",
                    width: 400,
                    stickable: true,
                    headerAttributes: { style: "text-align: center; justify-content: center" },
                },
                {
                    field: "nit",
                    title: "Nit",
                    width: 150,
                    stickable: true,
                    headerAttributes: { style: "text-align: center; justify-content: center" },
                    attributes: { style: "text-align: center" },
                },
                {
                    field: "status",
                    title: "Status",
                    width: 100,
                    stickable: true,
                    headerAttributes: { style: "text-align: center; justify-content: center" },
                    attributes: { style: "text-align: center" },

                },
                {
                    field: "direccion",
                    title: "Direccion",
                    width: 400,
                    stickable: true,
                    headerAttributes: { style: "text-align: center; justify-content: center" },
                },
                {
                    field: "email",
                    title: "Email",
                    width: 300,
                    stickable: true,
                    headerAttributes: { style: "text-align: center; justify-content: center" },
                }
            ]
        });
    }
}

// FUNCION OBTIENE DROPDOWNLIST TELERIK
const GetListDropStatus = () => {
    //Ejemplo Json
    const orderData = [
        { id_status: "A", descripcion: "Alta" },
        { id_status: "B", descripcion: "Baja" },
    ];

    $("#inp_status").kendoDropDownList({
        dataTextField: "descripcion",
        dataValueField: "id_status",
        filter: "contains",
        height: 520,
        dataSource: orderData
    });

    $("#inp_status").data("kendoDropDownList").enable(false);
}

// FUNCION OBTIENE DROPDOWNLIST TELERIK
const GetListDropClasificacion = () => {
    //Ejemplo Json
    const orderData = [
        { id_status: "A", descripcion: "Alta" },
        { id_status: "B", descripcion: "Baja" },
    ];

    $("#inp_clasificacion").kendoDropDownList({
        dataTextField: "descripcion",
        dataValueField: "id_status",
        filter: "contains",
        height: 520,
        dataSource: orderData
    });

    $("#inp_status").data("kendoDropDownList").enable(false);
}

// FUNCION OBTIENE DROPDOWNLIST TELERIK
const GetListDropRuta = () => {
    //Ejemplo Json
    const orderData = [
        { id_status: "A", descripcion: "Alta" },
        { id_status: "B", descripcion: "Baja" },
    ];

    $("#inp_ruta").kendoDropDownList({
        dataTextField: "descripcion",
        dataValueField: "id_status",
        filter: "contains",
        height: 520,
        dataSource: orderData
    });

    $("#inp_status").data("kendoDropDownList").enable(false);
}




// FUNCION: BUSCAR Y LLENA LOS CAMPOS (MODIFICAR)
const GetData = ( id_codigo ) => {

    OpenDatos(true, false);
    $("#inp_status").data("kendoDropDownList").enable(true);

    $.ajax({
        async: true,
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded",
        url: "/ModClientes/GetData",
        data: { id_codigo },
        success: function (response) {

            inp_codclie.value = response[0].id_codigo;
            inp_nit.value = response[0].nit;
            inp_nombre.value = response[0].cliente;
            inp_direccion.value = response[0].direccion;
            inp_telefono.value = response[0].telefono;
            inp_email.value = response[0].email;
            inp_atencion.value = response[0].atencion;

            if (response.NIT == "ERROR") {
                $('#Error').html("NO SE ENCUENTRA EN LA BASE DE DATOS");
                $('#ModalError').modal('show');
                return;
            }
        },

        error: function () {
            alert("Ocurrio un Error");
        }
    });
}


// OBTIENE CORRELATIVO
const GetCorrelativo = () => {

    $.ajax({
        async: true,
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded",
        url: "/MnttoClientes/GetCorrelativo",
        data: { },
        success: function (response) {
            inp_codclie.value = response.correlativo;
        },

        error: function () {
            alert("Ocurrio un Error");
        }
    });
}

// LIMPIA CAMPOS
const Limpiar = () => {
    inp_codclie.value = '';
    inp_nit.value = '';
    inp_nombre.value = '';
    inp_direccion.value = '';
    inp_telefono.value = '';
    inp_email.value = '';
    //inp_atencion.value = '';
}


/*
    ABRE Y CIERRA MODAL
    parameter modal bool
    parameter button add, update bool
*/ 
const OpenDatos = (modal, button) => {

    if (modal === true) {
        panel_crud.setAttribute("data-action", "panel-collapse");
        panel_crud.setAttribute("data-toggle", "tooltip");
        panel_crud.setAttribute("data-offset", "0,10");

        panel_datos.setAttribute("class", "panel-container");
        panel_datos.setAttribute("data-toggle", "tooltip");
        panel_datos.setAttribute("data-offset", "0,10");

    } else {
        panel_crud.setAttribute("data-action", "panel-collapse");
        panel_crud.setAttribute("class", "panel-container show");
        panel_crud.setAttribute("data-toggle", "tooltip");
        panel_crud.setAttribute("data-offset", "0,10");

        panel_datos.setAttribute("class", "panel-container collapse");
        panel_datos.setAttribute("data-toggle", "tooltip");
        panel_datos.setAttribute("data-offset", "0,10");
    } 
    
    if (button === true) {
        btnCreate.style.display = "block";
        btnUpdate.style.display = "none";
    } else {
        btnCreate.style.display = "none";
        btnUpdate.style.display = "block";
    }
}


const BuscarNit = () => {

    nit = inp_nit.value;

    $.ajax({
        async: false,
        type: "POST",
        dataType: "JSON",
        contentType: "application/x-www-form-urlencoded",
        url: "/GetDataFel/GetDataNit",
        data: { nit },
        success: function (response) {
            var arreglo = response;
            if (arreglo.DIRECCION == "ERROR ESTE CLIENTE YA APARECE REGISTRADO") {
                $('#Error').html("EL CLIENTE " + arreglo.NOMBRE + " YA SE ENCUENTRA REGISTRADO POR FAVOR NO SEGUIR LLENANDO LA FICHA");
                $('#ModalError').modal('show');
                return;
            }
            else {
                inp_nombre.value = arreglo.NOMBRE;
                inp_direccion.value = arreglo.DIRECCION;
            }
        },
        error: function () {
            $('#Error').html("OCURRIÓ UN ERROR");
            $('#ModalError').modal('show');
        }
    });
}












// PETICIONES

const Create = () => {
    // Objeto JSON que deseas enviar
    var dataToSend = {
        id_codigo: inp_codclie.value,
        status: $("#inp_status").data("kendoDropDownList").value(),
        nit: inp_nit.value,
        cliente: inp_nombre.value,
        direccion: inp_direccion.value,
        telefono: inp_telefono.value,
        email: inp_email.value,
        diascredito: inp_diascre.value,
        limcredito: inp_limcre.value,
        atencion: '',
        clasificacion: '',
        ruta: ''
    };

    console.log(JSON.stringify(dataToSend));

    // Configurar las opciones de la solicitud
    var requestOptions = {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Tipo de contenido del cuerpo de la solicitud
        },
        body: JSON.stringify(dataToSend) // Convertir el objeto JSON a una cadena JSON
    };

    // Realizar la solicitud utilizando fetch
    fetch('/MnttoClientes/CreateCliente', requestOptions)

        .then(response => {
            if (response.ok) {
                // La solicitud fue exitosa, puedes realizar acciones adicionales aquí si es necesario
                Limpiar();  
                modal_mensaje.textContent = "Cliente creado exitosamente";
                $('#modal-center').modal('show');

            } else if (response.status === 400) {
                // La respuesta es BadRequest (código de estado 400), manejar el error
                modal_mensaje.textContent = response.statusText;
                $('#modal-center').modal('show');

            } else {
                // La solicitud falló
                //console.error('Error al crear cliente:', response.status, response.statusText);
                modal_mensaje.textContent = 'Error al crear cliente:', response.status, response.statusText;
                $('#modal-center').modal('show');
            }
        })
        .catch(error => {
            // Error de red o al procesar la solicitud
            //console.error('Error de red:', error);
            modal_mensaje.textContent = 'Error de red:', error;
            $('#modal-center').modal('show');
        });

    //.then(response => {
    //    if (!response.ok) {
    //        throw new Error('Network response was not ok');
    //    }
    //    console.log(response.json());
    //    return response.json(); // Parsear la respuesta JSON
    //})
    //.then(data => {
    //    // Manejar la respuesta recibida
    //    console.log(data);
    //})
    //.catch(error => {
    //    console.error('There was a problem with the fetch operation:', error);
    //});
}

const Update= () => {
    // Objeto JSON que deseas enviar
    var dataToSend = {
        id_codigo: inp_codclie.value,
        status: $("#inp_status").data("kendoDropDownList").value(),
        nit: inp_nit.value,
        cliente: inp_nombre.value,
        direccion: inp_direccion.value,
        telefono: inp_telefono.value,
        email: inp_email.value,
        diascredito: inp_diascre.value,
        limcredito: inp_limcre.value,
        atencion: '',
        clasificacion: '',
        ruta: ''
    };

    var requestOptions = {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Tipo de contenido del cuerpo de la solicitud
        },
        body: JSON.stringify(dataToSend) // Convertir el objeto JSON a una cadena JSON
    };

    // Realizar la solicitud utilizando fetch
    fetch('/MnttoClientes/UpdateCliente', requestOptions)

        .then(response => {
            if (response.ok) {
                // La solicitud fue exitosa, puedes realizar acciones adicionales aquí si es necesario
                Limpiar();
                modal_mensaje.textContent = "Cliente modificado exitosamente";
                $('#modal-center').modal('show');

            } else if (response.status === 400) {
                // La respuesta es BadRequest (código de estado 400), manejar el error
                modal_mensaje.textContent = response.statusText;
                $('#modal-center').modal('show');

            } else {
                // La solicitud falló
                console.error('Error al crear cliente:', response.status, response.statusText);
                modal_mensaje.textContent = 'Error al crear cliente:', response.status, response.statusText;
                $('#modal-center').modal('show');
            }
        })
        .catch(error => {
            // Error de red o al procesar la solicitud
            console.error('Error de red:', error);
            modal_mensaje.textContent = 'Error de red:', error;
            $('#modal-center').modal('show');
        });
}

const Delete = () => {
    // Objeto JSON que deseas enviar
    var dataToSend = {
        id_codigo: inp_codclie.value,
    };

    var requestOptions = {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Tipo de contenido del cuerpo de la solicitud
        },
        body: JSON.stringify(dataToSend) // Convertir el objeto JSON a una cadena JSON
    };

    // Realizar la solicitud utilizando fetch
    fetch('/MnttoClientes/DeleteCliente', requestOptions)

        .then(response => {
            if (response.ok) {
                // La solicitud fue exitosa, puedes realizar acciones adicionales aquí si es necesario
                Limpiar();
                modal_mensaje.textContent = "Cliente dado de baja exitosamente";
                $('#modal-center').modal('show');

            } else if (response.status === 400) {
                // La respuesta es BadRequest (código de estado 400), manejar el error
                modal_mensaje.textContent = response.statusText;
                $('#modal-center').modal('show');

            } else {
                // La solicitud falló
                console.error('Error al crear cliente:', response.status, response.statusText);
                modal_mensaje.textContent = 'Error al dar de baja al cliente:', response.status, response.statusText;
                $('#modal-center').modal('show');
            }
        })
        .catch(error => {
            // Error de red o al procesar la solicitud
            console.error('Error de red:', error);
            modal_mensaje.textContent = 'Error de red:', error;
            $('#modal-center').modal('show');
        });
}







// EVENTOS
btnAgregar.addEventListener("click", (event) => {
    //console.log(event);
    OpenDatos(true, true);
    GetCorrelativo();

    // DISABLE DROPDOWNLIST
    $("#inp_status").data("kendoDropDownList").enable(false);
    inp_nit.focus();


});

btn_newSearch.addEventListener("click", (event) => {
    OpenDatos(false, false);
    Limpiar();
});

btnCreate.addEventListener("click", (event) => Create());








