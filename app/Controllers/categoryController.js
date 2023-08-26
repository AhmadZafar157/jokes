// controllers/categoryController.js

const Category = require('../Models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const newCategory = new Category({
            name: req.body.name,
        });
        if(req.userRole === 'admin')
        {
            var savedCategory = await newCategory.save();
            res.status(201).json(savedCategory);
        }
        else
        {
            res.status(400).send("You are not authorized to create a category!");
        }
    } catch (error) {
        res.status(500).json({ error: 'Error creating category.' });
    }
};

// Get a list of categories
exports.getCategories = async (req, res) => {
    try {
        console.log("user id from req : " + req.userId + req.userRole);
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        console.log("error getting categories : " + error);
        res.status(500).json({ error: 'Error fetching categories.' });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error updating category.' });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting category.' });
    }
};
