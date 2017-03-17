import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

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

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

const port = 9000;
app.listen(port);

console.log(`Listening on port ${ port }`);