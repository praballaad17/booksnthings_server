const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PurcMaterialSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  username: String,
  purcmaterial: [
    {
      material: {
        type: Schema.ObjectId,
        ref: 'Book'
      }
    }
  ]
});

const pursMaterialModel = mongoose.model('PurcMaterial', PurcMaterialSchema);
module.exports = pursMaterialModel;
