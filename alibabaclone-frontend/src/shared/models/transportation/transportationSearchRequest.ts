export interface TransportationSearchRequest{
    vehicleTypeId ?: number;
    fromCityId ?: number;
    toCityId ?: number;
    startDate ?: string | null;
    endDate ?: string | null;
}
