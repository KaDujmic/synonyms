import express from 'express';
import { SynonymController } from '../controllers/synonym-controller';
import { callbackErrorHandler } from '../middleware';

const router = express.Router();
const synonymController = new SynonymController();

// GET /synonym/:searchTerm
router.get('/:searchTerm', callbackErrorHandler(async (req, res) => {
  await synonymController.getSynonyms(req, res);
}));

// POST /synonym
router.post('', callbackErrorHandler(async (req, res) => {
  await synonymController.createSynonym(req, res);
}));

export default router;
