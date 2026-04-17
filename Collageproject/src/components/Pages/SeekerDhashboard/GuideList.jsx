import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchGuides } from "../../../Apiroute";

function GuideList() {

  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Optional filters (later dynamic ga set cheyyachu)
  const [college] = useState("");
  const [branch] = useState("");

  const fetchGuides = async () => {

    try {

      const response = await searchGuides(
        college,
        branch
      );

      console.log("Guides:", response.data);

      setGuides(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchGuides();

  }, []);


  return (

    <div className="bg-[#54545454] mt-30 p-6">

      <h1 className="text-xl font-bold mb-4">
        Guide List
      </h1>


      {loading ? (

        <p>Loading guides...</p>

      ) : guides.length === 0 ? (

        <p>No guides available</p>

      ) : (

        guides.map((guide) => (

          <div
            key={guide.id}
            className="bg-white p-4 rounded shadow mb-4"
          >

            <p className="font-semibold text-lg">
              {guide.unique_id}
            </p>


            <Link to={`/guide-profile/${guide.id}`}>

              <button className="bg-orange-500 text-white px-3 py-1 rounded mt-2">

                View Profile

              </button>

            </Link>

          </div>

        ))

      )}

    </div>

  );

}

export default GuideList;