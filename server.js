import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
// import fetch from 'isomorphic-fetch';

const app = express();

const router = express.Router();
const root = {
    bundle(req, res) {
        res.sendFile(path.join(__dirname + '/bundle.js'));
    }
};

router.use((req, res, next) => {
    next();
});

router.route('/bundle').get(root.bundle);
router.route('/subscribe').post(root.subscribe);

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

const port = 9006;
app.listen(port);

console.log(`Listening on port ${ port }`);