import { Constants } from '../common';
import { ILanguage } from '../interface/language.interface';
import { Repository } from './repository';
import { AppLogger } from '../utils';
import * as  httpContext from 'express-http-context';
import Language from '../model/language.model';

export class LanguageRepository extends Repository {

    private currentLanguage: string;

    constructor() {
        super();
    }

    public async getLanguageId(): Promise<ILanguage> {
        this.currentLanguage = httpContext.get(Constants.CURRENT_LANGUAGE);
        return new Promise(async (resolve, reject) => {
            try {
                Language.findOne({ $or: [{ isoCode: this.currentLanguage }, { name: this.currentLanguage }] })
                .select({ _id: 1 })
                .exec((error: any, language: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(language!);
                    }
                });
            } catch (error) {
                AppLogger.error(error);
                reject(error);
            }
        });
    }
}
