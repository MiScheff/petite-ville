import { Batiment } from './batiment';


const ble: Batiment = {
  nom: 'Champ de blé',
  image: null,

  cout: [{
    type: 'bois',
    quantite: 1,
  }],
  entree: null,
  sortie: [{
    type: 'ble',
    quantite: 1,
  }],

  score: 3,
  proprietaire: null,
  position: null,
  activable: true
};

export const champsBle: Batiment[] = [ble, ble, ble, ble, ble];

export const listeBatiments: Batiment[] = [
  { // Atelier
    nom: 'Atelier',
    image: null,

    cout: [{
      type: 'pierre',
      quantite: 2,
    }],
    entree: [{
      type: 'bois',
      quantite: 2,
    }],
    sortie: [{
      type: 'score',
      quantite: 3,
    }],

    score: 5,
    proprietaire: null,
    position: null,
    activable: true
  },
  { // Bar
    nom: 'Bar',
    image: null,

    cout: [
      {
        type: 'pierre',
        quantite: 2,
      },
      {
        type: 'ble',
        quantite: 2
      }
    ],
    entree: null,
    sortie: [{
      type: 'score',
      quantite: 3,
    }],

    score: 7,
    proprietaire: null,
    position: null,
    activable: true
  },
  { // Boulangerie
    nom: 'Boulangerie',
    image: null,

    cout: [
      {
        type: 'bois',
        quantite: 2,
      }
    ],
    entree: [{
      type: 'ble',
      quantite: 1
    }],
    sortie: [{
      type: 'piece',
      quantite: 4
    }],

    score: 4,
    proprietaire: null,
    position: null,
    activable: true
  },
  { // Cathédrale
    nom: 'Cathédrale',
    image: null,

    cout: [
      {
        type: 'pierre',
        quantite: 6,
      }
    ],
    entree: null,
    sortie: null,

    score: 11,
    proprietaire: null,
    position: null,
    activable: false
  },







  
  { // Atelier1
    nom: 'Atelier1',
    image: null,

    cout: [{
      type: 'pierre',
      quantite: 2,
    }],
    entree: [{
      type: 'bois',
      quantite: 2,
    }],
    sortie: [{
      type: 'score',
      quantite: 3,
    }],

    score: 5,
    proprietaire: null,
    position: null,
    activable: true
  },
  { // Bar2
    nom: 'Bar2',
    image: null,

    cout: [
      {
        type: 'pierre',
        quantite: 2,
      },
      {
        type: 'ble',
        quantite: 2
      }
    ],
    entree: null,
    sortie: [{
      type: 'score',
      quantite: 3,
    }],

    score: 7,
    proprietaire: null,
    position: null,
    activable: true
  },
  { // Boulangerie3
    nom: 'Boulangerie3',
    image: null,

    cout: [
      {
        type: 'bois',
        quantite: 2,
      }
    ],
    entree: [{
      type: 'ble',
      quantite: 1
    }],
    sortie: [{
      type: 'piece',
      quantite: 4
    }],

    score: 4,
    proprietaire: null,
    position: null,
    activable: true
  },
  { // Cathédrale4
    nom: 'Cathédrale4',
    image: null,

    cout: [
      {
        type: 'pierre',
        quantite: 6,
      }
    ],
    entree: null,
    sortie: null,

    score: 11,
    proprietaire: null,
    position: null,
    activable: false
  },
  { // Atelier5
    nom: 'Atelier5',
    image: null,

    cout: [{
      type: 'pierre',
      quantite: 2,
    }],
    entree: [{
      type: 'bois',
      quantite: 2,
    }],
    sortie: [{
      type: 'score',
      quantite: 3,
    }],

    score: 5,
    proprietaire: null,
    position: null,
    activable: true
  },
  { // Bar6
    nom: 'Bar6',
    image: null,

    cout: [
      {
        type: 'pierre',
        quantite: 2,
      },
      {
        type: 'ble',
        quantite: 2
      }
    ],
    entree: null,
    sortie: [{
      type: 'score',
      quantite: 3,
    }],

    score: 7,
    proprietaire: null,
    position: null,
    activable: true
  },
  { // Boulangerie7
    nom: 'Boulangerie7',
    image: null,

    cout: [
      {
        type: 'bois',
        quantite: 2,
      }
    ],
    entree: [{
      type: 'ble',
      quantite: 1
    }],
    sortie: [{
      type: 'piece',
      quantite: 4
    }],

    score: 4,
    proprietaire: null,
    position: null,
    activable: true
  },
  { // Cathédrale8
    nom: 'Cathédrale8',
    image: null,

    cout: [
      {
        type: 'pierre',
        quantite: 6,
      }
    ],
    entree: null,
    sortie: null,

    score: 11,
    proprietaire: null,
    position: null,
    activable: false
  },
  { // Atelier9
    nom: 'Atelier9',
    image: null,

    cout: [{
      type: 'pierre',
      quantite: 2,
    }],
    entree: [{
      type: 'bois',
      quantite: 2,
    }],
    sortie: [{
      type: 'score',
      quantite: 3,
    }],

    score: 5,
    proprietaire: null,
    position: null,
    activable: true
  },
  { // Bar10
    nom: 'Bar10',
    image: null,

    cout: [
      {
        type: 'pierre',
        quantite: 2,
      },
      {
        type: 'ble',
        quantite: 2
      }
    ],
    entree: null,
    sortie: [{
      type: 'score',
      quantite: 3,
    }],

    score: 7,
    proprietaire: null,
    position: null,
    activable: true
  },
  { // Boulangerie11
    nom: 'Boulangerie11',
    image: null,

    cout: [
      {
        type: 'bois',
        quantite: 2,
      }
    ],
    entree: [{
      type: 'ble',
      quantite: 1
    }],
    sortie: [{
      type: 'piece',
      quantite: 4
    }],

    score: 4,
    proprietaire: null,
    position: null,
    activable: true
  },
  { // Cathédrale12
    nom: 'Cathédrale12',
    image: null,

    cout: [
      {
        type: 'pierre',
        quantite: 6,
      }
    ],
    entree: null,
    sortie: null,

    score: 11,
    proprietaire: null,
    position: null,
    activable: false
  },
];
