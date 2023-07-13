import express, { Router}  from "express"
import { 
    createTask, 
    getOneTask, 
    getTask, 
    updateOneTask, 
    deleteOneTask 
} from "../controller/doneTaskController";

const router = Router();

router.route("/").get(getTask).post(createTask)

router.route("/:id").get(getOneTask).patch(updateOneTask).delete(deleteOneTask)

export default router;
