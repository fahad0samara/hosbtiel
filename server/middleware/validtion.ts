import {string} from "joi";

const Joi = require("joi");
// register validation

const registerValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.object({
      firstName: Joi.string().min(1).required(),
      middleName: Joi.string().min(1).required(),
      LastName: Joi.string().min(1).required(),
    }),
    weight: Joi.number().min(1).max(999999).required(),
    height: Joi.number().min(1).max(999999).required(),

    date: Joi.date().required(),
    user: Joi.required(),

    bloodGroup: Joi.string().required(),

    mobile: Joi.number().min(8).required(),
    contactPerson: Joi.object({
      name: Joi.object({
        firstName: Joi.string().min(1).required(),
        LastName: Joi.string().min(1).required(),
      }),
      mobile: Joi.number().min(8).required(),
      email: Joi.string().min(5).required().email(),
      relation:
        Joi.string().min(1).max(10).required() &&
        Joi.string().min(1).max(10).required(),
      age: Joi.date().required(),
      address: [
        {
          building: Joi.string().min(1).required(),
          city: Joi.string().min(1).required(),
          Street: Joi.string().min(1).required(),
          district: Joi.string().min(1).required(),
          state: Joi.string().min(1).required(),
          ZipCode: Joi.number().min(4).max(999999).required(),
        },
      ],
    }),
    address: [
      {
        building: Joi.string().min(3).required(),
        city: Joi.string().min(3).required(),
        Street: Joi.string().min(3).required(),
        district: Joi.string().min(3).required(),
        state: Joi.string().min(1).required(),
        ZipCode: Joi.number().min(1).max(999999).required(),
      },
    ],
    allergyList: Joi.array().items(
      Joi.object({
        allergy: Joi.string().allow("").optional(),
      })
    ),

    medicationList: Joi.array().items(
      Joi.object({
        medication: Joi.string().allow("").optional(),
      })
    ),

    diseaseList: Joi.array().items(
      Joi.object({
        disease: Joi.string().allow("").optional(),
      })
    ),
  });
  return schema.validate(data);
};
// login validation
const loginValidation = (data: any) => {
  const schema = Joi.object({
    password: Joi.string().min(5).required(),
    healthIDNumber: Joi.string().required(),
    email: Joi.string().min(5).required().email(),
  });
  return schema.validate(data);
};

// addPrescriptions validation
const addPrescriptionsValidation = (data: any) => {
  const schema = Joi.object({
    doctorID: Joi.number().min(5).required(),
    date: Joi.date().required(),
    medicines: Joi.object({
      name: Joi.string().min(1).required(),

      type: Joi.string().min(1).required(),

      frequency: Joi.string().min(1).required(),
    }),

    department: Joi.object({
      name: Joi.string().min(1).required(),
      type: Joi.string().min(1).required(),
      phone: Joi.number().min(1).required(),
    }),

    doctor: Joi.string().min(1).required(),

    tests: Joi.object({
      name: Joi.string().min(1).required(),
      date: Joi.date().required(),
    }),

    advice: Joi.string().min(1).required(),
    dosage: Joi.string().min(1).required(),
    nextVisit: Joi.number().min(1).max(999999).required(),
  });
  return schema.validate(data);
};

// doctor validation
const doctorValidation = (data: any) => {
  const schema = Joi.object({
    user: Joi.string(),

    name: Joi.object({
      firstName: Joi.string().min(1).required(),
      middleName: Joi.string().min(1),
      lastName: Joi.string().min(1).required(),
    }),
    Hospital: Joi.string().min(1).required(),
    HospitalAddress: Joi.object({
      city: Joi.string().min(1).required(),
      building: Joi.string().min(1).required(),
      state: Joi.string().min(1).required(),
      ZipCode: Joi.number().min(1).max(999999).required(),
      Country: Joi.string().min(1).required(),
    }),
    Gender: Joi.string().min(1).max(10).required(),
    weight: Joi.number().min(1).max(999999).required(),
    height: Joi.number().min(1).max(999999).required(),

    date: Joi.date().required(),

    bloodGroup: Joi.string().required(),
    degree: Joi.string().min(1).required(),
    specialty: Joi.string().min(1).required(),
    experience:
      Joi.number().min(1).max(999999).required() &&
      Joi.number().min(1).max(999999).required(),
    phoneNumber: Joi.number().min(6).required(),
  });
  return schema.validate(data);
};

//  loginDoctor validation
const loginDoctorValidation = (data: any) => {
  const schema = Joi.object({
    password: Joi.string().min(5).required(),
    email: Joi.string().min(5).required().email(),
  });
  return schema.validate(data);
};

// admin validation
const adminValidation = (data: any) => {
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required(),
    phoneNumber: Joi.number().min(6).required(),
  });
  return schema.validate(data);
};

// loginAdmin validation
const loginAdminValidation = (data: any) => {
  const schema = Joi.object({
    password: Joi.string().min(5).required(),
    email: Joi.string().min(5).required().email(),
  });
  return schema.validate(data);
};

// registerUser validation
const registerUserValidation = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};

// login validation
const loginUserValidation = (data: any) => {
  const schema = Joi.object({
    password: Joi.string().min(5).required(),
    email: Joi.string().min(5).required().email(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.addPrescriptionsValidation = addPrescriptionsValidation;
module.exports.doctorValidation = doctorValidation;
module.exports.loginDoctorValidation = loginDoctorValidation;
module.exports.adminValidation = adminValidation;
module.exports.loginAdminValidation = loginAdminValidation;
module.exports.registerUserValidation = registerUserValidation;
module.exports.loginUserValidation = loginUserValidation;
