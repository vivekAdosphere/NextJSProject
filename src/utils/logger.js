// import "winston-mongodb";
import { createLogger, transports, format } from "winston";
import dbConfig from "@/configs/dbConfig.js";
import Helpers from "@/helpers/Utils.js";

const packageConfig = Helpers.loadJSON("../package.json");
console.log(packageConfig);
const timeZone = () =>
  new Date().toLocaleString(`en-IN`, {
    timeZone: `Asia/Kolkata`,
  });

const Logger = createLogger({
  transports: [
    new transports.File({
      filename: `${packageConfig.name}.log`,
      format: format.combine(
        format.timestamp({ format: timeZone }),
        format.json()
      ),
    }),
    new transports.Console({
      format: format.combine(
        format.timestamp({ format: timeZone }),
        format.json()
      ),
    }),
    new transports.MongoDB({
      db: dbConfig.DATABASE_URL,
      options: {
        useUnifiedTopology: true,
      },
      collection: `serverlogs`,
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

export default Logger;
