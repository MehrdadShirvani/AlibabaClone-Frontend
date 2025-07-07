import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "@/features/transportation/search/SearchPage";
import SearchResultsPage from "@/features/transportation/search/SearchResultsPage";
import ProfilePage from "@/features/account/profile/pages/ProfilePage";
import TravelOrderDetailsPage from "@/features/account/profile/pages/TravelOrderDetailsPage";
import MyTravelsPage from "@/features/account/profile/pages/MyTravelsPage";
import AccountInfoPage from "@/features/account/profile/pages/AccountInfoPage";
import ListOfTravelersPage from "@/features/account/profile/pages/ListOfTravelersPage";
import FavoritesPage from "@/features/account/profile/pages/FavoritesPage";
import MyTransactionsPage from "@/features/account/profile/pages/MyTransactionsPage";
import SupportPage from "@/features/account/profile/pages/SupportPage";
import ReservationLayout from "@/features/transportation/reservation/ReservationLayout";
import TravelerDetailsForm from "@/features/transportation/reservation/TravelerDetailsForm";
import ReviewAndConfirm from "@/features/transportation/reservation/ReviewAndConfirm";
import PaymentForm from "@/features/transportation/reservation/PaymentForm";
import TicketIssued from "@/features/transportation/reservation/TicketIssued";
import { ProtectedRoute } from "../components/ProtectedRoute";
import MyNavbar from "../components/MyNavbar";

function App() {
  return (
    <Router>
      <MyNavbar /> {/* Navbar will show on all pages */}
      <div className="pt-16">
        {" "}
        {/* padding top if navbar is fixed */}
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route
            path="/:vehicleId/:fromCityId/:toCityId"
            element={<SearchResultsPage />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />}>
              <Route path="account-info" element={<AccountInfoPage />} />
              <Route path="my-travels" element={<MyTravelsPage />} />
              <Route
                path="my-travels/:id"
                element={<TravelOrderDetailsPage />}
              />
              <Route
                path="list-of-travelers"
                element={<ListOfTravelersPage />}
              />
              <Route path="favorites" element={<FavoritesPage />} />
              <Route path="support" element={<SupportPage />} />
              <Route path="transactions" element={<MyTransactionsPage />} />
            </Route>
            <Route path="/reserve" element={<ReservationLayout />}>
              <Route path="travelers" element={<TravelerDetailsForm />} />
              <Route path="review" element={<ReviewAndConfirm />} />
              <Route path="payment" element={<PaymentForm />} />
              <Route path="success" element={<TicketIssued />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
