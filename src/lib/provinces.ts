export type UniversityInfo = {
  name: string;
  url: string;
  internationalUrl: string;
  phone: string;
  campuses: { name: string; location: string }[];
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
      phone: '+34 953 21 21 21',
      campuses: [
        { name: 'Campus Las Lagunillas', location: 'Jaén Capital' },
        { name: 'Campus Científico-Tecnológico', location: 'Linares' }
      ]
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
  }
};
