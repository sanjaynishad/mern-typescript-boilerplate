import { notification } from "antd";
import { Component, ReactNode } from "react";
import { authProvider } from "../api/AuthApi";
import { loadScript } from "../app-utils";

export class GoogleLoginButton extends Component {

    async componentDidMount() {
        loadScript('https://accounts.google.com/gsi/client', () => { });
        (window as any).handleCredentialResponse = async function (res: any) {
            if (await authProvider.loginWithGoogle(res.credential)) {
                window.location.href = '/';
            } else {
                notification.error({
                    message: "Something is wrong!"
                });
            }
        }
    }

    render(): ReactNode {
        return <>
            <div id="g_id_onload"
                data-client_id="<GOOGLE_CLIENT_ID>"
                data-callback="handleCredentialResponse">
            </div>
            <div className="g_id_signin" data-type="standard"></div>
        </>
    }
}