using EqCrm.Models;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace EqCrm.Controllers
{
    public class MnttoClientesController : Controller
    {
        // GET: MnttoClientes
        public ActionResult MnttoClientes()
        {
            if (string.IsNullOrEmpty((string)this.Session["Usuario"]))
            {
                return (ActionResult)this.RedirectToAction("Login", "Account");
            }

            string db = (string)this.Session["StringConexion"];
            string query = "";
            string cError = "";

            StringConexionMySQL stringConexionMySql = new StringConexionMySQL();

            dapperConnect dapper = new dapperConnect();

            if (dapper.ValidaTablas(db, "statusclientes") == false)
            {
                query = "CREATE TABLE statusclientes(id_status varchar(2) primary key not null, nombre varchar(30) not null);";
                dapper.EqExecute(query, db, ref cError);
            }

            List<SelectListItem> status = new List<SelectListItem>();
            query = "SELECT id_status, nombre FROM statusclientes";
            stringConexionMySql.LLenarDropDownList(query, db, status);
            ViewData["status"] = status;

            return View();

        }

        // FUNCION DEVUELVE LISTADO GENERAL PARA TELERIK
        public string GetList()
        {
            // Variable que guarda el stringconexion de una variable de sesión llamada "StringConexion"
            string db = (string)this.Session["StringConexion"];

            string query = string.Format("SELECT {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7} FROM clientes LIMIT 111111111;",
                "id_codigo", "cliente", "nit", "status", "facturar", "direccion", "telefono", "email");

            // Instancia de la clase dapperConnect en el objeto dapper
            dapperConnect dapper = new dapperConnect();

            var resultado = dapper.ExecuteList<dynamic>(db, query);

            var json = JsonConvert.SerializeObject(resultado);

            return json.ToString();
        }

        [HttpPost]
        public string GetCorrelativo()
        {
            string db = (string)this.Session["StringConexion"];
            string query = "SELECT MAX(id_codigo) + 1 AS correlativo  FROM clientes;";

            // Instancia de la clase dapperConnect en el objeto dapper
            dapperConnect dapper = new dapperConnect();

            var resultado = dapper.PrimerItem<dynamic>(db, query);

            var json = JsonConvert.SerializeObject(resultado);
            return json.ToString();
        }





        public string GetData(string id_codigo)
        {
            // Variable que guarda el stringconexion de una variable de sesión llamada "StringConexion"
            string db = (string)this.Session["StringConexion"];

            //Variable que guarda el query, se utiliza string.Format para evitar SQL Injection
            string query = string.Format("SELECT {0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9} FROM clientes WHERE id_codigo = {10};",
                "id_codigo", "status", "nit", "cliente", "direccion", "telefono", "email", "atencion", "clasifica", "id_ruta", id_codigo);

            // Instancia de la clase dapperConnect en el objeto dapper
            dapperConnect dapper = new dapperConnect();

            var resultado = dapper.ExecuteList<dynamic>(db, query);

            var json = JsonConvert.SerializeObject(resultado);

            return json.ToString();
        }



        public string GetListComboStatus()
        {
            return "";

        }


        public ActionResult CreateCliente(Cliente c)
        {
            string db = (string)this.Session["StringConexion"];
            dapperConnect dapper = new dapperConnect();
            string cError = "";

            try
            {
                string limcredito = (string.IsNullOrEmpty(c.limcredito)) ? "0" : c.limcredito;
                string diascredito = (string.IsNullOrEmpty(c.diascredito)) ? "0" : c.diascredito;

                // Deserializar el JSON a un objeto dinámico (Objeto dinamico)
                dynamic oDynam = JsonConvert.DeserializeObject<dynamic>(GetCorrelativo());

                string query = "INSERT INTO clientes (id_codigo, cliente, nit, status, facturar, atencion, direccion, telefono, clasifica, email, limcred, diascred, obs) " +
                string.Format("VALUES ({0}, '{1}', '{2}', '{3}', '{4}','{5}', '{6}', '{7}', '{8}', '{9}', {10}, {11}, '{12}' );",
                    oDynam.correlativo.ToString(), c.cliente, c.nit, c.status, "", "", c.direccion, c.telefono, c.clasificacion, c.email, limcredito, diascredito, "");

                bool ejecutar = dapper.EqExecute(query, db, ref cError);
                
                if (!ejecutar)
                {
                    // Devolver una respuesta HTTP con estado 200 OK
                    return new HttpStatusCodeResult(HttpStatusCode.OK);
                } else
                {
                    // Devolver una respuesta HTTP con estado 200 OK
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "respuesta: " + cError);
                }
            }
            catch (Exception ex)
            {
                // En caso de error, devolver una respuesta HTTP con estado 500 Internal Server Error
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError, "Error al crear cliente: " + ex.Message);
            }
        }

        public ActionResult UpdateCliente(Cliente c)
        {
            string db = (string)this.Session["StringConexion"];
            dapperConnect dapper = new dapperConnect();
            string cError = "";

            try
            {
                string limcredito = (string.IsNullOrEmpty(c.limcredito)) ? "0" : c.limcredito;
                string diascredito = (string.IsNullOrEmpty(c.diascredito)) ? "0" : c.diascredito;

                // Deserializar el JSON a un objeto dinámico (Objeto dinamico)
                dynamic oDynam = JsonConvert.DeserializeObject<dynamic>(GetCorrelativo());


                //string query = "INSERT INTO clientes (id_codigo, cliente, nit, status, facturar, atencion, direccion, telefono, clasifica, email, limcred, diascred, obs) " +

                string query = string.Format("UPDATE clientes SET cliente={0}, nit={1}, status={2}, facturar={3}, atencion={4}, direccion={5}, telefono={6}, clasifica={7}, email={8}, limcred={9}, diascred={10}, obs={11} WHERE id_codigo ={12}",
                     c.cliente, c.nit, c.status, "", "", c.direccion, c.telefono, c.clasificacion, c.email, limcredito, diascredito, "", c.id_codigo);

                bool ejecutar = dapper.EqExecute(query, db, ref cError);

                if (!ejecutar)
                {
                    // Devolver una respuesta HTTP con estado 200 OK
                    return new HttpStatusCodeResult(HttpStatusCode.OK);
                }
                else
                {
                    // Devolver una respuesta HTTP con estado 200 OK
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "respuesta: " + cError);
                }
            }
            catch (Exception ex)
            {
                // En caso de error, devolver una respuesta HTTP con estado 500 Internal Server Error
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError, "Error al modificar cliente: " + ex.Message);
            }
        }

        public ActionResult DeleteCliente(Cliente c)
        {
            string db = (string)this.Session["StringConexion"];
            dapperConnect dapper = new dapperConnect();
            string cError = "";

            try
            {
                string query = string.Format("UPDATE clientes SET status='A' WHERE id_codigo = {0}", c.id_codigo);

                bool ejecutar = dapper.EqExecute(query, db, ref cError);

                if (!ejecutar)
                {
                    // Devolver una respuesta HTTP con estado 200 OK
                    return new HttpStatusCodeResult(HttpStatusCode.OK);
                }
                else
                {
                    // Devolver una respuesta HTTP con estado 200 OK
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest, "respuesta: " + cError);
                }
            }
            catch (Exception ex)
            {
                // En caso de error, devolver una respuesta HTTP con estado 500 Internal Server Error
                return new HttpStatusCodeResult(HttpStatusCode.InternalServerError, "Error al modificar cliente: " + ex.Message);
            }
        }






    }
}