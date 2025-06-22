import { Button } from "@/components/ui/button";
import agent from "@/shared/api/agent";
import { PersonDto } from "@/shared/models/account/PersonDto";
import { createTravelerTicketDto } from "@/shared/models/ticketOrder/createTravelerTicketDto";
import { useReservationStore } from "@/store/useReservationStore";
import { useState } from "react";
import SelectFromPeopleModal from "./SelectFromPeopleModal";

interface TravelerFormProps {
  index: number;
  traveler: createTravelerTicketDto;
  onChange: (index: number, traveler: createTravelerTicketDto) => void;
  onRemove: (index: number) => void;
  errors?: Partial<Record<keyof createTravelerTicketDto, boolean>>;
}

function TravelerForm({
  index,
  traveler,
  onChange,
  onRemove,
  errors,
}: TravelerFormProps) {
  const [selectingIndex, setSelectingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { travelers, people, setPeople } = useReservationStore(); // or however you store them
  const handleSelectFromPeople = async (index: number) => {
    setSelectingIndex(index);
    if (people.length === 0) {
      const loaded = await agent.Profile.getMyPeople(); // Load from API
      setPeople(loaded);
    }
    setIsModalOpen(true);
  };

  const handlePersonSelect = (person: PersonDto) => {
    if (selectingIndex !== null) {
      onChange(selectingIndex, {
        ...travelers[selectingIndex],
        ...{
          firstName: person.firstName,
          lastName: person.lastName,
          birthDate: person.birthDate,
          creatorAccountId: 0,
          description: "",
          englishFirstName: person.englishFirstName,
          englishLastName: person.englishLastName,
          genderId: person.genderId,
          idNumber: person.idNumber,
          isVIP: false,
          seatId: travelers[selectingIndex].seatId,
          phoneNumber: person.phoneNumber,
          id: 0,
        }, // Assumes fields match
      });
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <SelectFromPeopleModal
        isOpen={isModalOpen}
        people={people}
        onSelect={handlePersonSelect}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="border rounded p-4 mb-4">
        <p>{traveler.seatId}</p>
        <div className="grid grid-cols-2 gap-4">
          <input
            className={errors?.firstName ? "border-red-500" : ""}
            type="text"
            placeholder="First Name"
            value={traveler.firstName}
            onChange={(e) =>
              onChange(index, { ...traveler, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            value={traveler.lastName}
            className={errors?.lastName ? "border-red-500" : ""}
            onChange={(e) =>
              onChange(index, { ...traveler, lastName: e.target.value })
            }
          />
          <select
            value={traveler.genderId}
            className={errors?.genderId ? "border-red-500" : ""}
            onChange={(e) =>
              onChange(index, { ...traveler, genderId: Number(e.target.value) })
            }
          >
            <option value={0}>Select Gender</option>
            <option value={1}>Female</option>
            <option value={2}>Male</option>
          </select>
          <input
            type="date"
            placeholder="Birthdate"
            className={errors?.birthDate ? "border-red-500" : ""}
            value={traveler.birthDate}
            onChange={(e) =>
              onChange(index, { ...traveler, birthDate: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="National ID"
            className={errors?.idNumber ? "border-red-500" : ""}
            value={traveler.idNumber}
            onChange={(e) =>
              onChange(index, { ...traveler, idNumber: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Phone Number"
            className={errors?.phoneNumber ? "border-red-500" : ""}
            value={traveler.phoneNumber}
            onChange={(e) =>
              onChange(index, { ...traveler, phoneNumber: e.target.value })
            }
          />
        </div>
        <Button
          variant="secondary"
          onClick={() => handleSelectFromPeople(index)}
        >
          Select from People
        </Button>
        <Button
          className="mt-2"
          variant="outline"
          onClick={() => onRemove(index)}
        >
          Remove
        </Button>
      </div>
    </>
  );
}

export default TravelerForm;
