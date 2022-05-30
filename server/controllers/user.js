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
  const postUserId = req.body.id;
  const loggedUserId = req.userId


  if (!loggedUserId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!UserModal.findOne({googleId: postUserId})) return res.status(404).send(`No user with id: ${id}`);
  
  const postUser = await UserModal.findOne({googleId: postUserId});
  const loggedUser = await UserModal.findOne({googleId: loggedUserId});

  const postIndex = postUser.followers.findIndex((id) => id === String(loggedUserId));
  const loggedIndex = loggedUser.following.findIndex((id) => id === String(postUserId));

  if (postIndex === -1) {
    postUser.followers.push(loggedUserId);
    console.log(`${postUser.name} Gained Follower`);
  } else {
    postUser.followers = postUser.followers.filter((id) => id !== String(loggedUserId));
    console.log(`${postUser.name} Lost Follower`);
  }
  if (loggedIndex === -1) {
    loggedUser.following.push(postUserId);
    console.log("Followed")
  } else {
    loggedUser.following = loggedUser.following.filter((id) => id !== String(postUserId));
    console.log("Unfollowed")
  }

  const updatedPostUser = await UserModal.findOneAndUpdate({googleId: postUserId}, postUser, { new: true });
  const updatedLoggedUser = await UserModal.findOneAndUpdate({googleId: loggedUserId}, loggedUser, { new: true });

  res.status(200).json(updatedLoggedUser);
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
