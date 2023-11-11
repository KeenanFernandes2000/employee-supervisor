import BackButton from "../../components/BackButton.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const ShowHierarchy = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3001/emp/viewchain")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(data);
  return (
    <div>
      <BackButton />
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading hierarchy data...</p>
      )}
    </div>
  );
};

export default ShowHierarchy;
