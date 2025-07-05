import { GraduationCap, University, School, BookOpen } from "lucide-react";

const education = [
  {
    degree: "Master of Science",
    field: "Information Technology",
    institution: "Jahangirnagar University",
    graduation: "May 2021",
    icon: GraduationCap,
    color: "from-emerald-50 to-emerald-100 border-emerald-200",
    iconBg: "bg-emerald-500",
  },
  {
    degree: "Bachelor of Science",
    field: "Electrical and Electronic Engineering",
    institution: "Khulna University of Engineering and Technology (KUET)",
    graduation: "June 2011",
    icon: University,
    color: "from-blue-50 to-blue-100 border-blue-200",
    iconBg: "bg-blue-500",
  },
  {
    degree: "Higher Secondary Certificate",
    field: "Science",
    institution: "Satkhira City College, Satkhira",
    graduation: "September 2006",
    icon: School,
    color: "from-purple-50 to-purple-100 border-purple-200",
    iconBg: "bg-purple-500",
  },
  {
    degree: "Secondary School Certificate",
    field: "Science",
    institution: "Satkhira Government High School",
    graduation: "June 2004",
    icon: BookOpen,
    color: "from-orange-50 to-orange-100 border-orange-200",
    iconBg: "bg-orange-500",
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Education</h2>
          <p className="text-lg text-slate-600">Academic achievements and qualifications</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <div key={index} className={`bg-gradient-to-br ${edu.color} p-8 rounded-xl border`}>
              <div className="flex items-center space-x-4 mb-6">
                <div className={`${edu.iconBg} text-white p-3 rounded-lg`}>
                  <edu.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy-800">{edu.degree}</h3>
                  <p className="text-slate-700 font-medium">{edu.field}</p>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-slate-700"><strong>Institution:</strong> {edu.institution}</p>
                <p className="text-slate-700"><strong>Graduation:</strong> {edu.graduation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
