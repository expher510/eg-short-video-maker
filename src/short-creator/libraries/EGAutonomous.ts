import axios from "axios";
import { getOrientationConfig } from "../../components/utils";
import { logger } from "../../logger";
import { OrientationEnum, type Video } from "../../types/shorts";

const defaultTimeoutMs = 300000; // 5 minutes for generation
const pollIntervalMs = 5000; // Poll every 5 seconds

export class EGAutonomousAPI {
  private BASE_URL = "https://eg-autonomous.vercel.app";

  constructor(private API_KEY: string) {}

  public async findVideo(
    searchTerms: string[],
    minDurationSeconds: number,
    excludeIds: string[] = [],
    orientation: OrientationEnum = OrientationEnum.portrait,
  ): Promise<Video> {
    if (!this.API_KEY) {
      throw new Error("EG_AUTONOMOUS_API_KEY not set");
    }

    const prompt = searchTerms.join(", ");
    logger.info({ prompt }, "Requesting video generation from EG-Autonomous");

    try {
      // 1. Generate Job
      const genResponse = await axios.post(
        `${this.BASE_URL}/api/generate`,
        {
          prompt: prompt,
          mode: "video",
        },
        {
          headers: {
            Authorization: `Bearer ${this.API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!genResponse.data.success || !genResponse.data.job_id) {
        throw new Error("Failed to start generation job");
      }

      const jobId = genResponse.data.job_id;
      logger.info({ jobId }, "Generation job started, polling for completion...");

      // 2. Poll for completion
      const startTime = Date.now();
      while (Date.now() - startTime < defaultTimeoutMs) {
        const pollResponse = await axios.post(
          `${this.BASE_URL}/api/download`,
          { job_id: jobId },
          {
            headers: {
              Authorization: `Bearer ${this.API_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (pollResponse.data.success && pollResponse.data.status === "completed") {
          const videoUrl = pollResponse.data.videos?.[0];
          if (!videoUrl) {
            throw new Error("Job completed but no video URL found");
          }

          const { width, height } = getOrientationConfig(orientation);

          logger.info({ jobId, videoUrl }, "Video generation completed");

          return {
            id: jobId,
            url: videoUrl,
            width,
            height,
          };
        }

        if (pollResponse.data.status === "failed") {
          throw new Error("Video generation job failed");
        }

        // Wait before next poll
        await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
      }

      throw new Error("Video generation timed out");
    } catch (error: any) {
      logger.error(error, "Error in EGAutonomousAPI");
      throw error;
    }
  }
}
