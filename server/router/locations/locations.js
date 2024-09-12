import express from 'express';
import {connection} from '../../db.js';


export const locationsApiRouter = express.Router();


locationsApiRouter.get('/', getLocations);

async function getLocations(req, res) {
    const sql = 'SELECT * FROM locations;';
    const dataFromServer = await connection.execute(sql);

    return res.json({
        status: 'yes',
        data: dataFromServer[0],
    });
}