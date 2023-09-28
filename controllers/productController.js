const Product = require('../models/productModel');

// Function to show all the products
module.exports.products = async function (req, res) {
  try {
    const foundProducts = await Product.find({}, 'name quantity'); // Specify the fields you want to retrieve
    res.send(foundProducts);
  } catch (err) {
    res.send(err);
  }
};

// Function to create a new product
module.exports.create = async function (req, res) {
  try {
    const newProduct = new Product({
      name: req.body.name,
      quantity: req.body.quantity,
    });
    await newProduct.save();
    res.send('Product added successfully.');
  } catch (err) {
    res.send(err);
  }
};

// Function to delete a product using its ID
module.exports.delete = async function (req, res) {
  try {
    await Product.deleteOne({ _id: req.params.productID });
    res.send({
      message: 'Product deleted',
    });
  } catch (err) {
    res.send(err);
  }
};

// Function to update a product's quantity
module.exports.updateQunatity = async function (req, res) {
  try {
    const { productID } = req.params;
    const number = parseInt(req.query.number); // Parse the query parameter as an integer

    const found = await Product.findById(productID);

    if (!found) {
      console.log(`Product with ID ${productID} not found`);
      return res.status(404).json({ message: 'Product not found' });
    }

    const newQty = parseInt(found.quantity) + number; // Use the 'number' variable here

    // Update the product's quantity
    const updatedProduct = await Product.findByIdAndUpdate(
      productID, 
      { quantity: newQty },
      { new: true } // Ensure you get the updated product in the response
    );

    if (!updatedProduct) {
      console.log(`Product with ID ${productID} not updated`);
      return res.status(500).json({ message: 'Product not updated' });
    }

    console.log(`Product with ID ${productID} updated successfully`);

    res.send({
      product: updatedProduct,
      message: 'Product Updated successfully',
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

