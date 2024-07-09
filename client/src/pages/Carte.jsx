import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Importe les styles CSS de Leaflet
import { useLoaderData } from "react-router-dom";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import NavVisiteur from "../components/NavVisiteur";

function LocateUser() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
    return () => {
      map.stopLocate();
    };
  }, [map]);

  if (position === null) return null;

  const userIcon = new Icon({
    iconUrl:
      "https://img.icons8.com/?size=100&id=66411&format=png&color=000000",
    iconSize: [25, 25],
  });

  return position ? (
    <Marker position={position} icon={userIcon}>
      <Popup>T'es la BG</Popup>
    </Marker>
  ) : null;
}


function Carte() {
  const terminalData = useLoaderData();
  const icon = new Icon({
    iconUrl:
      "https://img.icons8.com/?size=100&id=15366&format=png&color=000000",
    iconSize: [25, 25],
  });

  return (
      <>
      <NavVisiteur />
    <MapContainer
      center={[48.866667, 2.333333]}
      zoom={5}
      style={{ height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {terminalData.map((borne) => {
        // Extract latitude and longitude from borne.cood

        const [lati, longi] = borne.cood
          .trim()
          .slice(1, -1)
          .split(",")
          .map((coord) => parseFloat(coord.trim()));

        return (
          <Marker
            key={borne.id}
            position={[parseFloat(longi), parseFloat(lati)]}
            icon={icon}
          >
            <Popup className="popupTerminal">
              <h1>Borne :</h1>
              <p>{borne.name}</p>
              <p>{borne.address}</p>
              {borne.isBooked === 1 ? (
                <p>Borne déjà réservé</p>
              ) : (
                <p>Borne Disponible</p>
              )}
              <h3>Prise :</h3>
              <p>{borne.plug_type}</p>
              <h3>chain_name :</h3>
              <p>{borne.chain_name}</p>
              <h3>accessibility :</h3>
              <p>{borne.accessibility}</p>
            </Popup>
          </Marker>
        );
      })}
      <LocateUser />
    </MapContainer>
    </>
  );
}

export default Carte;
