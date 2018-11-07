import {bookUser} from '../Models/booking'

interface NewBookingType {
    userId:number,
    bookDate: Date,
    startTime:number,
    doneTime:number,
    typeRoom: number,
    typeSeat:number,
    seat:String
}

export const booking = async (req, res, next) =>{
    const bookingData ={
        userId: req.body.userId,
        bookDate: req.body.bookDate,
        startTime: req.body.startTime,
        doneTime: req.body.doneTime,
        typeRoom: req.body.typeRoom,
        typeSeat: req.body.typeSeat,
        seat: req.body.seat
    }
    console.log(bookingData)
    
    try{
        
        await newBooking(bookingData)
        
        res.json({
            success: true
        })
        console.log(1235);
    } catch(e){
        next(e)
    }
}

export const checkSeat = async (req, res, next) =>{
    const bookingData ={
        bookDate: req.body.bookDate,
        startTime: req.body.startTime,
        doneTime: req.body.doneTime,
        typeRoom: req.body.typeRoom,
        typeSeat: req.body.typeSeat,
    }
    
    try{
        
        if(await isRunningDate(bookingData.bookDate)){
            var i : any;
            var count : number = 0;
            var booked : any[];
            for (i in await CheckingDate(bookingData.bookDate)){
                if(bookingData.doneTime>i.startTime||bookingData.startTime>i.startTime){
                    if(bookingData.typeRoom===i.typeRoom){
                        if(bookingData.typeSeat===i.typeSeat){
                            //จองไปแล้วว
                            booked[count] = i.seat;
                        }
                    }
                } 
                count++;
                res.json({book : booked});
            } 
        }

    } catch(e){
        next(e)
    }
}

export const newBooking = async(data:NewBookingType)=>{
    const newBook = await new bookUser(data).save()
    return newBook
}

export const CheckingDate = async(data:Date)=>{
    const checkDate = await bookUser.find({bookDate:data})
    return checkDate
}

export const isRunningDate = async(data:Date)=>{
    const runningDate = await bookUser.find({bookDate:data})
    return runningDate.length!==0
}