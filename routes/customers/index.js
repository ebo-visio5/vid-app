const express = require('express');
const {customers, movieList} = require('../../database')
const {getById} = require('../../utilities')

const customerRouters = express.Router();

customerRouters.get('/', (req, res) => {
    res.status(200).json({allCustomers: customers})
})

customerRouters.get('/:customerId', (req, res) => {
    const customer = getById(customers, req.params.customerId)
    if (!customer) return res.status(404).send('unknown customer');
    res.status(200).json(customer);
})

customerRouters.put()


module.exports = customerRouters