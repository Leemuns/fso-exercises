const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })
  .then( () => {
    console.log('connected to MongoDB')
  })
  .catch( res => {
    console.log('Error: ', res.message)
  })

const validateNumber = number => {
  if (number.length < 8) {
    return false
  }

  return /\d{2,3}-\d+/.test(number)
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Person name required']
  },
  number: {
    type: String,
    validate: {
      validator: validateNumber,
      message: ({ value }) => `${value} is not a valid phone number`
    },
    required: [true, 'Person phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)