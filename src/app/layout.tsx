"use client";

import "./globals.css";
import { Fira_Sans } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

import { Incidents } from "@/interfaces/Interfaces";

import { ReadNearbyHeroes, CreateIncident } from "./_actions";
import { IncidentType } from "@prisma/client";
import { useRouter } from "next/navigation";

const fira = Fira_Sans({
  weight: ["100", "400", "700"],
  subsets: ["latin-ext"],
});

export default function RootLayout(props: any) {
  const [modal, setModal] = useState(false);

  const [latlng, setLatlng] = useState({ lat: 0, lng: 0 });

  const getNearbyHeroes = async (latlng: { lat: number; lng: number }) => {
    //get the select value
    const type = document.getElementById("type") as HTMLSelectElement;
    const typeValue = type.value;

    const response = await ReadNearbyHeroes(latlng.lat, latlng.lng, typeValue);
    return response;
  };

  const router = useRouter();

  const [heroes, setHeroes] = useState([]);

  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={fira.className + " w-full"}>
        {/* Modal */}
        <div className={modal ? "relative z-10" : "hidden"} id="modalWrapper">
          <div
            className="fixed w-screen h-screen bg-black/75 backdrop-blur-sm"
            onClick={() => {
              setModal(false);
            }}
          ></div>
          <div className="fixed p-4 bg-white rounded-lg shadow-lg w-full max-w-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <form
              className="flex flex-col gap-4"
              onSubmit={async (e) => {
                e.preventDefault();
                const data = new FormData(e.target as HTMLFormElement);
                const type = data.get("type") as string;
                const hero = data.get("hero") as string;

                const incident = await CreateIncident({
                  type: type as IncidentType,
                  latitude: latlng.lat,
                  longitude: latlng.lng,
                  heroId: hero,
                });

                if (incident) {
                  setModal(false);
                  router.push("/incidents");
                }
              }}
            >
              <div className="text-center">
                <h1 className="text-xl text-center font-bold text-gray-900">
                  Déclarer un incident
                </h1>
                <p> Remplissez le formulaire pour déclarer un incident.</p>
              </div>

              <div className="w-full">
                <label htmlFor="email" className="text-gray-600 font-bold">
                  Type d&apos;incident
                </label>
                <select
                  name="type"
                  id="type"
                  className="border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-full"
                >
                  <option value="CHOOSE">Sélectionnez un type</option>
                  {Object.keys(Incidents).map((key: string) => {
                    return (
                      <option value={key} key={Incidents[key]}>
                        {Incidents[key]}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="w-full flex flex-col">
                <label htmlFor="" className="text-gray-600 font-bold">
                  Lieu
                </label>
                <button
                  type="button"
                  className="callToAction dark"
                  onClick={async () => {
                    navigator.geolocation.getCurrentPosition((position) => {
                      setLatlng({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                      });
                    });

                    const availableHeroes = await getNearbyHeroes(latlng);
                    setHeroes(availableHeroes);
                  }}
                >
                  Me localiser
                </button>
              </div>
              <div className="w-full flex flex-col">
                {heroes.length > 0 && (
                  <>
                    <h3>Choisissez le héro a contacter</h3>
                    <select
                      name="hero"
                      id="heroSelect"
                      className="border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-full"
                    >
                      <option value="CHOOSE">Sélectionnez un héro</option>
                      {heroes.map((hero: any) => {
                        return (
                          <option
                            className="flex gap-2"
                            value={hero.id}
                            key={hero.name}
                          >
                            {hero.name}
                          </option>
                        );
                      })}
                    </select>
                  </>
                )}
              </div>
              <button
                type="submit"
                className="callToAction alternative"
                disabled={heroes.length === 0 ? true : false}
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
        <div className="fixed w-full mt-[16px] mx-auto px-2 z-50">
          <nav className="container mx-auto px-[16px] py-[16px] rounded-xl shadow flex justify-between items-center bg-gradient-to-br from-purple-500 to-blue-500">
            <Link href={"/"} className="font-bold text-2xl text-white">
              HIRO<span className="text-white">.</span>
            </Link>
            <ul className="flex gap-x-4 items-center">
              <Link href={"/heroes"}>
                <li>Les héros</li>
              </Link>

              <Link href={"/incidents"}>
                <li>Incidents</li>
              </Link>

              <button
                onClick={() => {
                  setModal(true);
                }}
              >
                <li className="callToAction">Déclarer un incident</li>
              </button>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col min-h-screen">
          <main className="container mx-auto px-[8px] py-[16px] pt-[96px]">
            {props.children}
          </main>
        </div>
      </body>
    </html>
  );
}
