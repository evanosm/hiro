"use server";
import HeroController from "@/controllers/HeroController";

const hero = new HeroController();

export default async function RegisterHero(body: any) {
    const newHero: any = hero.register(body);
    return newHero;
}   