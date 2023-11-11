import BackButton from "../../components/BackButton.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteEmp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const deleteBook = () => {
    axios
      .delete(`https://employee-supervisor.vercel.app/emp/delete/${id}`)
      .then(() => {
        enqueueSnackbar("Employee Deleted successfully", {
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
      <h1 className="text-3xl my-4">Delete Employee</h1>
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
          Are You Sure You want to delete this employee?
        </h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={deleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteEmp;
