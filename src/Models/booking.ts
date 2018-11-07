import { model, Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';
// import {IUser} from "../interface/user";

export interface bookUser extends Document {
    userId:number,
    bookDate: Date,
    startTime:number,
    doneTime:number,
    typeRoom: number,
    typeSeat:number,
    seat:String
}

export const UserBooking = new Schema({
    userId:Number,
    bookDate: Date,
    startTime:Number,
    doneTime:Number,
    typeRoom: Number,
    typeSeat:Number,
    seat:String
});

UserBooking.pre<bookUser>("save",function(next){
    let now = new Date();
    if(!this.bookDate){
        this.bookDate=now;
    }
    next()
})

export const bookUser = model<bookUser>("UserBooking",UserBooking);
