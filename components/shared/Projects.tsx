import { CheckCircle2 } from "lucide-react";
import { projects } from "@/constants";

const ProjectsShowcase = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide">
        For fun
      </h2>
      <div className="flex flex-wrap">
        {projects.slice(0, 3).map((project, index) => ( // Show only two projects
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <div className="p-10 border border-neutral-700 rounded-xl">
              <p className="text-4xl mb-8">
                {project.title}
              </p>
              <p className="mb-8">
                <span className="text-neutral-400 tracking-tight">{project.description}</span>
              </p>
              <img src={project.image} alt={project.title} className="mb-8 rounded-lg" />
              <ul>
                {project.features.map((feature, index) => (
                  <li key={index} className="mt-8 flex items-center">
                    <CheckCircle2 />
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-flex justify-center items-center text-center w-full h-12 p-5 mt-20 tracking-tight text-xl hover:bg-orange-900 border border-orange-900 rounded-lg transition duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsShowcase;
