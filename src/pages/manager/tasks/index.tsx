import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";

type Task = {
  id: string;
  title: string;
  employeeName: string;
  status: string;
  deadline: string;
};

export default function ManagerTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/manager/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Tasks</h1>

        <button
          onClick={() => navigate("/manager/tasks/create")}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Assign Task
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Title</th>
            <th>Employee</th>
            <th>Status</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-t cursor-pointer"
              onClick={() => navigate(`/manager/tasks/${task.id}`)}
            >
              <td className="p-2">{task.title}</td>
              <td>{task.employeeName}</td>
              <td>{task.status}</td>
              <td>{new Date(task.deadline).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
