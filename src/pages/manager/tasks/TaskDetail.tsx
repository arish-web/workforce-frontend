import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../services/api";
import { managerService } from "../../../services/manager.service";


export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState<any>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
  managerService.getTasks().then(setTask);
}, []);


useEffect(() => {
  managerService.getTaskById(id!).then(setTask);
}, [id]);

const addComment = async () => {
  await managerService.addComment(id!, comment);
  setComment("");
};

  useEffect(() => {
    api.get(`/manager/tasks/${id}`).then(res => {
      setTask(res.data);
    });
  }, [id]);

//   const addComment = async () => {
//     if (!comment) return;
//     await api.post(`/tasks/${id}/comments`, { comment });
//     setComment("");
//   };

  if (!task) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">{task.title}</h1>
      <p>Status: {task.status}</p>

      <h2 className="mt-4 font-semibold">Comments</h2>
      {task.comments.map((c: any) => (
        <p key={c.id} className="border-b py-1">
          {c.comment}
        </p>
      ))}

      <textarea
        className="input w-full mt-2"
        placeholder="Add comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />

      <button className="btn mt-2" onClick={addComment}>
        Add Comment
      </button>
    </div>
  );
}
