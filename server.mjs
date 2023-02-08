import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';
import asyncHandler from 'express-async-handler';

const PORT = process.env.PORT
const app = express();

app.use(express.static('public'));
// Note: Don't add or change anything above this line.


/* Add your code below this line. It will:
   Define variables for the middleware counting.
   Count the calls.
   Get the random person data.
   Respond using an error handler middleware function when it doesn't work.
*/
const printCount = 10;
let apiCount = 0;

app.use('/random-person', (req, res, next) => {
    apiCount += 1;
    if (apiCount % printCount === 0) {
        console.log(`Total requests from random-person: ${apiCount}.`);
    }
    next();
});

app.get('/random-person', asyncHandler(async (req, res) => {
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    res.send(data);
}));

app.use((error, req, res, next) => {
    console.log(`Unexpected Internal Server - Error ${error}. URL = ${req.originalURL}, Method = ${req.method}`);
    res.status(500).send('500 - Internal Server Error.');
});

// handle url other than /, prompt status 404
app.get('/:otherURL', (req, res) => {
    const { otherURL } = req.params;
    if (otherURL !== req.originalUrl) {
        
        return res.status(404).send(`
            <h2>Page Does Not Exist.</h2>
            <p><a href='/'>Back to Homepage</a></p>
        `);
    }
        
})

// Note: Don't add or change anything below this line.
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});