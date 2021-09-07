const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 9080;
const { Sequelize, DataTypes } = require('sequelize');


// use cors to allow local api call
app.use(cors());

// connect to the postgresql instance
// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite'
});


async function connectDatabase() {
        try {
                await sequelize.authenticate();
                console.log('Connection has been established successfully.');
        } catch (error) {
                console.error('Unable to connect to the database:', error);
        }
}

connectDatabase()


const UserEmail = sequelize.define('UserEmail', {
        // Model attributes are defined here
        email: {
                type: DataTypes.STRING,
                allowNull: false
        }

}, {});

UserEmail.sync()

// parse application/json
app.use(bodyParser.json())

async function createUser(userEmail) {
        const user = await UserEmail.create({ email: userEmail });
        return user;
}

app.post('/api/email/subscribe', (req, res) => {

        const user = createUser( req.body.email );
        console.log("Jane's auto-generated ID:", user);

        res.send(200).json(user)

});


// if the site is wrong
app.use(function (req, res) {
        res.status(404).send({ url: req.originalUrl + ' not found' })
});


// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
                res.status(401);
                res.json({ "message": err.name + ": " + err.message });
        }
});


// start and listen on this port
app.listen(port, (err) => {
        if (err) throw err;
        console.log('Server is running on port ' + port);
});

