import PubSub from "pubsub-js";
import messages from "../common/messages";

const resetLogin = async (ig: any) => {
    PubSub.subscribe('LOGOUT', async (msg: string, data: string) => {
        await ig.account.logout();
        messages.loggedOut();
    })
}

export default function(ig: any){
    //Start Subscribing
    resetLogin(ig)
}