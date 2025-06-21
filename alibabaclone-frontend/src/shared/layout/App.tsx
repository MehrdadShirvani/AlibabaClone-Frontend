import Navbar from "@/shared/components/navbar";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "@/features/transportation/search/SearchPage";
import SearchResultsPage from "@/features/transportation/search/SearchResultsPage";
import ProfilePage from "@/features/account/profilePages/ProfilePage";
import TravelOrderDetails from "@/features/account/profilePages/TravelOrderDetails";
import MyTravels from "@/features/account/profilePages/MyTravels";
import AccountInfo from "@/features/account/profilePages/AccountInfo";
import ListOfTravelers from "@/features/account/profilePages/ListOfTravelers";
import Favorites from "@/features/account/profilePages/Favorites";
import MyTransactions from "@/features/account/profilePages/MyTransactions";
import Support from "@/features/account/profilePages/Support";
import ReservationLayout from "@/features/transportation/reservation/ReservationLayout";
import TravelerDetailsForm from "@/features/transportation/reservation/TravelerDetailsForm";
import ReviewAndConfirm from "@/features/transportation/reservation/ReviewAndConfirm";
import PaymentForm from "@/features/transportation/reservation/PaymentForm";
import TicketIssued from "@/features/transportation/reservation/TicketIssued";

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
          <Route path="/reserve" element={<ReservationLayout />}>
            <Route path="travelers" element={<TravelerDetailsForm />} />
            <Route path="review" element={<ReviewAndConfirm />} />
            <Route path="payment" element={<PaymentForm />} />
            <Route path="success" element={<TicketIssued />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
