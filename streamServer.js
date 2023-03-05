const express = require('express')
const streamifier = require('streamifier');
const app = express()

app.use(express.json());

app.get('/stream', (req, res) => {

    let { base64String } = req.body;

    if (base64String.includes('data:image/jpeg;base64,')) {
        // deleting first part of base64 string 
        base64String = base64String.replace(/^data:image\/\w+;base64,/, "");
    }

    // streaming buffer
    streamifier.createReadStream(Buffer.from(base64String, 'base64')).pipe(res);
})

const port = 5000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
