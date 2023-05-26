"use server";
import HeroController from "@/controllers/HeroController";
import IncidentController from '../controllers/IncidentsController';
import { Incident } from "@prisma/client";

const hero = new HeroController();
const incident = new IncidentController();

export async function ReadAllHeroes() {
  const heroes = await hero.readAll();
  return heroes;
}

export async function ReadOneHero(id: string) {
  const heroByID = await hero.readOne(id);
  return heroByID;
}

export async function ReadNearbyHeroes(lat: number, lng: number, type: string) {
  const heroes = await hero.readNearby(lat, lng, 50, type);
  return heroes;
}

export async function CreateIncident(data: Incident) {
  const incidentCreated = await incident.create(data);
  return incidentCreated;
}
