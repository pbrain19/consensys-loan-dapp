import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Dashboard } from "./components/dashboard";

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col min-h-screen ">
      {/* Top Navigation Bar */}
      <nav className="flex items-center justify-between px-4 py-3 bg-gray-800">
        <div className="text-lg font-semibold">LoansRUs</div>
        <div className="flex items-center space-x-4">
          {account.status !== "connected" &&
            connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                type="button"
                className="px-3 py-2 bg-blue-500 rounded hover:bg-blue-600"
              >
                {connector.name}
              </button>
            ))}
          {account.status === "connected" && (
            <button
              type="button"
              onClick={() => disconnect()}
              className="px-3 py-2 bg-red-500 rounded hover:bg-red-600"
            >
              Disconnect
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto mt-4 p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Account</h2>
          <div className="mt-2">
            <p>Status: {account.status}</p>
            <p>Addresses: {JSON.stringify(account.addresses)}</p>
            <p>ChainId: {account.chainId}</p>
          </div>
        </div>

        {account.status === "connected" && <Dashboard />}

        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Connect</h2>
          <div>{status}</div>
          {error && <div className="text-red-500">{error.message}</div>}
        </div>
      </div>
    </div>
  );
}

export default App;
