import { useState } from "react";
import NewProject from "./components/NewProject";
import { NoProjectSelected } from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

export default function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectsState(prev => {
      const newTask = {
        id: crypto.randomUUID(),
        text: text,
        projectId: prev.selectedProjectId,
      };
      return {
        ...prev,
        selectedProjectId: prev.selectedProjectId,
        tasks: [newTask, ...prev.tasks]
      };
    });
  }

  function handleDeleteTask() {

  }

  function handleSelectProject(id) {
    setProjectsState(prev => ({ ...prev, selectedProjectId: id }));
  }

  function handleStartAddProject() {
    setProjectsState(prev => ({ ...prev, selectedProjectId: null }));
  }

  function handleCancelAddProject() {
    setProjectsState(prev => ({ ...prev, selectedProjectId: undefined }));
  }

  function handleAddProject(projectData) {
    setProjectsState(prev => {
      const newProject = {
        id: crypto.randomUUID(),
        ...projectData,
      };
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject]
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState(prev => ({
      ...prev,
      selectedProjectId: undefined,
      projects: prev.projects.filter(p => p.id !== prev.selectedProjectId),
    }));
  }

  const selectedProject = projectsState.projects.find(
    p => p.id === projectsState.selectedProjectId
  );

  let content = 
  <SelectedProject 
  project={selectedProject} 
  onDelete={handleDeleteProject} 
  onAddTask={handleAddTask}
  onDeleteTask={handleDeleteTask}
  tasks={projectsState.tasks}
  />;

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject
        onAdd={handleAddProject}
        onCancel={handleCancelAddProject}
      />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId} // 전달
      />
      {content}
    </main>
  );
}
