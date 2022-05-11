import express from 'express';
import mongoose from 'mongoose';
import moment from 'moment';

import PostMessage from '../models/postMessage.js';

const router = express.Router();

export const getPosts = async (req, res) => {  
    try {
        const posts = await PostMessage.find().sort({ _id: -1 });

        for (const post of posts) {
            if (-(moment(post.createdAt) - (new Date()).getTime()) > 86400000) {
                await PostMessage.findByIdAndRemove(post._id);
                var index = posts.indexOf(post);
                if (index !== -1) {
                    posts.splice(post, 1);
                }
            }
        }


        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({ $or: [ { title } ]});
        for (const post of posts) {
            if (-(moment(post.createdAt) - (new Date()).getTime()) > 86400000) {
                await PostMessage.findByIdAndRemove(post._id);
                var index = posts.indexOf(post);
                if (index !== -1) {
                    posts.splice(post, 1);
                }
            }
        }

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPostsByCreator = async (req, res) => {
    const { name } = req.query;

    try {
        const posts = await PostMessage.find({ name });
        for (const post of posts) {
            if (-(moment(post.createdAt) - (new Date()).getTime()) > 86400000) {
                await PostMessage.findByIdAndRemove(post._id);
                var index = posts.indexOf(post);
                if (index !== -1) {
                    posts.splice(post, 1);
                }
            }
        }

        res.json({ data: posts });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);
        if (-(moment(post.createdAt) - (new Date()).getTime()) > 86400000) {
            await PostMessage.findByIdAndRemove(post._id);
            res.status(404).json({ message: error.message });
        }
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id ===String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
      post.createdAt = moment(post.createdAt).add(30, 'm').toDate();
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userId));
      post.createdAt = moment(post.createdAt).subtract(30, 'm').toDate();
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);
    post.createdAt = moment(post.createdAt).add(60, 'm').toDate();

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};

export default router;