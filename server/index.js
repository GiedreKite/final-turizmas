import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiRouter } from './router/api.js';
import { env } from './env.js'

const corsOptions = {
    credentials: true,
    orgin: 'http://localhost:' + env.CLIENT_PORT,
    
}

const helmetOptions = {
    crossOriginResourcePolicy: false,

}


const app = express();

app.use(cors(corsOptions));
app.use(helmet(helmetOptions))




const port = env.SERVER_PORT;
app.use(express.json()) 
// for parsing application/json
app.use(express.urlencoded({ extended: true })) 
// for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

app.use('/api', apiRouter);

app.all('*', (req,res) => {
    return res.json({
        status: 'error',
        msg: 'Nepataikei, nepataikei...'
    });
})


app.use((req, res, next) => {
    return res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).send('Something broke!');
});


app.listen(port, ()=> 
console.log('Turizmo serveris : http://localhost:'+ env.SERVER_PORT));