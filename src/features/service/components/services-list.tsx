import { ServiceCard } from "./service-card";
import type { Service } from "../types/services.type";

export function ServicesList({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
