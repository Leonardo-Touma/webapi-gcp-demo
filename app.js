'use strict';

const express = require('express');
const faker = require('faker');
const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore();
const app = express();
const PORT = process.env.PORT || 8080;

app.listen(process.env.PORT || 8080, () => {
  console.log(`Port: ${PORT}`);
});
//POST
app.post('/createcustomer', async function(req, res) {
  try {
    const customer = {
      id:   faker.random.uuid().toString(),
      name: faker.name.findName(),
    };
    await datastore.save({
      key: datastore.key('customer'),
      data: customer,
    });   
    res.send(customer);
  } catch (error) {
    console.log(error)
  }
});
//GET
app.get('/getcustomers', async function(req, res) {
  try {
    const query = datastore.createQuery('customer')
    const customers = await datastore.runQuery(query);
    res.send(customers).end();
  } catch (error) {
    console.log(error)
  }
});
app.get('/getcustomersbyid/:id', async function(req, res) {
  try {
    const query = datastore.createQuery('customer').filter('id', req.params.id);
    const customer = await datastore.runQuery(query);
    res.send(customer).end();
  } catch (error) {
    console.log(error)
  }
});
app.get('/', function(req, res)
{
    res.status(200).send('Healthy')
})
module.exports = app;
