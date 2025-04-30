import { ValidationError, useForm } from "@formspree/react";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { currentProjectAtom, projects } from "./Projects";
// import { currentPersonalProjectAtom, personalprojects } from "./PersonalProjects";
import React from 'react';

const Section = ({ children, mobileTop }) => {
  return (
    <motion.section
      className={`
        p-8 max-w-screen-2xl mx-auto
        flex flex-col items-start section
        ${mobileTop ? "justify-start md:justify-center" : "justify-center"}
      `}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 0.6 },
      }}
    >
      {children}
    </motion.section>
  );
};

export const Interface = ({ setSection }) => {
  return (
    <div className="flex flex-col items-center w-screen divsection2">
      <AboutSection setSection={setSection} />
      <SkillSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

const AboutSection = ({ setSection }) => (
  <Section mobileTop>
    <h1 className="text-3xl md:text-4xl font-extrabold leading-snug mt-8 md:mt-0">
      Hello, I'm
      <br />
      <span className="bg-white px-1 italic">Janhavi Srivastava</span>
    </h1>
    <motion.p
      className="text-lg text-gray-600 mt-4 para-w"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.5 }}
    >
     Web developer passionate about clean, functional, and user-friendly design. Skilled in HTML, CSS, JS, React, Node.js, PHP — always learning and building impactful solutions.
    </motion.p>
    <div className="flex w-full gap-4 ">
    <motion.button
      onClick={() => setSection(3)}
      className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-4 md:mt-16"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2 }}
    >
      Contact Me
    </motion.button>
    <motion.a
      href="public/Resume/ArtisteJanhavi_Resume.pdf" // <-- Make sure this path is correct
      download="ArtisteJanhavi_Resume.pdf" // Optional: sets the filename
      className="bg-indigo-600 text-white py-4 px-8 rounded-lg font-bold text-lg mt-4 md:mt-16 inline-block"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 2 }}
    >
      Resume
    </motion.a>
    </div>
  </Section>
);

const databaseskills = [
  { title: "MySQL", level: 80 },
  { title: "MongoDB", level: 80 },
];
const webskills = [
  { title: "HTML", level: 90 },
  { title: "CSS", level: 90 },
  { title: "JAVASCRIPT", level: 80 },
  { title: "JQUERY", level: 70 },
  { title: "PHP", level: 70 },
];
const frameworkskills = [
  { title: "ReactJs", level: 80 },
  { title: "NodeJs", level: 80 },
  { title: "ExpressJs", level: 80 },
];

const SkillSection = () => (
  <Section>
    <motion.div className="w-full" whileInView={"visible"}>
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">TECHNICAL SKILLS</h2>

      {/* Database Skills */}
      <SkillGroup title="Database" skills={databaseskills} />
      <br />
      {/* Web Languages */}
      <SkillGroup title="Web Languages" skills={webskills} />
      <br />
      {/* Frameworks */}
      <SkillGroup title="Frameworks" skills={frameworkskills} />
    </motion.div>
  </Section>
);

const SkillGroup = ({ title, skills }) => (
  <>
    <h2 className="text-1xl md:text-2xl font-bold mb-3 text-white">{title}</h2>
    <div className="mt-8 space-y-4">
      {skills.map((skill, index) => (
        <div className="w-64 mb-2" key={index}>
          <motion.h3
            className="text-lg md:text-xl font-bold text-gray-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 + index * 0.2 }}
          >
            {skill.title}
          </motion.h3>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${skill.level}%` }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 + index * 0.2 }}
            ></motion.div>
          </div>
        </div>
      ))}
    </div>
  </>
);

const ProjectsSection = () => {
  const [currentProject, setCurrentProject] = useAtom(currentProjectAtom);

  const nextProject = () => {
    setCurrentProject((currentProject + 1) % projects.length);
  };

  const previousProject = () => {
    setCurrentProject((currentProject - 1 + projects.length) % projects.length);
  };

  return (
    <Section>
      <div className="flex w-full h-full gap-4 items-center justify-center">
        <button className="hover:text-indigo-600 transition-colors" onClick={previousProject}>
          ← Previous
        </button>
        <h2 className="text-3xl md:text-5xl font-bold text-white">Projects</h2>
        <button className="hover:text-indigo-600 transition-colors" onClick={nextProject}>
          Next →
        </button>
      </div>
    </Section>
  );
};


const ContactSection = () => {
  const [state, handleSubmit] = useForm("mgvkeynd");

  return (
    <Section>
      <h2 className="text-3xl md:text-5xl font-bold">Contact me</h2>
      <div className="mt-8 p-8 rounded-md bg-white bg-opacity-50 w-96 max-w-full">
        {state.succeeded ? (
          <p className="text-gray-900 text-center">Thanks for your message!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="font-medium text-gray-900 block mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <label htmlFor="email" className="font-medium text-gray-900 block mb-1 mt-8">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
            <label htmlFor="message" className="font-medium text-gray-900 block mb-1 mt-8">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 p-3"
            ></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} />
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full mt-8 bg-indigo-600 text-white py-3 px-4 rounded-md font-bold"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </Section>
  );
};
