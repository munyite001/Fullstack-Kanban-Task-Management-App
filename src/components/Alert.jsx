/* eslint-disable react/prop-types */
export default function AlertMessage( { message, type }) {
    return (
        <div className={type == "error" ? "alert error" : "alert success"}>
            {message}
        </div>
    )
}