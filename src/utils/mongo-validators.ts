import { Constants } from '../common/constants';
var validate = require('mongoose-validator');

export class MongoValidator {

  public static get Email() {
    return [
      validate({
        validator: 'matches',
        arguments: Constants.EMAIL_REGEX,
        message: 'InvalidEmail',
      }),
    ];
  }
}
