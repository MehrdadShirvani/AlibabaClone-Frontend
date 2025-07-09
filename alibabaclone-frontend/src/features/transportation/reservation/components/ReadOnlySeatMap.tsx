import React from "react";
import { TransportationSeatDto } from "@/shared/models/transportation/transportationSeatDto";

interface ReadOnlySeatMapProps {
  seats: TransportationSeatDto[];
}

const ReadOnlySeatMap: React.FC<ReadOnlySeatMapProps> = ({ seats }) => {
  const maxRow = Math.max(...seats.map((seat) => seat.row || 0)) || 5;
  const maxCol = Math.max(...seats.map((seat) => seat.column || 0)) || 5;

  const rotatedSeats: (TransportationSeatDto | null)[] = [];
  for (let col = 1; col <= maxCol; col++) {
    for (let row = 1; row <= maxRow; row++) {
      const seat = seats.find((s) => s.row === row && s.column === col);
      rotatedSeats.push(seat || null);
    }
  }

  return (
    <div className="p-2">
      {/* Legend */}
      <div className="flex gap-4 flex-wrap mb-2">
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

      {/* Seat Grid */}
      <div
        className="grid gap-x-[4px] gap-y-[4px]"
        style={{
          gridTemplateColumns: `repeat(${maxRow}, 2.5rem)`,
        }}
      >
        {rotatedSeats.map((seat, index) => {
          if (!seat)
            return <div key={index + 1000} className="w-10 h-10"></div>;

          const isReserved = seat.isReserved;
          const bgColor = isReserved ? "var(--secondary)" : "var(--background)";
          const textColor = isReserved
            ? "var(--secondary-foreground)"
            : "var(--text-primary)";

          return (
            <div
              key={seat.id}
              className="w-10 h-10 flex items-center justify-center border rounded text-xs px-2"
              style={{
                backgroundColor: bgColor,
                color: textColor,
                borderColor: "var(--border-color)",
              }}
            >
              {(seat.row - 1) * maxCol + seat.column}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadOnlySeatMap;
