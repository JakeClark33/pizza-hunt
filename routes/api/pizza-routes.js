const router = require('express').Router();

const {
    getAllPizzas,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

//Set up get all and post at /api/pizzas
router
.route('/')
.get(getAllPizzas)
.post(createPizza);

// Set up Get one, Put, and Delete at /api/pizzas/:id
router
.route('/:id')
.get(getPizzaById)
.put(updatePizza)
.delete(deletePizza);

module.exports = router;
