/**
 * Created by erwincdl on 06/01/16.
 */

var mongoose = require('mongoose');

var mealSchema = mongoose.schema({name: String, price: Number});

var Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
