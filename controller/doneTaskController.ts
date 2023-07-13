import express, { Request, Response } from "express";
import doneTaskModel from "../model/doneModel";

export const createTask = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { task, priority } = req.body;
    const tasked = await doneTaskModel.create({ task, priority });
    return res.status(201).json({
      message: "Task has been created successfuly",
      data: tasked,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Task cannot be created",
    });
  }
};

export const getTask = async (req: Request, res: Response):Promise<Response> => {
  try {
    const tasked = await doneTaskModel.find().sort({ createdAt: -1});
    return res.status(200).json({
      message: "viewing all task",
      data: tasked,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Task cannot be viewed",
    });
  }
};

export const getOneTask = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id } = req.params;
    const tasked = await doneTaskModel.findById(id);
    return res.status(200).json({
      message: "viewing task",
      data: tasked,
    });
  } catch (error) {
  return  res.status(404).json({
      message: "Task cannot be view",
    });
  }
};
export const updateOneTask = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id } = req.params;
    const tasked = await doneTaskModel.findByIdAndUpdate(
      id,
      { isComplete: true },
      { new: true }
    );
    return res.status(201).json({
      message: "Task updated",
      data: tasked,
    });
  } catch (error) {
   return res.status(404).json({
      message: "task updated failed",
    });
  }
};
export const deleteOneTask = async (req: Request, res: Response):Promise<Response> => {
  try {
    const { id } = req.params;
    const tasked = await doneTaskModel.findByIdAndDelete(id);

    return res.status(201).json({
      message: "Task deleted",
      data: tasked,
    });
  } catch (error) {
  return res.status(404).json({
      message: "deleting task failed",
    });
  }
};
