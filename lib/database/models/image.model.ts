import { Schema, model, models } from "mongoose";

export interface IImage extends Document{
    title: string;
    transformationType: string;
    publicid: string;
    secureUrl: URL;
    width?: number;
    height?: number;
    config?: Record<string, any>;
    transformationurl?: string;
    aspectRatio?: string;
    color?: string;
    promt?: string;
    author?: string; // Assuming User ID is a string
    createAt: Date;
    updateAt: Date;
}

const ImageSchema = new Schema({
    title: {type: String, required: true},
    transformationType: {type: String, required: true},
    publicid: {type: String, required: true},
    secureUrl: {type: URL, required: true},
    width: {type: Number},
    height: {type: Number},
    config: {type: Object},
    transformationurl: {type: String},
    aspectRatio: {type: String},
    color: {type: String},
    promt: {type: String},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createAt: {type:Date,default: Date.now},
    updateAt: {type: Date, default: Date.now}
})

const Image = models?.Image || model('Image', ImageSchema);

export default Image;