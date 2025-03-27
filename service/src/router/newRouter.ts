import express from 'express'

const router = express.Router()
router.post('/getKey', async (req, res) => {
  try {
    // eslint-disable-next-line no-console
    console.log('req', req.body)
  }
  catch (error) {}
})

export default router
