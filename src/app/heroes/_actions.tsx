"use server";
import HeroController from "@/controllers/HeroController";

const hero = new HeroController();

export async function ReadAllHeroes() {
  const heroes = await hero.readAll();
  return heroes;
}

export async function ReadOneHero(id: string) {
  const heroByID = await hero.readOne(id);
  return heroByID;
}
