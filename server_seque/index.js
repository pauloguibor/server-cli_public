const express = require("express");
const bodyParser = require('body-parser');
const controllers = require('./controllers');
const { authJwt } = require("./middleware");
const app = express();
const cors = require("cors");

var allowedOrigins = ['http://localhost:8081','http://localhost:8080', "http://localhost:3000"];

app.use(cors({
    origin: function (origin, callback) { 
        if (!origin) return callback(null, true); if (allowedOrigins.indexOf(origin) === -1) {

            var msg = 'The CORS policy for this site does not allow access from the specified Origin.';

            return callback(new Error(msg), false);
        } 
        return callback(null, true);
    }
}));

const port = 3000;


app.use(bodyParser.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send("metodo get")
})

// rotas da aplicaçao 
app.use('/api/urls',
    [authJwt.verifyToken],
    controllers.url)
app.use('/api/urlramdom', controllers.url_ramdom)
app.use('/api/user', controllers.user)
app.use('/api/auth', controllers.login)




app.listen(port, () => console.log(`rodando porta ${port}`))