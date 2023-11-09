import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Op } from "sequelize";

import OldPasswordModel from "../models/old.password.model";

dayjs.extend(utc);

const oldPasswordsRemover = async (): Promise<void> => {
  const previousYear = dayjs().utc().subtract(1, "year");

  await OldPasswordModel.destroy({
    where: {
      createdAt: {
        [Op.lte]: previousYear.toDate(),
      },
    },
  });
};

export const removeOldPasswords = new CronJob("0 0 * * *", oldPasswordsRemover);
