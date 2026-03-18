import express from 'express'
import {
  createCustomItem,
  deleteCustomItem,
  getCustomItemById,
  getCustomItems,
  updateCustomItem
} from '../controllers/customItemsController.js'

const router = express.Router()

router.get('/', getCustomItems)
router.get('/:id', getCustomItemById)
router.post('/', createCustomItem)
router.put('/:id', updateCustomItem)
router.delete('/:id', deleteCustomItem)

export default router
