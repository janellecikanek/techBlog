const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
  try {
    const dbPostData = await Blog.findAll({
      attributes: ["id", "title", "content", "created_at"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const dbPostData = await Blog.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "content", "title", "created_at"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    console.log(dbPostData);


    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post('/', 
//withAuth,
 async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// THIS WORKS!
router.delete('/:id', 
// withAuth,
 async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

