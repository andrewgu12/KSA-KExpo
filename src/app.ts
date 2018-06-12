import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as path from 'path';

import * as baseRoutes from './routes/index';

const app = express();
app.use(helmet());
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', baseRoutes);

// Catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const err: Error = new Error('Not Found!');
    next(err);
});

// Error Handlers
if (process.env.NODE_ENV === 'development') {
    app.locals.pretty = true;

    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.status(err.code || 500);
        res.render('404', {
            message: err.message,
            error: err
        });
    });
} else { // production
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        app.locals.pretty = true;
        res.status(err.code || 500);
        res.render('404', {
            message: err.message,
            error: {}
        });
    });
}

export = app;
