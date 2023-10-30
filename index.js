// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({greeting: 'hello API'});
});


app.get("/api", function (req, res) {
    let newDate = {
        unix: 0, utc: ""
    }
    const now = new Date();
    newDate.unix = now.getTime();
    newDate.utc = now.toUTCString();
    return res.status(200).json(newDate);
})


app.get("/api/:date_string", function (req, res) {

    const date_string = req.params.date_string;
    let newDate = {
        unix: 0, utc: ""
    }

    // Check if date is undefined or null
    if (!date_string) {
        console.log(`date: [${date_string}]`);
        return res.status(400).json({error: "Invalid Date"});
    }

    // check if date include the following symbols -
    if (date_string.includes("-") || date_string.includes("/") || date_string.includes(" ")) {
        const parsedDate = new Date(date_string);
        if (isNaN(parsedDate.getTime())) {
            res.json({error: "Invalid date"});
            return;
        }
        newDate.utc = parsedDate.toUTCString();
        newDate.unix = parsedDate.getTime();
    } else if (!isNaN(date_string)) {
        newDate.unix = parseInt(date_string);
        newDate.utc = new Date(parseInt(date_string)).toUTCString();
    } else if (Date.parse(date_string)) {
        const parseDate = new Date(date_string);
        newDate.utc = parseDate.toUTCString();
        newDate.unix = parseDate.getTime();
    } else {
        res.json({error: "Invalid date"});
        return;
    }

    res.status(200).json(newDate);

})


// listen for requests :)
const listener = app.listen(3001, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});
