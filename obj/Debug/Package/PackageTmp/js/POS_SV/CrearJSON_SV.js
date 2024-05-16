
// button
//const btn_TerminarVentas = document.querySelector("#btn_TerminarVenta");


// receptor
const nit = document.querySelector("#inp_nit");
const nrc = document.querySelector("#inp_nrc");
const nombre = document.querySelector("#inp_nombre");
//const codActividad = document.querySelector("#codActividad");
//const descActividad = document.querySelector("#descActividad");
const nombreComercial = document.querySelector("#nombreComercial");
const tipoEstablecimiento = document.querySelector("#tipoEstablecimiento");
//const departamento = document.querySelector("#departamento");
//const municipio = document.querySelector("#municipio");
//const direccion = document.querySelector("#direccion");
//const complemento = document.querySelector("#complemento");
const telefono = document.querySelector("#telefono");
const correo = document.querySelector("#correo");

const CrearjsonFELSV = () => {

    const objeto = {
        "identificacion": {
            "version": 3,
            "ambiente": "01",
            "tipoDte": "03",
            "numeroControl": "DTE-03-00000000-000000000001769",
            "codigoGeneracion": "441BBA84-9B41-4557-A7E5-24290AB6EFA8",
            "tipoModelo": 1,
            "tipoOperacion": 1,
            "tipoContingencia": null,
            "motivoContin": null,
            "fecEmi": "2023-10-17",
            "horEmi": "17:27:59",
            "tipoMoneda": "USD"
        },
        "cuerpoDocumento": [
            {
                "numItem": 1,
                "tipoItem": 1,
                "numeroDocumento": null,
                "cantidad": 5.0,
                "codigo": "00000009981",
                "codTributo": null,
                "uniMedida": 59,
                "descripcion": "REFRIGERADORA HISENSE 1P/FH/04 RR43D6ACX1",
                "precioUni": 247.78761062,
                "montoDescu": 402.65486726,
                "ventaNoSuj": 0.0,
                "ventaExenta": 0.0,
                "ventaGravada": 836.28318584,
                "tributos": [
                    "20"
                ],
                "psv": 0.0,
                "noGravado": 0.0
            },
            {
                "numItem": 2,
                "tipoItem": 1,
                "numeroDocumento": null,
                "cantidad": 5.0,
                "codigo": "00000009981",
                "codTributo": null,
                "uniMedida": 59,
                "descripcion": "REFRIGERADORA HISENSE 1P/FH/04 RR43D6ACX1",
                "precioUni": 247.78761062,
                "montoDescu": 402.65486726,
                "ventaNoSuj": 0.0,
                "ventaExenta": 0.0,
                "ventaGravada": 836.28318584,
                "tributos": [
                    "20"
                ],
                "psv": 0.0,
                "noGravado": 0.0
            },
            {
                "numItem": 3,
                "tipoItem": 1,
                "numeroDocumento": null,
                "cantidad": 5.0,
                "codigo": "00000009981",
                "codTributo": null,
                "uniMedida": 59,
                "descripcion": "REFRIGERADORA HISENSE 1P/FH/04 RR43D6ACX1",
                "precioUni": 247.78761062,
                "montoDescu": 402.65486726,
                "ventaNoSuj": 0.0,
                "ventaExenta": 0.0,
                "ventaGravada": 836.28318584,
                "tributos": [
                    "20"
                ],
                "psv": 0.0,
                "noGravado": 0.0
            },
            {
                "numItem": 4,
                "tipoItem": 1,
                "numeroDocumento": null,
                "cantidad": 5.0,
                "codigo": "00000009981",
                "codTributo": null,
                "uniMedida": 59,
                "descripcion": "REFRIGERADORA HISENSE 1P/FH/04 RR43D6ACX1",
                "precioUni": 247.78761062,
                "montoDescu": 402.65486726,
                "ventaNoSuj": 0.0,
                "ventaExenta": 0.0,
                "ventaGravada": 836.28318584,
                "tributos": [
                    "20"
                ],
                "psv": 0.0,
                "noGravado": 0.0
            },
            {
                "numItem": 5,
                "tipoItem": 1,
                "numeroDocumento": null,
                "cantidad": 3.0,
                "codigo": "00000009981",
                "codTributo": null,
                "uniMedida": 59,
                "descripcion": "REFRIGERADORA HISENSE 1P/FH/04 RR43D6ACX1",
                "precioUni": 247.78761062,
                "montoDescu": 241.59292035,
                "ventaNoSuj": 0.0,
                "ventaExenta": 0.0,
                "ventaGravada": 501.7699115,
                "tributos": [
                    "20"
                ],
                "psv": 0.0,
                "noGravado": 0.0
            }
        ],
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

}



//export { CrearJSON };