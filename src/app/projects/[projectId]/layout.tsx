import { ProjectIdLayout as ProjectIdLayoutClient } from "@/features/projects/components/project-id-layout";
import { Id } from "../../../../convex/_generated/dataModel";

interface ProjectIdRouteLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    projectId: string;
  }>;
}

const ProjectIdRouteLayout = async ({
  children,
  params,
}: ProjectIdRouteLayoutProps) => {
  const { projectId } = await params;

  return (
    <ProjectIdLayoutClient projectId={projectId as Id<"projects">}>
      {children}
    </ProjectIdLayoutClient>
  );
};

export default ProjectIdRouteLayout;