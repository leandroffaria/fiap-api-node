const express = require('express');

const routes = require('./routes');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});























/*


// FIREBASE
const firebase = require('firebase');
const firebaseConfig = require('./config/firebase');

// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const db = firebaseApp.firestore();


const createToken = require('./utils/createToken');
const verifyToken = require('./middlewares/verifyToken');

app.post('/auth', (request, response) => {
    const { email, password } = request.body;

    db.collection('users')
        .where('email', '==', email)
        .where('password', '==', password)
        .get()
        .then(users => {
            if(users.docs.length === 0) {
                return response
                    .status(401)
                    .send({ 
                        code: 'not_found',
                        message: 'User not found'
                    });
            }

            const [{ id }] = users.docs;
            response.json({ token: createToken({ id }) });
        })
        .catch(err => {
            response
                .sendStatus(500);
            console.log(err);
            console.log('Error getting document', err);
        });
});

app.get('/users', (request, response) => {
    db.collection('users').get()
        .then(users => response.json(
            users.docs.map(user => ({
                ...user.data(),
                id: user.id,
            }))
        ))
        .catch(err => {
            response
                .sendStatus(500);
            console.log(err);
            console.log('Error getting document', err);
        });
});

*/
