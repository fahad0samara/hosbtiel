import jwt from "jsonwebtoken";
import User from "../model/User";
import Patient from "../model/patient";



interface JwtPayload {
  _id: string;
}
// auth the patient
export const authUser = async (req: any, res: any, next: any) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};


export const isAuth = async (req: any, res: any, next: any) => {
  if (req.header && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const user = await User.findById((decoded as JwtPayload)._id)
      if (!user) {
        return res.status(400).send("user not found");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(400).send("Invalid Token 2");
    }
  } else {
    res.status(400).send("Invalid Token");
  }
};

export const authPatient = async (req: any, res: any, next: any) => {
  if (req.header && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const user = await Patient.findById((decoded as JwtPayload)._id).populate("user");

      if (!user) {
        return res.status(400).send("user nott found");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(400).send("Invalid Token 2");
    }
  } else {
    res.status(400).send("Invalid Token");
  }
};



//admin middleware
export const authAdmin = async (req: any, res: any, next: any) => {
  if (!req.user.roles || !req.user.roles.admin) {
    return res.status(400).send("you not admin");
  }
};

//admin middleware
export const isAdmin = async (req: any, res: any, next: any) => {
  if (!req.user.roles || !req.user.roles.admin) {
    return res.status(400).send("you not admin");
  }
  next();
};
