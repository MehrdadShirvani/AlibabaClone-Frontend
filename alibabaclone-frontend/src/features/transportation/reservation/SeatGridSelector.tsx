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
    if (!seat.isReserved) return (seat.row - 1) * maxCol + seat.column;
    return seat.genderId === 1 ? "Female" : "Male";
  };

  const maxCol = Math.max(...seats.map((seat) => seat.column || 0)) || 5;

  return (
    <>
      <div
        className="grid gap-x-[1px] gap-y-[4px] p-2 "
        style={{
          gridTemplateColumns: `repeat(${maxCol}, 2.5rem)`,
        }}
      >
        {seats.map((seat) => {
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
              className="w-9 h-9 flex items-center justify-center border rounded text-xs transition-all duration-150"
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
      <div className="flex gap-4 mb-3 flex-wrap">
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
    </>
  );
};

export default SeatGridSelector;
