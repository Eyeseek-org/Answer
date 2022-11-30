import { GroupedStream } from "../components/tables/StreamTable";
import { Project } from "../types/project";
import { Stream } from "../types/stream";

export const groupStreamWithProject = (streams: Stream[], projectsDetail: Project[]) => {
  const newStreams: GroupedStream[] = [];
  streams.forEach((stream) => {
    projectsDetail.forEach((project) => {
      if (stream && project && stream.projectId === project.objectId) {
        newStreams.push({
          ...stream,
          chainId: project.chainId,
          title: project.title,
          subcategory: project.subcategory,
        });
      }
    });
  });
  return newStreams;
};
