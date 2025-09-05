// src/components/UserList.jsx
"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db, auth } from "@/firebaseConfig";

const UserList = ({ onSelectChat }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-3 bg-light border-end vh-100 overflow-auto">
      <h5 className="mb-3">Daftar Pengguna</h5>
      <ul className="list-group">
        <li
          onClick={() => onSelectChat("global")}
          className="list-group-item list-group-item-action fw-bold text-primary"
        >
          Chat Global
        </li>
        {users.map((user) => (
          user.id !== auth.currentUser?.uid && (
            <li
              key={user.id}
              onClick={() => onSelectChat(user)}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              {user.displayName || "Pengguna Baru"}
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default UserList;
