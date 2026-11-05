"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";

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