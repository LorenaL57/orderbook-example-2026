import { useSelector } from "react-redux"
import type { Precision } from "../types"

interface PrecisionSelectionProps {
    onChangePrecision: (precision: Precision) => void
}

export default function PrecisionSelection({ onChangePrecision }: PrecisionSelectionProps) {

    const precisioArray = [
        "P0", "P1", "P2", "P3", "P4"
    ]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const precision = useSelector((state: any) => state.book.precision)

    const handlePrecisionChange = (precision: Precision) => {
        onChangePrecision(precision)
    }

    return (
        <div className="button-container">
            {precisioArray.map((option) => (
                <button
                    key={option}
                    onClick={() => handlePrecisionChange(option as Precision)}
                    disabled={precision === option}
                    className={precision === option ? "precisionbtn-selected" : "precisionbtn"}
                >
                    {option}
                </button>
            ))}

        </div>
    )
}