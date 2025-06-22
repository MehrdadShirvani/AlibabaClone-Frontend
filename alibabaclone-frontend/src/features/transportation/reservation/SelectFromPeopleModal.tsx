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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-4 w-[400px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Select a Person</h2>
        <button className="float-right text-red-500" onClick={onClose}>
          X
        </button>
        {people.map((person) => (
          <div
            key={person.idNumber}
            className="p-2 border-b cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(person)}
          >
            {person.firstName} {person.lastName} — {person.idNumber}
          </div>
        ))}
      </div>
    </div>
  );
}
export default SelectFromPeopleModal;
