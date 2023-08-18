import { useEffect, useState } from "react";
import axios from "axios";
import { randomId } from "@mieuteacher/meomeojs";
// import "./user.scss";

export default function User() {
    const [users, setUsers] = useState([]);
    try {
        useEffect(() => {
            axios
                .get("http://localhost:4000/apis/v1/users")
                .then((res) => {
                    setUsers(res.data.data);
                })
                .catch((err) => {
                    console.log("err", err);
                });
        }, []);
    } catch (err) {
        // console.log("err", err);
    }
    console.log("users", users);
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                </tr>
            </thead>
            <tbody>
                {users?.map((user, index) => (
                    <tr key={randomId()}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
