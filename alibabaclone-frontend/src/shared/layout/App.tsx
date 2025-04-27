import "./App.css";
import TransportationSearchForm from "@/features/transportation/transportationSearchForm";

function App() {
  return (
    <>
      <h1>Transportation Search</h1>
      <div className="card">
        <div>
          <h2>Choose the transportation search form</h2>
          <TransportationSearchForm />
        </div>
      </div>
    </>
  );
}

export default App;
