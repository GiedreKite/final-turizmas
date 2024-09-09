import express from 'express';
export const apiRouter = express.Router();
apiRouter.get('/', () => {
    return res.json({
        status: 'error',
        msg: 'Nepataikei, nepataikei... Reikia konkretaus api. end pointo'
    });
});