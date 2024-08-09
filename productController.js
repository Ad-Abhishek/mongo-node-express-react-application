let products = [
  {
    id: 1,
    name: 'iPhone 15 pro max',
    price: 1000,
  },
];

// Get all produts
const getAllProducts = (req, res) => {
  res.json(products);
};

// Get a product by ID
const getProductById = (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product)
    return res.status(404).json({
      message: 'Product not found',
    });
  res.json(product);
};

// Create a new produt
const createProduct = (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// Update a product
const updateProduct = (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product)
    return res.status(404).json({
      message: 'Product Not found',
    });

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;

  res.json(product);
};

// Delete a product
const deleteProduct = (req, res) => {
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1)
    return res.status(404).json({
      message: 'Product not found',
    });

  products.splice(productIndex, 1);
  res.status(204).send();
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
