import { Cpu, CircuitBoard, Network, Database, Server, Radio } from "lucide-react";

const expertiseAreas = [
  { icon: Cpu, label: "Electrical Machines" },
  { icon: CircuitBoard, label: "Electronic Devices" },
  { icon: Network, label: "IP Networking" },
  { icon: Database, label: "DBMS" },
  { icon: Server, label: "IT Server Maintenance" },
  { icon: Radio, label: "Telecom Networks" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">About Me</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A dedicated engineering professional with extensive experience in AI, telecommunications, 
            and educational technology, committed to driving innovation and excellence.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-navy-800">Career Objectives</h3>
            <p className="text-slate-600 leading-relaxed">
              To obtain a responsible and challenging position that will allow me to learn new 
              technologies and skills while utilizing my previous experiences to improve beyond my 
              current abilities and continue the strong professional relationship with the 
              stakeholders to outshine within the organization.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h4 className="font-semibold text-navy-800 mb-2">Experience</h4>
                <p className="text-2xl font-bold text-emerald-500">10+ Years</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-lg">
                <h4 className="font-semibold text-navy-800 mb-2">Projects</h4>
                <p className="text-2xl font-bold text-emerald-500">50+ Completed</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-navy-800">Fields of Expertise</h3>
            <div className="grid grid-cols-2 gap-4">
              {expertiseAreas.map((area, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <area.icon className="h-5 w-5 text-emerald-500" />
                  <span className="text-slate-700">{area.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
