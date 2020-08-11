import { AppLogger } from './app-logger';
import mongoose from 'mongoose';

type TInput = {
  db: string;
  isProd: boolean;
};
export default ({ db, isProd }: TInput): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const connectToMongoDB = () => {
      mongoose
        .connect(db, {
          useNewUrlParser: true,
          autoIndex: isProd,
          useUnifiedTopology: true,
          // auth: {
          //   user: username,
          //   password: password
          // },
          authSource: "admin"
        })
        .then(() => {
          AppLogger.info(`Successfully connected to ${db}`);
          resolve();
        })
        .catch(error => {
          reject(`Error connecting to database: ${error}`);
        });
    };
    connectToMongoDB();
    mongoose.connection.on('disconnected', connectToMongoDB);
  });
};
