import BackButton from "../../components/BackButton.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowEmp = () => {
  const [emp, setEmp] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/emp/find/${id}`)
      .then((response) => {
        setEmp(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Employee</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">ID</span>
          <span>{emp._id}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Name</span>
          <span>{emp.name}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Title</span>
          <span>{emp.title}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Role</span>
          <span>{emp.role}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Supervisor</span>
          <span>{emp.supervisor}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowEmp;
