export interface TransportationSearchResult{
    id : number;
    vehicleTypeId : number;
    companyTitle : string;
    fromLocationTitle : string;
    toLocationTitle : string;
    fromCityTitle : string;
    toCityTitle : string;
    startDateTime : Date | string;
    endDateTime ?: Date | string;
    price : number;
    remainingCapacity : number;
}