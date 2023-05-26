import { Hero, PrismaClient } from "@prisma/client";
import "../interfaces/Interfaces";

export default class HeroController {
  //Get All Heroes
  async readAll() {
    console.log("hero - readAll");
    const prisma = new PrismaClient();
    const heroes = await prisma.hero.findMany();

    return heroes;
  }

  //Get Hero by ID
  async readOne(id: string) {
    console.log("hero - readOne");
    console.log(id);
    const prisma = new PrismaClient();
    const hero = await prisma.hero.findUnique({
      where: {
        id: id,
      },
    });

    return hero;
  }

  async readNearby(lat: number, lng: number, distance: number, type: string) {
    console.log("hero - readNearby");
    console.log(lat, lng, distance);
    const prisma = new PrismaClient();
    // Conversion de la distance en degrés de latitude et de longitude
    const degreesPerKm = 1 / 111.32;
    const distanceInDegrees = distance * degreesPerKm;

    const heroes = await prisma.hero.findMany({
      where: {
        AND: [
          {
            latitude: {
              lte: lat + distanceInDegrees,
              gte: lat - distanceInDegrees,
            },
          },
          {
            longitude: {
              lte: lng + distanceInDegrees,
              gte: lng - distanceInDegrees,
            },
          },
          {
            available: true,
          },
          {
            accountValidated: true,
          },
          {
            incidents: {
              has: type,
            },
          },
        ],
      },
    });

    return heroes;
  }

  //Register Hero
  async register(hero: Hero) {
    console.log("hero - create");
    const prisma = new PrismaClient();
    const newHero = await prisma.hero.create({
      data: hero,
    });

    return newHero;
  }
}
