export class ENV {
  public static API_VERSION = process.env.API_VERSION;

  public static DB_CONNECTION = process.env.DB_CONNECTION;
  public static DB_PORT = process.env.DB_PORT;
  public static DB_TENANT_DATABASE = process.env.DB_TENANT_DATABASE;
  public static DB_ADMIN_DATABASE = process.env.DB_ADMIN_DATABASE;
  public static DB_USERNAME = process.env.DB_USERNAME;
  public static DB_PASSWORD = process.env.DB_PASSWORD;
  public static STAGE_TYPE = process.env.STAGE_TYPE;
  public static ENABLE_LOGGING = process.env.ENABLE_LOGGING;
}