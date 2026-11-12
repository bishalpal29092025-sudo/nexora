"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";

export const useProject = (projectId: Id<"projects">) => {
  return useQuery(api.projects.getById, { id: projectId });
};

export const useProjects = () => {
  return useQuery(api.projects.get);
};

export const useProjectsPartial = (limit: number) => {
  return useQuery(api.projects.getPartial, {
    limit,
  });
};

export const useCreateProject = () => {
  const { userId } = useAuth();

  const createProject = useMutation(api.projects.create);

  return createProject.withOptimisticUpdate((localStore, args) => {
    const existingProjects = localStore.getQuery(api.projects.get);

    if (existingProjects !== undefined && userId) {
      // Do not generate timestamps or random IDs inside this callback.
      // The server mutation will create the real project.
      const optimisticProject = {
        _id: crypto.randomUUID() as Id<"projects">,
        _creationTime: 0,
        name: args.name,
        ownerId: userId,
        updatedAt: 0,
      };

      localStore.setQuery(api.projects.get, {}, [
        optimisticProject,
        ...existingProjects,
      ]);
    }
  });
};


export const useRenameProject = () => {
  const renameProject = useMutation(api.projects.rename);

  const renameWithOptimisticUpdate =
    renameProject.withOptimisticUpdate((localStore, args) => {
      // Update individual project query
      const existingProject = localStore.getQuery(
        api.projects.getById,
        { id: args.id },
      );

      if (existingProject) {
        localStore.setQuery(
          api.projects.getById,
          { id: args.id },
          {
            ...existingProject,
            name: args.name,
            updatedAt: args.updatedAt,
          },
        );
      }

      // Update projects list query
      const existingProjects = localStore.getQuery(api.projects.get);

      if (existingProjects !== undefined) {
        localStore.setQuery(
          api.projects.get,
          {},
          existingProjects.map((project) =>
            project._id === args.id
              ? {
                  ...project,
                  name: args.name,
                  updatedAt: args.updatedAt,
                }
              : project,
          ),
        );
      }
    });

  return (args: { id: Id<"projects">; name: string }) =>
    renameWithOptimisticUpdate({
      id: args.id,
      name: args.name,
      updatedAt: Date.now(),
    });
};
