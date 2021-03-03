import DataLoader from "dataloader";
import { Updoot } from "../entities/Updoot";

// value object passed in:
// [{postId: 5, userId: 10}]

// we load
// [{postId: 5, userId: 10, value: 1}]
// then return [1]

export const createUpdootLoader = () =>
  new DataLoader<{ postId: number; userId: number }, Updoot | null>(
    async (keys) => {
      const updoots = await Updoot.findByIds(keys as any);
      const updootIdsToUpdoot: Record<string, Updoot> = {};
      updoots.forEach((updoot) => {
        updootIdsToUpdoot[`${updoot.userId}|${updoot.postId}`] = updoot;
      });
      console.log("updoots:", updoots);
      console.log("updootIdsToUpdoot", updootIdsToUpdoot);
      return keys.map(
        (key) => updootIdsToUpdoot[`${key.userId}|${key.postId}`]
      );
    }
  );
