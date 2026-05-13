import { Router } from 'express';
import { asyncHandler } from '../../shared/middlewares/asyncHandler';
import { validateRequest } from '../../shared/middlewares/validateRequest';
import { OwnerController } from './owner.controller';
import { createOwnerSchema, ownerIdParamSchema, updateOwnerSchema } from './owner.schema';

const ownerRoutes = Router();
const ownerController = new OwnerController();

ownerRoutes.post(
  '/',
  validateRequest(createOwnerSchema),
  asyncHandler(ownerController.create.bind(ownerController)),
);

ownerRoutes.get(
  '/',
  asyncHandler(ownerController.findMany.bind(ownerController)),
);

ownerRoutes.get(
  '/:id',
  validateRequest(ownerIdParamSchema),
  asyncHandler(ownerController.findById.bind(ownerController)),
);

ownerRoutes.put(
  '/:id',
  validateRequest(updateOwnerSchema),
  asyncHandler(ownerController.update.bind(ownerController)),
);

ownerRoutes.delete(
  '/:id',
  validateRequest(ownerIdParamSchema),
  asyncHandler(ownerController.delete.bind(ownerController)),
);

export { ownerRoutes };