import { useState, useEffect } from "react";
import BackButton from "../../components/BackButton.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const UpdateEmp = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`https://employee-supervisor.vercel.app/emp/find/${id}`)
      .then((response) => {
        setName(response.data.name);
        setTitle(response.data.title);
        setRole(response.data.role);
      })
      .catch((error) => {
        alert("An error happened. Please Chack console");
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editEmp = () => {
    const data = {
      name,
      title,
      role,
    };

    axios
      .put(`https://employee-supervisor.vercel.app/emp/update/${id}`, data)
      .then(() => {
        enqueueSnackbar("Employee updated successfully", {
          variant: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        // alert('An error happened. Please Chack console');
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Update Employee</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Role (employee, supervisor, senior supervisor)
          </label>

          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2  w-full "
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={editEmp}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateEmp;
