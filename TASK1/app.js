const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const Path = require('path'); 
dotenv.config();

const app = express();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname, 'public'))); // Serve static files, not needed for this task.

// MongoDB Connection
const mongoClient = new MongoClient(process.env.MONGODB_URI);
let db, userModel;

async function connectToDb() {
    try {
        await mongoClient.connect();
        db = mongoClient.db('testingDB');
        userModel = db.collection('users');
        console.log('Connected to database');
    } catch (err) {
        console.error('Failed to connect to database', err);
    }
}

// Helper to validate ObjectId
function isValidObjectId(id) {
    return ObjectId.isValid(id);
}


function errorHandler(err, req, res, next) { // Error handler
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        success: false,
    });
}

// Routes
app.post('/api/v3/app/events', async (req, res) => {  //CREATED A USER 
    const user = req.body;
    if (!user || Object.keys(user).length === 0) {
        return res.status(400).json({
            message: 'User data cannot be empty',
            success: false,
        });
    }

    try {
        const result = await userModel.insertOne(user);
        res.status(201).json({
            _id: result.insertedId,
            success: true,
        });
    } catch (err) {
        res.status(400).json({
            message: 'Failed to create user',
            success: false,
            error: err.message,
        });
    }
});

app.get('/api/v1/app/events?type=latest&limit=5&page=1', async (req, res) => { // will give all the users with a limit per page and recency.
    const { page,limit } = req.query; 

    try {
        const users = await userModel
            .find({})
            .sort({ createdAt: -1 }) 
            .skip((page - 1) * limit) 
            .limit(parseInt(limit)) 
            .toArray();

        const totalUsers = await userModel.countDocuments(); // This will give all the users present in userModel. 
        res.json({
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: parseInt(page),
            users,
        });
    } catch (err) {
       console.log(err);
    }
});


app.get('/api/v3/app/events?id=:event_id', async (req, res) => { // Reading users data based on user id
    const { event_id } = req.query;

    if (!isValidObjectId(id)) {
        return res.status(400).json({
            message: 'Invalid ID format',
            success: false,
        });
    }

    try {
        const user = await userModel.findOne({ _id: new ObjectId(event_id) });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            });
        }
        res.json(user);
    } catch (err) {
       console.log(err);
    }
  
});

app.put('/api/v3/app/events/:id', async (req, res) => { // Updating user data after checking if it's empty or not
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({
            message: 'Invalid ID format',
            success: false,
        });
    }

    const updates = req.body;
    if (!updates || Object.keys(updates).length === 0) {
        return res.status(400).json({
            message: 'Update data cannot be empty',
            success: false,
        });
    }

    try {
        const result = await userModel.updateOne(
            { _id: new ObjectId(id) },
            { $set: updates }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            });
        }

        res.json({
            message: 'User updated successfully',
            success: true,
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete('/api/v3/app/events/:id', async (req, res) => { // deleting a user based on their ID
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({
            message: 'Invalid ID format',
            success: false,
        });
    }

    try {
        const result = await userModel.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            });
        }

        res.json({
            message: 'User deleted successfully',
            success: true,
        });
    } catch (err) {
        console.log(err);
    }
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectToDb();
});
