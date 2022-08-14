import {
    Layout
} from "antd";
import { CopyrightComponent } from "../Copyright";

const { Footer } = Layout;

export function AdminFooter() {
    return (
        <Footer>
            <CopyrightComponent />
        </Footer>
    )
}