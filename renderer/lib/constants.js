export const projects = [
  { name: 'Project 1', address: 'address 1', id: '0' },
  { name: 'Project 2', address: 'address 1', id: '10' },
  { name: 'Project 3', address: 'address 1', id: '20' },
  { name: 'Project 4', address: 'address 1', id: '30' },
  { name: 'Project 5', address: 'address 1', id: '40' },
  { name: 'Project 6', address: 'address 1', id: '50' },
  { name: 'Project 7', address: 'address 1', id: '60' },
  { name: 'Project 8', address: 'address 1', id: '70' },
  { name: 'Project 9', address: 'address 1', id: '80' },
  { name: 'Project 10', address: 'address 1', id: '90' },
];

export const architecturalStyles = [
  {
    value: 'Colonial',
    label: 'Colonial',
  },
  {
    value: 'Modern',
    label: 'Modern',
  },
  {
    value: 'Victorian',
    label: 'Victorian',
  },
  {
    value: 'Craftsman',
    label: 'Craftsman',
  },
  {
    value: 'Mediterranean',
    label: 'Mediterranean',
  },
  {
    value: 'Cape Cod',
    label: 'Cape Cod',
  },
  {
    value: 'Tudor',
    label: 'Tudor',
  },
  {
    value: 'Ranch',
    label: 'Ranch',
  },
  {
    value: 'Contemporary',
    label: 'Contemporary',
  },
  {
    value: 'French Country',
    label: 'French Country',
  },
];

export const outbuildings = [
  {
    value: 'Garage',
    label: 'Garage',
  },
  {
    value: 'Guest House',
    label: 'Guest House',
  },
  {
    value: 'Barn',
    label: 'Barn',
  },
  {
    value: 'Shed',
    label: 'Shed',
  },
  {
    value: 'Pool House',
    label: 'Pool House',
  },
  {
    value: 'Workshop',
    label: 'Workshop',
  },
  {
    value: 'Greenhouse',
    label: 'Greenhouse',
  },
  {
    value: 'Studio',
    label: 'Studio',
  },
  {
    value: 'Playhouse',
    label: 'Playhouse',
  },
  {
    value: 'Storage Unit',
    label: 'Storage Unit',
  },
];

export const emptyProjectLocalStorage = {
  userName: '',
  projectName: '',
  updatedAt: new Date().toISOString(),
  isFavorite: false,
  values: {
    address: '',
    zipCode: '',
    city: '',
    yearOfConstruction: Number(''),
    sizeOfProperty: Number(''),
    sizeOfHome: Number(''),
    numberOfBedRooms: Number(''),
    numberOfBathRooms: Number(''),
    architecturalStyle: [],
    outbuildings: [],
    uniqueSellingPoints: '',
    interiorFeatures: '',
    localAttractions: '',
    geographicalFeatures: '',
    nearbyAmenities: '',
  },
};
