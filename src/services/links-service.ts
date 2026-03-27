/**
 * Centralización de todos los enlaces externos de la aplicación.
 * Facilita la actualización de sedes electrónicas si cambian sus rutas.
 */
export const OFFICIAL_LINKS = {
  extranjeria: {
    ex15: "https://www.inclusion.gob.es/web/migraciones/modelos-de-solicitud",
    citaPrevia: "https://icp.administracionelectronica.gob.es/icpco/index.html",
    modelosGeneral: "https://extranjeros.inclusion.gob.es/es/ModelosSolicitudes/Mod_solicitudes2/index.html"
  },
  ayuntamiento: {
    padron: "https://sede.aytojaen.es/", // Enlace a la sede principal para evitar 404
    sede: "https://sede.aytojaen.es/"
  },
  uja: {
    acceso: "https://www.ujaen.es/estudios/acceso",
    internacional: "https://www.ujaen.es/internacional",
    matricula: "https://www.ujaen.es/estudios/acceso/automatricula"
  },
  salud: {
    clicSalud: "https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/clicsalud/",
    intervencion: "https://www.sspa.juntadeandalucia.es/servicioandaluzdesalud/clicsalud/pages/contacto/index.xhtml"
  },
  seguridadSocial: {
    importass: "https://portal.seg-social.gob.es/wps/portal/importass/importass",
    cita: "https://portal.seg-social.gob.es/wps/portal/importass/importass/tramites/solicitudCitaPrevia"
  }
};
