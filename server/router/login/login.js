import { connection } from '../../db.js';
import express from 'express'
import { isValidPassword, isValidUsername } from '../../lib/isValid.js';

export const loginAPIrouter = express.Router();

loginAPIrouter.post('/', postLogin);

loginAPIrouter.get('/', getLogin);
const tokenlenght=20;

async function getLogin(req, res) {
    const coockies = req
    .headers
    .cookie
    .split(';')
    .map(s => s.trim().split('='))
    .reduce((total, item) => ({...total, [item[0]]: item[1] }), {})

    console.log(req.headers.cookie)
//     if (typeof req.body !== 'object'
//         || Array.isArray(req.body)
//         || req.body === null
//     ) {
//         return res.json({
//             status: 'error',
//             msg: 'Pagrindinis duomenu tipas turi buti objektas',
//         });
//     }   
return res.json({
            status: 'succsess',
            msg: 'Pagrindinis duomenu tipas turi buti objektas',
        });
}

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
            msg: 'Pagrindinis duomenu tipas turi buti objektas',
        });
    }

    const requiredFields = ['username', 'password'];

    if (Object.keys(req.body).length !== requiredFields.length) {
        return res.json({
            status: 'error',
            msg: `Objekte turi buti tik ${requiredFields.length} raktai: ${requiredFields.join(', ')}`,
        });
    }

    const { username, password } = req.body;

    const usernameError = isValidUsername(username);
    if (usernameError) {
        return res.json({
            status: 'error',
            msg: usernameError,
        });
    }

    const passwordError = isValidPassword(password);
    if (passwordError) {
        return res.json({
            status: 'error',
            msg: passwordError,
        });
    }

    // 1) isitikiname, jog yra tik 1 toks {username, password} variantas (user'is)
    // 2) sugeneruojame RANDOM string
    // 3) ji isirasome i DB (nauja lentele)
    // 4) ji atiduodame i userio narsykle ir irasome i narsykles coockies

    let userData = null;

    try {
        const sql = 'SELECT * FROM users WHERE username = ? AND password = ?;';
        const result = await connection.execute(sql, [username, password]);

        if (result[0].length !== 1) {
            return res.json({
                status: 'error',
                msg: 'Kilo problemo su vartotojo paskyra, susisiekite su client-supportu',
            });
        }

        userData = result[0][0];
    } catch (error) {
        return res.json({
            status: 'error',
            msg: 'Del techniniu kliuciu nepavyko ivykdyti prisijungimo proceso, pabandykite veliau',
        });
    }

    const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    for (let i = 0; i < tokenlenght; i++) {
        token += abc[Math.floor(Math.random() * abc.length)];
    }

    try {
        const sql = 'INSERT INTO tokens (token, user_id) VALUES (?, ?);';
        const result = await connection.execute(sql, [token, userData.id]);

        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Nepavyko sukurti vartotojo sesijos, pabandykite veliau',
            });
        }
    } catch (error) {
        return res.json({
            status: 'error',
            msg: 'Del techniniu kliuciu nepavyko ivykdyti prisijungimo proceso, pabandykite veliau',
        });
    }

    const cookie = [
        'loginToken=' + token,
        'domain=localhost',
        'path=/',
        'max-age=3600',
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly',
    ];

    return res
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: 'success',
            msg: 'Buvo sekmingai prisijungta',
        });
}