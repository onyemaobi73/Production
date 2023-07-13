import express, { Request, Response } from "express";
import authModel from "../model/authModel";
import bcrypt from "bcrypt";

export const readUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await authModel.find();

    return res.status(200).json({
      message: "Get all users",
      data: user,
    });
  } catch (error:any) {
    return res.status(404).json({ message: error.message });
  }
};
export const readOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = await authModel.findById(id);

    return res.status(200).json({
      message: "Get one user",
      data: user,
    });
  } catch (error:any) {
    return res.status(404).json({ message: error.message });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { userName, avatar } = req.body;
    const user = await authModel.findByIdAndUpdate(
      id,
      { userName, avatar },
      { new: true }
    );

    return res.status(201).json({
      message: "Account updated",
      data: user,
    });
  } catch (error:any) {
    return res.status(404).json({
      message: error.message
    });
  }
};
export const deleteOneUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = await authModel.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Account deleted",
      data: user,
    });
  } catch (error:any) {
    return res.status(404).json({ message: error.message });
  }
};

export const createAccount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userName, email, passsword, avatar } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passsword, salt);
    
    const user = await authModel.create({ email, passsword, userName, avatar });
    return res.status(201).json({
      message: "Account Created",
      data: user,
    });
  } catch (error:any) {
    return res.status(404).json({ message: error.message });
  }
};

export const signInAccount = async (req:Request, res:Response):Promise<Response> => {
    try {
        const {email, passsword} = req.body;

const user = await authModel.findOne({ email });
if (user) {
    const passed = await bcrypt.compare(passsword, user.passsword!);

    if (passed) {
        return res.status(201).json({
            message:`welcome back ${user.userName};`
        })
    } else {
        return res.status(404).json({
            message:"password is incorrect",
        });
    }
} else {
    return res.status(404).json({
        message:"User not found"
    })
}
    } catch (error:any) {
        return res.status(404).json({
            message:error.message
        })
    }
}
