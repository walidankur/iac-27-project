const mongoose = require('mongoose');
const { Schema, model } = mongoose;
/*const commentSchema = new Schema({
    user: String,

})*/

const productsSchema = new Schema({
    title:  {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    addedOn: {
      type: Date,
      default: () => Date.now(),
      immutable: true,
    }
  });

const Ecom = model('Ecom', productsSchema);
//export default Ecom;
module.exports = Ecom;
