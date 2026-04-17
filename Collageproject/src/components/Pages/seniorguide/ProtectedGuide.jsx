import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGuideApplicationStatus } from "../../../Apiroute";

function ProtectedGuide({ children }) {

  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {

    const checkAccess = async () => {

      try {

        const res = await getGuideApplicationStatus();

        const status = res.data.status;

        if (status === "ACTIVE") {

          setAllowed(true);

        } 
        else if (status === "ELIGIBLE_TEST") {

          navigate("/guide-test");

        } 
        else if (status === "PENDING_VERIFICATION") {

          navigate("/pending-approval");

        } 
        else {

          navigate("/");

        }

      } catch (error) {

        navigate("/");

      }

    };

    checkAccess();

  }, [navigate]);

  if (!allowed) {

    return <div className="text-center mt-10">Checking access...</div>;

  }

  return children;

}

export default ProtectedGuide;