'use client';

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

type User = {
    _id: string;
    name: string;
    email: string;
    profileImage: string;
    clerkId: string;
    role: 'OWNER' | 'DEVELOPER' | 'ADMIN' | 'STAFF' | 'PARTNER' | 'DONATOR' | 'BETA TESTER' | 'DEFAULT';
};

export default function AdminDashboard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; userId: string; userName: string }>({
        isOpen: false,
        userId: '',
        userName: ''
    });

    const fetchUsers = useCallback(async () => {
        if (!isSignedIn) return;

        try {
            const res = await axios.get(`/api/admin/dashboard?search=${search}`);
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    }, [search, isSignedIn]);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            void fetchUsers();
        }
    }, [fetchUsers, isLoaded, isSignedIn]);

    const updateRole = async (userId: string, role: User['role']) => {
        try {
            await axios.patch("/api/admin/dashboard", { userId, role });
            void fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    const handleUserAction = async (userId: string, action: string, userName?: string) => {
        if (action === 'delete') {
            setDeleteModal({ isOpen: true, userId, userName: userName || '' });
            setOpenMenuId(null);
            return;
        }

        try {
            await axios.post(`/api/admin/user-actions`, { userId, action });
            setOpenMenuId(null);
            void fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    const confirmDelete = async () => {
        try {
            await axios.post(`/api/admin/user-actions`, {
                userId: deleteModal.userId,
                action: 'delete'
            });
            setDeleteModal({ isOpen: false, userId: '', userName: '' });
            void fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    if (!isLoaded) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-400 text-lg">Loading...</p>
            </div>
        </div>
    );

    if (!isSignedIn || !["OWNER","DEVELOPER","ADMIN"].includes(user?.publicMetadata.role as string || "")) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-center">
                    <div className="text-6xl mb-4">🚫</div>
                    <h1 className="text-3xl font-bold text-red-500 mb-2">Access Denied</h1>
                    <p className="text-gray-400">You don&#39;t have permission to access this page</p>
                </div>
            </div>
        );
    }

    const roles: User['role'][] = ["OWNER","DEVELOPER","ADMIN","STAFF","PARTNER","DONATOR","BETA TESTER","DEFAULT"];

    const totalUsers = users.length;
    const roleStats = roles.reduce((acc, role) => {
        acc[role] = users.filter(u => u.role === role).length;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="p-8 min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-semibold mb-6">Scythe Client | Admin Panel</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-purple-400">{totalUsers}</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Admins</p>
                    <p className="text-3xl font-bold text-blue-400">
                        {(roleStats.OWNER || 0) + (roleStats.DEVELOPER || 0) + (roleStats.ADMIN || 0)}
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Staff & Partners</p>
                    <p className="text-3xl font-bold text-green-400">
                        {(roleStats.STAFF || 0) + (roleStats.PARTNER || 0)}
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Beta Testers</p>
                    <p className="text-3xl font-bold text-yellow-400">{roleStats['BETA TESTER'] || 0}</p>
                </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-6">
                <h2 className="text-xl font-semibold mb-4">Role Distribution</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {roles.map(role => (
                        <div key={role} className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">{role}</span>
                            <span className="text-white font-semibold">{roleStats[role] || 0}</span>
                        </div>
                    ))}
                </div>
            </div>

            <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mr-4 w-full max-w-md mb-6 px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <Link href="/admin/players">
                <button className="mr-4 w-[360px] max-w-md mb-6 px-4 py-2 cursor-pointer rounded-md bg-gray-800 hover:bg-gray-800/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-600">
                    Open Player Management
                </button>
            </Link>

            <div className="rounded-md border border-gray-700">
                <table className="w-full table-auto text-left">
                    <thead className="bg-gray-800">
                    <tr>
                        <th className="px-4 py-2 border-b border-gray-700">Name</th>
                        <th className="px-4 py-2 border-b border-gray-700">Email</th>
                        <th className="px-4 py-2 border-b border-gray-700">Role</th>
                        <th className="px-4 py-2 border-b border-gray-700">Change Role</th>
                        <th className="px-4 py-2 border-b border-gray-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length ? users.map(u => (
                        <tr key={u._id} className="hover:bg-gray-800">
                            <td className="px-4 py-2 border-b border-gray-700">{u.name}</td>
                            <td className="px-4 py-2 border-b border-gray-700">{u.email}</td>
                            <td className="px-4 py-2 border-b border-gray-700">{u.role}</td>
                            <td className="px-4 py-2 border-b border-gray-700">
                                <select
                                    value={u.role}
                                    onChange={(e) => updateRole(u._id, e.target.value as User['role'])}
                                    className="bg-gray-800 px-2 py-1 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                >
                                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </td>
                            <td className="px-4 py-2 border-b border-gray-700 relative">
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setOpenMenuId(openMenuId === u._id ? null : u._id);
                                        }}
                                        className="p-2 hover:bg-gray-700 rounded-md transition-colors"
                                        title="User Actions"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {openMenuId === u._id && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setOpenMenuId(null)}
                                            />
                                            <div
                                                className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-20"
                                            >
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleUserAction(u._id, 'suspend')}
                                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-yellow-400"
                                                    >
                                                        ⏸️ Suspend User
                                                    </button>
                                                    <button
                                                        onClick={() => handleUserAction(u._id, 'ban')}
                                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-orange-400"
                                                    >
                                                        🚫 Ban User
                                                    </button>
                                                    <button
                                                        onClick={() => handleUserAction(u._id, 'ip-ban')}
                                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-red-400"
                                                    >
                                                        🔒 IP Ban
                                                    </button>
                                                    <button
                                                        onClick={() => handleUserAction(u._id, 'reset-password')}
                                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-blue-400"
                                                    >
                                                        🔑 Reset Password
                                                    </button>
                                                    <div className="border-t border-gray-700 my-1"></div>
                                                    <button
                                                        onClick={() => handleUserAction(u._id, 'delete', u.name)}
                                                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-red-500"
                                                    >
                                                        🗑️ Delete User
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="px-4 py-6 text-center text-gray-500">No users found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {deleteModal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Delete User</h2>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to delete <span className="font-semibold text-white">{deleteModal.userName}</span>?
                            This action cannot be undone and will permanently remove the user from both the database and Clerk.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setDeleteModal({ isOpen: false, userId: '', userName: '' })}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}