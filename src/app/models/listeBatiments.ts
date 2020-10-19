import { Batiment } from './batiment';


const ble: Batiment = {
  nom: 'Champ de blé',
  image: null,

  cout: {
    bois: 1,
  },
  entree: null,
  sortie: {
    ble: 1,
  },

  score: 3,
  disponible: true,
  position: null,
  activable: true
};

export const champsBle: Batiment[] = [ble, ble, ble, ble, ble];

export const listeBatiments: Batiment[] = [
  { // Atelier
    nom: 'Atelier',
    image: null,

    cout: {
      pierre: 2,
    },
    entree: {
      bois: 2,
    },
    sortie: {
      score: 3,
    },

    score: 5,
    disponible: true,
    position: null,
    activable: true
  },

  { // Bar
    nom: 'Bar',
    image: null,

    cout: {
      pierre: 2,
      ble: 2
    },
    entree: null,
    sortie: {
      score: 3,
    },

    score: 7,
    disponible: true,
    position: null,
    activable: true
  },

  { // Boulangerie
    nom: 'Boulangerie',
    image: null,

    cout: {
      bois: 2,
    },
    entree: {
      ble: 1
    },
    sortie: {
      piece: 4
    },

    score: 4,
    disponible: true,
    position: null,
    activable: true
  },

  { // Brasserie
    nom: 'Brasserie',
    image: null,

    cout: {
      bois: 2,
    },
    entree: {
      ble: 1,
    },
    sortie: {
      score: 3,
    },

    score: 5,
    disponible: true,
    position: null,
    activable: true
  },

  { // Carrière
    nom: 'Carrière',
    image: null,

    cout: {
      bois: 3
    },
    entree: {
      piece: 2
    },
    sortie: {
      pierre: 2,
    },

    score: 5,
    disponible: true,
    position: null,
    activable: true
  },

  { // Charpentier
    nom: 'Charpentier',
    image: null,

    cout: {
      bois: 2,
    },
    entree: {
      piece: 1
    },
    sortie: {
      bois: 3
    },

    score: 4,
    disponible: true,
    position: null,
    activable: true
  },

  { // Epicerie
    nom: 'Epicerie',
    image: null,

    cout: {
      bois: 2,
    },
    entree: {
      piece: 1
    },
    sortie: {
      ble: 1,
      poisson: 1
    },

    score: 4,
    disponible: true,
    position: null,
    activable: true
  },

  { // Entrepôt
    nom: 'Entrepôt',
    image: null,

    cout: {
      pierre: 4,
    },
    entree: {
      pierre: 2,
    },
    sortie: {
      score: 5,
    },

    score: 8,
    disponible: true,
    position: null,
    activable: true
  },

  { // Eglise
    nom: 'Eglise',
    image: null,

    cout: {
      pierre: 4,
    },
    entree: {
      piece: 3,
    },
    sortie: {
      score: 5,
    },

    score: 8,
    disponible: true,
    position: null,
    activable: true
  },

  { // Foire
    nom: 'Foire',
    image: null,

    cout: {
      bois: 4,
    },
    entree: {
      pierre: 1,
      bois: 1,
      poisson: 1,
      ble: 1
    },
    sortie: {
      score: 7,
    },

    score: 6,
    disponible: true,
    position: null,
    activable: true
  },

  { // Fontaine
    nom: 'Fontaine',
    image: null,

    cout: {
      pierre: 2,
    },
    entree: {
      piece: 1,
    },
    sortie: {
      score: 3,
    },

    score: 5,
    disponible: true,
    position: null,
    activable: true
  },

  { // Grenier
    nom: 'Grenier',
    image: null,

    cout: {
      bois: 4,
    },
    entree: {
      ble: 2,
    },
    sortie: {
      score: 5,
    },

    score: 6,
    disponible: true,
    position: null,
    activable: true
  },

  { // Librairie
    nom: 'Librairie',
    image: null,

    cout: {
      pierre: 4,
    },
    entree: null,
    sortie: {
      piece: 3,
    },

    score: 8,
    disponible: true,
    position: null,
    activable: true
  },

  { // Mine d'or
    nom: 'Mine d\'or',
    image: null,

    cout: {
      pierre: 1,
      bois: 1
    },
    entree: null,
    sortie: {
      piece: 2
    },

    score: 4,
    disponible: true,
    position: null,
    activable: true
  },

  { // Poissonnier
    nom: 'Poissonnier',
    image: null,

    cout: {
      pierre: 1,
      bois: 1
    },
    entree: {
      poisson: 1,
    },
    sortie: {
      piece: 3,
    },

    score: 4,
    disponible: true,
    position: null,
    activable: true
  },

  { // Ponton
    nom: 'Ponton',
    image: null,

    cout: {
      bois: 3,
    },
    entree: null,
    sortie: {
      poisson: 2,
    },

    score: 5,
    disponible: true,
    position: null,
    activable: true
  },

  { // Puit
    nom: 'Puit',
    image: null,

    cout: {
      pierre: 1,
      bois: 1
    },
    entree: null,
    sortie: {
      score: 2,
    },

    score: 4,
    disponible: true,
    position: null,
    activable: true
  },

  { // Restaurant
    nom: 'Restaurant',
    image: null,

    cout: {
      pierre: 2,
      bois: 2
    },
    entree: {
      poisson: 1,
      ble: 1
    },
    sortie: {
      score: 4,
    },

    score: 7,
    disponible: true,
    position: null,
    activable: true
  },

  { // Statue
    nom: 'Statue',
    image: null,

    cout: {
      pierre: 4,
    },
    entree: null,
    sortie: null,

    score: 10,
    disponible: true,
    position: null,
    activable: false
  }

  // { // ------------------------ Prêteur sur gage
  //   nom: 'Prêteur sur gage',
  //   image: null,

  //   cout: {
  //     bois: 3
  //   },
  //   entree: {
  //     bois: 2, // 2 Jokers
  //   },
  //   sortie: {
  //     score: 3, // 2 Jokers
  //   },

  //   score: 5,
  //   disponible: true,
  //   position: null,
  //   activable: true
  // },

  // { ------------------------ // Cathédrale
  //   nom: 'Cathédrale',
  //   image: null,

  //   cout: {
  //     pierre: 6,
  //   },
  //   entree: null,
  //   sortie: null,

  //   score: 11,
  //   disponible: true,
  //   position: null,
  //   activable: false
  // },

  // { ------------------------ // Résidence
  //   nom: 'Résidence',
  //   image: null,

  //   cout: {
  //     piece: 6,
  //   },
  //   entree: null,
  //   sortie: null,

  //   score: 2,
  //   disponible: true,
  //   position: null,
  //   activable: false
  // },

  // { ------------------------ // Château
  //   nom: 'Château',
  //   image: null,

  //   cout: {
  //     pierre: 6,
  //   },
  //   entree: null,
  //   sortie: null,

  //   score: ?,
  //   disponible: true,
  //   position: null,
  //   activable: false
  // },

  // { ------------------------ // Tour de garde
  //   nom: 'Tour de garde',
  //   image: null,

  //   cout: {
  //     pierre: 3,
  //     bois: 3
  //   },
  //   entree: null,
  //   sortie: null,

  //   score: 11,
  //   disponible: true,
  //   position: null,
  //   activable: false
  // },
];
