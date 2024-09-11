import express from "express";

export const locationsApiRouter = express.Router();

locationsApiRouter.get('/', (req, res) => {
    const data = [
        {
            img: img1,
            name: 'Menulis',
            address: {
                country: 'Kostmosas',
                city: 'A',
                street: 'A',
                number: 'A',
                zip: 'A',
            },
        },
        {
            img: img2,
            name: 'Gelyte',
            address: {
                country: 'Tundra',
                city: 'B',
                street: 'B',
                number: 'B',
                zip: 'B',
            },
        },
        {
            img: img3,
            name: 'Meduza',
            address: {
                country: 'Baltijos jura',
                city: 'C',
                street: 'C',
                number: 'C',
                zip: 'C',
            },
        },

    ]
    return res.json({
        status: 'yes',
        msg: 'Prasau, jusu lokacijos'
    });
});