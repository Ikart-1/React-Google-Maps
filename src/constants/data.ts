import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: 'dashboard',
    label: 'Dashboard'
  }
];
export const datastoresNike = [
  {
    store_name: 'NIKE STORE PARIS OPÉRA',
    adresse: '24 Boulevard des Capucines, 75009 Paris',
    cp: '75009',
    ville: 'Paris',
    tel: '0142923456',
    web: 'www.nikestore-parisopera.fr',
    gps_degres_decimaux: '48.870643, 2.332654',
    code_etablissement: 'NSP',
    img2: '1.jpg'
  },
  {
    store_name: 'NIKE STORE LA DÉFENSE',
    adresse: '15 Parvis de La Défense, 92800 Puteaux',
    cp: '92800',
    ville: 'Puteaux',
    tel: '0147623456',
    web: 'www.nikestore-ladefense.fr',
    gps_degres_decimaux: '48.891225, 2.241902',
    code_etablissement: 'NSLD',
    img2: '2.jpg'
  },
  {
    store_name: 'NIKE STORE LYON PART-DIEU',
    adresse: 'Centre Commercial La Part-Dieu, 69003 Lyon',
    cp: '69003',
    ville: 'Lyon',
    tel: '0472825678',
    web: 'www.nikestore-lyon.fr',
    gps_degres_decimaux: '45.760830, 4.858414',
    code_etablissement: 'NSLPD',
    img2: '3.jpg'
  },
  {
    store_name: 'NIKE STORE MARSEILLE PRADO',
    adresse: 'Centre Commercial Prado, 13008 Marseille',
    cp: '13008',
    ville: 'Marseille',
    tel: '0491765432',
    web: 'www.nikestore-marseille.fr',
    gps_degres_decimaux: '43.270236, 5.394560',
    code_etablissement: 'NSMP',
    img2: '4.jpg'
  },
  {
    store_name: 'NIKE STORE NICE JEAN MÉDECIN',
    adresse: '44 Avenue Jean Médecin, 06000 Nice',
    cp: '06000',
    ville: 'Nice',
    tel: '0493223456',
    web: 'www.nikestore-nice.fr',
    gps_degres_decimaux: '43.701518, 7.265925',
    code_etablissement: 'NSNJ',
    img2: '5.jpg'
  }
];

export type Store = {
  store_name: string;
  adresse: string;
  tel: string;
  gps_degres_decimaux: string;
  img2: string;
  sous_name?: string;
  distance?: number;
};
