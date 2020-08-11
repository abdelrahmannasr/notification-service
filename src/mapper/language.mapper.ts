import { LanguageResponse } from './../api/response';
import { IMapper } from './mapper';
import { ILanguage } from '../interface';

export class LanguageMapper implements IMapper<LanguageResponse> {
    public toClient(source: ILanguage): LanguageResponse {
        const client: LanguageResponse = {
            id: source._id,
            isoCode: source.isoCode,
            name: source.name,
            isDefault: source.default
        };
        return client;
    }

    public toListClient(source: ILanguage[]): LanguageResponse[] {
        const list: LanguageResponse[] = [];
        if (source) {
            source.forEach(element => {
                list.push(this.toClient(element));
            });
        }
        return list;
    }
}