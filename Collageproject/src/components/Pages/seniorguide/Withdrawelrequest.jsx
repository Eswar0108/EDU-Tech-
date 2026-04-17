import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getWalletBalance,
  getWalletTransactions,
  createWithdrawRequest
} from "../../../Apiroute";

function Withdraw() {

  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [withdrawRequests, setWithdrawRequests] = useState([]);

  const [amount, setAmount] = useState("");
  const [upi, setUpi] = useState("");

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    loadData();

  }, []);


  const loadData = async () => {

    try {

      const bal = await getWalletBalance();

      const tx = await getWalletTransactions();

      setBalance(bal.data.wallet_balance);

      setWithdrawRequests(
        tx.data.filter(
          t => t.type === "withdraw"
        )
      );

    } catch (err) {

      console.log(err);

    }

  };


 const handleWithdraw = async () => {

  if (!amount)
    return alert("Enter amount");

  if (Number(amount) < 100)
    return alert("Minimum withdraw ₹100");

  if (Number(amount) > balance)
    return alert("Insufficient balance");

  try {

    setLoading(true);

    await createWithdrawRequest(
      Number(amount)
    );

    alert("Withdraw request submitted");

    setAmount("");

    loadData();

  } catch (err) {

    console.log(err);

  } finally {

    setLoading(false);

  }

};

  return (

    <div className="p-6">

      <button
        onClick={() => navigate(-1)}
        className="flex gap-2 mb-4"
      >
        <ChevronLeft />
        Back
      </button>


      <h2 className="text-xl font-bold">
        Withdraw Request
      </h2>


      <p className="mt-2">
        Available Balance: ₹{balance}
      </p>


      <input
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2 block mt-4"
      />


      <input
        value={upi}
        onChange={(e)=>setUpi(e.target.value)}
        placeholder="UPI ID"
        className="border p-2 block mt-2"
      />


      <button
        onClick={handleWithdraw}
        disabled={loading}
        className="bg-orange-500 text-white px-4 py-2 mt-4"
      >

        {loading
          ? "Submitting..."
          : "Submit Withdraw Request"}

      </button>


      <div className="mt-6">

        <h3 className="font-bold">
          Withdraw History
        </h3>


        {withdrawRequests.length > 0 ? (

          withdrawRequests.map(req => (

            <div
              key={req.id}
              className="border-b py-2 flex justify-between"
            >

              <span>
                ₹{req.amount}
              </span>

              <span>
                {req.status}
              </span>

            </div>

          ))

        ) : (

          <p>No withdraw requests yet</p>

        )}

      </div>

    </div>

  );

}

export default Withdraw;