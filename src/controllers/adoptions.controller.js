import mongoose from 'mongoose';
import { adoptionsService, petsService, usersService } from "../services/index.js";
import Adoption from '../dao/models/Adoption.model.js';
import User from '../dao/models/User.model.js';
import Pet from '../dao/models/Pet.model.js';

const getAllAdoptions = async (req, res) => {
    try {
        const result = await adoptionsService.getAll();
        res.send({ status: "success", payload: result });
    } catch (error) {
        console.error("Error fetching adoptions:", error);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const getAdoption = async (req, res) => {
    try {
        const adoptionId = req.params.aid;
        
        // ✅ Validate if adoption ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(adoptionId)) {
            return res.status(400).send({ status: "error", error: "Invalid adoption ID format" });
        }

        const adoption = await adoptionsService.getBy({ _id: adoptionId });
        if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });

        res.send({ status: "success", payload: adoption });
    } catch (error) {
        console.error("Error fetching adoption:", error);
        res.status(500).send({ status: "error", error: "Internal server error" });
    }
};

const createAdoption = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { uid, pid } = req.params;

        if (!mongoose.Types.ObjectId.isValid(uid) || !mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ status: "error", error: "Invalid user or pet ID format" });
        }

        const user = await usersService.getUserById(uid).session(session);
        if (!user) return res.status(404).send({ status: "error", error: "User not found" });

        const pet = await petsService.getBy({ _id: pid }).session(session);
        if (!pet || pet.adopted) {
            return res.status(400).send({ status: "error", error: "Pet not available for adoption" });
        }

        user.pets.push(pet._id);
        await usersService.update(user._id, { pets: user.pets }).session(session);

        await petsService.update(pet._id, { adopted: true, owner: user._id }).session(session);

        const adoption = new Adoption({ user: uid, pet: pid, date: new Date() });
        await adoption.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ status: "success", message: "Pet adopted", adoption });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error("Error creating adoption:", error);
        res.status(500).json({ status: "error", error: "Internal server error" });
    }
};

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
};
