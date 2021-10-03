const mongoose = require('mongoose');
const { Pizza } = require('../models/pizza');

const pizzaController = {
    // get all the pizzas
    getAllPizzas(req, res) {
        Pizza.find({})
        .populate({
          path: 'comments',
          select: '-__v'
        })
        .then(dbPizzaData => res.json(dbPizzaData))
    },
   // get one pizza by id
getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
    //functions will go in this method
    //create pizza
    createPizza({ body }, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },
    //update pizza by ID
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbPizzaData => {
         if (!dbPizzaData) {
             res.status(404).json({ message: 'No pizza found with this id!' });
              return;
         }
               res.json(dbPizzaData);
          })
      .catch(err => res.status(400).json(err));
  },
    //delete pizza
    deletePizza ({ params}, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No ZA found with this Id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
}

module.exports = pizzaController;
