const express = require('express');

const app = express();

app.get('/users', (request, response, next) => {
    console.log("ENTREI NA ROTA USERS");
    response.json({ success: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});