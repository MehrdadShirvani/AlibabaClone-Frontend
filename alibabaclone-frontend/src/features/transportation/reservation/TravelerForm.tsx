import { Button } from "@/shared/components/ui/button";
import api from "@/services/api";
import { PersonDto } from "@/shared/models/account/PersonDto";
import { createTravelerTicketDto } from "@/shared/models/ticketOrder/createTravelerTicketDto";
import { useReservationStore } from "@/stores/useReservationStore";
import { useState } from "react";
import SelectFromPeopleModal from "./SelectFromPeopleModal";

interface TravelerFormProps {
  index: number;
  traveler: createTravelerTicketDto;
  onChange: (index: number, traveler: createTravelerTicketDto) => void;
  onRemove: (index: number) => void;
  errors?: Partial<Record<keyof createTravelerTicketDto, boolean>>;
}

const formatDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // "yyyy-MM-dd"
};

function TravelerForm({
  index,
  traveler,
  onChange,
  onRemove,
  errors,
}: TravelerFormProps) {
  const [selectingIndex, setSelectingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { travelers, people, setPeople } = useReservationStore();

  const handleSelectFromPeople = async (index: number) => {
    setSelectingIndex(index);
    if (people.length === 0) {
      const loaded = await api.Profile.getMyPeople();
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
          birthDate: formatDate(person.birthDate),
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
        },
      });
    }
    setIsModalOpen(false);
  };

  const inputClass =
    "w-full rounded-md px-3 py-2 text-sm border bg-[var(--input-bg)] text-[var(--text-primary)] border-[var(--border)] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]";

  const errorTextClass = "text-xs text-red-500 mt-1";

  return (
    <>
      <SelectFromPeopleModal
        isOpen={isModalOpen}
        people={people}
        onSelect={handlePersonSelect}
        onClose={() => setIsModalOpen(false)}
      />

      <div
        className="border rounded-2xl p-6 mb-6 shadow-sm"
        style={{
          backgroundColor: "var(--surface)",
          borderColor: "var(--border)",
        }}
      >
        <p className="mb-4 text-sm" style={{ color: "var(--text-secondary)" }}>
          Seat ID: <span className="font-semibold">{traveler.seatId}</span>
          {errors?.seatId && (
            <div className={errorTextClass}>Select a seat</div>
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <input
              className={`${inputClass} ${
                errors?.firstName ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="First Name"
              value={traveler.firstName}
              onChange={(e) =>
                onChange(index, { ...traveler, firstName: e.target.value })
              }
            />
            {errors?.firstName && (
              <div className={errorTextClass}>First name is required</div>
            )}
          </div>

          {/* Last Name */}
          <div>
            <input
              className={`${inputClass} ${
                errors?.lastName ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Last Name"
              value={traveler.lastName}
              onChange={(e) =>
                onChange(index, { ...traveler, lastName: e.target.value })
              }
            />
            {errors?.lastName && (
              <div className={errorTextClass}>Last name is required</div>
            )}
          </div>

          {/* Gender */}
          <div>
            <select
              className={`${inputClass} ${
                errors?.genderId ? "border-red-500" : ""
              }`}
              value={traveler.genderId}
              onChange={(e) =>
                onChange(index, {
                  ...traveler,
                  genderId: Number(e.target.value),
                })
              }
            >
              <option value={0}>Select Gender</option>
              <option value={1}>Female</option>
              <option value={2}>Male</option>
            </select>
            {errors?.genderId && (
              <div className={errorTextClass}>Please select gender</div>
            )}
          </div>

          {/* Birth Date */}
          <div>
            <input
              className={`${inputClass} ${
                errors?.birthDate ? "border-red-500" : ""
              }`}
              type="date"
              value={traveler.birthDate}
              onChange={(e) =>
                onChange(index, { ...traveler, birthDate: e.target.value })
              }
            />
            {errors?.birthDate && (
              <div className={errorTextClass}>Enter a valid birth date</div>
            )}
          </div>

          {/* ID Number */}
          <div>
            <input
              className={`${inputClass} ${
                errors?.idNumber ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="National ID"
              value={traveler.idNumber}
              onChange={(e) =>
                onChange(index, { ...traveler, idNumber: e.target.value })
              }
            />
            {errors?.idNumber && (
              <div className={errorTextClass}>ID is required</div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <input
              className={`${inputClass} ${
                errors?.phoneNumber ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Phone Number"
              value={traveler.phoneNumber}
              onChange={(e) =>
                onChange(index, { ...traveler, phoneNumber: e.target.value })
              }
            />
            {errors?.phoneNumber && (
              <div className={errorTextClass}>Phone is required</div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <Button
            variant="secondary"
            onClick={() => handleSelectFromPeople(index)}
          >
            Select from People
          </Button>
          <Button variant="outline" onClick={() => onRemove(index)}>
            Remove
          </Button>
        </div>
      </div>
    </>
  );
}

export default TravelerForm;
