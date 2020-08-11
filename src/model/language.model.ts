import { Schema, Model, model } from 'mongoose';
import { ILanguage } from '../interface';

const LanguageSchema: Schema = new Schema<ILanguage>({
    isoCode: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    default: {
        type: Boolean,
        default: false
    }
},
    {
        collection: 'languages',
        timestamps: true
    }
);
const Language: Model<ILanguage> = model<ILanguage>('Language', LanguageSchema);
export default Language;
