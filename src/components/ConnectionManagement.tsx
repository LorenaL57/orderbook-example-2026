import { useSelector } from "react-redux"

interface ConnectionControlsProps {
    onConnect: () => void
    onDisconnect: () => void
}

export default function ConnectionManagement({ onConnect, onDisconnect }: ConnectionControlsProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const connected = useSelector((state: any) => state.book.connected)
    return (
        <div className="button-container">
            <button onClick={onConnect} disabled={connected} className="connectbtn">
                Connect
            </button>
            <button onClick={onDisconnect} disabled={!connected} className="disconnectbtn">
                Disconnect
            </button>
        </div>
    )
}