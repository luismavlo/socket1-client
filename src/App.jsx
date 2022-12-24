import { useEffect, useState } from "react";

import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";
import { useSocket } from "./hook/useSocket";

function App() {
  const { socket, isOnLine } = useSocket("http://localhost:8080");
  const [bands, setBands] = useState([]);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      console.log(bands);
      setBands(bands);
    });
  }, [socket]);

  const vote = (id) => {
    socket.emit("voting-band", id);
  };

  const deleteBand = (id) => {
    socket.emit("delete-band", id);
  };

  const changeName = (id, name) => {
    socket.emit("change-band-name", { id, name });
  };

  const createBand = (name) => {
    socket.emit("add-band", { name });
  };

  useEffect(() => {
    console.log(socket);
  }, [socket]);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {isOnLine ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <table className="col-8">
          <tbody>
            <BandList
              data={bands}
              vote={vote}
              deleteBand={deleteBand}
              changeName={changeName}
            />
          </tbody>
        </table>
        <div className="col-4">
          <BandAdd createBand={createBand} />
        </div>
      </div>
    </div>
  );
}

export default App;
