import { ReadAllIncidents, ReadOneHero } from "./_actions";
import { Incidents } from "@/interfaces/Interfaces";

export default async function IncidentMap() {
  const incidents = await ReadAllIncidents();
  console.log(incidents);

  function createGoogleMapsDirectionsLink(destination: Array<number>) {
    const baseUrl = "https://www.google.com/maps/dir/?api=1";
    const originQuery = "origin=auto"; // Utilisation de 'auto' pour la position actuelle
    const destinationQuery = `destination=${encodeURIComponent(
      destination[0]
    )},${encodeURIComponent(destination[1])}`;
    const params = `${originQuery}&${destinationQuery}`;
    const fullUrl = `${baseUrl}&${params}`;

    return fullUrl;
  }

  function createWazeDirectionsLink(destination: Array<number>) {
    const baseUrl = "https://waze.com/ul";
    const destinationQuery = `ll=${destination[0]},${destination[1]}`;
    const fullUrl = `${baseUrl}?${destinationQuery}`;

    return fullUrl;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 mt-16">Fil d&apos;incidents</h1>

      <div className="flex flex-col gap-4">
        {incidents.map(async (incident) => {
          const hero = await ReadOneHero(incident.heroId);
          const destination = [incident.latitude, incident.longitude];
          const googleMapsLink = createGoogleMapsDirectionsLink(destination);
          const wazeLink = createWazeDirectionsLink(destination);

          return (
            <div
              key={incident.id}
              className="flex items-center justify-between w-full px-4 py-2 border-l-4 border-purple-500 shadow"
            >
              <div>
                <h2 className="text-xl font-bold">
                  {Incidents[incident.type]} - <span>{hero.name}</span>
                </h2>
                <p className="italic opacity-50">
                  {incident.createdAt.toLocaleDateString("fr-fr", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center">
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 text-purple-500 flex items-center justify-center rounded-full border border-purple-500 mr-2 hover:bg-purple-500 hover:text-white"
                >
                  <i className="fa-brands fa-google"></i>
                </a>

                <a
                  href={wazeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 text-purple-500 flex items-center justify-center rounded-full border border-purple-500 mr-2 hover:bg-purple-500 hover:text-white"
                >
                  <i className="fa-brands fa-waze"></i>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
