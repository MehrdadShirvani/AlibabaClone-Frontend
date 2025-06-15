import Navbar from "@/shared/components/navbar";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "@/features/transportation/pages/SearchPage";
import SearchResultsPage from "@/features/transportation/pages/SearchResultsPage";
import ProfilePage from "@/features/account/ProfilePage";
import TravelOrderDetails from "@/features/account/TravelOrderDetails";
import MyTravels from "@/features/account/MyTravels";
import AccountInfo from "@/features/account/AccountInfo";
import ListOfTravelers from "@/features/account/ListOfTravelers";
import Favorites from "@/features/account/Favorites";
import MyTransactions from "@/features/account/MyTransactions";
import Support from "@/features/account/Support";

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
          <Route path="/profile" element={<ProfilePage />}>
            <Route path="account-info" element={<AccountInfo />} />
            <Route path="my-travels" element={<MyTravels />} />
            <Route path="my-travels/:id" element={<TravelOrderDetails />} />
            <Route path="list-of-travelers" element={<ListOfTravelers />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="support" element={<Support />} />
            <Route path="transactions" element={<MyTransactions />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
