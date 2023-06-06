import { Input } from "antd"
import CreateTransaction from "../../components/CreateTransaction"
import WithdrawTransaction from "../../components/WithdrawTransaction"
import "./Dashboard.css"


export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="balance">
                <Input placeholder="Balance" />
            </div>
            <div className="control">
                <CreateTransaction />
                <WithdrawTransaction />
            </div>
        </div>
    )
}