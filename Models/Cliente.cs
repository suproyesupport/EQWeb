using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EqCrm.Models
{
    public class Cliente
    {
        public string id_codigo { get; set; }
        public string status { get; set; }
        public string nit { get; set; }
        public string cliente { get; set; }
        public string direccion { get; set; }
        public string telefono { get; set; }
        public string email { get; set; }
        public string diascredito { get; set; } = "0";
        public string limcredito { get; set; } = "0";
        public string atencion { get; set; }
        public string clasificacion { get; set; }
        public string ruta { get; set; }

    }
}