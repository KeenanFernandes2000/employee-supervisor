import { useState, useEffect } from "react";
import BackButton from "../../components/BackButton.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const UpdateSupEmp = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [sup, setSup] = useState([]);
  const [supervisor, setSelectedSupervisor] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/emp/sup/${id}`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setSup(response.data);
        }
        // console.error('Data received is not an array:', response.data);
      })
      .catch((error) => {
        alert("An error happened. Please Chack console");
        console.log(error);
      });

    axios
      .get(`http://localhost:3001/emp/find/${id}`)
      .then((response) => {
        setName(response.data.name);
        setTitle(response.data.title);
        setRole(response.data.role);
      })
      .catch((error) => {
        alert("An error happened. Please Chack console");
        console.log(error);
      });
  });

  const editSup = () => {
    const data = {
      name,
      title,
      role,
      supervisor: supervisor,
    };

    axios
      .put(`http://localhost:3001/emp/super/${id}`, data)
      .then(() => {
        console.log("Employee supervisor updated successfully");
        enqueueSnackbar("Employee supervisor updated successfully", {
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
      <h1 className="text-3xl my-4">Update Employee Supervisor</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <label className="border-2 border-gray-500 px-4 py-2 w-full">
            {name}
          </label>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <label
            value={title}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            {title}
          </label>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Role</label>
          <label
            value={role}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            {role}
          </label>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Supervisor</label>
          <select
            value={supervisor}
            onChange={(e) => setSelectedSupervisor(e.target.value)}
          >
            <option selected value>
              {" "}
              -- select an option --{" "}
            </option>
            {sup.map((e, i) => (
              <option
                key={i}
                value={e}
                className="border-2 border-gray-500 px-4 py-2  w-full "
              >
                {e}
              </option>
            ))}
          </select>
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={editSup}>
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateSupEmp;
