const argv = require("minimist")(process.argv.slice(2));
import dashboard from "../modules/dashboard";
import subscribers from "./subscribers";

export default function (ig: any){
  if (
    argv["dashboard"] && 
    argv["dashboard"] === "true" || 
    process.env.DASHBOARD_ENABLED === 'true') {
    dashboard();
    subscribers(ig);
  }
}
