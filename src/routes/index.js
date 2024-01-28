const { Router } = require('express')
const { db } = require('../firebase')

const router = Router()

router.get('/', async (req, res) => {

  const querySnapshot = await db.collection('contacts').get()

  const contacts = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data() // give me all docs in data base
  }))

  console.log(contacts)
  res.render('index', { contacts })
})

router.post('/new-contact', async (req, res) => {
  
  try {
    const { firstname, lastname, email, phone } = req.body
   
    if (!firstname || !lastname || !email || !phone) {
      throw new Error('Todos los campos deben ser completados.')
    }

    // Create a new document on Firebase
    await db.collection('contacts').add({
      firstname,
      lastname,
      email,
      phone
    })
    
    res.redirect('/')

  } catch(error) {
    res.status(400).send('Error al agregar un nuevo contacto: ' + error.message)
  }
})

router.get('/edit-contact/:id', async (req, res) => {
 //Get id from the document
 const doc = await db.collection('contacts').doc(req.params.id).get()

 res.render('index', { contact: {id: doc.id, ...doc.data()} })
})

router.get('/delete-contact/:id', async (req, res) => {
  
  await db.collection('contacts').doc(req.params.id).delete()

  res.redirect('/')
})

router.post('/update-contact/:id', async (req, res) => {
  
  try {
    const { id } = req.params
    const { firstname, lastname, email, phone } = req.body

    if (!firstname || !lastname || !email || !phone) {
      throw new Error('Todos los campos deben ser completados.')
    }

    await db.collection('contacts').doc(id).update(req.body)
    res.redirect('/')

  } catch(error) {
    res.status(400).send('Error al editar el contacto: ' + error.message)
  }
})

module.exports = router
