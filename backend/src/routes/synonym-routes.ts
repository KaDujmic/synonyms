import express from 'express';
import { SynonymController } from '../controllers/synonym-controller';
import { callbackErrorHandler } from '../middleware';

const router = express.Router();
const synonymController = new SynonymController();

// GET /synonym/:searchTerm/synonym
router.get('/:searchTerm', callbackErrorHandler(async (req, res) => {
  await synonymController.getSynonym(req, res);
}));

// GET /synonym/:searchTerm
router.get('/search/:searchTerm/', callbackErrorHandler(async (req, res) => {
  await synonymController.searchSynonyms(req, res);
}));

// GET /synonym/objects
router.get('/:searchTerm/synonyms', callbackErrorHandler(async (req, res) => {
  await synonymController.getSynonymObjects(req, res);
}));

// POST /synonym
router.post('', callbackErrorHandler(async (req, res) => {
  await synonymController.createSynonym(req, res);
}));

export default router;
