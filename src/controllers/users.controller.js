import { usersService } from "../services/index.js";
import User from '../dao/models/User.model.js';

const getAllUsers = async (req, res) => {
    try {
        const users = await usersService.getAll();
        res.send({ status: "success", payload: users });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Server error" });
    }
};

const getUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) return res.status(404).send({ status: "error", error: "User not found" });

        res.send({ status: "success", payload: user });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Server error" });
    }
};

const updateUser = async (req, res) => {
    try {
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) return res.status(404).send({ status: "error", error: "User not found" });

        await usersService.update(userId, updateBody);
        res.send({ status: "success", message: "User updated" });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Server error" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersService.getUserById(userId);
        if (!user) return res.status(404).send({ status: "error", error: "User not found" });

        await usersService.delete(userId);
        res.send({ status: "success", message: "User deleted" });
    } catch (error) {
        res.status(500).send({ status: "error", error: "Server error" });
    }
};

// Function to update last connection
export const updateLastConnection = async (uid) => {
    try {
        await User.findByIdAndUpdate(uid, { last_connection: new Date() });
    } catch (error) {
        console.error("Error updating last connection:", error);
    }
};

// Function to upload documents and associate them with a user
export const uploadDocuments = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await User.findById(uid);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const documents = req.files.map(file => ({ name: file.originalname, reference: file.path }));
        user.documents.push(...documents);
        await user.save();

        res.status(200).json({ message: 'Documents uploaded successfully', documents: user.documents });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export default {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    updateLastConnection,
    uploadDocuments
};
