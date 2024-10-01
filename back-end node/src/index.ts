import express, { Express } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import adminRoutes from './routes/adminSignUpRoutes';
import { router as adminGiftRouter } from './routes/adminGiftsRoutes';
import adminThemeRoutes from './routes/adminThemeRoutes';
import adminLoginRoutes from './routes/adminLoginRoutes';
import adminOrderRoutes from './routes/adminOrderRoutes';
import userSignUpRoutes from './routes/userSignUpRoutes';
import userLoginRoutes from './routes/userLoginRoutes';
import userOrderRouter from './routes/userOrderRoutes';
import userGiftsRoutes from '../src/routes/userGiftsRoutes';
import userThemeRoutes from '../src/routes/userThemeRoutes';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY!;

const app: Express = express();

app.use(express.json());
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(morgan('dev'));
app.use(cors({
  exposedHeaders: ["*"]
}));

app.use('/admin', adminRoutes);
app.use('/admin', adminGiftRouter);
app.use('/admin', adminThemeRoutes);
app.use('/admin', adminOrderRoutes);
app.use('/admin', adminLoginRoutes);
app.use('/user', userGiftsRoutes);
app.use('/user', userSignUpRoutes);
app.use('/user', userLoginRoutes);
app.use('/user', userThemeRoutes)
app.use('/user', userOrderRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
