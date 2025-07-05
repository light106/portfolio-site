import { ChartGantt, Globe, Calendar, User } from "lucide-react";
import { CheckCircle } from "lucide-react";

const projects = [
  {
    title: "OTB Mega Project",
    subtitle: "2G BTS Swap and 3G Rollout",
    organization: "Orascom Telecom Bangladesh",
    duration: "Jan 2014 - Feb 2015",
    role: "Project Engineer",
    icon: ChartGantt,
    borderColor: "border-emerald-500",
    iconBg: "bg-emerald-500",
    deliverables: [
      "Day-to-day vendor management",
      "Performance monitoring of BTS and Microwave equipment",
      "Provisional Acceptance Testing and Reporting",
      "Equipment performance comparison analysis",
    ],
  },
  {
    title: "Smart Bangladesh Initiative",
    subtitle: "4th Industrial Revolution (4IR)",
    organization: "Ministry of Education",
    duration: "2021 - Present",
    role: "AI Lead Coach",
    icon: Globe,
    borderColor: "border-blue-500",
    iconBg: "bg-blue-500",
    deliverables: [
      "AI and ML training for government officials",
      "Python-based neural networks implementation",
      "Digital literacy workshops and ICT fairs",
      "Accelerating SDG-4 achievement in education",
    ],
  },
];

export default function ProjectsSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Major Projects</h2>
          <p className="text-lg text-slate-600">Significant project management and technical implementations</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className={`bg-white p-8 rounded-xl shadow-lg border-l-4 ${project.borderColor}`}>
              <div className="flex items-start space-x-4 mb-6">
                <div className={`${project.iconBg} text-white p-3 rounded-lg flex-shrink-0`}>
                  <project.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-800 mb-2">{project.title}</h3>
                  <p className="font-medium text-slate-700 mb-1">{project.subtitle}</p>
                  <p className="text-slate-500">{project.organization}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center space-x-4 text-sm text-slate-600">
                  <span className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{project.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{project.role}</span>
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-navy-800">Key Deliverables:</h4>
                <ul className="space-y-2 text-slate-600">
                  {project.deliverables.map((deliverable, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
