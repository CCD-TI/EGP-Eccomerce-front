import { Accordion, AccordionItem } from "@nextui-org/react";

export default function App() {
  const items = [
    { id: 1, title: "Presentación del curso", content: "Introducción y objetivos del curso." },
    { id: 2, title: "Normativa legal en SST D.S. 011-2019-TR", content: "Seguridad en obras de construcción." },
    { id: 3, title: "Norma G050 seguridad en obras de construcción", content: "Requisitos del lugar de trabajo, Comité técnico de seguridad y salud, Plan de seguridad y salud en el trabajo, Investigación y reporte de accidentes y enfermedades ocupacionales." },
    { id: 4, title: "Conformación del comité de coordinación en seguridad y salud en el trabajo", content: "Detalles sobre el comité de seguridad en la obra." },
    { id: 5, title: "Plan y programa de seguridad y salud en el trabajo en obra", content: "Planificación y ejecución del programa de seguridad en el trabajo." },
    { id: 6, title: "Seguridad en demoliciones", content: "Medidas de seguridad específicas para trabajos de demolición." },
    { id: 7, title: "Evaluación de riesgos laborales", content: "Métodos de evaluación y gestión de riesgos en la construcción." },
    { id: 8, title: "Protección individual y colectiva", content: "Uso de equipos de protección personal (EPP) y medidas colectivas de seguridad." },
    { id: 9, title: "Plan de emergencia y evacuación", content: "Procedimientos de emergencia y planes de evacuación." },
    { id: 10, title: "Inspección y control de equipos", content: "Mantenimiento y revisión de equipos de construcción." },
    { id: 11, title: "Documentación y registros en SST", content: "Documentación obligatoria y registros en seguridad y salud en el trabajo." },
    { id: 12, title: "Capacitación en seguridad y salud", content: "Programas de capacitación y concientización para trabajadores." },
    { id: 13, title: "Normas de comportamiento en la obra", content: "Código de conducta y normas de comportamiento en el lugar de trabajo." },
    { id: 14, title: "Evaluación de cumplimiento de normas", content: "Métodos para evaluar el cumplimiento de las normas de seguridad." },
    { id: 15, title: "Cierre de obra y reporte final de SST", content: "Procedimientos de cierre y reporte final en seguridad y salud laboral." },
    { id: 16, title: "Evaluación de cumplimiento de normas", content: "Métodos para evaluar el cumplimiento de las normas de seguridad." },
    { id: 17, title: "Cierre de obra y reporte final de SST", content: "Procedimientos de cierre y reporte final en seguridad y salud laboral." },
    { id: 18, title: "Evaluación de cumplimiento de normas", content: "Métodos para evaluar el cumplimiento de las normas de seguridad." },
    { id: 19, title: "Cierre de obra y reporte final de SST", content: "Procedimientos de cierre y reporte final en seguridad y salud laboral." },
    { id: 20, title: "Evaluación de cumplimiento de normas", content: "Métodos para evaluar el cumplimiento de las normas de seguridad." },
    { id: 21, title: "Cierre de obra y reporte final de SST", content: "Procedimientos de cierre y reporte final en seguridad y salud laboral." },
    { id: 22, title: "Evaluación de cumplimiento de normas", content: "Métodos para evaluar el cumplimiento de las normas de seguridad." },
    { id: 23, title: "Cierre de obra y reporte final de SST", content: "Procedimientos de cierre y reporte final en seguridad y salud laboral." },
  ];

  return (
    <div style={{ height: "calc(100vh - 65.25px)" }} className="overflow-y-auto scrollbar-hide ">
      <Accordion variant="splitted" className="!p-6 !pt-0 !rounded-lg bg-transparent h-full">
        {items.map((item) => (
          <AccordionItem key={item.id} aria-label={`Accordion ${item.id}`} title={item.title}>
            {item.content}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}