const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

// find all categories   // include its associated Products
router.get('/', async (req, res) => {
  console.log('category route')
  try {
    const categoryData = await Category.findAll({
      // include: [{ model: Product}],
    });
console.log( categoryData)
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
})

 // find one category by its `id` value  // include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {include: [{model: Product}]});
  
  if (!categoryData) {
    res.status(404).json({message: 'No Category found with this id.'});
    return;
  }

    res.status(200).json(categoryData);
  } 
    catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

 // update a category by its `id` value
router.put('/:id', async (req, res) => {
 try {
  const categoryData = await Category.update(
    {
    // id: req.body.id,
    category_name: req.body.category_name,
  },
  { where: {
    id: req.params.id
  },
})
  res.status(200).json(categoryData);
 } catch (err) {
  res.status(400).json(err);
 }
});

 // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
 try {
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
 
 if(!categoryData) {
  res.status(404).json({message: 'No category found with that id.'});
 }
 res.status(200).json('Category deleted')
}  catch (err) {
  res.status(500).json(err);
 }
});

module.exports = router;
