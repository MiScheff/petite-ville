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
    type: 'blé',
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
        type: 'blé',
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
      type: 'blé',
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







  
  { // 1
    nom: '1',
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
  { // 2
    nom: '2',
    image: null,

    cout: [
      {
        type: 'pierre',
        quantite: 2,
      },
      {
        type: 'blé',
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
  { // 3
    nom: '3',
    image: null,

    cout: [
      {
        type: 'bois',
        quantite: 2,
      }
    ],
    entree: [{
      type: 'blé',
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
  { // 4
    nom: '4',
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
  { // 5
    nom: '5',
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
  { // 6
    nom: '6',
    image: null,

    cout: [
      {
        type: 'pierre',
        quantite: 2,
      },
      {
        type: 'blé',
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
  { // 7
    nom: '7',
    image: null,

    cout: [
      {
        type: 'bois',
        quantite: 2,
      }
    ],
    entree: [{
      type: 'blé',
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
  { // 8
    nom: '8',
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
  { // 9
    nom: '9',
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
  { // 10
    nom: '10',
    image: null,

    cout: [
      {
        type: 'pierre',
        quantite: 2,
      },
      {
        type: 'blé',
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
  { // 11
    nom: '11',
    image: null,

    cout: [
      {
        type: 'bois',
        quantite: 2,
      }
    ],
    entree: [{
      type: 'blé',
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
  { // 12
    nom: '12',
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
