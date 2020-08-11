import { PushNotificationRoute } from './route/push-notification.route';
import { ENV, Constants } from './common';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application, Router } from 'express';
import helmet from 'helmet';
import connectToMongoDB from './utils/mongo-db-connection';
import { acceptLanguageMiddleware } from './middleware';
import { UserRepository } from './repository';
import { SMSController, PushNotificationController } from './controller';
import * as  httpContext from 'express-http-context';
import { SMSRoute } from './route/sms.route';

const session = require('express-session');
export class App {
  private router!: Router;

  constructor(private application: Application) {
    this.setupConfigurations();
    this.initializeMiddleware();
  }

  public start(): Promise<App> {
    return new Promise(async (resolve, reject) => {
      try {
        // await this.initializeDatabase();
        this.initializeRoutesWithServices();
        resolve(this);
      } catch (error) {
        reject(error);
      }
    });
  }

  // private initializeDatabase(): Promise<any> {
  //   return connectToMongoDB({
  //     db: ENV.DB_CONNECTION,
  //     username: ENV.DB_USERNAME,
  //     password: ENV.DB_PASSWORD,
  //     isProd: ENV.STAGE_TYPE != StageType.Production,
  //   });
  // }

  private setupConfigurations() {
    // Setup Router
    this.router = express.Router();

    if (ENV.API_VERSION) {
      this.application.use(`/${ENV.API_VERSION}/api`, this.router);
    } else {
      this.application.use('/api', this.router);
    }
  }

  private initializeRoutesWithServices() {
    // Repositories
    const userRepository = new UserRepository();

    // Controllers
    const smsController = new SMSController(userRepository);
    const pushNotificationController = new PushNotificationController(userRepository);

    // Routes
    new SMSRoute(this.router, smsController);
    new PushNotificationRoute(this.router, pushNotificationController)
  }

  private initializeMiddleware() {
    this.router.use(helmet());
    this.router.use(cors());
    this.router.use(bodyParser.urlencoded({ extended: true }));
    this.router.use(bodyParser.json());
    this.router.use(httpContext.middleware);
    this.router.use(acceptLanguageMiddleware);
    this.router.use(
      session({
        secret: Constants.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
      })
    );
    this.router.use((req, _res, next) => {
      httpContext.set(Constants.CURRENT_SESSION, req['sessionID'])
      next();
    });
  }
}
