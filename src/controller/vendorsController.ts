import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { VendorSchema } from "../model/vendorsModel";
import {
  registerVendorsSchema,
  updateVendorsSchema,
  generateToken,
  loginVendorsSchema,
  options,
} from "../utils/utils";
import bcrypt from "bcryptjs";

/**
 * Create vendor API
 * @param req
 * @param res
 * @param next
 */
export async function createVendor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();

  // console.log(req.body);

  try {
    const validationResult = registerVendorsSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const duplicateEmail = await VendorSchema.findOne({
      where: { email: req.body.email },
    });

    if (duplicateEmail) {
      return res.status(409).json({
        msg: "Email is used, please change email",
      });
    }

    const duplicatePhone = await VendorSchema.findOne({
      where: { phone: req.body.phone },
    });

    if (duplicatePhone) {
      return res.status(409).json({
        msg: "Phone number is used",
      });
    }

    const passwordHash = await bcrypt.hash(req.body.password, 8);
    const ConfirmPasswordHash = await bcrypt.hash(req.body.confirm_password, 8);
    const vendorData = {
      id,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      bvn: req.body.bvn,
      local_govt: req.body.local_govt,
      work_address: req.body.work_address,
      dob: req.body.dob,
      state_of_origin: req.body.state_of_origin,
      password: passwordHash,
      confirm_password: ConfirmPasswordHash,
      image_url: req.body.image_url,
    };

    const vendorDetails = await VendorSchema.create(vendorData);

    // const id = vendorDetails?.id;
    const token = generateToken({ id });
    res.status(201).json({
      status: "Success",
      token,
      message: "Successfully created a vendor",
      data: vendorDetails,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "Failed",
      Message: "Unable to create a vendor",
    });
  }
}

/**
 * Get All vendors API
 * @param req
 * @param res
 * @param next
 */

export async function getAllVendors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const vendorDetails = await VendorSchema.findAll();
    res.status(201).json({
      status: "Success",
      message: "Successfully get all vendors",
      data: vendorDetails,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      Message: "Something went all",
    });
  }
}

/**
 * Get a vendor API
 * @param req
 * @param res
 * @param next
 */
export async function getVendor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const userDetails = await VendorSchema.findOne({ where: { id } });

    res.status(201).json({
      status: "Success",
      message: "Successfully get a vendor",
      data: userDetails,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      Message: "Something went all",
    });
  }
}

/**
 * Update User API
 * @param req
 * @param res
 * @param next
 */
export async function updateVendor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const vendorDetails = await VendorSchema.findOne({ where: { id } });
    const {
      firstname,
      lastname,
      email,
      phone,
      bvn,
      local_govt,
      work_address,
      dob,
      state_of_origin,
      image_url,
    } = req.body;
    if (vendorDetails) {
      const updateUpdate = await vendorDetails.update({
        firstname: firstname || vendorDetails.getDataValue("firstname"),
        lastname: lastname || vendorDetails.getDataValue("lastname"),
        email: email || vendorDetails.getDataValue("email"),
        phone: phone || vendorDetails.getDataValue("phone"),
        bvn: bvn || vendorDetails.getDataValue("bvn"),
        local_govt: local_govt || vendorDetails.getDataValue("local_govt"),
        work_address:
          work_address || vendorDetails.getDataValue("work_address"),
        dob: dob || vendorDetails.getDataValue("dob"),
        state_of_origin:
          state_of_origin || vendorDetails.getDataValue("state_of_origin"),
        image_url: image_url || vendorDetails.getDataValue("image_url"),
      });
      res.status(201).json({
        status: "Success",
        message: "Successfully updated a vendor",
        data: updateUpdate,
      });
    } else {
      res.json({
        status: "failed",
        message: "Vendor not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      Message: "Unable to update vendor",
    });
  }
}

/**
 * Delete a vendor API
 * @param req
 * @param res
 */

export async function deleteVendor(req: Request, res: Response) {
  const { id } = req.params;

  console.log(id);

  const vendorDetails = await VendorSchema.findOne({ where: { id } });
  if (!vendorDetails) {
    res.json({
      status: "failed",
      message: "Vendor not found",
    });
  } else {
    const deletedVendor = await vendorDetails.destroy();
    res.status(201).json({
      status: "Success",
      message: "Successfully Deleted a vendor",
      data: deletedVendor,
    });
  }
}

/**
 * THE LOGIN API
 * @param req
 * @param res
 * @param next
 * @returns
 */
export async function loginVendor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const id = uuidv4();
  try {
    const validationResult = loginVendorsSchema.validate(req.body, options);

    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const User = (await VendorSchema.findOne({
      where: { email: req.body.email },
    })) as unknown as { [key: string]: string };

    if (!User) {
      return res.status(401).json({
        message: "Vendor does not exist or Email is not correct",
      });
    }

    const { id } = User;
    const token = generateToken({ id });
    const validUser = await bcrypt.compare(req.body.password, User.password);

    if (!validUser) {
      return res.status(401).json({
        message: "Password is not correct",
      });
    } else if (req.body.email !== User.email) {
      return res.status(401).json({
        message: "Email is not correct",
      });
    }

    if (validUser) {
      // console.log(req.cookies);
      // console.log(id);
      // console.log(User.firstname);

      // console.log("line 288", token);

      return res
        .cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          message: "Successfully logged in",
          token,
          User,
        });
    }
  } catch (err) {
    res.status(500).json({
      message: "failed to login",
      route: "/login",
    });
  }
}
