const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

const publicDir = path.join(__dirname, "../public")

app.use(express.static(publicDir));

// routing
// spicy-mandarin.com/ => root

app.get('/', (req, res)=>{
res.send('Hello Express!');
})


app.listen(port, ()=>{
    console.log(`server running on Port:${port}`);
})