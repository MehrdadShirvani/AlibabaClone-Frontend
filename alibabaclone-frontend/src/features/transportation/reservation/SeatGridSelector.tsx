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
    if (!seat.isReserved) return seat.row + "-" + seat.column;
    return seat.genderId === 1 ? "Female" : "Male";
  };

  return (
    <div className="grid grid-cols-5 gap-1 p-1">
      {seats.map((seat) => {
        const isSelected = selectedSeats.includes(seat.id);
        const isReserved = seat.isReserved;

        // Determine styles based on state
        let bgColor: string;
        let textColor: string;
        let cursor: string;
        let hoverBg: string;

        if (isReserved) {
          bgColor = "var(--secondary)";
          textColor = "var(--secondary-foreground)";
          cursor = "not-allowed";
        } else if (isSelected) {
          bgColor = "var(--primary)";
          textColor = "var(--primary-foreground)";
          cursor = "pointer";
        } else {
          bgColor = "var(--background)";
          textColor = "var(--text-primary)";
          cursor = "pointer";
          hoverBg = "var(--primary-hover)";
        }

        return (
          <div
            key={seat.id}
            onClick={() => !isReserved && handleToggle(seat.id)}
            className="w-10 h-10 flex items-center justify-center border rounded cursor-pointer text-xs transition-all duration-150"
            style={{
              backgroundColor: bgColor,
              color: textColor,
              borderColor: "var(--border)",
              cursor,
            }}
            // add hover effect via inline style using a small CSS trick
            onMouseEnter={(e) => {
              if (hoverBg)
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  hoverBg;
            }}
            onMouseLeave={(e) => {
              if (hoverBg)
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  bgColor;
            }}
          >
            {getSeatLabel(seat)}
          </div>
        );
      })}
    </div>
  );
};

export default SeatGridSelector;
