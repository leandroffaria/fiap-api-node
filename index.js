const express = require('express');

// FIREBASE
const firebase = require('firebase');
const firebaseConfig = require('./config/firebase');

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();









// JWT
const bodyParser = require('body-parser');

const createToken = require('./utils/createToken');
const verifyToken = require('./middlewares/verifyToken');

const app = express();

app.use(bodyParser.json());

app.post('/auth', (request, response, next) => {
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

app.get('/users/:id', verifyToken, (request, response) => {
    const id = request.params.id;
    
    db.collection('users').doc(id).get()
        .then(user => {
            if(!user.exists) {
                response
                    .sendStatus(404);
                    //.send({ message: 'No Content' });
            }

            response.json(user.data());
        })
        .catch(err => {
            response
                .sendStatus(500);
            console.log(err);
            console.log('Error getting document', err);
        });
});

app.get('/users', (request, response, next) => {
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



app.get('/nome-da-sua-rota/:id', (request, response) => {
    const { id } = request.params;

    /* Aqui dependendo da situação poderia ter
    * - request.body
    * - request.query
    */

    // seu código usando este parâmetro id

    response.status(200).send({ /* resposta do seu endpoint */ });
});




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});