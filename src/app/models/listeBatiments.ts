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
  { // Cathédrale
    nom: 'Cathédrale',
    image: null,

    cout: {
      pierre: 6,
    },
    entree: null,
    sortie: null,

    score: 11,
    disponible: true,
    position: null,
    activable: false
  },








  { // Atelier1
    nom: 'Atelier1',
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
  { // Bar2
    nom: 'Bar2',
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
  { // Boulangerie3
    nom: 'Boulangerie3',
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
  { // Cathédrale4
    nom: 'Cathédrale4',
    image: null,

    cout: {
      pierre: 6,
    },
    entree: null,
    sortie: null,

    score: 11,
    disponible: true,
    position: null,
    activable: false
  },
  { // Atelier5
    nom: 'Atelier5',
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
  { // Bar6
    nom: 'Bar6',
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
  { // Boulangerie7
    nom: 'Boulangerie7',
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
  { // Cathédrale8
    nom: 'Cathédrale8',
    image: null,

    cout: {
      pierre: 6,
    },
    entree: null,
    sortie: null,

    score: 11,
    disponible: true,
    position: null,
    activable: false
  },
  { // Atelier9
    nom: 'Atelier9',
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
  { // Bar10
    nom: 'Bar10',
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
  { // Boulangerie11
    nom: 'Boulangerie11',
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
  { // Cathédrale12
    nom: 'Cathédrale12',
    image: null,

    cout: {
      pierre: 6,
    },
    entree: null,
    sortie: null,

    score: 11,
    disponible: true,
    position: null,
    activable: false
  },
];
