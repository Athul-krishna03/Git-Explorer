import { Router } from "express";
import { getUser,getSavedUsers, editUser} from "../controllers/user.controllers";

const router = Router();


router.get("/users/:username", getUser);
router.get("/users", getSavedUsers);
router.patch("/edit", editUser);

export default router;