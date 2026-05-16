import {Router} from 'express';
import controller from './parking-record.controller';

const router=Router();

router.post(
'/entry',
controller.entry
);

router.put(
'/exit/:id',
controller.exit
);

router.get(
'/history',
controller.history
);

router.get(
'/search',
controller.search
);

export {
router as parkingRecordRoutes
};