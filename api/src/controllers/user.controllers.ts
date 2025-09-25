import { Request, Response } from "express";
import { User } from "../models/user.model";
import { fetchUserDataFromGitHub } from "../services/gitFetch.service";

export const getUser = async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username, is_deleted: false }).lean();
        console.log("Fetched User from DB:",user);
        if (user) {
            return res.status(200).json(user);
        }else{
            const userData = await fetchUserDataFromGitHub(username);
            const newUser = new User(userData.user);
            await newUser.save()
            res.status(200).json(userData.user);
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getSavedUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ is_deleted: false }).lean();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const editUser = async (req: Request, res: Response) => {
    console.log(req.body);
    const { id, bio, location } = req.body;
    try {
        const user = await User.findByIdAndUpdate({ _id: id }, { location, bio }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
