import Joi from "joi";
import Jwt from "jsonwebtoken";

//Vendors to Update their Records
export const updateVendorsSchema = Joi.object().keys({
  firstname: Joi.string().lowercase().required(),
  lastname: Joi.string().lowercase().required(),
  email: Joi.string().trim().lowercase().required(),
  bvn: Joi.string().length(11).required(),
  phone: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  local_govt: Joi.string().required(),
  work_address: Joi.string().required(),
  dob: Joi.string().required(),
  state_of_origin: Joi.string().required(),
});

// Vendors can Register on the page.
export const registerVendorsSchema = Joi.object()
  .keys({
    firstname: Joi.string().lowercase().required(),
    lastname: Joi.string().lowercase().required(),
    email: Joi.string().trim().lowercase().required(),
    bvn: Joi.string().length(11).required(),
    phone: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    local_govt: Joi.string().required(),
    work_address: Joi.string().required(),
    dob: Joi.string().required(),
    state_of_origin: Joi.string().required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    confirm_password: Joi.ref("password"),
    image_url: Joi.string(),
  })
  .with("password", "confirm_password");

//Vendors can Log In
export const loginVendorsSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

// Users can Register on the Website
export const registerUsersSchema = Joi.object()
  .keys({
    fullname: Joi.string().lowercase().required(),
    email: Joi.string().trim().lowercase().required(),
    phone: Joi.string()
      .length(11)
      .pattern(/^[0-9]+$/)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    confirm_password: Joi.ref("password"),
  })
  .with("password", "confirm_password");

//Users can Log in to the Website
export const loginUsersSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

// Json Web Token
export const generateToken = (vendors: { [key: string]: unknown }): unknown => {
  const pass = process.env.JWT_SECRET as string;
  return Jwt.sign({ vendors }, pass, { expiresIn: "7d" });
};

//Options
export const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};
