import { ServiceCard } from "./service-card";
import type { Service } from "../types/services.type";

export function ServicesList({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          showDescription
          bookButton
        />
      ))}
    </div>
  );
}
