import { Download, Mail, Phone, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@assets/Dip 2_1751732561882.jpeg";

export default function HeroSection() {
  const handleResumeDownload = async () => {
    try {
      const response = await fetch("/api/resume");
      if (response.ok) {
        // If it's a file download
        if (response.headers.get("content-type")?.includes("application/pdf")) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Shadman_Sakib_Resume.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } else {
          // If it's a JSON response (no file available)
          const data = await response.json();
          alert(data.message || "Resume download not available. Please contact directly.");
        }
      }
    } catch (error) {
      alert("Unable to download resume. Please contact shadman106@gmail.com");
    }
  };

  const handleContactClick = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-16 navy-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Engr. Shadman Sakib
              </h1>
              <p className="text-xl text-blue-200">
                AI Lead Coach & ICT Lecturer | Telecom Network Expert
              </p>
              <p className="text-lg text-slate-300 max-w-lg">
                Experienced engineering professional specializing in Artificial Intelligence, Machine Learning, 
                and Telecommunications with 10+ years of industry expertise.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleContactClick}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                size="lg"
              >
                Get In Touch
              </Button>
              <Button 
                onClick={handleResumeDownload}
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-transparent hover:border-blue-200 hover:text-blue-200 transition-colors"
                size="lg"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </div>
            
            <div className="flex space-x-6">
              <a 
                href="https://www.linkedin.com/in/shadman106/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white text-2xl transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://www.facebook.com/shadman.light" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white text-2xl transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="mailto:shadman106@gmail.com" 
                className="text-blue-200 hover:text-white text-2xl transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a 
                href="tel:+8801962401831" 
                className="text-blue-200 hover:text-white text-2xl transition-colors"
              >
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="lg:text-right">
            <img 
              src={profileImage} 
              alt="Engr. Shadman Sakib - Professional Portrait" 
              className="rounded-2xl shadow-2xl mx-auto max-w-sm w-full object-cover h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
