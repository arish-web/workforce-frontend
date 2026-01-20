import { useState } from "react";
import { locationService } from "../../../services/location.service";
import { Notify } from "notiflix";


export default function CreateLocation() {
  const [name, setName] = useState("");

  const submit = async () => {
    if (!name) return;
    await locationService.create(name);
    setName("");
    try {
    Notify.success("Login successful") 
    } catch {
      Notify.failure("Invalid credentials");
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-xl font-bold mb-4">Create Location</h1>

      <input
        placeholder="Location name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create
      </button>
    </div>
  );
}
