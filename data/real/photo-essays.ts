import { PhotoEssay } from "@/types/domain";

export const REAL_PHOTO_ESSAYS: PhotoEssay[] = [
  {
    id: "pe-1",
    slug: "above-bucharest",
    title: "Above Bucharest: An Aerial Odyssey",
    subtitle: "Capturing the architectural duality of Romania's capital from 2,000 feet above Băneasa and Herăstrău.",
    photographer: "AIR Editorial Photography",
    location: "Bucharest, Romania",
    publicationDate: "2026-09-05",
    slides: [
      {
        title: "Băneasa Runway 07/25 at Dawn",
        description: "Golden hour light illuminating the 2,358-meter asphalt runway of Aurel Vlaicu International Airport.",
        location: "LRBS / BBU",
      },
      {
        title: "Herăstrău Park & Lake Corridor",
        description: "The emerald expanse of King Michael I Park framed by the northern business district sky-towers.",
        location: "Bucharest North",
      },
      {
        title: "Palace of the Parliament Horizon",
        description: "The monumental scale of the World's second-largest administrative building viewed from a bank angle.",
        location: "Central Bucharest",
      },
    ],
  },
  {
    id: "pe-2",
    slug: "life-on-the-ramp-baneasa",
    title: "Life on the Ramp: Inside Băneasa FBO",
    subtitle: "Behind the scenes with ground dispatchers, pilots, and line service technicians at LRBS.",
    photographer: "AIR Aviation Photography",
    location: "Bucharest Băneasa (LRBS)",
    publicationDate: "2026-08-28",
    slides: [
      {
        title: "Pre-Flight Walkaround",
        description: "Captain inspecting the turbine inlet and pitot static tubes of a Phenom 300E prior to departure.",
        location: "Globe Ground FBO Apron",
      },
      {
        title: "Jet-A1 Fueling Operations",
        description: "High-flow pressure refueling connecting to the wing tank receptacle.",
        location: "Băneasa Fuel Farm",
      },
      {
        title: "VIP Lounge Boarding",
        description: "Passengers transitioning seamlessly from executive transport vehicle to cabin stairs in under 3 minutes.",
        location: "Băneasa Executive Terminal",
      },
    ],
  },
];
