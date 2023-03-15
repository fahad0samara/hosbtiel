
import mongoose from "mongoose";





//bcrypt

require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose
  .connect(
    // @ts-ignore
    process.env.Patient_URI,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err: any) => console.log(err, "error mongodeb"));
// const prescriptionSchema = require("./prescription");

const patientSchema = new mongoose.Schema({
  healthIDNumber: {
    type: Number,
  },

  /* A reference to the User model. */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  avatar: {
    type: String,
    default:
      "  https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
  },

  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    minlength: 1,
  },
  weight: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },

  bloodGroup: {
    type: String,
    required: true,
  },
  address: {
    building: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    Street: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    ZipCode: {
      type: Number,

      required: true,
    },
  },

  diseaseList: [
    {
      disease: {
        type: String,
      },
      YearRound: {
        type: Number,
      },
    },
  ],

  allergyList: [
    {
      allergy: {
        type: String,
      },
      YearRound: {
        type: Number,
      },
    },
  ],
  medicationList: [
    {
      medication: {
        type: String,
      },
      YearRound: {
        type: Number,
      },
    },
  ],
  contactPerson: {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      LastName: {
        type: String,
        required: true,
      },
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    relation: {
      type: String,
      required: true,
    },
    age: {
      type: Date,
      required: true,
    },

    address: {
      building: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      Street: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      ZipCode: {
        type: Number,
        required: true,
      },
    },
  },
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
