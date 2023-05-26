// Interface Hero
interface Hero {
  id: number;
  name: string;
  incidents: IncidentType[];
  latitude: number;
  longitude: number;
  phoneNumber: string;
}

// Interface Incident
interface Incident {
  id: number;
  type: IncidentType;
  location: Location;
}

// Interface Location
interface Location {
  id: number;
  latitude: number;
  longitude: number;
  city: string;
}

// Enum IncidentType
export enum IncidentType {
  FIRE = "Incendit",
  CAR_ACCIDENT = "Accident de voiture",
  RIVER_ACCIDENT = "Accident fluvial",
  AIR_ACCIDENT = "Accident aérien",
  LANDSLIDE = "Éboulement",
  SNAKE_INVASION = "Invasion de serpent",
  GAS_LEAK = "Fuite de gaz",
  DEMONSTRATION = "Manifestation",
  ROBBERY = "Braquage",
  PRISONER_ESCAPE = "Évasion d'un prisonnier",
}

export const Incidents = {
  FIRE: "Incendit",
  CAR_ACCIDENT: "Accident de voiture",
  RIVER_ACCIDENT: "Accident fluvial",
  AIR_ACCIDENT: "Accident aérien",
  LANDSLIDE: "Éboulement",
  SNAKE_INVASION: "Invasion de serpent",
  GAS_LEAK: "Fuite de gaz",
  DEMONSTRATION: "Manifestation",
  ROBBERY: "Braquage",
  PRISONER_ESCAPE: "Évasion d'un prisonnier",
};
