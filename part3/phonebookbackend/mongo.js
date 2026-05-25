const mongoose = require('mongoose')

const getParams = () => {
  if (process.argv.length < 3) {
    console.log('give password as argument')
    return process.exit(1)
  } else if (process.argv.length < 4) {
    return [process.argv[2], null, null]
  } else {
    return process.argv.slice(2)
  }
}

const [password, inputName, inputNumber] = getParams()

const url = `mongodb://ziyuentlems_db_user:${password}@ac-fql3vuu-shard-00-00.latmppk.mongodb.net:27017,ac-fql3vuu-shard-00-01.latmppk.mongodb.net:27017,ac-fql3vuu-shard-00-02.latmppk.mongodb.net:27017/personApp?ssl=true&replicaSet=atlas-8iq4so-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (inputName) {
  const person = new Person({
    name: inputName,
    number: inputNumber,
  })

  person.save().then(result => {
    console.log(`Added ${inputName} number ${inputNumber} to phonebook`)
    mongoose.connection.close()
  })
  
} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}