import CommentModel from '../models/Comment.js';

export const createComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.userId;
    const { text } = req.body; 

    const comment = new CommentModel({
      text,
      user: userId,
      post: postId,
    });

    const savedComment = await comment.save();

    res.json(savedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать комментарий',
    });
  }
};


export const getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await CommentModel.find({ post: postId }).populate('user').exec();

    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить комментарии',
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const deletedComment = await CommentModel.findOneAndDelete({ _id: commentId }).exec();

    if (!deletedComment) {
      return res.status(404).json({
        message: 'Комментарий не найден',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить комментарий',
    });
  }
};
