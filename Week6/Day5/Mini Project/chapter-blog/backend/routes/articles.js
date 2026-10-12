import { Router } from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { getDatabase } from '../db/mongodb.js';

const router = Router();

router.get('/', async (req, res) => {
  const articles = await getDatabase()
    .collection('articles')
    .find({}, { projection: { _id: 0 } })
    .sort({ id: 1 })
    .toArray();

  res.status(200).json(articles);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const story = await getDatabase()
    .collection('articles')
    .findOne({ id }, { projection: { _id: 0 } });

  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }

  res.status(200).json(story);
});

router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  const { title, excerpt, image, imageAlt, author, date, category, chapter } = req.body;

  if (!title || !excerpt || !image || !imageAlt || !author || !date || !category || !chapter) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const articlesCollection = getDatabase().collection('articles');
  const latestArticle = await articlesCollection.findOne(
    {},
    { sort: { id: -1 }, projection: { id: 1 } }
  );

  const newStory = {
    id: latestArticle ? latestArticle.id + 1 : 1,
    title,
    excerpt,
    image,
    imageAlt,
    author,
    date,
    category,
    chapter,
  };

  await articlesCollection.insertOne(newStory);
  res.status(201).json(newStory);
});

router.patch('/:id', authenticateToken, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const { title, excerpt, image, category, chapter } = req.body;

  if (!title || !excerpt || !image || !category || !chapter) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const articlesCollection = getDatabase().collection('articles');
  const result = await articlesCollection.updateOne(
    { id },
    { $set: { title, excerpt, image, category, chapter } }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({ message: 'Article not found' });
  }

  const updatedArticle = await articlesCollection.findOne(
    { id },
    { projection: { _id: 0 } }
  );
  res.status(200).json(updatedArticle);
});

router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const articlesCollection = getDatabase().collection('articles');
  const deletedArticle = await articlesCollection.findOneAndDelete(
    { id },
    { projection: { _id: 0 } }
  );

  if (!deletedArticle) {
    return res.status(404).json({ message: 'Article not found' });
  }

  res.status(200).json(deletedArticle);
});

export default router;