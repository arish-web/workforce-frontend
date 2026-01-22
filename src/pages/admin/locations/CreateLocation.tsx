import { useState } from "react";
import { locationService } from "../../../services/location.service";
import { Notify } from "notiflix";

export default function CreateLocation() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!name.trim()) {
      Notify.failure("Location name required");
      return;
    }

    try {
      setLoading(true);
      await locationService.create(name); // 👈 unchanged
      setName("");
      Notify.success("Location created successfully");
    } catch (err: any) {
      Notify.failure(
        err?.response?.data?.message || "Failed to create location"
      );
    } finally {
      setLoading(false);
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
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
}
