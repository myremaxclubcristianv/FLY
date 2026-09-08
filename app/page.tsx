import { Hero } from "../components/home/Hero";
import { DecisionEngine } from "../components/home/DecisionEngine";
import { WorldsGrid } from "../components/home/WorldsGrid";
import { AircraftPreview } from "../components/home/AircraftPreview";
import { ExperiencesPreview } from "../components/home/ExperiencesPreview";
import { DestinationsPreview } from "../components/home/DestinationsPreview";
import { EditorialSection } from "../components/home/EditorialSection";
import { JournalPreview } from "../components/home/JournalPreview";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <DecisionEngine />
      <WorldsGrid />
      <AircraftPreview />
      <ExperiencesPreview />
      <DestinationsPreview />
      <EditorialSection />
      <JournalPreview />
    </div>
  );
}
