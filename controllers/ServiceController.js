import ServiceModel from '../models/Service.js';

export const getLastTags = async (req, res) => {
  try {
    const services = await ServiceModel.find().limit(5).exec();

    const tags = services
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить тэги',
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const services = await ServiceModel.find().populate('user').exec();
    res.json(services);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const serviceId = req.params.id;

    const updatedDoc = await ServiceModel.findOneAndUpdate(
      {
        _id: serviceId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        new: true,
      }
    ).populate('user');

    if (!updatedDoc) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json(updatedDoc);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статью',
    });
  }
};


export const remove = async (req, res) => {
  try {
    const serviceId = req.params.id;

    const doc = await ServiceModel.findOneAndDelete({ _id: serviceId }).exec();

    if (!doc) {
      return res.status(404).json({
        message: 'Статья не найдена',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить статью',
    });
  }
};


export const create = async (req, res) => {
  try {
    const doc = new ServiceModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(",").map(tag => tag.trim()), // Split tags by commas and trim whitespace
      user: req.userId,
    });

    const service = await doc.save();

    res.json(service);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const update = async (req, res) => {
  try {
    const serviceId = req.params.id;

    await ServiceModel.updateOne(
      {
        _id: serviceId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(",").map(tag => tag.trim()), // Split tags by commas and trim whitespace
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
