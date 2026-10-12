import { Router } from 'express';
import stories from '../db/seed.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json(stories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const story = stories.find((s) => s.id === parseInt(id));
  if (!story) {
    return res.status(404).json({ message: 'Story not found' });
  }
  res.status(200).json(story);
});

router.post('/', authenticateToken, requireAdmin, (req, res) => {
  const { title, excerpt, image, imageAlt, author, date, category, chapter } = req.body;

  if (!title || !excerpt || !image || !imageAlt || !author || !date || !category || !chapter) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newStory = {
    id: stories.length > 0 ? Math.max(...stories.map((s) => s.id)) + 1 : 1,
    title,
    excerpt,
    image,
    imageAlt,
    author,
    date,
    category,
    chapter
  };
  stories.push(newStory);
  res.status(201).json(newStory);
});

router.patch('/:id', authenticateToken, requireAdmin, (req, res) => {
    const id = Number(req.params.id);
    const index = stories.findIndex((s) => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Article not found' });
    }

    const { title, excerpt, image, category, chapter } = req.body;
    const newobj = {title, excerpt, image, category, chapter}
    

    if (!title || !excerpt || !image || !category || !chapter) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    stories[index] = {
        ...stories[index], ...newobj
    }

    res.status(200).json(stories[index]);
});

router.delete("/:id", authenticateToken, requireAdmin, (req, res) => {
    const id = Number(req.params.id)
    const index = stories.findIndex((story) => story.id === id)

    if (index === -1) {
        return res.status(404).json({message: "Article not found"})
    }

    const deletedArticle = stories.splice(index, 1)[0]
    res.status(200).json(deletedArticle)

})

export default router;