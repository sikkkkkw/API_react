// import axios from "axios";
// import { useState, useEffect } from "react";

import Tawk from "./Tawk";

// const URL = "http://infuser.odcloud.kr/oas/docs?namespace=15052602/v1";

function App() {
  return (
    <div className="w-full">
      <Tawk />
    </div>
  );
  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const fetchData = async () => {
  //   try {
  //     setError(null);
  //     setData(null);
  //     setLoading(true);

  //     const response = await axios.get(URL, {
  //       params: {
  //         serviceKey: process.env.REACT_APP_API_KEY,
  //         numOfRows: 1,
  //         pageNo: 10,
  //       },
  //     });
  //     console.log(response.data);
  //     setData(response.data);
  //   } catch (e) {
  //     setError(e);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error...</div>;
  // if (!data) return null;
  // return (
  //   <div className=" w-full bg-red-500 flex justify-center">
  //     {data.info.title}
  //   </div>
  // );
}

export default App;
