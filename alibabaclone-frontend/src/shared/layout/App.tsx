import { Button } from "@/components/ui/button";
import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import agent from "../api/agent";
import CityDropdown from "@/features/city/CityDropdown";
import TransportationSearchForm from "@/features/transportation/transportationSearchForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button>Click me</Button>
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
