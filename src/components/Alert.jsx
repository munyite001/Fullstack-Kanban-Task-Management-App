export default function alertMessage( { message, type }) {
    return (
        <div className={type == "error" ? "alert error" : "alert success"}>
            {message}
        </div>
    )
}