import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";

const startPayment = async ({
  setError,
  setTxs,
  ether,
  addr = "0xAe7f32719c7b7eE182390f3A3C6Dfa59C52773Be"
}) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function App() {
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Equinox-IIIT Lucknow
          </h1>
          <h4 className="font-semibold text-gray-700">
            𝐄𝐪𝐮𝐢𝐧𝐨𝐱`𝟐2 has brought up the next flagship event 𝐈𝐧𝐜𝐨𝐠𝐧𝐢𝐭𝐨 3.𝟬, a
            𝐂𝐓𝐅 𝐨𝐫 𝐂𝐚𝐩𝐭𝐮𝐫𝐞 𝐓𝐡𝐞 𝐅𝐥𝐚𝐠 for Hackers, cybersecurity enthusiasts &
            experts. So, get ready for a 𝐣𝐞𝐨𝐩𝐚𝐫𝐝𝐲-𝐬𝐭𝐲𝐥𝐞 𝐂𝐓𝐅 with a duration of
            𝟑𝟔 𝐡𝐨𝐮𝐫𝐬 straight. With prizes worth 𝐈𝐍𝐑 20𝐊 at stake, will you be
            skilled enough to break through the challenges that await? Rack your
            brains up and get ready to create history!
          </h4>
          <div>
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="0xAe7f32719c7b7eE182390f3A3C6Dfa59C52773Be"
              />
            </div>
            <h4 className="font-semibold text-gray-700">
              Number of approvals needed:
            </h4>
            <div className="my-3">
              <input
                placeholder="2"
                className="input input-bordered block w-full focus:ring focus:outline-none"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Amount in ETH"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Contribute
          </button>
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            View Request
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
}
