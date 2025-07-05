import { Tag, Cloud, Brain, Presentation, Network, Trophy } from "lucide-react";

const certifications = [
  {
    title: "Project Management Professional",
    subtitle: "PMP Certified",
    organization: "Project Management Institute (PMI)",
    provider: "DaySpring Limited",
    details: "PDUs Earned: 35",
    icon: Tag,
    color: "from-emerald-50 to-emerald-100 border-emerald-200",
    iconBg: "bg-emerald-500",
  },
  {
    title: "Cloud University",
    subtitle: "CloudU Certified",
    organization: "Rackspace",
    provider: "Focus: Cloud Computing",
    details: "Specialization: Infrastructure & Services",
    icon: Cloud,
    color: "from-blue-50 to-blue-100 border-blue-200",
    iconBg: "bg-blue-500",
  },
  {
    title: "AI Lead Coach",
    subtitle: "Intel Certified",
    organization: "Intel Corporation",
    provider: "Program: AI4Y (AI for Youth)",
    details: "Duration: 20 Days",
    icon: Brain,
    color: "from-purple-50 to-purple-100 border-purple-200",
    iconBg: "bg-purple-500",
  },
  {
    title: "Teacher's Training",
    subtitle: "ECPD Certified",
    organization: "Nottingham University of Malaysia",
    provider: "Program: College Education Development",
    details: "Duration: 4 Months",
    icon: Presentation,
    color: "from-orange-50 to-orange-100 border-orange-200",
    iconBg: "bg-orange-500",
  },
  {
    title: "Mobile Backhaul Solutions",
    subtitle: "4G-LTE & Wi-Fi",
    organization: "Huawei Technologies Co., Ltd.",
    provider: "Focus: Small Cells & Backhaul",
    details: "Duration: 15 Days",
    icon: Network,
    color: "from-red-50 to-red-100 border-red-200",
    iconBg: "bg-red-500",
  },
  {
    title: "Foundation Training",
    subtitle: "DG Award Winner",
    organization: "NAEM",
    provider: "Course: 198th Foundation Training",
    details: "Achievement: All Round Performance",
    icon: Trophy,
    color: "from-indigo-50 to-indigo-100 border-indigo-200",
    iconBg: "bg-indigo-500",
  },
];

export default function CertificationsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Certifications & Training</h2>
          <p className="text-lg text-slate-600">Professional certifications and specialized training programs</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className={`bg-gradient-to-br ${cert.color} p-6 rounded-xl border hover:shadow-lg transition-shadow`}>
              <div className="text-center mb-4">
                <div className={`${cert.iconBg} text-white p-4 rounded-full inline-block mb-4`}>
                  <cert.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-800">{cert.title}</h3>
                <p className="font-medium text-slate-700">{cert.subtitle}</p>
              </div>
              <div className="space-y-2 text-sm text-slate-700">
                <p><strong>Organization:</strong> {cert.organization}</p>
                <p><strong>Provider:</strong> {cert.provider}</p>
                <p><strong>Details:</strong> {cert.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
