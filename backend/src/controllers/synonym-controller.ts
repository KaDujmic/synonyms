import { Request, Response } from 'express';
import { NotFoundError } from '../errors';

export class SynonymController {
  async getSynonyms(req: Request, res: Response): Promise<Response> {
    const { searchTerm } = req.params;
    
    // Example of using custom error
    if (!searchTerm || searchTerm.trim() === '') {
      throw new NotFoundError('Search term is required');
    }
    
    // TODO: Implement synonym search logic
    return res.json({ 
      searchTerm, 
      synonyms: [] 
    });
  }

  async createSynonym(req: Request, res: Response): Promise<Response> {
    const { word, synonyms } = req.body;
    
    // TODO: Implement synonym creation logic
    return res.status(201).json({ 
      message: 'Synonym created successfully',
      word,
      synonyms 
    });
  }
}
