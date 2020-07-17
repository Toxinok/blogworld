const log = require(INCPATH + '/log')(module);
const express = require('express');
const router = express.Router();
const ArticleModel = require(INCPATH + '/mongoose').ArticleModel;

router.get('/articles', async (req, res) => {
  log.info('==Get all articles==');

  const articles = await ArticleModel.find();

  if (!articles.length) {
    log.error('No articles found in DB');
    res.sendStatus(404);

    return;
  }

  log.info('Articles have been found');
  res.json(articles);
});

router.post('/articles', async (req, res) => {
  log.info('==Save an article==');
  try {
    const article = await ArticleModel(req.body).save();
    log.info('Successfully saved an article');
    res.json(article);
  } catch (err) {
    log.error('Error saving article');
    res.status(500).send(err.message);
  }
});

router.get('/articles/latest-article', async (req, res) => {
  log.info('==Get latest article==');

  try {
    const article = await ArticleModel.findOne().sort({_id: -1});

    if (!article) {
      log.error('Not found article in DB');
      res.sendStatus(404);

      return;
    }

    log.info('Successfully found');
    res.json(article);
  } catch (err) {
    log.error('Error finding article');
    res.status(500).send(err.message);
  }
});

router.get('/articles/authors', async (req, res) => {
  log.info('==Get all authors and their posts==');

  try {
    const searchOptions = {
      _id: true,
      title: true,
      name: true,
    };

    const articles = await ArticleModel.find({}, searchOptions);

    if (!articles.length) {
      log.error('Not found article in DB');
      res.sendStatus(404);

      return;
    }

    const authorsWithTitles = {};
    articles.forEach((element) => {
      const articleObject = {};
      articleObject.id = element._id;
      articleObject.title = element.title;
      if (!authorsWithTitles[element.name]) {
        authorsWithTitles[element.name] = [];
      }
      authorsWithTitles[element.name].push(articleObject);
    });

    log.info('Successfully found');
    res.json(authorsWithTitles);
  } catch (err) {
    log.error('Error finding article');
    res.status(500).send(err.message);
  }
});

router.get('/articles/:id', async (req, res) => {
  log.info('==Get an article by id==');

  try {
    const article = await ArticleModel.findById(req.params.id);

    if (!article) {
      log.error('Not found article in DB');
      res.sendStatus(404);

      return;
    }

    log.info('Successfully found');
    res.json(article);
  } catch (err) {
    log.error('Error finding article');
    res.status(500).send(err.message);
  }
});

router.delete('/articles/:id', async (req, res) => {
  log.info('==Delete an article by id==');

  try {
    const response = await ArticleModel.deleteOne({_id: req.params.id});

    if (!response.n) {
      log.error('Not found article in DB');
      res.sendStatus(404);

      return;
    }

    log.info('Successfully deleted');
    res.sendStatus(204);
  } catch (err) {
    log.error('Error finding article');
    res.status(500).send(err.message);
  }
});

router.put('/articles/:id', async (req, res) => {
  log.info('==Edit article description==');

  try {
    const article = await ArticleModel.findOneAndUpdate(
      {_id: req.params.id},
      {$set: {description: req.body.description}},
      {new: true},
    );

    if (!article) {
      log.error('Not found article in DB');
      res.sendStatus(404);

      return;
    }

    log.info('Successfully found');
    res.json(article);
  } catch (err) {
    log.error('Error finding article');
    res.status(500).send(err.message);
  }
});

module.exports = router;
