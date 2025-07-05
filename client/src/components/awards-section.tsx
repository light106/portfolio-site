import { Medal, Trophy, Music, Ghost, Mic, Guitar, Target, Zap } from "lucide-react";

const awards = [
  {
    title: "Director General Award",
    subtitle: "All Round Performance",
    description: "198th Foundation Training Course - NAEM",
    icon: Medal,
    color: "from-yellow-50 to-yellow-100 border-yellow-200",
    iconBg: "bg-yellow-500",
  },
  {
    title: "BASIS Best Freelancer",
    subtitle: "Winner 2013",
    description: "Bangladesh Association of Software and Information Services",
    icon: Trophy,
    color: "from-emerald-50 to-emerald-100 border-emerald-200",
    iconBg: "bg-emerald-500",
  },
  {
    title: "Musical Excellence",
    subtitle: "Multiple Awards",
    description: "School, College & University Competitions",
    icon: Music,
    color: "from-purple-50 to-purple-100 border-purple-200",
    iconBg: "bg-purple-500",
  },
  {
    title: "Table Tennis Champion",
    subtitle: "Inter Hall Championship",
    description: "KUET - 2009",
    icon: Ghost,
    color: "from-blue-50 to-blue-100 border-blue-200",
    iconBg: "bg-blue-500",
  },
];

const interests = [
  {
    title: "Professional Singer",
    description: "Vocal performances and competitions",
    icon: Mic,
    color: "text-emerald-500",
  },
  {
    title: "Guitarist",
    description: "Guitar and keyboard player",
    icon: Guitar,
    color: "text-blue-500",
  },
  {
    title: "Sports Enthusiast",
    description: "Table Tennis, Chess, Cricket",
    icon: Target,
    color: "text-purple-500",
  },
  {
    title: "Strategic Games",
    description: "Chess and Carom board",
    icon: Zap,
    color: "text-orange-500",
  },
];

export default function AwardsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-4">Awards & Achievements</h2>
          <p className="text-lg text-slate-600">Recognition for professional excellence and personal talents</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {awards.map((award, index) => (
            <div key={index} className={`bg-gradient-to-br ${award.color} p-6 rounded-xl border text-center hover:shadow-lg transition-shadow`}>
              <div className={`${award.iconBg} text-white p-4 rounded-full inline-block mb-4`}>
                <award.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">{award.title}</h3>
              <p className="font-medium text-slate-700 mb-2">{award.subtitle}</p>
              <p className="text-sm text-slate-600">{award.description}</p>
            </div>
          ))}
        </div>
        
        {/* Personal Interests */}
        <div className="bg-slate-50 p-8 rounded-xl">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-navy-800 mb-4">Personal Interests & Talents</h3>
            <p className="text-slate-600">Beyond professional achievements</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {interests.map((interest, index) => (
              <div key={index} className="text-center">
                <interest.icon className={`h-8 w-8 ${interest.color} mb-3 mx-auto`} />
                <h4 className="font-semibold text-navy-800">{interest.title}</h4>
                <p className="text-sm text-slate-600">{interest.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
