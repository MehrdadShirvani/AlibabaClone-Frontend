export interface TransportationSearchRequest{
    vehicleTypeId ?: number;
    fromCityId ?: number;
    toCityId ?: number;
    startDate ?: Date | null;
    endDate ?: Date | null;
}
