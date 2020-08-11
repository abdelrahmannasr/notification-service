import { Global, Constants } from '../common';
import Express from 'express';
import * as  httpContext from 'express-http-context';

export function acceptLanguageMiddleware(request: Express.Request, _response: any, next: () => void) {
    request.headers['accept-language'] ? Global.acceptedLanguage.language = request.headers['accept-language'] : Global.acceptedLanguage.language = Constants.DEFAULT_LANG;
    httpContext.set(Constants.CURRENT_LANGUAGE, Global.acceptedLanguage.language)
    next();
}
