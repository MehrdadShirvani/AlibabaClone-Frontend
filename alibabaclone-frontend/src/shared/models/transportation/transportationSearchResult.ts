export interface TransportationSearchResult{
    id : number;
    companyTitle : string;
    fromLocationTitle : string;
    toLocationTitle : string;
    fromCityTitle : string;
    toCityTitle : string;
    startDateTime : Date | string;
    endDateTime ?: Date | string;
    price : number;
}