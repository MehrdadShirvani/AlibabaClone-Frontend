import agent from "@/shared/api/agent";
import { PersonDto } from "@/shared/models/account/PersonDto";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const emptyPerson: PersonDto = {
  id: 0,
  creatorAccountId: 0,
  firstName: "",
  lastName: "",
  idNumber: "",
  genderId: 1,
  phoneNumber: "",
  birthDate: "",
  englishFirstName: "",
  englishLastName: "",
};

const ListOfTravelers = () => {
  const [people, setPeople] = useState<PersonDto[]>([]);
  const [editingPerson, setEditingPerson] = useState<PersonDto | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset } = useForm<PersonDto>();

  const loadPeople = async () => {
    const data = await agent.Profile.getMyPeople();
    setPeople(data);
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const openModal = (person?: PersonDto) => {
    setEditingPerson(person || null);
    reset(person || emptyPerson);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    reset(emptyPerson);
  };

  const onSubmit = async (data: PersonDto) => {
    await agent.Profile.upsertPerson(data);
    await loadPeople();
    closeModal();
  };

  return (
    <div
      className=" rounded-lg shadow-md p-6 mb-6"
      style={{ border: "1px solid var(--border)" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          My Travelers
        </h2>
        <button
          onClick={() => openModal()}
          className="px-4 py-2 rounded text-white transition"
          style={{ backgroundColor: "var(--primary)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--primary-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--primary)")
          }
        >
          Add Person
        </button>
      </div>

      <div className="overflow-x-auto">
        <table
          className="min-w-full border rounded text-sm"
          style={{ borderColor: "var(--border)" }}
        >
          <thead
            className="bg-gray-100"
            style={{ color: "var(--text-secondary)" }}
          >
            <tr>
              <th className="p-3 text-left">First Name</th>
              <th className="p-3 text-left">Last Name</th>
              <th className="p-3 text-left">English First Name</th>
              <th className="p-3 text-left">English Last Name</th>
              <th className="p-3 text-left">ID Number</th>
              <th className="p-3 text-left">Phone Number</th>
              <th className="p-3 text-left">Birth Date</th>
              <th className="p-3 text-left">Gender</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {people.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-gray-50"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                <td className="p-3">{p.firstName}</td>
                <td className="p-3">{p.lastName}</td>
                <td className="p-3">{p.englishFirstName}</td>
                <td className="p-3">{p.englishLastName}</td>
                <td className="p-3">{p.idNumber}</td>
                <td className="p-3">{p.phoneNumber}</td>
                <td className="p-3">{String(p.birthDate).slice(0, 10)}</td>
                <td className="p-3">{p.genderId === 1 ? "Female" : "Male"}</td>
                <td className="p-3">
                  <button
                    onClick={() => openModal(p)}
                    className="px-3 py-1 rounded text-white transition"
                    style={{ backgroundColor: "var(--warning)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        "var(--warning-hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "var(--warning)")
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div
            className="bg-white p-6 rounded shadow-md w-full max-w-xl"
            style={{ border: "1px solid var(--border)" }}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              {editingPerson ? "Edit Person" : "Add Person"}
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <label style={{ color: "var(--text-primary)" }}>
                  First Name
                </label>
                <input
                  className="input"
                  {...register("firstName", { required: true })}
                />
              </div>
              <div>
                <label style={{ color: "var(--text-primary)" }}>
                  Last Name
                </label>
                <input
                  className="input"
                  {...register("lastName", { required: true })}
                />
              </div>
              <div>
                <label style={{ color: "var(--text-primary)" }}>
                  English First Name
                </label>
                <input
                  className="input"
                  {...register("englishFirstName", { required: true })}
                />
              </div>
              <div>
                <label style={{ color: "var(--text-primary)" }}>
                  English Last Name
                </label>
                <input
                  className="input"
                  {...register("englishLastName", { required: true })}
                />
              </div>
              <div>
                <label style={{ color: "var(--text-primary)" }}>
                  ID Number
                </label>
                <input
                  className="input"
                  {...register("idNumber", { required: true })}
                />
              </div>
              <div>
                <label style={{ color: "var(--text-primary)" }}>
                  Phone Number
                </label>
                <input
                  className="input"
                  {...register("phoneNumber", { required: true })}
                />
              </div>
              <div>
                <label style={{ color: "var(--text-primary)" }}>
                  Birth Date
                </label>
                <input
                  type="date"
                  className="input"
                  {...register("birthDate", { required: true })}
                />
              </div>
              <div>
                <label style={{ color: "var(--text-primary)" }}>Gender</label>
                <select
                  className="input"
                  {...register("genderId", { required: true })}
                >
                  <option value={1}>Female</option>
                  <option value={2}>Male</option>
                </select>
              </div>

              <div className="col-span-2 flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded border-gray-400"
                  style={{ color: "var(--text-primary)" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded text-white transition"
                  style={{ backgroundColor: "var(--primary)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--primary-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--primary)")
                  }
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListOfTravelers;
