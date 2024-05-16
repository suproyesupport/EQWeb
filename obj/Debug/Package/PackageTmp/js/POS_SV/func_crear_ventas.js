
$(document).ready(InicioEventos);

// inputs
const nit = document.querySelector("#inp_nit");
const nrc = document.querySelector("#inp_nrc");
const nombre = document.querySelector("#inp_nombre");
const complemento = document.querySelector("#inp_complemento");
const inp_fecha = document.querySelector('#inp_fecha');
const telefono = document.querySelector("#inp_telefono");
const correo = document.querySelector("#inp_correo");

// buttons
const btn_terminar = document.querySelector('#btn_terminar');




function InicioEventos() {
    //FechaActual();
    GetListDropDeptoMuni();
    GetListDropTipoActividad();
    GetListDropTipoDocumento();
    /*GetDataEmisor();*/
}





const CrearDetalle = () => {

    //table_detalle
    


}













const CrearJSON_FELSV = async () => {

    const fel = {
        "identificacion": {
            "version": 0,
            "ambiente": "",
            "tipoDte": "",
            "numeroControl": "",
            "codigoGeneracion": "",
            "tipoModelo": 0,
            "tipoOperacion": 0,
            "tipoContingencia": null,
            "motivoContin": null,
            "fecEmi": "",
            "horEmi": "",
            "tipoMoneda": ""
        },
        "documentoRelacionado": null,
        "emisor": {
            "nit": "",
            "nrc": "",
            "nombre": "",
            "codActividad": "",
            "descActividad": "",
            "nombreComercial": "",
            "tipoEstablecimiento": "",
            "direccion": {
                "departamento": "",
                "municipio": "",
                "complemento": ""
            },
            "telefono": "",
            "correo": "",
            "codEstableMH": null,
            "codEstable": null,
            "codPuntoVentaMH": null,
            "codPuntoVenta": null
        },
        "receptor": {
            "nit": "",
            "nrc": "",
            "nombre": "",
            "codActividad": "",
            "descActividad": "",
            "nombreComercial": "",
            "direccion": {
                "departamento": "",
                "municipio": "",
                "complemento": ""
            },
            "telefono": "",
            "correo": ""
        },
        "otrosDocumentos": null,
        "ventaTercero": null,
        "cuerpoDocumento": [],
        "resumen": {
            "totalNoSuj": 0.0,
            "totalExenta": 0.0,
            "totalGravada": 3846.9,
            "subTotalVentas": 3846.9,
            "descuNoSuj": 0.0,
            "descuExenta": 0.0,
            "descuGravada": 0.0,
            "porcentajeDescuento": 0.0,
            "totalDescu": 1852.21,
            "tributos": [
                {
                    "codigo": "20",
                    "descripcion": "Impuesto al Valor Agregado 13%",
                    "valor": 500.1
                }
            ],
            "subTotal": 3846.9,
            "ivaRete1": 0.0,
            "reteRenta": 0.0,
            "totalPagar": 4347.0,
            "montoTotalOperacion": 4347.0,
            "totalNoGravado": 0.0,
            "totalLetras": "CUATRO MIL TRESCIENTOS CUARENTA Y SIETE USD",
            "ivaPerci1": 0.0,
            "saldoFavor": 0.0,
            "condicionOperacion": 2,
            "pagos": [
                {
                    "codigo": "99",
                    "montoPago": 4347.0,
                    "referencia": null,
                    "plazo": "02",
                    "periodo": 1
                }
            ],
            "numPagoElectronico": null
        },
        "extension": null,
        "apendice": null
    };


    
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: ""
    };

    await fetch('/Operaciones_SV/GetDataEmisor', requestOptions)
        .then(response => {
            if (response.ok) {
                // La solicitud fue exitosa, puedes realizar acciones adicionales aquí si es necesario
                return response.json();
            } else if (response.status === 400) {
                // La respuesta es BadRequest (código de estado 400), manejar el error
            } else {
                // La solicitud falló
            }
        })
        .then(data => {

            // Identificación
            fel.identificacion.version = "pendiente";
            fel.identificacion.ambiente = "pendiente";
            fel.identificacion.tipoDte = $("#inp_tipodocumento").data("kendoDropDownList").value();
            fel.identificacion.numeroControl = "pendiente";
            fel.identificacion.codigoGeneracion = data.codigoGeneracion;
            fel.identificacion.tipoModelo = "pendiente";
            fel.identificacion.tipoOperacion = "pendiente";
            fel.identificacion.tipoContingencia = "pendiente";
            fel.identificacion.motivoContin = "pendiente";
            fel.identificacion.fecEmi = "pendiente";
            fel.identificacion.horEmi = "pendiente";
            fel.identificacion.tipoMoneda = "pendiente";

            // Documento relacionado
            fel.documentoRelacionado = "";

            // Emisor
            fel.emisor.nit = data.eNit;
            fel.emisor.nrc = data.eNrc;
            fel.emisor.nombre = data.eEmisor;
            fel.emisor.codActividad = data.eCodActividad;
            fel.emisor.descActividad = data.eDescActividad;
            fel.emisor.nombreComercial = data.eComercial;
            fel.emisor.tipoEstablecimiento = data.eTipoEstablecimiento;
            fel.emisor.direccion.departamento = data.eDepartamento;
            fel.emisor.direccion.municipio = data.eMunicipio;
            fel.emisor.direccion.complemento = data.eComplemento;
            fel.emisor.telefono = data.eTelefono;
            fel.emisor.correo = data.eEmail;
            fel.emisor.codEstableMH = data.eCodEstableMH;
            fel.emisor.codEstable = data.eCodEstable;
            fel.emisor.codPuntoVentaMH = data.eCodPuntoVentaMH;
            fel.emisor.codPuntoVenta = data.eCodPuntoVenta;

            // Receptor
            fel.receptor.nit = nit.value;
            fel.receptor.nrc = nrc.value;
            fel.receptor.nombre = nombre.value;
            fel.receptor.codActividad = $("#inp_tipoactividad").data("kendoDropDownList").value();
            fel.receptor.descActividad = $("#inp_tipoactividad").data("kendoDropDownList").text();
            fel.receptor.nombreComercial = "";
            fel.receptor.direccion.departamento = $("#inp_departamento").data("kendoDropDownList").value();
            fel.receptor.direccion.municipio = $("#inp_municipio").data("kendoDropDownList").value();
            fel.receptor.direccion.complemento = complemento.value;

            // Otros Documentos
            fel.otrosDocumentos = null;

            // Venta Tercera
            fel.ventaTercero = null;

            // Cuerpo Documento 
            fel.cuerpoDocumento = "pendiente";
                        



            //console.log(JSON.stringify(fel));
        })
        .catch(error => {
            //modal_mensaje.textContent = 'Error de red:', error;
            //$('#modal-center').modal('show');
        });

    console.log(JSON.stringify(fel));

}



btn_terminar.addEventListener("click", (event) => {

    CrearJSON_FELSV();




});





//funciones iniciales

//function FechaActual() {
//    var fecha = new date(); //fecha actual
//    var mes = fecha.getmonth() + 1; //obteniendo mes
//    var dia = fecha.getdate(); //obteniendo dia
//    var anio = fecha.getfullyear(); //obteniendo año
//    if (dia < 10)
//        dia = '0' + dia; //agrega cero si el menor de 10
//    if (mes < 10)
//        mes = '0' + mes //agrega cero si el menor de 10
//    inp_fecha.value = anio + "-" + mes + "-" + dia;
//}

function GetListDropDeptoMuni() {

    $.ajax({
        async: false,
        type: "POST",
        dataType: "HTML",
        contentType: "application/x-www-form-urlencoded",
        url: "/Operaciones_SV/GetListDropDepartamento",
        data: {},
        beforeSend: InicioConsulta,
        success: ResultadoConsulta
    });

    function InicioConsulta() {
        //$('#mostrar_consulta').html('Cargando por favor espere...');
    }

    function ResultadoConsulta(data) {

        const json = eval(data);
        cjsonData = json;

        var departamento = $("#inp_departamento").kendoDropDownList({
            optionLabel: "Seleccionar departamento...",
            dataTextField: "descripcion",
            dataValueField: "id_depto",
            filter: "contains",
            dataSource: cjsonData
        }).data("kendoDropDownList");

        //Llenar dataSource con JSON API
        var dataSource = new kendo.data.DataSource({
            transport: {
                read: {
                    url: "/Operaciones_SV/GetListDropMunicipio",
                    dataType: "json"
                }
            }
        });

        const jsonMuni = eval(dataSource);
        cJsonMunicipio = jsonMuni;

        var municipio = $("#inp_municipio").kendoDropDownList({
            autoBind: false,
            cascadeFrom: "inp_departamento",
            optionLabel: "Seleccionar municipio...",
            dataTextField: "descripcion",
            dataValueField: "id_municipio",
            dataSource: cJsonMunicipio
        }).data("kendoDropDownList");

    }
}

function GetListDropTipoActividad() {

    $.ajax({
        async: false,
        type: "POST",
        dataType: "HTML",
        contentType: "application/x-www-form-urlencoded",
        url: "/Operaciones_SV/GetListDropTipoActividad",
        data: {},
        beforeSend: InicioConsulta,
        success: ResultadoConsulta
    });

    function InicioConsulta() {
        //$('#mostrar_consulta').html('Cargando por favor espere...');
    }

    function ResultadoConsulta(data) {

        const json = eval(data);
        cjsonData = json;

        $("#inp_tipoactividad").kendoDropDownList({
            optionLabel: "Seleccionar tipo de actividad...",
            //template: '<span class="order-id">#= OrderID #</span> #= OrderID #, #= ShipCountry #',
            dataTextField: "descripcion",
            dataValueField: "id_codigo",
            filter: "contains",
            height: 520,
            dataSource: cjsonData
        });

    }
}

function GetListDropTipoDocumento() {

    $.ajax({
        async: false,
        type: "POST",
        dataType: "HTML",
        contentType: "application/x-www-form-urlencoded",
        url: "/Operaciones_SV/GetListDropTipoDocumento",
        data: {},
        beforeSend: InicioConsulta,
        success: ResultadoConsulta
    });

    function InicioConsulta() {
        //$('#mostrar_consulta').html('Cargando por favor espere...');
    }

    function ResultadoConsulta(data) {

        const json = eval(data);
        cjsonData = json;

        $("#inp_tipodocumento").kendoDropDownList({
            optionLabel: "Seleccionar tipo de documento...",
            //template: '<span class="order-id">#= OrderID #</span> #= OrderID #, #= ShipCountry #',
            dataTextField: "descripcion",
            dataValueField: "id_tipo",
            filter: "contains",
            height: 520,
            dataSource: cjsonData
        });

    }
}




const GetDataEmisor = () => {

    let emisor = '';

    // Configurar las opciones de la solicitud
    var requestOptions = {
        method: 'POST', // Método de la solicitud
        headers: {
            'Content-Type': 'application/json' // Tipo de contenido del cuerpo de la solicitud
        },
        body: ""//JSON.stringify(dataToSend) // Convertir el objeto JSON a una cadena JSON
    };

    // Devolver una nueva promesa
    return new Promise((resolve, reject) => {
        // Realizar la solicitud utilizando fetch
        fetch('/Operaciones_SV/GetDataEmisor', requestOptions)
            .then(response => {
                if (response.ok) {
                    // La solicitud fue exitosa
                    return response.json();
                } else {
                    // La solicitud falló
                    throw new Error('Error en la solicitud: ' + response.status + ' ' + response.statusText);
                }
            })
            .then(data => {
                // Manejar la respuesta recibida
                //console.log(data);
                resolve(data); // Resolver la promesa con los datos
            })
            .catch(error => {
                // Error de red o al procesar la solicitud
                reject(error); // Rechazar la promesa con el error
            });
    });



}













// Función: obtiene los valores del emisor
//function GetDataEmisor() {

//    $.ajax({
//        async: false,
//        type: "POST",
//        dataType: "HTML",
//        contentType: "application/x-www-form-urlencoded",
//        url: "/Operaciones_SV/GetDataEmisor",
//        data: {},
//        beforeSend: InicioConsulta,
//        success: ResultadoConsulta
//    });

//    function InicioConsulta() {
//        //$('#mostrar_consulta').html('Cargando por favor espere...');
//    }

//    function ResultadoConsulta(data) {

//        const objeto = JSON.parse(data);

//        cNit = objeto.cNit;
//        cNrc = objeto.cNrc;
//        cEmisor = objeto.cEmisor;
//        cCodActividad = objeto.CodActividad;
//        descActividad = objeto.descActividad;
//        cComercial = objeto.cComercial;
//        cTipoEstablecimiento = objeto.cTipoEstablecimiento;
//        cDireccion = objeto.cDireccion;
//        cDepartamento = objeto.cDepartamento;
//        cMunicipio = objeto.cMunicipio;
//        cComplemento = objeto.cComplemento;
//        cTelefono = objeto.cTelefono;
//        cEmail = objeto.cEmail;
//        codEstableMH = objeto.codEstableMH;
//        codEstable = objeto.codEstable;
//        codPuntoVentaMH = objeto.codPuntoVentaMH;
//        codPuntoVenta = objeto.codPuntoVenta;




//        //alert(objeto.cEmisor);
//        //console.warn(objeto.cEmisor);

//        //$("#inp_tipodocumento").kendoDropDownList({
//        //    optionLabel: "Seleccionar tipo de documento...",
//        //    //template: '<span class="order-id">#= OrderID #</span> #= OrderID #, #= ShipCountry #',
//        //    dataTextField: "descripcion",
//        //    dataValueField: "id_tipo",
//        //    filter: "contains",
//        //    height: 520,
//        //    dataSource: cjsonData
//        //});
//        0
//    }

//}

//function ValidarCampos() {

//    let validacion = false;

//    const inp_nit = document.querySelector("#inp_nit");
//    const inp_cliente = document.querySelector("#inp_cliente");
//    const inp_fecha = document.querySelector("#inp_fecha");
//    const inp_departamentos = document.querySelector("#inp_departamento");
//    const inp_municipios = document.querySelector("#inp_municipio");
//    const inp_tipoactividad = document.querySelector("#inp_tipoactividad");
//    const inp_tipodocumento = document.querySelector("#inp_tipodocumento");

//    if (inp_nit.value == "") {
//        inp_nit.setAttribute("class", "form-control is-invalid");
//        validacion = false;
//    } else {
//        inp_nit.setAttribute("class", "form-control");
//        validacion = true;
//    }

//    if (inp_cliente.value == "") {
//        inp_cliente.setAttribute("class", "form-control is-invalid");
//        validacion = false;
//    } else {
//        inp_cliente.setAttribute("class", "form-control");
//        validacion = true;
//    }

//    if (inp_departamentos.value === "" || inp_departamentos.value === null) {
//        $("#inp_departamentos").closest('.k-dropdownlist').addClass('form-control is-invalid');
//        validacion = false;
//    } else {
//        $("#inp_departamentos").closest('.k-dropdownlist').addClass('form-control');
//        $("#inp_departamentos").closest('.k-dropdownlist').removeClass('form-control is-invalid').addClass('form-control');
//        validacion = true;
//    }

//    if (inp_municipios.value === "" || inp_departamentos.value === null) {
//        $("#inp_municipios").closest('.k-dropdownlist').addClass('form-control is-invalid');
//        validacion = false;
//    } else {
//        $("#inp_municipios").closest('.k-dropdownlist').addClass('form-control');
//        $("#inp_municipios").closest('.k-dropdownlist').removeClass('form-control is-invalid').addClass('form-control');
//        validacion = true;
//    }

//    if (inp_tipoactividad.value === "" || inp_departamentos.value === null) {
//        $("#tipoactividad").closest('.k-dropdownlist').addClass('form-control is-invalid');
//        validacion = false;
//    } else {
//        $("#inp_tipoactividad").closest('.k-dropdownlist').addClass('form-control');
//        $("#inp_tipoactividad").closest('.k-dropdownlist').removeClass('form-control is-invalid').addClass('form-control');
//        validacion = true;
//    }

//    if (inp_tipodocumento.value === "" || inp_departamentos.value === null) {
//        $("#tipodocumento").closest('.k-dropdownlist').addClass('form-control is-invalid');
//        validacion = false;
//    } else {
//        $("#inp_tipodocumento").closest('.k-dropdownlist').addClass('form-control');
//        $("#inp_tipodocumento").closest('.k-dropdownlist').removeClass('form-control is-invalid').addClass('form-control');
//        validacion = true;
//    }

//    return validacion;
//}

//function CrearJSON(p) {

//    const miJSON = {
//        "identificacion": {
//            "version": 3,
//            "ambiente": "01",
//            "tipoDte": "03",
//            "numeroControl": "DTE-03-00000000-000000000001769",
//            "codigoGeneracion": "441BBA84-9B41-4557-A7E5-24290AB6EFA8",
//            "tipoModelo": 1,
//            "tipoOperacion": 1,
//            "tipoContingencia": null,
//            "motivoContin": null,
//            "fecEmi": "2023-10-17",
//            "horEmi": "17:27:59",
//            "tipoMoneda": "USD"
//        },
//        "documentoRelacionado": null,
//        "emisor": {
//            "nit": cNit,
//            "nrc": cNrc,
//            "nombre": cEmisor,
//            "codActividad": "46493",
//            "descActividad": "Venta al por mayor de electrodomésticos y artículos del hogar excepto bazar; artículos de iluminacion",
//            "nombreComercial": cComercial,
//            "tipoEstablecimiento": "01",
//            "direccion": {
//                "departamento": cDepartamento,
//                "municipio": cMunicipio,
//                "complemento": cDireccion
//            },
//            "telefono": cTelefono,
//            "correo": cEmail,
//            "codEstableMH": null,
//            "codEstable": null,
//            "codPuntoVentaMH": null,
//            "codPuntoVenta": null
//        },
//        "receptor": {
//            "nit": p.nitRec,
//            "nrc": p.nrcRec,
//            "nombre": p.nombreRec,
//            "codActividad": p.codActividadRec,
//            "descActividad": p.descActividadRec,
//            "nombreComercial": p.nombreComercialRec,
//            "direccion": {
//                "departamento": p.deptoRec,
//                "municipio": p.muniRec,
//                "complemento": p.complementoRec
//            },
//            "telefono": p.telefonoRec,
//            "correo": p.correoRec
//        },
//        "otrosDocumentos": null,
//        "ventaTercero": null,
//        "cuerpoDocumento": [
//            {
//                "numItem": 1,
//                "tipoItem": 1,
//                "numeroDocumento": null,
//                "cantidad": 5.0,
//                "codigo": "00000009981",
//                "codTributo": null,
//                "uniMedida": 59,
//                "descripcion": "REFRIGERADORA HISENSE 1P/FH/04 RR43D6ACX1",
//                "precioUni": 247.78761062,
//                "montoDescu": 402.65486726,
//                "ventaNoSuj": 0.0,
//                "ventaExenta": 0.0,
//                "ventaGravada": 836.28318584,
//                "tributos": [
//                    "20"
//                ],
//                "psv": 0.0,
//                "noGravado": 0.0
//            },
//            // ... (otros items)
//        ],
//        "resumen": {
//            // ... (detalles del resumen)
//        },
//        "extension": null,
//        "apendice": null
//    };

//    alert(miJSON);
//    console.warn(miJSON);
//}

//// FUNCION PARA AGREGAR PRODUCTOS A LA TABLA DETALLE
//function AddDetalle() {

//    const table = document.getElementById("tabladetalle");

//    //validarDesctoVacio();

//    let row = table.insertRow();
//    let cell1 = row.insertCell(0);
//    let cell2 = row.insertCell(1);
//    let cell3 = row.insertCell(2);
//    //var cell3 = "<pre>" + row.insertCell(2) + "</pre>" ;
//    //cell3.className = 'expand footable-visible';
//    //cell3.setAttribute('contentEditable', 'true');
//    //cell3.innerHTML = "<div contenteditable></div>";
//    let cell4 = row.insertCell(3);
//    let cell5 = row.insertCell(4);
//    let cell6 = row.insertCell(5);
//    let cell7 = row.insertCell(6);
//    let cell8 = row.insertCell(7);

//    cell1.innerHTML = $("#id_codigo").val();
//    cell2.innerHTML = $("#cantidad").val();

//    //if (empresa != "kenichi") {
//    //    cell3.innerHTML = "<pre>" + $("#producto").val() + "</pre>";
//    //} else {
//    //    cell3.innerHTML = document.getElementById("codigoe").value + "|" + no_parte + "|" + document.getElementById("producto").value + "|" + marca;
//    //}

//    cell4.innerHTML = formatNumber.new(document.getElementById("precio").value);
//    cell5.innerHTML = formatNumber.new(descuento_);
//    cell6.innerHTML = formatNumber.new($("#tsubtotal").text());

//    let eliminarProducto = '<i class="fas fa-trash" style="color:red;" onclick="DeleteDetalle(this)"> </i>';
//    let impuestoProducto = '<select class="form-control" onchange="mostrarFrases(value);"> <option value="12">12</option><option value="0">0</option></select>';
//    cell7.innerHTML = impuestoProducto;
//    //var eliminarProducto = '<a href="javascript:void(0);" class="btn btn-danger btn-icon waves-effect waves-themed"><i class="fal fa-times" onclick="DeleteDetalle(this)></i>';
//    cell8.innerHTML = eliminarProducto;

//    document.getElementById("id_codigo").value = "";
//    document.getElementById("cantidad").value = "0";
//    document.getElementById("producto").value = "";
//    document.getElementById("precio").value = "";
//    document.getElementById("descto").value = "0";
//    document.getElementById("tsubtotal").value = "";
//    document.getElementById("existencia").value = "";
//    document.getElementById("codigoe").value = "";
//    document.getElementById("id_codigo").focus();

//    recorrerTabla();
//}


//function seleccionarinventario(id) {

//    document.querySelector("#id_codigo").value = document.querySelector("#tablainventario").rows[id.rowIndex].cells[0].innerHTML;
//    document.querySelector("#id_codigo").value = document.querySelector("#tablainventario").rows[id.rowIndex].cells[0].innerHTML;
//    document.querySelector("#id_codigo").value = document.querySelector("#tablainventario").rows[id.rowIndex].cells[0].innerHTML;
//    document.querySelector("#id_codigo").value = document.querySelector("#tablainventario").rows[id.rowIndex].cells[0].innerHTML;
//    document.querySelector("#id_codigo").value = document.querySelector("#tablainventario").rows[id.rowIndex].cells[0].innerHTML;



//    //let Row = document.getElementById("fila")
//    //let Cells = Row.getElementsByTagName("td");



//    //document.getElementById("id_codigo").value = document.getElementById("tablainventario").rows[id.rowIndex].cells[0].innerHTML;

//    //si
//    //document.getElementById("codigoe").value = document.getElementById("tablainventario").rows[id.rowIndex].cells[1].innerHTML;

//    //$("#producto").text(document.getElementById("tablainventario").rows[id.rowIndex].cells[1].innerHTML);
//    //$("#precio").text(parseFloat(document.getElementById("tablainventario").rows[id.rowIndex].cells[2].innerHTML).toFixed(2));
//    //document.getElementById("producto").value = document.getElementById("tablainventario").rows[id.rowIndex].cells[1].innerHTML;
//    //document.getElementById("precio").value = document.getElementById("tablainventario").rows[id.rowIndex].cells[2].innerHTML;

//    //si
//    //document.getElementById("producto").value = document.getElementById("tablainventario").rows[id.rowIndex].cells[4].innerHTML;
//    //document.getElementById("precio").value = document.getElementById("tablainventario").rows[id.rowIndex].cells[5].innerHTML;
//    //document.getElementById("existencia").value = document.getElementById("tablainventario").rows[id.rowIndex].cells[6].innerHTML;
//    //tipo = document.getElementById("tablainventario").rows[id.rowIndex].cells[7].innerHTML;
//    //no_parte = document.getElementById("tablainventario").rows[id.rowIndex].cells[2].innerHTML;
//    //marca = document.getElementById("tablainventario").rows[id.rowIndex].cells[3].innerHTML;
//    //document.getElementById("cantidad").focus();

//    //bss = validarBienServ(tipo);



//    //validarCantExist();

//    $("#ayudaproductos").modal('hide');


//    //document.getElementById("cantidad").focus();

//}




//// FUNCION PARA MOSTRAR MODAL DE INVENTARIO CON F2
//function onKeyDownHandler(event) {

//    let codigo = event.which || event.keyCode;

//    if (codigo == 113) {
//        $('#ayudaproductos').modal('show');

//    }
//}






//function GuardarFactura() {

//    if (ValidarCampos() === false) {
//        return
//    }

//    const inp_nit = document.querySelector("#inp_nit");
//    const inp_direccion = document.querySelector("#inp_direccion");
//    const inp_departamentos = $("#inp_departamentos").data("kendoDropDownList");
//    const inp_municipios = $("#inp_municipios").data("kendoDropDownList");
//    const inp_tipoactividad = $("#inp_tipoactividad").data("kendoDropDownList");
//    const inp_tipodocumento = $("#inp_tipodocumento").data("kendoDropDownList");
//    const inp_inp_email = document.querySelector("#inp_email");

//    let datosFactura = {

//        //Emisor

//        //Receptor
//        nitRec : inp_nit.value,
//        nrcRec : "pendiente",
//        nombreRec : inp_cliente.value,
//        codActividadRec : inp_tipoactividad.value(),
//        descActividadRec : inp_tipoactividad.text(),
//        nombreComercialRec: inp_cliente.value,
//        deptoRec: inp_departamentos.value(),
//        muniRec: inp_municipios.value(),
//        complementoRec : inp_direccion.value,
//        telefonoRec : "",
//        correoRec : inp_email.value,

//    }



//    CrearJSON(datosFactura);
//}









//function Previsualizar() {


//    //GetDataEmisor();

//    alert(cComercial);
//    alert(cNit);
//    alert(cEmisor);

//    //const tipoactividad = document.querySelector("#inp_tipoactividad");

//    //const ddl = $("#inp_tipoactividad").data("kendoDropDownList");
//    //alert(ddl.value());
//    //alert(ddl.text());

//}




















//function ActivaNit() {

//    const nit = document.getElementById("defaultUnchecked");
//    const cf = document.getElementById("defaultUnchecked2");
//    const inp_nit = document.querySelector("#inp_nit");
//    const inp_codclie = document.querySelector("#inp_codclie");
//    const inp_razon = document.querySelector("#inp_razon");

//    nit.checked = true;
//    cf.checked = false;
//    inp_nit.disabled = false;
//    inp_codclie.disabled = false;
//    inp_razon.disabled = false;

//    inp_nit.value = "";
//    inp_razon.value = "";

//}

//function ActivaCf() {

//    const nit = document.getElementById("defaultUnchecked");
//    const cf = document.getElementById("defaultUnchecked2");
//    const inp_nit = document.querySelector("#inp_nit");
//    const inp_codclie = document.querySelector("#inp_codclie");
//    const inp_razon = document.querySelector("#inp_razon");

//    cf.checked = true;
//    nit.checked = false;
//    inp_nit.disabled = true;
//    inp_codclie.disabled = true;
//    inp_razon.disabled = true;

//    inp_nit.value = "CF";
//    inp_razon.value = "CONSUMIDOR FINAL";



//}






