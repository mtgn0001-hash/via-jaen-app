export type UniversityInfo = {
  name: string;
  url: string;
  internationalUrl: string;
  phone: string;
};

export type ResourceInfo = {
  name: string;
  city: string;
  type: 'ONG' | 'Salud' | 'Albergue' | 'Comedor' | 'Administración';
  phone: string;
  url: string;
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
  transport: {
    name: string;
    url: string;
    desc: string;
  };
  work: {
    campaign: string;
    desc: string;
    shelters: { city: string; phone: string; open: string }[];
  };
  resources: ResourceInfo[];
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
    transport: {
      name: 'Consorcio de Transporte Metropolitano de Almería',
      url: 'https://www.ctal.es/',
      desc: 'Red de autobuses que conectan la capital con el Poniente y el Levante almeriense.'
    },
    work: {
      campaign: 'Campaña de Invernaderos',
      desc: 'Producción intensiva de hortalizas durante todo el año. Es el motor económico de la provincia.',
      shelters: [
        { city: 'Almería Capital', phone: '950 210 000', open: 'Todo el año' },
        { city: 'El Ejido', phone: '950 541 000', open: 'Todo el año' },
        { city: 'Roquetas de Mar', phone: '950 338 585', open: 'Todo el año' }
      ]
    },
    resources: [
      { name: 'Cruz Roja Almería', city: 'Almería', type: 'ONG', phone: '950 222 222', url: 'https://www.cruzroja.es' },
      { name: 'Cáritas Almería', city: 'Almería', type: 'ONG', phone: '950 270 741', url: 'https://www.caritas.es/almeria/' },
      { name: 'Centro de Salud Almería Centro', city: 'Almería', type: 'Salud', phone: '950 011 500', url: '#' }
    ],
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
    transport: {
      name: 'Consorcio de Transportes de la Bahía de Cádiz',
      url: 'https://www.cmtbc.es/',
      desc: 'Conexión por autobús y catamarán entre los municipios de la Bahía.'
    },
    work: {
      campaign: 'Sector Naval y Turismo',
      desc: 'Economía basada en la industria naval, logística portuaria y el turismo estacional.',
      shelters: [
        { city: 'Cádiz Capital', phone: '956 241 100', open: 'Todo el año' },
        { city: 'Jerez de la Frontera', phone: '956 149 100', open: 'Todo el año' },
        { city: 'Algeciras', phone: '956 672 700', open: 'Todo el año' }
      ]
    },
    resources: [
      { name: 'Cruz Roja Cádiz', city: 'Cádiz', type: 'ONG', phone: '956 222 222', url: 'https://www.cruzroja.es' },
      { name: 'Cáritas Cádiz', city: 'Cádiz', type: 'ONG', phone: '956 214 420', url: '#' }
    ],
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
    transport: {
      name: 'Consorcio de Transporte Metropolitano de Córdoba',
      url: 'https://www.ctmc.es/',
      desc: 'Servicio de autobuses metropolitanos que conectan Córdoba con su área de influencia.'
    },
    work: {
      campaign: 'Campaña de la Aceituna y Cereal',
      desc: 'Agricultura extensiva de olivar y cereal, similar a la provincia de Jaén.',
      shelters: [
        { city: 'Córdoba Capital', phone: '957 499 900', open: 'Todo el año' },
        { city: 'Lucena', phone: '957 500 000', open: 'Nov-Ene' },
        { city: 'Baena', phone: '957 670 000', open: 'Nov-Feb' }
      ]
    },
    resources: [
      { name: 'Cruz Roja Córdoba', city: 'Córdoba', type: 'ONG', phone: '957 222 222', url: 'https://www.cruzroja.es' },
      { name: 'Cáritas Córdoba', city: 'Córdoba', type: 'ONG', phone: '957 470 563', url: '#' }
    ],
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
    transport: {
      name: 'Consorcio de Transporte Metropolitano de Granada',
      url: 'https://www.ctagr.es/',
      desc: 'Red de autobuses metropolitanos y Metro de Granada.'
    },
    work: {
      campaign: 'Hostelería y Sector Servicios',
      desc: 'Fuerte dependencia del turismo cultural (Alhambra) y de nieve (Sierra Nevada).',
      shelters: [
        { city: 'Granada Capital', phone: '958 248 100', open: 'Todo el año' },
        { city: 'Motril', phone: '958 601 100', open: 'Todo el año' }
      ]
    },
    resources: [
      { name: 'Cruz Roja Granada', city: 'Granada', type: 'ONG', phone: '958 222 222', url: 'https://www.cruzroja.es' },
      { name: 'Cáritas Granada', city: 'Granada', type: 'ONG', phone: '958 202 561', url: '#' }
    ],
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
    transport: {
      name: 'Consorcio de Transporte Metropolitano de Huelva',
      url: 'https://www.cthu.es/',
      desc: 'Autobuses metropolitanos que conectan la capital con el área metropolitana y la costa.'
    },
    work: {
      campaign: 'Campaña de los Frutos Rojos',
      desc: 'Recogida de fresas y arándanos. Temporada alta de febrero a junio.',
      shelters: [
        { city: 'Huelva Capital', phone: '959 210 000', open: 'Todo el año' },
        { city: 'Lepe', phone: '959 625 000', open: 'Feb-Jun' },
        { city: 'Moguer', phone: '959 372 193', open: 'Feb-Jun' }
      ]
    },
    resources: [
      { name: 'Cruz Roja Huelva', city: 'Huelva', type: 'ONG', phone: '959 222 222', url: 'https://www.cruzroja.es' },
      { name: 'Cáritas Huelva', city: 'Huelva', type: 'ONG', phone: '959 215 111', url: '#' }
    ],
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
    transport: {
      name: 'Consorcio de Transporte Metropolitano de Jaén',
      url: 'https://jaen.ctas.cti.es/',
      desc: 'Buses interurbanos que unen Jaén capital con los municipios del área metropolitana.'
    },
    work: {
      campaign: 'Campaña de la Aceituna',
      desc: 'Principal motor económico. Recogida de aceituna para producción de aceite de oliva.',
      shelters: [
        { city: 'Jaén Capital', phone: '953 219 100', open: 'Nov-Feb' },
        { city: 'Martos', phone: '953 210 000', open: 'Nov-Ene' },
        { city: 'Úbeda', phone: '953 750 440', open: 'Nov-Feb' },
        { city: 'Villacarrillo', phone: '953 440 000', open: 'Nov-Feb' }
      ]
    },
    resources: [
      { name: 'Cruz Roja Jaén', city: 'Jaén', type: 'ONG', phone: '953 251 540', url: 'https://www.cruzroja.es' },
      { name: 'Cáritas Jaén', city: 'Jaén', type: 'ONG', phone: '953 234 445', url: 'https://www.caritas.es/jaen/' },
      { name: 'Albergue Municipal Jaén', city: 'Jaén', type: 'Albergue', phone: '953 219 100', url: '#' }
    ],
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
    transport: {
      name: 'Consorcio de Transporte Metropolitano del Área de Málaga',
      url: 'https://www.ctmam.es/',
      desc: 'Red de autobuses metropolitanos, Metro de Málaga y trenes de cercanías.'
    },
    work: {
      campaign: 'Turismo y Sector Tecnológico',
      desc: 'Málaga es el "Silicon Valley" del sur, con fuerte demanda en IT y servicios turísticos.',
      shelters: [
        { city: 'Málaga Capital', phone: '951 926 000', open: 'Todo el año' },
        { city: 'Marbella', phone: '952 761 100', open: 'Todo el año' }
      ]
    },
    resources: [
      { name: 'Cruz Roja Málaga', city: 'Málaga', type: 'ONG', phone: '952 222 222', url: 'https://www.cruzroja.es' },
      { name: 'Cáritas Málaga', city: 'Málaga', type: 'ONG', phone: '952 211 462', url: '#' }
    ],
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
    transport: {
      name: 'Consorcio de Transporte Metropolitano del Área de Sevilla',
      url: 'https://www.ctas.es/',
      desc: 'Amplia red de autobuses que conectan Sevilla con sus coronas metropolitanas.'
    },
    work: {
      campaign: 'Sector Terciario y Servicios',
      desc: 'Centro administrativo y turístico de Andalucía. Alta demanda en comercio y servicios.',
      shelters: [
        { city: 'Sevilla Capital', phone: '955 470 200', open: 'Todo el año' },
        { city: 'Dos Hermanas', phone: '954 919 500', open: 'Todo el año' }
      ]
    },
    resources: [
      { name: 'Cruz Roja Sevilla', city: 'Sevilla', type: 'ONG', phone: '954 222 222', url: 'https://www.cruzroja.es' },
      { name: 'Cáritas Sevilla', city: 'Sevilla', type: 'ONG', phone: '954 227 413', url: '#' }
    ],
    color: '#008050'
  }
};
