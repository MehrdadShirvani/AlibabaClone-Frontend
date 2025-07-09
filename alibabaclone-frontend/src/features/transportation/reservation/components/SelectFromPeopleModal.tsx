import { PersonDto } from "@/shared/models/account/PersonDto";

interface SelectFromPeopleModalProps {
  isOpen: boolean;
  people: PersonDto[];
  onSelect: (person: PersonDto) => void;
  onClose: () => void;
}

function SelectFromPeopleModal({
  isOpen,
  people,
  onSelect,
  onClose,
}: SelectFromPeopleModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        className="rounded p-4 w-[400px] max-h-[80vh] overflow-y-auto shadow-lg"
        style={{
          backgroundColor: "var(--surface)",
          color: "var(--text-primary)",
          border: "1px solid var(--border)",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Select a Person</h2>
          <button
            className="text-sm font-semibold"
            style={{ color: "var(--destructive)" }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {people.map((person) => (
          <div
            key={person.idNumber}
            className="p-2 border-b cursor-pointer"
            style={{
              borderColor: "var(--border)",
            }}
            onClick={() => onSelect(person)}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--input-hover-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            {person.firstName} {person.lastName} — {person.idNumber}
          </div>
        ))}
      </div>
    </div>
  );
}
export default SelectFromPeopleModal;
