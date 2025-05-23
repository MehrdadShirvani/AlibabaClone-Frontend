export interface TransportationSearchRequest{
    vehicleTypeId ?: number;
    fromCityId ?: number;
    toCityId ?: number;
    startDate ?: Date | string | null;
    endDate ?: Date | string | null;
}
