"use server";
import IncidentsController from "../../controllers/IncidentsController";
import HeroController from "../../controllers/HeroController";

const incident = new IncidentsController();
const hero = new HeroController();

export async function ReadAllIncidents() {
  const incidents = await incident.readAll();
  return incidents;
}

export async function ReadOneHero(id: string) {
  const oneHero = await hero.readOne(id);
  return oneHero;
}
