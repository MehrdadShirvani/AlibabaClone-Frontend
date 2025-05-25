import Navbar from "@/shared/components/navbar";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "@/features/transportation/pages/SearchPage";
import SearchResultsPage from "@/features/transportation/pages/SearchResultsPage";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar will show on all pages */}
      <div className="pt-16">
        {" "}
        {/* padding top if navbar is fixed */}
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route
            path="/:vehicleId/:fromCityId/:toCityId"
            element={<SearchResultsPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
