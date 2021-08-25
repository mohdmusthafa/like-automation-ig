const argv = require("minimist")(process.argv.slice(2));
import dashboard from "../modules/dashboard";

export default function (){
  if (
    argv["dashboard"] && 
    argv["dashboard"] === "true" || 
    process.env.DASHBOARD_ENABLED === 'true') {
    dashboard();
  }
}
