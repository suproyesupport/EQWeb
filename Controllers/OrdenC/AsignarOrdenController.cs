﻿using EqCrm.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EqCrm.Controllers.OrdenC
{
    public class AsignarOrdenController : Controller
    {
        // GET: AsignarOrden
        public ActionResult AsignarOrden()
        {
            if (string.IsNullOrEmpty((string)this.Session["Usuario"]))
            {
                return (ActionResult)this.RedirectToAction("Login", "Account");
            }
            return (ActionResult)this.View();
        }
        [HttpPost]
        public object GetOrden(FiltroGenerico doctos)
        {
            string cUserConected = (string)(Session["Usuario"]);

           
            if (string.IsNullOrEmpty(cUserConected))
            {
                return (ActionResult)this.RedirectToAction("Login", "Account");
            }
            else
            {
                StringConexionMySQL llenar = new StringConexionMySQL();

                string DB = (string)this.Session["StringConexion"];

                

                string queryCotizaciones = "SELECT no_factura AS ID, fecha AS FECHA, statusordenes.nombre AS STATUS,requirente AS REQUIRENTE, (select nombre from catdeptosconta where id_depto = id_provee) AS DEPARTAMENTO,direccion AS EMAIL, obs AS OBS";
                queryCotizaciones += " FROM ordcompras";
                queryCotizaciones += " LEFT JOIN  statusordenes ON(statusordenes.id_status = ordcompras.status) WHERE ordcompras.status = 'P'";



                LLenarListaCotizaciones.listaOrdenes = llenar.ListaOrdenes(queryCotizaciones, DB, LLenarListaCotizaciones.listaOrdenes);
            }
            return Newtonsoft.Json.JsonConvert.SerializeObject(LLenarListaCotizaciones.listaOrdenes);
        }

        
    }

}