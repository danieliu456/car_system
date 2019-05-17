import LocalizedStrings from 'react-localization';


export const strings = new LocalizedStrings({
    en:{
      user:"Username",
      password:"Password",
      login:"Login",
      main:'Main',
      vehicles: 'Vehicles',
      submit: 'Submit',
      logout: 'Logout',
      livemap: 'Live Map',
      carlist: 'Car List',
      carorder: 'Car Order',
      addcar: 'Add Car',
      simserverspeed: 'SimServer Speed',
      cars: 'Cars',
      orderedcars: 'Ordered Cars',
      freecars: 'Free Cars',
      carstatus: 'Car Status',
      carorders: 'Car Orders',
      yourquery: 'Your Query',
      yourownquery: 'Write your own Query',
      // Car Order
      chooseselection: 'Choose Selection',
      choosevehicleid: 'Choose Car ID:',
      choosedestination: 'Choose Car Destination',
      chooseset: 'Choose Set:',
      // Car Add
      carmodel: 'Car Model',
      carstartlocation: 'Start Location',
      carplatenum: 'Plate Number',
      carseats: 'Seats Num.',
      carfuelcapacity: 'Fuel Capacity',
      caravgfuel: 'Average fuel consumption',
      // SimSpeed
      simspeed: "Choose SimServer speed multiplier",

      purpose: "Paskirtis",
      single: 'Vienas',
      set: "Rinkinys",
      // CarInfo
      id: 'ID: ',
      destination: 'Destination: ',
      model: 'Model: ',
      fuel: 'Fuel: ',
      passengers: 'Passengers: ',
      reserved: 'Reserved: ',
      order: 'Order: '
    },
    lt: {
      user:"Slapyvardis",
      password:'Slaptazodis',
      login:"Prisijungimas",
      main:'Pagrindinis',
      vehicles: 'Automobiliai',
      submit: 'Pateikti',
      logout: 'Atsijungti',
      livemap: 'Žemėlapiai',
      carlist: 'Automobilių sąrašas',
      carorder: 'Automobilio užsakymas',
      addcar: 'Pridėti automobilį',
      simserverspeed: 'SimServer Greitis',
      cars: 'Automobiliai',
      orderedcars: 'Užsakyti automobiliai',
      freecars: 'Laisvi automobiliai',
      carstatus: 'Automobilių būsena',
      carorders: 'Automobilių užsakymai',
      yourquery: 'Jūsų užklausa',
      yourownquery: 'Pasirašykite savo užklausą',
      // Car Order
      chooseselection: 'Pasirinkimo režimas:',
      choosevehicleid: 'Automob. ID:',
      choosedestination: 'Destinacija',
      chooseset: 'Pasirinkite rinkinį:',
      // Car Add
      carmodel: 'Modelis',
      carstartlocation: 'Pradinė lokacija',
      carplatenum: 'Valstybinis nr.',
      carseats: 'Vietų sk.',
      carfuelcapacity: 'Kuro talpa',
      caravgfuel: 'Kuro suvartojimo vidurkis',
      // SimSpeed
      simspeed: "SimServer greitis",

      purpose: "Paskirtis",
      single: 'Vienas',
      set: "Rinkinys",
      // CarInfo
      id: 'ID: ',
      destination: 'Destinacija: ',
      model: 'Modelis: ',
      fuel: 'Kuras: ',
      passengers: 'Keleiviai: ',
      reserved: 'Rezervuota: ',
      order: 'Užsakyti: '
    }
});

export function setLanguage(languageCode){
    strings.setLanguage(languageCode)
}

export function getLanguage(){
    strings.getLanguage();
}
    