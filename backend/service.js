import axios from "axios";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";
import * as cheerio from "cheerio";

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

export async function getActivities () {

};

export default async function getLoginToken() {
    const response = await client.get('https://ava-grad.unifacef.com.br/login/index.php');
    const html = response.data;
    const $ = cheerio.load(html);
    const loginToken = $('input[name="logintoken"]').val();
    return loginToken;
};

export async function getSessKey(req, res) {
    const RA = "FAKE_RA";
    const pass = "FAKE_PASS";

    const loginToken = await getLoginToken();
    const response = await client.post('https://ava-grad.unifacef.com.br/login/index.php', 
        new URLSearchParams({
            anchor: "",
            logintoken: loginToken,
            username: RA,
            password: pass,
        })
    );
    const data = await response.data;
    res.send(data);
};
