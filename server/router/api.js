import express from 'express';
import { locationsApiRouter } from './locations/locations.js';

export const apiRouter = express.Router();

apiRouter.use('/locations', locationsApiRouter);


apiRouter.get('/api', (req, res) => {
    return res.json({
        status: 'error',
        msg: 'Nepataikei, nepataikei... Reikia konkretaus api. end pointo'
    });
});