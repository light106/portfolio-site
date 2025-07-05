import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

const experiences = [
  {
    title: "Lecturer (Information & Communication Technology)",
    company: "Directorate of Secondary & Higher Education (DSHE)",
    department: "Ministry of Education, 38th BCS",
    duration: "Feb 2021 - Present",
    status: "Current",
    statusColor: "bg-emerald-100 text-emerald-800",
    borderColor: "border-emerald-500",
    responsibilities: [
      "Lecturer and Head of ICT Department",
      "Intel-certified AI Lead Coach for 4IR initiative",
      "Training on ML, DL, and neural networks using Python",
      "Organizing ICT fairs and digital literacy workshops",
    ],
    technical: [
      "Network infrastructure management",
      "Biometric systems and CCTV installation",
      "Website development and maintenance",
      "Annual Performance Agreements (APA) preparation",
    ],
  },
  {
    title: "Regional Operations Deputy Manager",
    company: "Banglalink Digital Communications Limited",
    department: "Infrastructure Service Management (ISM)",
    duration: "Jan 2014 - Feb 2021",
    status: "7 Years",
    statusColor: "bg-blue-100 text-blue-800",
    borderColor: "border-blue-500",
    responsibilities: [
      "Deputy Team Leader for Dhaka North Region",
      "BSS, Power and Transmission operations",
      "Network KPI maintenance and performance monitoring",
      "Strategic dashboard development with data visualization",
    ],
    technical: [
      "Optical fiber and Microwave backbone monitoring",
      "Cost-effective strategy development for geolocations",
      "Business KPI monitoring and customer analytics",
      "Mean time between failures minimization",
    ],
  },
  {
    title: "Base Station Sub-system (BSS) Engineer",
    company: "Beta Engineering (Pvt.) Limited",
    department: "Grameenphone Network Operations",
    duration: "Jun 2011 - Dec 2013",
    status: "2.5 Years",
    statusColor: "bg-purple-100 text-purple-800",
    borderColor: "border-purple-500",
    responsibilities: [
      "BTS site location survey and assessment",
      "Assisting O&M vendors for daily network maintenance",
      "Network Operations support for Grameenphone infrastructure",
    ],
    technical: [],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Professional Experience</h2>
          <p className="text-lg text-slate-600">A comprehensive journey through my professional career</p>
        </div>
        
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className={`bg-white rounded-xl shadow-lg p-8 border-l-4 ${exp.borderColor}`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-navy-800">{exp.title}</h3>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <p className="text-slate-500">{exp.department}</p>
                </div>
                <div className="text-right mt-4 lg:mt-0">
                  <Badge className={exp.statusColor}>{exp.status}</Badge>
                  <p className="text-slate-500 mt-1">{exp.duration}</p>
                </div>
              </div>
              
              <div className={`grid ${exp.technical.length > 0 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6`}>
                <div>
                  <h4 className="font-semibold text-navy-800 mb-3">Key Responsibilities:</h4>
                  <ul className="space-y-2 text-slate-600">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500 mt-1 flex-shrink-0" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {exp.technical.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-navy-800 mb-3">Technical Focus:</h4>
                    <ul className="space-y-2 text-slate-600">
                      {exp.technical.map((tech, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
