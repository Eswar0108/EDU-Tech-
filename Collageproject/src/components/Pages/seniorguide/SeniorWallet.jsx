import { useEffect, useState } from "react";
import { Wallet, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getWalletBalance,
  getWalletTransactions,
  createWalletOrder,
  verifyWalletPayment
} from "../../../Apiroute";

function WalletPage() {

  const navigate = useNavigate();

  const [balance, setBalance] = useState(0);
  const [pending, setPending] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadWallet();
  }, []);


  const loadWallet = async () => {

    try {

      const bal = await getWalletBalance();
      const tx = await getWalletTransactions();

      setBalance(bal.data.wallet_balance || 0);
      setPending(bal.data.pending_withdrawal || 0);
      setTransactions(tx.data || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };


  const handleAddMoney = async () => {

    if (!amount || Number(amount) <= 0)
      return alert("Enter valid amount");

    try {

      const res = await createWalletOrder({
        amount: Number(amount)
      });

      const order = res.data;

      const razorpay = new window.Razorpay({

        key: import.meta.env.VITE_RAZORPAY_KEY,

        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,

        handler: async (response) => {

          await verifyWalletPayment({

            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_order_id:
              response.razorpay_order_id,

            razorpay_signature:
              response.razorpay_signature

          });

          alert("Money added successfully");

          setAmount("");

          loadWallet();

        }

      });

      razorpay.open();

    } catch (err) {

      console.log(err);

    }

  };


  if (loading)
    return (
      <p className="text-center mt-40">
        Loading wallet...
      </p>
    );


  return (

    <div className="p-6 max-w-xl mx-auto">

      <button
        onClick={() => navigate(-1)}
        className="flex gap-2 mb-4"
      >
        <ChevronLeft />
        Back
      </button>


      {/* WALLET CARD */}

      <div className="bg-orange-500 text-white p-6 rounded">

        <h2 className="text-xl">
          Wallet Balance
        </h2>

        <h1 className="text-3xl font-bold">
          ₹{balance}
        </h1>

        <p className="text-sm mt-2">
          Pending Withdrawal: ₹{pending}
        </p>

      </div>


      {/* ADD MONEY */}

      <div className="mt-6 flex gap-2">

        <input
          type="number"
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
          placeholder="Enter amount"
          className="border p-2 w-full"
        />

        <button
          onClick={handleAddMoney}
          className="bg-green-500 text-white px-4 py-2"
        >
          Add Money
        </button>

      </div>


      {/* TRANSACTIONS */}

      <div className="mt-6">

        <h3 className="font-bold mb-2">
          Transactions
        </h3>

        {transactions.length === 0 ? (

          <p>No transactions yet</p>

        ) : (

          transactions.map(tx => (

            <div
              key={tx.id}
              className="flex justify-between border-b py-2"
            >

              <span>
                {tx.type}
              </span>

              <span
                className={
                  tx.type === "credit"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >

                {tx.type === "credit"
                  ? "+₹"
                  : "-₹"}

                {tx.amount}

              </span>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default WalletPage;