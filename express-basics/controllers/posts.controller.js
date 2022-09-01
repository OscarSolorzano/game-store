// Models
const { Post } = require('../models/post.model');

const getAllPosts = async (req, res) => {
	try {
		const posts = await Post.findAll();

		res.status(200).json({
			status: 'success',
			data: {
				posts,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

const createPost = async (req, res) => {
	try {
		const { title, content, userId } = req.body;

		const newPost = await Post.create({ title, content, userId });

		res.status(201).json({
			status: 'success',
			data: { newPost },
		});
	} catch (error) {
		console.log(error);
	}
};

const updatePost = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, content } = req.body;

		const post = await Post.findOne({ where: { id } });

		if (!post) {
			return res.status(404).json({
				status: 'error',
				message: 'Post not found',
			});
		}

		await post.update({ title, content });

		res.status(200).json({
			status: 'success',
			data: { post },
		});
	} catch (error) {
		console.log(error);
	}
};

const deletePost = async (req, res) => {
	try {
		const { id } = req.params;

		const post = await Post.findOne({ where: { id } });

		if (!post) {
			return res.status(404).json({
				status: 'error',
				message: 'Post not found',
			});
		}

		await post.update({ status: 'deleted' });

		res.status(200).json({
			status: 'success',
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getAllPosts,
	createPost,
	updatePost,
	deletePost,
};
