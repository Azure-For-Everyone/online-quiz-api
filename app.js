const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");
const dbContext = require("./data/databaseContext");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

const { endpoint, key, databaseId, containerId } = config;

const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);
const container = database.container(containerId);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get('/leaderboard/:event', async (req, res) => {
    try {
        const { event }  = req.params
        console.log(req.params)
        const querySpec = {
            query: "SELECT username, score from leaderboard where leaderboard.event = '"+ event +"'"
        };
        const { resources: items } =  await container.items.query(querySpec).fetchAll();

        items.forEach(item => {
            console.log(`${item.id} - ${item.description}`);
        });
        res.send({ leaderboard: items});
    } catch (err) {
        console.log(err.message);
    }
});

app.post('/leaderboard/:event', async (req, res) => {
    let date_ob = new Date();
    const { event }  = req.params
    console.log(req.params)


    console.log('Got body:', req.body);
    const payload = req.body

    const newItem = {
        event,
        username: payload.username,
        email: payload.email,
        score: payload.score,
        date: date_ob
    };
    
    const { resource: createdItem } = await container.items.create(newItem);
    console.log(createdItem)
    console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`);
    res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});