export class Constants {

    public static DOT_ENV = require('dotenv').config();

    // Server Configurations
    public static PORT = process.env.PORT ? process.env.PORT : '4000';

    // MongoDb Configurations
    public static DB_ADMIN_DATABASE = process.env.DB_ADMIN_DATABASE ? process.env.DB_ADMIN_DATABASE : 'adminstration';
    public static DB_TENANT_DATABASE = process.env.DB_TENANT_DATABASE ? process.env.DB_TENANT_DATABASE : 'tenant';
    public static DB_PORT = process.env.DB_PORT ? process.env.DB_PORT : '27017';
    public static SESSION_SECRET_KEY = 'asdmkasldmsalkdmasldkmsaldk';

    // REGEX
    public static EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    public static DEFAULT_LANG = 'en';
    public static CURRENT_USER = 'user';
    public static CURRENT_SESSION = 'sessionId';
    public static CURRENT_LANGUAGE = 'language';

}
