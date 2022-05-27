import UserModal from "../models/user.js";
import mongoose from 'mongoose';

const secret = 'test'

export const login = async (req, res) => {
  const { email, googleId, imageUrl, name } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser) return res.status(200).json({ result: oldUser });

    const result = await UserModal.create({ email, googleId, imageUrl, name });

    res.status(201).json({ result });
    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const followUser = async (req, res) => {
  const id = req.body.id;


  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!UserModal.findOne({googleId: req.userId})) return res.status(404).send(`No user with id: ${id}`);
  
  const user = await UserModal.findOne({googleId: id});

  const index = user.followers.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    user.followers.push(req.userId);
    console.log("Followed")
  } else {
    user.followers = user.followers.filter((id) => id !== String(req.userId));
    console.log("Unfollowed")
  }

  const updatedUser = await UserModal.findOneAndUpdate({googleId: id}, user, { new: true });

  res.status(200).json(updatedUser);
}

export const getUser = async (req, res) => { 
  const id = req.params.id;

  try {
      const user = await UserModal.findOne({id: id});
      
      res.status(200).json(user);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}
