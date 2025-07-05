import { Code, Wrench, Laptop } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500",
    skills: [
      { name: "Python", level: 90 },
      { name: "C/C++", level: 85 },
      { name: "MATLAB", level: 80 },
      { name: "HTML/CSS", level: 85 },
    ],
  },
  {
    title: "Technical Skills",
    icon: Wrench,
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    skills: [
      { name: "Machine Learning", level: 95 },
      { name: "Deep Learning", level: 90 },
      { name: "Telecom Networks", level: 95 },
      { name: "Data Visualization", level: 88 },
    ],
  },
  {
    title: "Software & Tools",
    icon: Laptop,
    color: "text-purple-500",
    bgColor: "bg-purple-500",
    skills: [
      { name: "Power BI", level: 90 },
      { name: "MS Excel", level: 92 },
      { name: "SQL/RDBMS", level: 85 },
      { name: "WordPress/Joomla", level: 80 },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Skills & Expertise</h2>
          <p className="text-lg text-slate-600">Technical proficiencies and specialized knowledge</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <category.icon className={`h-6 w-6 ${category.color}`} />
                <h3 className="text-xl font-bold text-navy-800">{category.title}</h3>
              </div>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-slate-700 font-medium">{skill.name}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </div>
                    <Progress 
                      value={skill.level} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
