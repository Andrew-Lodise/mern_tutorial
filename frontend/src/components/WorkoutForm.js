import {useState} from "react"

const WorkoutForm = () => {
    // react states and method to set each state
    const [title, setTitle] = useState("")
    const [load, setLoad] = useState("")
    const [reps, setReps] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        // the default action is to refresh page so we dont want that
        e.preventDefault()

        const workout = {title, load, reps}
        const response = await fetch("/api/workouts", {
            method: "POST",
            body: JSON.stringify(workout),
            headers: {
                "Content-Type":  "application/json"
            }
        })
        const json = await response.json()

        if (!response.ok){
            setError(json.error)
        }

        if (response.ok){
            setError(null)
            setTitle("")
            setLoad("")
            setReps("")
            console.log("new workout added", json)
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit }>
            <h3>Add a new workout</h3>
            <label>Exercise title:</label>
            <input
                type="text"
                onChange = {(e) => setTitle(e.target.value)} 
                value = {title}
            ></input>


            <label>Load (lbs): </label>
            <input
                type="number"
                onChange = {(e) => setLoad(e.target.value)} 
                value = {load}
            ></input>

            <label>Reps: </label>
            <input
                type="number"
                onChange = {(e) => setReps(e.target.value)} 
                value = {reps}
            ></input>
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm