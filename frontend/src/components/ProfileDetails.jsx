import { useParams } from "react-router-dom";

export function ProfileDetails() {
    const { id } = useParams();
    return (
        <>
        <h1>Profile Details</h1>
        <p>
            ID: {id}
        </p>
        </>
        )
}