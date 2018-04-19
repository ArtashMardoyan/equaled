'use strict';

import * as _ from 'underscore';
import {Request, Response} from 'express';

import MagicResponse from './../framework/magicResponse';
import Modality from './../models/Modality';

class ModalitiesController {

  public actionIndex(req: Request, res: Response): any {
    try {
      Modality.paginate({}, {
        page: req.query.page,
        limit: req.query.limit

      })
          .then((modalities) => MagicResponse.ok(res, modalities))
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionView(req: Request, res: Response): any {
    try {
      Modality.findOne({
        _id: req.params.id
      })
          .then((modality) => {
            if (_.isEmpty(modality)) {
              return MagicResponse.notFound(res);
            }

            return MagicResponse.ok(res, modality);
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionCreate(req: Request, res: Response): any {
    try {
      const result = _.pick(req.body, 'type', 'say', 'ask', 'discuss');

      return Modality.create(result)
          .then((data) => MagicResponse.created(res, data))
          .catch((err) => MagicResponse.unprocessableEntity(res, err));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }

  public actionUpdate(req: Request, res: Response): any {
    try {
      Modality.findById(req.params.id)
          .then((modality) => {
            if (_.isEmpty(modality)) {
              return MagicResponse.notFound(res);
            }

            const result = _.pick(req.body,
                'type', 'say', 'ask', 'discuss');

            _.assign(modality, result);

            modality.save()
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
      return Modality.findById(req.params.id)
          .then((modality) => {
            if (_.isEmpty(modality)) {
              return MagicResponse.notFound(res);
            }

            return modality.remove()
                .then(() => MagicResponse.noContent(res));
          })
          .catch(() => MagicResponse.internalServer(res));
    } catch (ex) {
      return MagicResponse.internalServer(res);
    }
  }
}

export default new ModalitiesController();
