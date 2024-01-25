const { Router } = require('express')
const { db } = require('../firebase')

const router = Router()

router.get('/contacts', async (req, res) => {

  const querySnapshot = await db.collection('contacts').get()

  const contacts = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))

  console.log(contacts)
  res.send('Hello')
})

router.post('/new-contact', async (req, res) => {
  
  const { firstname, lastname, email, phone } = req.body
   
  // Create a new document on Firebase
   await db.collection('contacts').add({
    firstname,
    lastname,
    email,
    phone
  })

  res.send('new contact created')
})

module.exports = router
