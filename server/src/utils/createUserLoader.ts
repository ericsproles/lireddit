import DataLoader from "dataloader";
import { User } from "../entities/User";

// values passed in:
// [1, 78, 8, 9]
// [{id: 1, username: 'eric'}, {}, {}, {}]

export const createUserLoader = () =>
  new DataLoader<number, User>(async (userIds) => {
    const users = await User.findByIds(userIds as number[]);
    const userIdToUser: Record<number, User> = {};
    users.forEach((user) => {
      userIdToUser[user.id] = user;
    });
    const userLoaderMap = userIds.map((userId) => userIdToUser[userId]);
    return userLoaderMap;
  });
