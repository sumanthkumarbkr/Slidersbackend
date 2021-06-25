const mongoose = require('mongoose');

const url = `mongodb+srv://user_1:9bI7KMaPU8ADYbG6@cluster0.4rt0z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });