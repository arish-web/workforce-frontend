import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import { managerService } from "../../../services/manager.service";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [deadline, setDeadline] = useState("");
  const [employees, setEmployees] = useState<any[]>([]);
  const navigate = useNavigate();

  console.log("employees",  employees)

useEffect(() => {
  api.get("/manager/employees").then((res) => {
    // unwrap paginated response
    setEmployees(res.data?.data || []);
  });
}, []);


  //   const submit = async () => {
  //     if (!title || !employeeId || !deadline) return;

  //     await api.post("/manager/tasks", {
  //       title,
  //       employeeId,
  //       deadline,
  //     });

  //     navigate("/manager/tasks");
  //   };

  const submit = async () => {
    await managerService.createTask({
      title,
      employeeId,
      deadline,
    });

    navigate("/manager/tasks");
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-xl font-semibold mb-4">Assign Task</h1>

      <input
        className="input w-full mb-2"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        className="input w-full mb-2"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      >
        <option value="">Select Employee</option>
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.email}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="input w-full mb-4"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />

      <button className="btn w-full" onClick={submit}>
        Create Task
      </button>
    </div>
  );
}
