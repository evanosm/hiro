import HeroController from "@/controllers/HeroController";
import { Hero } from "@prisma/client";

import { Incidents } from "@/interfaces/Interfaces";

export default async function HeroesIndex() {
  const hero = new HeroController();
  const heroes = await hero.readAll();

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 mt-16">Notre palette de héros</h1>
      <div className="flex flex-col gap-4">
        {heroes.map((hero: Hero) => {
          return (
            <div
              className="flex flex-col gap-2 px-4 py-2 border-l-4 border-purple-500 shadow"
              key={hero.name}
            >
              <h1 className="text-2xl font-bold">{hero.name}</h1>
              <div className="flex gap-4">
                {hero.incidents.map((incident) => {
                  let incidentName = Incidents[incident];

                  return (
                    <div
                      className="flex gap-2"
                      key={hero.name + "-" + incident}
                    >
                      <p className="text-gray-500">{incidentName}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
