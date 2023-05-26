"use client";
import { useEffect, useState } from "react";
import { IncidentType, Incidents } from "@/interfaces/Interfaces";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import dynamic from "next/dynamic";
import { Hero } from "@prisma/client";
import RegisterHero from "./_actions";
import uuidv4 from "@/utils/uuid";

import { useRouter } from "next/navigation";

export default function Register() {
  const [specialities, setSpecialities] = useState([]);
  let latlng: any = null;

  const MapWithNoSSR = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });

  const router = useRouter();

  const [isFormReady, setIsFormReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const items = document.querySelectorAll(".item-check");
    if (specialities.length > 2) {
      items.forEach((item: any) => {
        if (item.children[0].checked === false) {
          item.children[0].disabled = true;
        }
      });
    } else {
      items.forEach((item: any) => {
        item.children[0].disabled = false;
      });
    }
  }, [specialities]);

  return (
    <form
      className="mt-8 mx-auto rounded-lg shadow-lg px-4 py-8 flex flex-col gap-4 justify-center items-center border border-gray-300 w-full max-w-lg"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(latlng);

        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        const name = data.get("name");
        const phone = data.get("phone");

        if (
          name === null ||
          phone === null ||
          latlng === null ||
          specialities.length === 0 ||
          specialities.length > 3 ||
          isFormReady === false
        ) {
          setError("Veuillez remplir tous les champs");
          return;
        }

        const hero: Hero = {
          id: uuidv4(),
          name: name as string,
          phoneNumber: phone as string,
          incidents: specialities,
          latitude: latlng.lat,
          longitude: latlng.lng,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        try {
          RegisterHero(hero);

          router.push("/heroes");
        } catch (error) {
          console.log(error);
        }
      }}
    >
      <div className="text-center">
        <h1 className="text-xl text-center font-bold text-gray-900">
          Enregistrez-vous en tant que Héro !
        </h1>
        <p>Et recevez vos premières missions</p>
      </div>

      <div className="w-full">
        <label htmlFor="email" className="text-gray-600 font-bold">
          Super nom
        </label>
        <input
          type="text"
          name="name"
          id="name"
          className="border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-full"
          required
        />
      </div>

      <div className="w-full">
        <label htmlFor="email" className="text-gray-600 font-bold">
          Numéro de téléphone
        </label>
        <input
          type="phone"
          name="phone"
          id="phone"
          className="border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 w-full"
          required
        />
      </div>

      <div className="w-full">
        <label htmlFor="email" className="text-gray-600 font-bold">
          Vos spécialités (1min., 3 max.)
        </label>
        <div className="flex gap-2 flex-wrap">
          {/* checkbox */}

          {Object.keys(Incidents).map((key: string) => {
            return (
              <div className="item-check" key={key}>
                <input
                  type="checkbox"
                  id={key}
                  name={key}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSpecialities([...specialities, key]);
                    } else {
                      setSpecialities(
                        specialities.filter((item) => item !== key)
                      );
                    }
                  }}
                />
                <label htmlFor={key}>{Incidents[key]}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col">
        <label htmlFor="email" className="text-gray-600 font-bold">
          Où se trouve votre QG ?
        </label>
        <span className="text-sm text-gray-600/50 italic">
          (Cliquez sur la carte pour rafraichir votre position actuelle)
        </span>
        <div className="flex aspect-square overflow-hidden">
          <MapWithNoSSR
            setLoc={(loc: any) => {
              latlng = loc;
            }}
          />
        </div>
      </div>
      <button type="submit" className="callToAction dark ml-auto">
        Submit
      </button>
    </form>
  );
}
