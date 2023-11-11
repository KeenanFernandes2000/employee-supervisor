import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { BsFillPersonFill } from "react-icons/bs";

const Home = () => {
  const [emps, setEmps] = useState([]);
  useEffect(() => {
    axios
      .get("https://employee-supervisor.vercel.app/emp")
      .then((response) => {
        setEmps(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <h1 className="text-3xl my-8">Employee List</h1>
        <Link to="/emp/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl " title="Create" />
        </Link>
        <Link to="/emp/viewchain">
          <VscTypeHierarchySub
            className="text-sky-800 text-3xl"
            title="Show Hierarchy"
          />
        </Link>
      </div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">No</th>
            <th className="border border-slate-600 rounded-md">Name</th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Title
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Role
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Supervisor
            </th>
            <th className="border border-slate-600 rounded-md max-md:hidden">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {emps.map((emp, index) => (
            <tr key={emp.__id} className="h-8">
              <td className="border border-slate-700 rounded-md text-center">
                {index + 1}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                {emp.name}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {emp.title}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {emp.role}
              </td>
              <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                {emp.supervisor}
              </td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/emp/find/${emp._id}`}>
                    <BsInfoCircle
                      className="text-2xl text-green-800"
                      title="Details"
                    />
                  </Link>
                  <Link to={`/emp/update/${emp._id}`}>
                    <AiOutlineEdit
                      className="text-2xl text-yellow-600"
                      title="Update"
                    />
                  </Link>
                  <Link to={`/emp/super/${emp._id}`}>
                    <BsFillPersonFill
                      className="text-2xl text-yellow-600"
                      title="Update Supervisor"
                    />
                  </Link>
                  <Link to={`/emp/delete/${emp._id}`}>
                    <MdOutlineDelete
                      className="text-2xl text-red-600"
                      title="Delete"
                    />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
