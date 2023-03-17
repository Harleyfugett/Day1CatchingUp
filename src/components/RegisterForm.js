import { useState } from "react";
import { useNavigate } from "react-router-dom"

const RegisterForm = () => {
    const [newFirstName, setFirstName] = useState("");
    const [newLastName, setLastName] = useState("");
    const [newAge, setAge] = useState("")
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate();
    let newUsername = newFirstName + newLastName;

    async function sendRegisterNewAccountReq(e) {
        e.preventDefault();
        try {
            console.log("New username is: " + newFirstName +  newLastName)
            console.log("New password is; " + newPassword)

            if (newPassword.length < 4) {
                alert ("Password is too short, must be a minimum of 4 characters")
                return;
            } else if (newUsername.length < 2) {
                alert ("Username is too short, must be a minimum of 2 characters");
                return;
            }

            const response = await fetch("https://dummyjson.com/users/add", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    firstName: newFirstName,
                    lastName: newLastName,
                    age: newAge
                })
            })
            .then(res => res.json())
            .then(console.log);

            const translatedData = await response.json();
            console.log(translatedData)

            if (!translatedData.success) {
                alert("Account was not successfully created. Try again")
            } else {
                const myJWT = translatedData.data.token
                localStorage.setItem("token", myJWT)
                navigate("/")
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <form onSubmit={sendRegisterNewAccountReq}>
                <input
                    type="text"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(event) => setNewUsername(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                />
                <button type='submit'>Create Account</button>
            </form>
        </div>
    )
}

export default RegisterForm;