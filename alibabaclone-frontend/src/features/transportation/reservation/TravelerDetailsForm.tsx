import { useReservationStore } from "@/store/useReservationStore";
import { useEffect, useState } from "react";
import TravelerForm from "./TravelerForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createTravelerTicketDto } from "@/shared/models/ticketOrder/createTravelerTicketDto";
import SeatGridSelector from "./SeatGridSelector";
import { transportationSeatDto } from "@/shared/models/transportation/transportationSeatDto";
import agent from "@/shared/api/agent";
import { useStepGuard } from "./StepGaurd";

export default function TravelerDetailsForm() {
  const [seatList, setSeatList] = useState<transportationSeatDto[]>([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<number[]>([]);
  const vehicleTypeId = useReservationStore().transportation?.vehicleTypeId;
  const transportationId = useReservationStore().transportation?.id ?? 0;
  const { travelers, setTravelers, setIsTravelerPartDone } =
    useReservationStore();

  const [errors, setErrors] = useState<
    Record<number, Partial<Record<keyof createTravelerTicketDto, boolean>>>
  >({});
  const validateTravelers = (travelers: createTravelerTicketDto[]): boolean => {
    const newErrors: typeof errors = {};
    const idSet = new Set<string>();

    travelers.forEach((t, i) => {
      const errs: Partial<Record<keyof createTravelerTicketDto, boolean>> = {};

      if (!t.firstName.trim()) errs.firstName = true;
      if (!t.lastName.trim()) errs.lastName = true;
      if (!t.birthDate.trim()) errs.birthDate = true;
      if (!t.phoneNumber.trim() || !/^\d{11}$/.test(t.phoneNumber))
        errs.phoneNumber = true;
      if (!t.idNumber.trim() || !/^\d{10}$/.test(t.idNumber))
        errs.idNumber = true;
      if (vehicleTypeId == 1 && !t.seatId) errs.seatId = true;
      if (t.genderId === 0) errs.genderId = true;
      if (idSet.has(t.idNumber)) errs.idNumber = true;
      idSet.add(t.idNumber);

      if (Object.keys(errs).length > 0) {
        newErrors[i] = errs;
      }
    });

    setErrors(newErrors);
    console.log(Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelect = (seatIds: number[]) => {
    setSelectedSeatIds(seatIds);
    const newTravelers = [...travelers];
    while (newTravelers.length < seatIds.length)
      newTravelers.push({
        seatId: null,
        firstName: "",
        lastName: "",
        genderId: 0,
        birthDate: "",
        idNumber: "",
        phoneNumber: "",
        creatorAccountId: 0,
        description: "",
        englishFirstName: "",
        englishLastName: "",
        id: 0,
        isVIP: false,
      });
    while (newTravelers.length > seatIds.length) newTravelers.pop();
    seatIds.forEach((id, i) => (newTravelers[i].seatId = id));
    setTravelers(newTravelers);
  };

  const navigate = useNavigate();

  useStepGuard("travelers");

  useEffect(() => {
    if (vehicleTypeId === 1) {
      agent.TransportationSearch.getSeats(transportationId)
        .then(setSeatList)
        .catch(() => {
          console.log("Error in getting seats");
        });
    }

    if (travelers.length === 0) {
      setTravelers([
        {
          id: 0,
          creatorAccountId: 0,
          firstName: "",
          lastName: "",
          genderId: 0,
          birthDate: "",
          idNumber: "",
          phoneNumber: "",
          englishFirstName: "",
          englishLastName: "",
          isVIP: false,
          seatId: null,
          description: "",
        },
      ]);
    }
  }, [travelers]);

  const handleNext = () => {
    if (!validateTravelers(travelers)) {
      alert("Please correct the errors in the form.");
      return;
    }

    if (travelers.length === 0) {
      alert("You should add at least one traveler.");
      return;
    }

    setIsTravelerPartDone(true);
    navigate("/reserve/review");
  };

  return (
    <div>
      {vehicleTypeId === 1 ? (
        <>
          <SeatGridSelector
            seats={seatList}
            selectedSeats={selectedSeatIds}
            onSelect={handleSelect}
          />
          {travelers.map((traveler, index) => (
            <TravelerForm
              errors={errors[index]}
              key={index}
              index={index}
              traveler={traveler}
              onChange={(i, t) => {
                const updated = [...travelers];
                updated[i] = t;
                setTravelers(updated);
              }}
              onRemove={(i) => {
                const updated = [...travelers];
                updated.splice(i, 1);
                setTravelers(updated);
                setSelectedSeatIds((prev) =>
                  prev.filter((_, idx) => idx !== i)
                );
              }}
            />
          ))}
        </>
      ) : (
        <>
          {travelers.map((traveler, index) => (
            <TravelerForm
              errors={errors[index]}
              key={index}
              index={index}
              traveler={traveler}
              onChange={(i, t) => {
                const updated = [...travelers];
                updated[i] = t;
                setTravelers(updated);
              }}
              onRemove={(i) => {
                if (travelers.length > 1) {
                  const updated = [...travelers];
                  updated.splice(i, 1);
                  setTravelers(updated);
                } else {
                  alert("There has to be at least one traveler");
                }
              }}
            />
          ))}
        </>
      )}
      <div className="mt-6">
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  );
}
