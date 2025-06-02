const express = require('express');
const router = express.Router();
const {
  createCharger,
  getAllChargers,
  updateCharger,
  deleteCharger,
} = require('../controllers/chargerController');

const authenticateToken = require('../middlewares/authMiddleware');

router.use(authenticateToken);

router.post('/', createCharger);
router.get('/', getAllChargers);
router.put('/:id', updateCharger);
router.delete('/:id', deleteCharger);

module.exports = router;
