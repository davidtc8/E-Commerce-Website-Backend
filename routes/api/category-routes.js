const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }],
    });
    if (!allCategories) {
      res.status(404).json({message: 'The categories were not found, please talk with the Developer or Company'})
      return;
    }
    res.status(200).json(allCategories);
  } catch(err) {
    res.status(500).json({message: `There was a misterious error \n ${err}`})
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ 
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }],
    });
    if (!category) {
      res.status(404).json({ message: "We didn't find a category" });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
       category_name: req.body.category_name,
     })
     res.status(200).json(newCategory);
   } catch (err) {
     res.status(500).json(err);
   }
});

router.put('/:id', async(req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({
      category_name: req.body.category_name,
    }, 
    {
      where: { 
        id: req.params.id 
      }, 
    })
    if (!updateCategory) {
      res.status(404).json({ message: 'No category found' });
      return;
    }
    res.status(200).json({ message: 'Category updated' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async(req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy(
      { 
        where: { 
          id: req.params.id 
        } 
      });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found' });
      return;
    }
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
