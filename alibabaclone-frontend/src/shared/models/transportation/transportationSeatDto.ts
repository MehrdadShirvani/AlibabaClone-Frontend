export interface TransportationSeatDto{
    id : number,
    vehicleId : number,
    row : number,
    column : number,
    isVIP : boolean,
    isAvailable : boolean,
    description : string | null,
    isReserved : boolean,
    genderId : number | null
}
