import { Request, Response } from 'express';
import { BadRequestError, NotFoundError } from '../errors';
import synonymService from '../services/synonym-service';

export class SynonymController {
  async searchSynonyms(req: Request, res: Response): Promise<Response> {
    const { searchTerm } = req.params;
    
    if (!searchTerm || searchTerm.trim() === '') {
      throw new BadRequestError('Search term is required');
    }
    
    const synonyms = synonymService.searchSynonyms(searchTerm);
    
    return res.status(200).json({ 
      status: 'success',
      data: {
        searchTerm, 
        synonyms 
      }
    });
  }

  async getSynonym(req: Request, res: Response): Promise<Response> {
    const { searchTerm } = req.params;
    
    const synonym = synonymService.getSynonym(searchTerm);

    if (!synonym) {
      throw new NotFoundError('Synonym not found');
    }
    
    return res.status(200).json({
      status: 'success',
      data: {
        searchTerm,
        synonym
      }
    });
  }

  async getSynonymObjects(req: Request, res: Response): Promise<Response> {
    const { searchTerm } = req.params;
    
    const synonymObjects = synonymService.getSynonymObjects(searchTerm);

    if (!synonymObjects) {
      throw new NotFoundError('Synonym not found');
    }
    
    return res.status(200).json({
      status: 'success',
      data: synonymObjects
    });
  }

  async createSynonym(req: Request, res: Response): Promise<Response> {
    const { word, synonyms } = req.body;
    
    if (!word || word.trim() === '') {
      throw new BadRequestError('Word is required');
    }
    
    if (!synonyms || !Array.isArray(synonyms) || synonyms.length === 0) {
      throw new BadRequestError('Synonyms array is required and must not be empty');
    }
    
    synonymService.addSynonyms(word, synonyms);
    
    return res.status(201).json({ 
      status: 'success',
      data: {
        word,
        synonyms 
      }
    });
  }
}
