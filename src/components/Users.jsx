import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users, setUsers] = useState(loadedUsers);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // ডেটাবেস থেকে ডিলিট করার রিকোয়েস্ট পাঠানো
                fetch(`http://localhost:5000/users/${id}`, {
                    method: 'DELETE'
                })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        Swal.fire("Deleted!", "User has been deleted.", "success");
                        // লোকাল স্টেট আপডেট
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    } else {
                        Swal.fire("Error!", "Failed to delete the user.", "error");
                    }
                })
                .catch(error => {
                    console.error("Error deleting user:", error);
                    Swal.fire("Error!", "Something went wrong.", "error");
                });
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    {/* টেবিল হেডার */}
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">#</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Created At</th>
                            <th className="border border-gray-300 px-4 py-2">Last LogIn</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* টেবিল বডি */}
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.createdAt || "Not Available"}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.lastSignInTime|| "Not Available"}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button className="btn bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
                                    <button 
                                        onClick={() => handleDelete(user._id)} 
                                        className="btn bg-red-500 text-white px-4 py-2 rounded">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
