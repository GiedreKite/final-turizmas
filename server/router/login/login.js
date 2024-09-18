import { connection } from '../../db.js';
import express from 'express'
import { isValidPassword, isValidUsername } from '../../lib/isValid.js';

export const loginAPIrouter = express.Router();

loginAPIrouter.post('/', postLogin);

loginAPIrouter.use((req, res) => {
    return res.json({
        status: 'error',
        data: 'Toks HTTP metodas /api/login nepalaikomas',
    });
});

async function postLogin(req, res) {
    if (typeof req.body !== 'object'
        || Array.isArray(req.body)
        || req.body === null
    ) {
        return res.json({
            status: 'error',
            data: 'Pagrindinis duomenu tipas turi buti objektas',
        });
    }

    const requiredFields = ['username', 'password'];

    if (Object.keys(req.body).length !== requiredFields.length) {
        return res.json({
            status: 'error',
            data: `Objekte turi buti tik ${requiredFields.length} raktai: ${requiredFields.join(', ')}`,
        });
    }

    const { username, password } = req.body;

    const usernameError = isValidUsername(username);
    if (usernameError) {
        return res.json({
            status: 'error',
            data: usernameError,
        });
    }

    const passwordError = isValidPassword(password);
    if (passwordError) {
        return res.json({
            status: 'error',
            data: passwordError,
        });
    }

    let userData = null;

    try {
        const sql = 'SELECT * FROM users WHERE username = ? AND password =? ;';
        const result = await connection.execute(sql, [username]);

        if (result[0].length !== 1) {
            return res.json({
                status: 'error',
                data: 'Kilo problema s u vartiotojo paskira',
            });
        }
        userData = result[0][0]
    } catch (error) {
        return res.json({
            status: 'error',
            data: 'Nepavyko del tech kliuciu',
        });
    }
    const abc = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789'
    let token ="";
    for (let i = 0; i<20; i++) {
        token+= abc[Math.floor(Math.random()*abc.length)];
    }


    try {
        const sql = 'INSERT INTO tokens (token, user_id) VALUES (?, ?);';
        const result = await connection.execute(sql, [token, userData.id]);

        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                data: 'Prisijungti nepavyko, bandykite veliau',
            });
        }
    } catch (error) {
        return res.json({
            status: 'error',
            data: 'Del techniniu kliuciu nepavyko, pabandykite veliau',
        });
    }
    const cookie =[
        'loginToken='+token,
        'domain=localhost',
        'path=/',
        'max-age=864000',
        // 'secure',
        'SameSite=Lax',
        'HttpOnly'

    ]

    return res 
    .set('Set-Cokie', cookie.join(';'))
    .json({
        status: 'success',
        data: 'Sėkmingai prisijungta',
    });
}