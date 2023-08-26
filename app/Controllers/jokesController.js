// controllers/jokeController.js

const Joke = require('../Models/Joke');

// Create a new joke
exports.createJoke = async (req, res) => {
    try {
        const newJoke = new Joke({
            text: req.body.text,
            category: req.body.category, // Assuming category ID
            submittedBy: req.body.submittedBy, // Assuming you have user authentication
        });

        const savedJoke = await newJoke.save();
        res.status(201).json(savedJoke);
    } catch (error) {
        res.status(500).json({ error: 'Error creating joke.' });
    }
};

// Get a list of jokes
exports.getJokes = async (req, res) => {
    try {
        var jokes;
        const qty = req.body.qty;
        if(qty > 20)
        {
            res.status(400).json({ error: 'Exceeding joke limit.' });
            return;
        }
        if(req.userRole === 'premium')
        {
            console.log("premium here to find jokes");
            console.log(qty);
            if(req.body.category)
                jokes = await Joke.find({ approved: true , category: req.body.category }).limit(qty);
            else
            {
                jokes = await Joke.aggregate([
                    { $match: { approved: true } },
                    { $sample: { size: qty } }
                ]);
            }
            //import the api handle
            //make call to bill the customer  => bill(qty) . to mock stripe API.
            //if unsuccessful return a response with error msg
        }
        else if(req.userRole === 'admin')
        {         
            console.log("admin here to find jokes");
            jokes = await Joke.find();
        }
        else
        {
            console.log("unauthenticated here to find jokes");
            if(req.body.category)
                jokes = await Joke.find({ approved: true, category: req.body.category }).limit(1);
            else
            {
                jokes = await Joke.aggregate([
                    { $match: { approved: true } },
                    { $sample: { size: 1 } }
                ]);
            }
        }
        res.status(200).json(jokes);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching jokes.' });
    }
};

// Update a joke
exports.updateJoke = async (req, res) => {
    try {
        if(req.userRole === 'admin')
            var updatedJoke = await Joke.findByIdAndUpdate(req.params.id, req.body, { new: true });
        else
        {
            res.status(400).send("You are not authorized !");
            return;
        }
        res.status(200).json(updatedJoke);
    } catch (error) {
        res.status(500).json({ error: 'Error approving joke.' });
    }
};

// Delete a joke
exports.deleteJoke = async (req, res) => {
    try {
        if(req.userRole === 'admin')
            await Joke.findByIdAndDelete(req.params.id);
        else
        {
            res.status(400).send("You are not authorized !");
            return;
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error deleting joke.' });
    }
};
