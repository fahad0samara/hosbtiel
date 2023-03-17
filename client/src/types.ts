export interface Name {
  firstName: string;
  middleName: string;
  LastName: string;
}

export interface User {
  email: string;
  password: string;
  createdAt: string;
}

export interface HospitalAddress {
  city: string;
  building: string;
  state: string;
  ZipCode: string;
  Country: string;
}

export interface Doctor {
  _id: string;
  name: Name;
  user: User;
  phoneNumber: string;
  Hospital: string;
  HospitalAddress: HospitalAddress;
  specialty: string;
  degree: string;
  experience: string;
  date: string;
  bloodGroup: string;
  avatar: string;
}

export interface patient {
  _id: string;
  healthIDNumber: string;
  name: {
    firstName: string;
    middleName: string;
    LastName: string;
  };
  user: User;
  mobile: number;
  address: {
    [x: string]: any;
    building: string;
    city: string;
    street: string;
    district: string;
    state: string;
    zipCode: number;
  };
  date: string;
  bloodGroup: string;
  weight: number;
  height: number;
  diseaseList: {
    disease: string;
    YearRound: number;
  }[];

  allergyList: {
    allergy: string;
    yearRound: number;
  }[];
  medicationList: {
    medication: string;
    yearRound: number;
  }[];

  contactPerson: {
    name: Name;
    mobile: number;
    email: string;
    relation: string;
    age: string;
    address: {
      [x: string]: any;
      building: string;
      city: string;
      street: string;
      district: string;
      state: string;
      zipCode: number;
    };
  };
}
export interface Appointment {
  _id: string;
  appointmentDate: string;
  appointmentTime: string;
  createdAt: string;
  doctor: {
    name: {
      firstName: string;

      lastName: string;
    };
    _id: string;
    specialty: string;
  };
  patient: string;
  status: string;
  symptoms: string[];
  __v: number;
}

export interface Data {
  filter(arg0: (doctor: any) => boolean): import("react").SetStateAction<Data>;
  map(arg0: (doctor: any) => JSX.Element): import("react").ReactNode;
  length: number;

  name: Name;
  user: User;
  phoneNumber: string;
  Hospital: string;
  HospitalAddress: HospitalAddress;
  specialty: string;
  degree: string;
  experience: string;
  date: string;
  bloodGroup: string;
}
