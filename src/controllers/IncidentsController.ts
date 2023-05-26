import { Incident, PrismaClient } from "@prisma/client";
import "../interfaces/Interfaces";

export default class IncidentsController {
    async readAll() {
        console.log("incident - readAll");
        const prisma = new PrismaClient();
        const incidents = await prisma.incident.findMany();

        await prisma.$disconnect();
        return incidents;
    }
    
    async create(incident: Incident) {
        console.log("incident - create");
        const prisma = new PrismaClient();
        const newIncident = await prisma.incident.create({
            data: incident,
        });

        await prisma.$disconnect();
        return newIncident;
    }
}  