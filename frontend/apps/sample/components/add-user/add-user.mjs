/* 
 * (C) 2020 TekMonks. All rights reserved.
 * License: MIT - see enclosed license.txt file.
 */
import { router } from "/framework/js/router.mjs";
import { monkshu_component } from "/framework/js/monkshu_component.mjs";
import { apimanager as apiman } from "/framework/js/apimanager.mjs";

const addUser = async () => {
    const payloads = {
        "name": add_user.shadowRoot.querySelector("#name").value,
        "age": add_user.shadowRoot.querySelector("#age").value
    }
    let resp = await apiman.rest(APP_CONSTANTS.API_ADD_USER, "POST", payloads, false, true);
    if (!resp || !resp.result) router.reload();
    add_user.shadowRoot.querySelector("#name").value = '';
    add_user.shadowRoot.querySelector("#age").value = '';
}

function register() {
    // convert this all into a WebComponent so we can use it
    monkshu_component.register("add-user", `${APP_CONSTANTS.APP_PATH}/components/add-user/add-user.html`, add_user);
}

const trueWebComponentMode = true;	// making this false renders the component without using Shadow DOM

export const add_user = { trueWebComponentMode, register, addUser }