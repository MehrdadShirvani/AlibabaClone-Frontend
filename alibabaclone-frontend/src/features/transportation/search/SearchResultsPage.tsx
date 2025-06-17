import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import agent from "@/shared/api/agent";
import { TransportationSearchResult } from "@/shared/models/transportation/transportationSearchResult";
import TransportationCard from "@/features/transportation/search/transportationCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage = () => {
  const { vehicleId, fromCityId, toCityId } = useParams();
  const vehicleTypeId = vehicleId ? parseInt(vehicleId, 1) : 1;
  const fromId = fromCityId ? parseInt(fromCityId, 1) : undefined;
  const toId = toCityId ? parseInt(toCityId, 1) : undefined;

  const query = useQuery();
  const departing = query.get("departing");
  const arriving = query.get("arriving");

  const [results, setResults] = useState<TransportationSearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const form = {
      vehicleTypeId,
      fromCityId: fromId,
      toCityId: toId,
      startDate: departing || null,
      endDate: arriving || null,
    };

    agent.TransportationSearch.search(form)
      .then(setResults)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [vehicleId, fromCityId, toCityId, departing, arriving]);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="space-y-4">
          {results.map((r) => (
            <TransportationCard key={r.id} transportation={r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
