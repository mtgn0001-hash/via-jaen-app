export type UniversityInfo = {
  name: string;
  url: string;
  internationalUrl: string;
  phone: string;
};

export type ProvinceData = {
  id: string;
  name: string;
  extranjeria: {
    address: string;
    url: string;
  };
  emergency: {
    shelterPhone: string;
    policePhone: string;
  };
  university: UniversityInfo;
  color: string;
};

export const provincesData: Record<string, ProvinceData> = {
  almeria: {
    id: 'almeria',
    name: 'Almería',
    extranjeria: {
      address: 'Calle Real, 11',
      url: 'https://icp.administracionelectronica.gob.es/icpco/index.html'
    },
    emergency: {
      shelterPhone: '950 210 000',
      policePhone: '091'
    },
    university: {
      name: 'Universidad de Almería (UAL)',
      url: 'https://www.ual.es',
      internationalUrl: 'https://www.ual.es/internacionalizacion',
      phone: '+34 950 01 50 00'
    },
    color: '#008050'
  },
  cadiz: {
    id: 'cadiz',
    name: 'Cádiz',
    extranjeria: {
      address: 'Calle de la Marina, 1',
      url: 'https://icp.administracionelectronica.gob.es/icpco/index.html'
    },
    emergency: {
      shelterPhone: '956 241 100',
      policePhone: '091'
    },
    university: {
      name: 'Universidad de Cádiz (UCA)',
      url: 'https://www.uca.es',
      internationalUrl: 'https://internacional.uca.es',
      phone: '+34 956 01 50 00'
    },
    color: '#008050'
  },
  cordoba: {
    id: 'cordoba',
    name: 'Córdoba',
    extranjeria: {
      address: 'Calle de la Bodega, 2',
      url: 'https://icp.administracionelectronica.gob.es/icpco/index.html'
    },
    emergency: {
      shelterPhone: '957 499 900',
      policePhone: '091'
    },
    university: {
      name: 'Universidad de Córdoba (UCO)',
      url: 'https://www.uco.es',
      internationalUrl: 'https://www.uco.es/internacional',
      phone: '+34 957 21 80 00'
    },
    color: '#008050'
  },
  granada: {
    id: 'granada',
    name: 'Granada',
    extranjeria: {
      address: 'Calle San Agapito, 2',
      url: 'https://icp.administracionelectronica.gob.es/icpco/index.html'
    },
    emergency: {
      shelterPhone: '958 248 100',
      policePhone: '091'
    },
    university: {
      name: 'Universidad de Granada (UGR)',
      url: 'https://www.ugr.es',
      internationalUrl: 'https://internacional.ugr.es',
      phone: '+34 958 24 30 00'
    },
    color: '#008050'
  },
  huelva: {
    id: 'huelva',
    name: 'Huelva',
    extranjeria: {
      address: 'Fernando el Católico, 36',
      url: 'https://icp.administracionelectronica.gob.es/icpco/index.html'
    },
    emergency: {
      shelterPhone: '959 210 000',
      policePhone: '091'
    },
    university: {
      name: 'Universidad de Huelva (UHU)',
      url: 'https://www.uhu.es',
      internationalUrl: 'http://www.uhu.es/relaciones.internacionales',
      phone: '+34 959 21 80 00'
    },
    color: '#008050'
  },
  jaen: {
    id: 'jaen',
    name: 'Jaén',
    extranjeria: {
      address: 'Plaza de las Batallas, 1',
      url: 'https://icp.administracionelectronica.gob.es/icpco/index.html'
    },
    emergency: {
      shelterPhone: '953 219 100',
      policePhone: '091'
    },
    university: {
      name: 'Universidad de Jaén (UJA)',
      url: 'https://www.ujaen.es',
      internationalUrl: 'https://www.ujaen.es/internacional',
      phone: '+34 953 21 21 21'
    },
    color: '#3D5229'
  },
  malaga: {
    id: 'malaga',
    name: 'Málaga',
    extranjeria: {
      address: 'Calle Mauricio Villavecchia, 2',
      url: 'https://icp.administracionelectronica.gob.es/icpco/index.html'
    },
    emergency: {
      shelterPhone: '951 926 000',
      policePhone: '091'
    },
    university: {
      name: 'Universidad de Málaga (UMA)',
      url: 'https://www.uma.es',
      internationalUrl: 'https://www.uma.es/relaciones-internacionales',
      phone: '+34 952 13 10 00'
    },
    color: '#008050'
  },
  sevilla: {
    id: 'sevilla',
    name: 'Sevilla',
    extranjeria: {
      address: 'Plaza del Ejército Español, s/n',
      url: 'https://icp.administracionelectronica.gob.es/icpco/index.html'
    },
    emergency: {
      shelterPhone: '955 470 200',
      policePhone: '091'
    },
    university: {
      name: 'Universidad de Sevilla (US)',
      url: 'https://www.us.es',
      internationalUrl: 'https://www.internacional.us.es',
      phone: '+34 954 55 10 00'
    },
    color: '#008050'
  }
};
