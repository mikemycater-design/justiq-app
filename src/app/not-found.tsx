import { InfoPageLayout } from "@/components/info-page-layout";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <InfoPageLayout
      icon={<AlertTriangle className="w-12 h-12" />}
      title="404 - Sidan Hittades Inte"
      texts={[
        "Hoppsan! Sidan du letar efter verkar inte finnas.",
        "Det kan bero på en felaktig länk eller att sidan har flyttats."
      ]}
      buttonText="Gå till Startsidan"
      buttonLink="/"
    />
  );
}
