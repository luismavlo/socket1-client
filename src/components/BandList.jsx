import React, { useEffect, useState } from "react";

export const BandList = ({ data, vote, deleteBand, changeName }) => {
  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

  const changeBandName = (event, id) => {
    const newName = event.target.value;

    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }

        return band;
      })
    );
  };

  const onLoseFocus = (id, name) => {
    changeName(id, name);
  };

  return bands.map((band) => (
    <tr key={band.id}>
      <td>
        <button className="btn btn-primary" onClick={() => vote(band.id)}>
          +1
        </button>
      </td>
      <td>
        <input
          type="text"
          className="form-control"
          value={band.name}
          onChange={(event) => changeBandName(event, band.id)}
          onBlur={() => onLoseFocus(band.id, band.name)}
        />
      </td>
      <td>
        <h3>{band.votes}</h3>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteBand(band.id)}>
          Borrar
        </button>
      </td>
    </tr>
  ));
};
