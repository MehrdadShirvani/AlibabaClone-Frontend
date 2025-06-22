import { transportationSeatDto } from "@/shared/models/transportation/transportationSeatDto";
import React from "react";

interface SeatGridSelectorProps {
  seats: transportationSeatDto[];
  selectedSeats: number[]; // seat IDs
  onSelect: (seatIds: number[]) => void;
}

const SeatGridSelector: React.FC<SeatGridSelectorProps> = ({
  seats,
  selectedSeats,
  onSelect,
}) => {
  const handleToggle = (seatId: number) => {
    if (selectedSeats.includes(seatId)) {
      onSelect(selectedSeats.filter((id) => id !== seatId));
    } else {
      onSelect([...selectedSeats, seatId]);
    }
  };

  const getSeatLabel = (seat: transportationSeatDto) => {
    if (!seat.isReserved) return seat.row + " - " + seat.column;
    return seat.genderId === 1 ? "female" : "male";
  };

  return (
    <div className="grid grid-cols-5 gap-1 p-1">
      {seats.map((seat) => {
        const isSelected = selectedSeats.includes(seat.id); // Unique ID if seat.id is missing
        const isReserved = seat.isReserved;
        const seatId = seat.id;

        return (
          <div
            key={seatId}
            onClick={() => !isReserved && handleToggle(seatId)}
            className={`w-10 h-10 flex items-center justify-center border rounded cursor-pointer text-xs transition ${
              isReserved
                ? "bg-gray-400 text-white cursor-not-allowed"
                : isSelected
                ? "bg-blue-500 text-white"
                : "bg-white text-black hover:bg-blue-100"
            }`}
          >
            {getSeatLabel(seat)}
          </div>
        );
      })}
    </div>
  );
};

export default SeatGridSelector;
