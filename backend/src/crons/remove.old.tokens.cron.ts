import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Op } from "sequelize";

import TokenModel from "../models/token.model";

dayjs.extend(utc);

const tokensRemover = async (): Promise<void> => {
  const previousMonth = dayjs().utc().subtract(1, "month");

  await TokenModel.destroy({
    where: {
      createdAt: {
        [Op.lte]: previousMonth.toDate(),
      },
    },
  });

  // eslint-disable-next-line no-console
  console.log("Tokens removed successfully");
};

export const removeOldToken = new CronJob("0 0 * * *", tokensRemover);
