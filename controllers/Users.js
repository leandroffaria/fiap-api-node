const cacheManager = require('cache-manager');

// config 
const { cache } = require('../config/default');

// model
const UsersModel = require('../models/Users');
const usersModel = new UsersModel();

// instancia da biblioteca de cache
const memoryCache = cacheManager.caching(cache);

class Users {
    static get(request, response) {
        const id = request.params.id;
        const key = `user_${id}`;

        memoryCache.get(key, (err, result) => {
            if (result) {
                return response.json(result);
            }

            usersModel.get(id)
                .then(user => {
                    if(!user.exists) {
                        response
                            .sendStatus(404);
                    }

                    const userData = user.data();

                    memoryCache.set(key, userData);
                    response.json(userData);
                })
                .catch(err => {
                    response
                        .sendStatus(500);
                    console.log(err);
                    console.log('Error getting document', err);
                });

        });      

    }
}

module.exports = Users;