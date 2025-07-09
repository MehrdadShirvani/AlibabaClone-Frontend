import { TransportationSeatDto } from "@/shared/models/transportation/transportationSeatDto";
import React from "react";

interface SeatGridSelectorProps {
  seats: TransportationSeatDto[];
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

  const getSeatLabel = (seat: TransportationSeatDto) => {
    if (!seat.isReserved) return (seat.row - 1) * maxCol + seat.column;
    return seat.genderId === 1 ? "Female" : "Male";
  };

  const maxRow = Math.max(...seats.map((seat) => seat.row || 0)) || 5;
  const maxCol = Math.max(...seats.map((seat) => seat.column || 0)) || 5;

  // Organize seats in column-major order to simulate rotation
  const rotatedSeats: (TransportationSeatDto | null)[] = [];
  for (let col = 1; col <= maxCol; col++) {
    for (let row = 1; row <= maxRow; row++) {
      const seat = seats.find((s) => s.row === row && s.column === col);
      rotatedSeats.push(seat || null); // Fill gaps with null if no seat exists
    }
  }

  return (
    <>
      <div className="flex gap-4 flex-wrap mt-2 p-2">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded border"
            style={{ backgroundColor: "var(--primary)" }}
          ></div>
          <span className="text-sm" style={{ color: "var(--text-primary)" }}>
            Selected
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded border"
            style={{ backgroundColor: "var(--secondary)" }}
          ></div>
          <span className="text-sm" style={{ color: "var(--text-primary)" }}>
            Reserved
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded border"
            style={{ backgroundColor: "var(--background)" }}
          ></div>
          <span className="text-sm" style={{ color: "var(--text-primary)" }}>
            Available
          </span>
        </div>
      </div>
      <div
        className="grid gap-x-[4px] gap-y-[4px] p-2"
        style={{
          gridTemplateColumns: `repeat(${maxRow}, 2.5rem)`, // now rows are columns
        }}
      >
        {rotatedSeats.map((seat, index) => {
          if (!seat) {
            return <div key={index + 1000} className="w-9 h-9"></div>; // empty cell for spacing
          }

          const isSelected = selectedSeats.includes(seat.id);
          const isReserved = seat.isReserved;

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
              className="w-10 h-10 flex items-center justify-center border rounded text-xs transition-all duration-150 px-2"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                borderColor: "var(--border-color)",
                cursor,
              }}
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
    </>
  );
};

export default SeatGridSelector;
