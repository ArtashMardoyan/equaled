'use strict';

import * as _ from 'underscore';
import {Request, Response} from 'express';

import MagicResponse from './../framework/magicResponse';
import Vocabulary from './../models/Vocabulary';

class VocabularyController {

  public actionIndex(req: Request, res: Response): any {
    try {
      Vocabulary.paginate({}, {
        page: req.query.page,
        limit: req.query.limit

      })
          .then((vocabulary) => MagicResponse.ok(res, vocabulary))
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionGet(req: Request, res: Response): any {
    try {
      Vocabulary.findById(req.params.id)
          .then((vocabulary) => MagicResponse.ok(res, vocabulary))
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public async actionCreate(req: Request, res: Response): Promise<any> {
    try {
      const result = _.pick(req.body, 'vocabulary', 'linked', 'otherIds');

      const vocabularyUniqArr = [];
      if (Array.isArray(result.vocabulary) && result.vocabulary.length !== 0) {
        const arrVocabulary = result.vocabulary.map((str) =>
            typeof str === 'string' ? str.toLowerCase() : str);
        for (const value of arrVocabulary) {
          if (vocabularyUniqArr.indexOf(value) === -1) {
            vocabularyUniqArr.push(value);
          }
        }
        _.extend(result, {vocabulary: vocabularyUniqArr});
      }

      if (result.hasOwnProperty('otherIds')) {
        if (Array.isArray(result.otherIds) && result.otherIds.length !== 0) {
          const allExistingVocList = await Vocabulary.find({linked: {$in: result.otherIds}})
              .select({vocabulary: 1, _id: 0}).exec();
          const combineAllArr = [];
          for (const arr of allExistingVocList) {
            combineAllArr.push(...arr['vocabulary']);
          }

          for (const value of vocabularyUniqArr) {
            if (combineAllArr.indexOf(value) !== -1) {
              const index = vocabularyUniqArr.indexOf(value);
              if (index !== -1) {
                vocabularyUniqArr.splice(index, 1);
              }
            }
          }
          _.extend(result, {vocabulary: vocabularyUniqArr});
        }
      }

      return Vocabulary.create(result)
          .then((data) => MagicResponse.created(res, data))
          .catch((err) => MagicResponse.unprocessableEntity(res, err));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionUpdate(req: Request, res: Response): any {
    try {
      Vocabulary.findById(req.params.id)
          .then(async (vocabulary) => {
            if (_.isEmpty(vocabulary)) {
              return MagicResponse.notFound(res);
            }

            const result = _.pick(req.body, 'vocabulary', 'linked', 'otherIds');
            _.assign(vocabulary, result);

            const vocabularyUniqArr = [];
            if (Array.isArray(result.vocabulary) && result.vocabulary.length !== 0) {
              const arrVocabulary = result.vocabulary.map((str) =>
                  typeof str === 'string' ? str.toLowerCase() : str);

              for (const value of arrVocabulary) {
                if (vocabularyUniqArr.indexOf(value) === -1) {
                  vocabularyUniqArr.push(value);
                }
              }
              _.extend(vocabulary, {vocabulary: vocabularyUniqArr});
            }


            if (result.hasOwnProperty('otherIds')) {
              if (Array.isArray(result.otherIds) && result.otherIds.length !== 0) {
                const allExistingVocList = await Vocabulary.find({linked: {$in: result.otherIds}})
                    .select({vocabulary: 1, _id: 0}).exec();
                const combineAllArr = [];
                for (const arr of allExistingVocList) {
                  combineAllArr.push(...arr['vocabulary']);
                }

                for (const value of vocabularyUniqArr) {
                  if (combineAllArr.indexOf(value) !== -1) {
                    const index = vocabularyUniqArr.indexOf(value);
                    if (index !== -1) {
                      vocabularyUniqArr.splice(index, 1);
                    }
                  }
                }
                _.extend(result, {vocabulary: vocabularyUniqArr});
              }
            }

            vocabulary.save()
                .then((data) => MagicResponse.ok(res, data))
                .catch((err) => MagicResponse.unprocessableEntity(res, err));
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionDelete(req: Request, res: Response): any {
    try {
      return Vocabulary.findById(req.params.id)
          .then((vocabulary) => {
            if (_.isEmpty(vocabulary)) {
              return MagicResponse.notFound(res);
            }

            return vocabulary.remove()
                .then(() => MagicResponse.noContent(res));
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

}

export default new VocabularyController();
