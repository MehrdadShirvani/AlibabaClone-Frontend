import Navbar from "@/components/navbar";
import "./App.css";
import TransportationSearchForm from "@/features/transportation/transportationSearchForm";

function App() {
  return (
    <>
      <div className="card">
        <Navbar />
        <div>
          <TransportationSearchForm />
        </div>
      </div>
    </>
  );
}

export default App;
