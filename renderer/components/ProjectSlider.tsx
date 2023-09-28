import React from 'react';
import MyProjectCard from './ProjectCard';
import { projects } from '../lib/constants';
export default function ProjectSlider() {
  return (
    <div className="pt-9">
      <div>
        <h1 className="text-left py-5 font-semibold">My Projects</h1>
      </div>

      <div className="flex flex-row overflow-x-auto">
        {projects.map((project) => (
          <div key={project.id}>
            <MyProjectCard
              name={project.name}
              address={project.address}
              id={project.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
