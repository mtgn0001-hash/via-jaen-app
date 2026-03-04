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
  address: string;
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
    shelters: { city: string; phone: string; open: string; address: string }[];
  };
  resources: ResourceInfo[];
  color: string;
};

export const provincesData: Record<string, ProvinceData> = {
  jaen: {
    id: 'jaen',
    name: 'Jaén',
    extranjeria: {
      address: 'Calle Hurtado, 6, 23071 Jaén',
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
      desc: 'Autobuses que conectan Jaén capital con Linares, Martos, Úbeda y el resto de municipios.'
    },
    work: {
      campaign: 'Campaña de la Aceituna',
      desc: 'El empleo principal en Jaén. La recogida comienza en noviembre y dura hasta febrero.',
      shelters: [
        { city: 'Jaén Capital', phone: '953 219 100', open: 'Nov-Feb', address: 'Calle Carretera de Madrid' },
        { city: 'Martos', phone: '953 210 000', open: 'Nov-Ene', address: 'Avda. de los Olivares' },
        { city: 'Úbeda', phone: '953 750 440', open: 'Nov-Feb', address: 'Calle Ariza' },
        { city: 'Linares', phone: '953 607 500', open: 'Nov-Feb', address: 'Calle Don Luis' }
      ]
    },
    resources: [
      { name: 'Centro de Acogida Municipal (Albergue)', city: 'Jaén', type: 'Albergue', phone: '953 219 100', url: '#', address: 'Calle Carretera de Madrid, s/n' },
      { name: 'Comedor Social San Roque', city: 'Jaén', type: 'Comedor', phone: '953 234 445', url: '#', address: 'Plaza de San Roque, 4' },
      { name: 'Comedor Santa Clara (Cáritas)', city: 'Jaén', type: 'Comedor', phone: '953 234 445', url: '#', address: 'Calle Santa Clara, 12' },
      { name: 'Cruz Roja Jaén', city: 'Jaén', type: 'ONG', phone: '953 251 540', url: 'https://www.cruzroja.es', address: 'Avenida de Madrid, 24' },
      { name: 'Cáritas Diocesana Jaén', city: 'Jaén', type: 'ONG', phone: '953 234 445', url: 'https://www.caritas.es/jaen/', address: 'Calle Maestro Bartolomé Espadero, 7' },
      { name: 'Jaén Acoge', city: 'Jaén', type: 'ONG', phone: '953 261 453', url: 'http://jaenacoge.org/', address: 'Calle de la Luna, 9' },
      { name: 'Comisaría de Policía (TIE)', city: 'Jaén', type: 'Administración', phone: '953 295 100', url: '#', address: 'Plaza de las Batallas, 1' },
      { name: 'Oficina de Extranjería', city: 'Jaén', type: 'Administración', phone: '953 999 000', url: '#', address: 'Calle Hurtado, 6' },
      { name: 'Hospital Neurotraumatológico', city: 'Jaén', type: 'Salud', phone: '953 008 000', url: '#', address: 'Ctra. de Madrid, s/n' },
      { name: 'Hospital General (Princesa de España)', city: 'Jaén', type: 'Salud', phone: '953 008 000', url: '#', address: 'Avda. de Madrid, s/n' }
    ],
    color: '#3D5229'
  }
};