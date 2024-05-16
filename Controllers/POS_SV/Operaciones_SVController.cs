using DevExpress.Xpo.Helpers;
using EqCrm.Models;
using Newtonsoft.Json;
using Org.BouncyCastle.Asn1.Mozilla;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace EqCrm.Controllers.POS_SV
{
    public class Operaciones_SVController : Controller
    {
        // GET: Operaciones_SV
        public ActionResult CrearVentas()
        {
            if (string.IsNullOrEmpty((string)this.Session["Usuario"]))
            {
                return (ActionResult)this.RedirectToAction("Login", "Account");
            }

            GetTableInventario();

            return View("~/Views/POS_SV/Operaciones_SV/CrearVentas.cshtml");
        }



        public void GetTableInventario()
        {
            string cNit = (string)this.Session["cNit"];
            string oBase = (string)(Session["oBase"]);
            string id_agencia = (string)this.Session["Sucursal"];
            string query = "";
            string jsonString = "";
            string cRespuesta = "";
            string cTabla = "";

            query = "SELECT a.id_codigo AS CODIGO, a.codigoe AS CODIGOE, a.numero_departe AS NOPARTE, a.id_marca AS MARCA, a.producto AS PRODUCTO,  a.precio1 AS PRECIO,ifnull( (SELECT sum(b.entrada-b.salida) FROM kardexinven b WHERE b.id_codigo= a.id_codigo AND b.id_agencia= " + id_agencia.ToString() + "),0) AS EXISTENCIA, if(servicio='N', 'BIEN', 'SERVICIO') AS TIPO FROM inventario a ";

            EqAppQuery queryapi = new EqAppQuery()
            {
                Nit = cNit,
                Query = query,
                BaseDatos = oBase

            };



            jsonString = JsonConvert.SerializeObject(queryapi);

            cRespuesta = Funciones.EqAppQuery(jsonString);

            

            Resultado resultadoTablaInventario = new Resultado();
            resultadoTablaInventario = Newtonsoft.Json.JsonConvert.DeserializeObject<Resultado>(cRespuesta.ToString());

            if (resultadoTablaInventario.resultado.ToString() == "true")
            {

                cRespuesta = Funciones.ExtraerInfoEqJson(cRespuesta.ToString());
                cTabla = Funciones.LlenarTableHTmlInventarioPOS(cRespuesta);
                ViewBag.TablaInventario = cTabla;
            }
        }

        // Funciones iniciales
        public string GetListDropDepartamento()
        {
            string db = (string)this.Session["StringConexion"];

            string query = string.Format("SELECT {0}, {1} FROM parametrosadicionales.departamentossv ",
                "id_depto", "descripcion");

            dapperConnect dapper = new dapperConnect();

            var resultado = dapper.ExecuteList<dynamic>(db, query);

            var json = JsonConvert.SerializeObject(resultado);

            return json.ToString();
        }

        public string GetListDropMunicipio()
        {
            string db = (string)this.Session["StringConexion"];

            string query = string.Format("SELECT {0}, {1}, {2} FROM parametrosadicionales.municipiossv ",
                "id_municipio", "id_depto", "descripcion");

            dapperConnect dapper = new dapperConnect();

            var resultado = dapper.ExecuteList<dynamic>(db, query);

            var json = JsonConvert.SerializeObject(resultado);

            return json.ToString();
        }

        public string GetListDropTipoActividad()
        {
            string db = (string)this.Session["StringConexion"];

            string query = string.Format("SELECT {0}, {1} FROM parametrosadicionales.actveconomicasv;",
                "id_codigo", "descripcion");

            dapperConnect dapper = new dapperConnect();

            var resultado = dapper.ExecuteList<dynamic>(db, query);

            var json = JsonConvert.SerializeObject(resultado);

            return json.ToString();

        }

        public string GetListDropTipoDocumento()
        {
            string db = (string)this.Session["StringConexion"];

            string query = string.Format("SELECT {0}, {1} FROM parametrosadicionales.tipodocumentosv;",
                "id_tipo", "descripcion");

            dapperConnect dapper = new dapperConnect();

            var resultado = dapper.ExecuteList<dynamic>(db, query);

            var json = JsonConvert.SerializeObject(resultado);

            return json.ToString();

        }

        public string GetDataEmisor()
        {
            dynamic fact = new ExpandoObject();

            // Identificación 
            fact.version = 3;
            fact.ambiente = "01";
            fact.tipoDte = "";
            fact.numeroControl = "";
            fact.codigoGeneracion = Guid.NewGuid();
            fact.tipoModelo = "";
            fact.tipoOperacion = "";
            fact.tipoContingencia = "";
            fact.motivoContin = "";
            fact.fecEmi = "";
            fact.horEmi = "";
            fact.tipoMoneda = "";

            // Emisor
            fact.eNit = (string)this.Session["cNit"];
            fact.eNrc = (string)this.Session["cNrc_sv"];
            fact.eEmisor = (string)this.Session["cNombreEmisor"];
            fact.eCodActividad = (string)this.Session["cCod_actividad_sv"];
            fact.eDescActividad = "pendiente";
            fact.eComercial = (string)this.Session["cNombreComercial"];
            fact.eTipoEstablecimiento = (string)this.Session["cTipo_establecimiento_sv"];
            fact.eDireccion = (string)this.Session["cDireccion"];
            fact.eDepartamento = "pendiente";
            fact.eMunicipio = "pendiente";
            fact.eComplemento = "pendiente";
            fact.eTelefono = "pendiente";
            fact.eEmail = (string)this.Session["cEmail"];
            fact.eCodEstableMH = null;
            fact.eCodEstable = null;
            fact.eCodPuntoVentaMH = null;
            fact.eCodPuntoVenta = null;

            string json = JsonConvert.SerializeObject(fact);

            return json;
        }




        //public Object GetFirst()
        //{
        //    dapperConnect dapper = new dapperConnect();

        //    string db = (string)this.Session["StringConexion"];
        //    string query = "SELECT * FROM dlempresa.empresa";

        //    var resultado = dapper.PrimerItem<dynamic>(db, query);
        //    return resultado;

        //}


    }
}