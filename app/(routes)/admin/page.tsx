'use client';

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import * as Toggle from "@radix-ui/react-toggle";
import PanelGateLogin from "@/app/(routes)/admin/panel/PanelGateLogin";
import {
    HiOutlineUserMinus,
    HiOutlineUserPlus,
    HiOutlineGlobeAlt,
    HiOutlineKey,
    HiOutlineTrash, HiOutlineEllipsisVertical,
} from "react-icons/hi2";
import {HiOutlineGlobe} from "react-icons/hi";


const ADMIN_ROLES = ["OWNER", "DEVELOPER", "ADMIN"];

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
    const [isSecondaryAuthComplete, setIsSecondaryAuthComplete] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; userId: string; userName: string }>({
        isOpen: false,
        userId: '',
        userName: ''
    });

    useEffect(() => {
        setIsMounted(true);
        const savedTheme = localStorage.getItem('admin-theme');
        if (savedTheme === 'light') {
            setIsDarkMode(false);
        }
    }, []);

    const toggleTheme = (pressed: boolean) => {
        setIsDarkMode(!pressed);
        localStorage.setItem('admin-theme', !pressed ? 'dark' : 'light');
    };

    const fetchUsers = useCallback(async () => {
        if (!isSignedIn || !isSecondaryAuthComplete) return;

        try {
            const res = await axios.get(`/api/admin/dashboard?search=${search}`);
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    }, [search, isSignedIn, isSecondaryAuthComplete]);

    useEffect(() => {
        const verifySession = async () => {
            if (!isLoaded || !isSignedIn) {
                setIsVerifying(false);
                return;
            }

            try {
                const res = await axios.get('/api/admin/auth/verify');
                if (res.data.valid) {
                    setIsSecondaryAuthComplete(true);
                }
            } catch (err) {
            } finally {
                setIsVerifying(false);
            }
        };

        verifySession();
    }, [isLoaded, isSignedIn]);

    useEffect(() => {
        if (isLoaded && isSignedIn && isSecondaryAuthComplete) {
            void fetchUsers();
        }
    }, [fetchUsers, isLoaded, isSignedIn, isSecondaryAuthComplete]);

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

    const userHasAdminRole = ADMIN_ROLES.includes(user?.publicMetadata.role as string || "");

    const theme = {
        bg: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
        card: isDarkMode ? 'bg-gray-800' : 'bg-white shadow-md shadow-gray-400',
        border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
        text: isDarkMode ? 'text-white' : 'text-gray-950',
        textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-600',
        hover: isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50',
        input: isDarkMode ? 'bg-gray-800 text-white focus:ring-gray-600' : 'bg-white text-gray-900 border border-gray-300 focus:ring-purple-500',
        button: isDarkMode ? 'bg-gray-900 hover:bg-gray-700 shadow-black' : 'bg-gray-900 text-white hover:bg-gray-700 active:bg-gray-500',
        tableHeader: isDarkMode ? 'bg-gray-800' : 'bg-gray-100',
        select: isDarkMode ? 'bg-gray-800 text-white focus:ring-purple-600' : 'bg-white text-gray-900 border border-gray-300 focus:ring-purple-500',
        menuBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
        menuHover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
        modalBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
        modalOverlay: isDarkMode ? 'bg-gray-600 bg-opacity-50' : 'bg-gray-600 bg-blur bg-opacity-30',
    };

    if (!isLoaded || isVerifying || !isMounted) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-400 text-lg">Verifying session...</p>
            </div>
        </div>
    );

    if (!isSignedIn || !userHasAdminRole) {
        return (
            <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? 'bg-gray-100' : 'bg-gray-50'}`}>
                <div className="text-center">
                    <h1 className="text-4xl text-red-600 font-semibold">Access Denied</h1>
                    <p className="text-gray-600 text-lg">
                        You must be signed in with a required role to access this route.
                    </p>
                </div>
            </div>
        );
    }

    if (isSignedIn && userHasAdminRole && !isSecondaryAuthComplete) {
        return <PanelGateLogin onLoginSuccess={() => setIsSecondaryAuthComplete(true)} />;
    }

    const roles: User['role'][] = ["OWNER","DEVELOPER","ADMIN","STAFF","PARTNER","DONATOR","BETA TESTER","DEFAULT"];

    const totalUsers = users.length;
    const roleStats = roles.reduce((acc, role) => {
        acc[role] = users.filter(u => u.role === role).length;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className={`p-8 min-h-screen ${theme.bg} ${theme.text}`}>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-semibold">Scythe Client | Admin Panel</h1>

                <Toggle.Root
                    pressed={!isDarkMode}
                    onPressedChange={toggleTheme}
                    className={`p-2 rounded-lg ${theme.card} ${theme.border} border transition-colors data-[state=on]:bg-gray-200`}
                    aria-label="Toggle theme"
                >
                    {isDarkMode ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </Toggle.Root>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className={`${theme.card} rounded-lg p-6 border ${theme.border}`}>
                    <p className={`${theme.textSecondary} text-sm mb-1`}>Total Users</p>
                    <p className="text-3xl font-bold text-purple-400">{totalUsers}</p>
                </div>

                <div className={`${theme.card} rounded-lg p-6 border ${theme.border}`}>
                    <p className={`${theme.textSecondary} text-sm mb-1`}>Admins</p>
                    <p className="text-3xl font-bold text-blue-400">
                        {(roleStats.OWNER || 0) + (roleStats.DEVELOPER || 0) + (roleStats.ADMIN || 0)}
                    </p>
                </div>

                <div className={`${theme.card} rounded-lg p-6 border ${theme.border}`}>
                    <p className={`${theme.textSecondary} text-sm mb-1`}>Staff & Partners</p>
                    <p className="text-3xl font-bold text-green-400">
                        {(roleStats.STAFF || 0) + (roleStats.PARTNER || 0)}
                    </p>
                </div>

                <div className={`${theme.card} rounded-lg p-6 border ${theme.border}`}>
                    <p className={`${theme.textSecondary} text-sm mb-1`}>Beta Testers</p>
                    <p className="text-3xl font-bold text-yellow-400">{roleStats['BETA TESTER'] || 0}</p>
                </div>
            </div>

            <div className={`${theme.card} rounded-lg p-6 border ${theme.border} mb-2`}>
                <h2 className="text-xl font-semibold mb-4">Role Distribution</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {roles.map(role => (
                        <div key={role} className="flex justify-between items-center">
                            <span className={`${theme.textSecondary} text-sm`}>{role}</span>
                            <span className={`${theme.text} font-semibold`}>{roleStats[role] || 0}</span>
                        </div>
                    ))}
                </div>
            </div>

            <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`mr-4 w-full max-w-md mb-6 px-4 h-[36px] rounded-md ${theme.input} focus:outline-none focus:ring-1`}
            />

            <Link href="/admin/players">
                <button className={`w-[248px] h-[32px] rounded-sm mt-8 mb-4 cursor-pointer active:bg-gray-600 transition-all ${theme.button} shadow-md`}>
                    Open Player Management
                </button>
            </Link>

            <div className={`rounded-md border ${theme.border}`}>
                <table className="w-full table-auto text-left">
                    <thead className={theme.tableHeader}>
                    <tr>
                        <th className={`px-4 py-2 border-b ${theme.border}`}>Name</th>
                        <th className={`px-4 py-2 border-b ${theme.border}`}>Email</th>
                        <th className={`px-4 py-2 border-b ${theme.border}`}>Role</th>
                        <th className={`px-4 py-2 border-b ${theme.border}`}>Change Role</th>
                        <th className={`px-4 py-2 border-b ${theme.border}`}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.length ? users.map(u => (
                        <tr key={u._id} className={theme.hover}>
                            <td className={`px-4 py-2 border-b ${theme.border}`}>{u.name}</td>
                            <td className={`px-4 py-2 border-b ${theme.border}`}>{u.email}</td>
                            <td className={`px-4 py-2 border-b ${theme.border}`}>{u.role}</td>
                            <td className={`px-4 py-2 border-b ${theme.border}`}>
                                <select
                                    value={u.role}
                                    onChange={(e) => updateRole(u._id, e.target.value as User['role'])}
                                    className={`${theme.select} px-2 py-1 rounded-md focus:outline-none focus:ring-2`}
                                >
                                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </td>
                            <td className={`px-4 py-2 border-b ${theme.border} relative`}>
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setOpenMenuId(openMenuId === u._id ? null : u._id);
                                        }}
                                        className={`p-2 ml-3 ${theme.menuHover} rounded-md transition-colors`}
                                        title="User Actions"
                                    >
                                        <HiOutlineEllipsisVertical className="h-5 w-5" />
                                    </button>

                                    {openMenuId === u._id && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setOpenMenuId(null)}
                                            />
                                            <div
                                                className={`absolute right-0 mt-2 w-48 ${theme.menuBg} rounded-md shadow-lg border ${theme.border} z-20`}
                                            >
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleUserAction(u._id, 'unban')}
                                                        className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm ${theme.menuHover} text-green-400`}
                                                    >
                                                        <HiOutlineUserPlus className="h-4 w-4" /> Unban User
                                                    </button>

                                                    <button
                                                        onClick={() => handleUserAction(u._id, 'un-ip-ban')}
                                                        className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm ${theme.menuHover} text-green-400`}
                                                    >
                                                        <HiOutlineGlobe className="h-4 w-4" /> Un IP Ban
                                                    </button>

                                                    <div className={`border-t ${theme.border} my-1`}></div>

                                                    <button
                                                        onClick={() => handleUserAction(u._id, 'ban')}
                                                        className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm ${theme.menuHover} text-orange-400`}
                                                    >
                                                        <HiOutlineUserMinus className="h-4 w-4" /> Ban User
                                                    </button>

                                                    <button
                                                        onClick={() => handleUserAction(u._id, 'ip-ban')}
                                                        className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm ${theme.menuHover} text-red-400`}
                                                    >
                                                        <HiOutlineGlobeAlt className="h-4 w-4" /> IP Ban
                                                    </button>

                                                    <button
                                                        onClick={() => handleUserAction(u._id, 'reset-password')}
                                                        className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm ${theme.menuHover} text-blue-400`}
                                                    >
                                                        <HiOutlineKey className="h-4 w-4" /> Reset Password
                                                    </button>

                                                    <div className={`border-t ${theme.border} my-1`}></div>

                                                    <button
                                                        onClick={() => handleUserAction(u._id, 'delete', u.name)}
                                                        className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm ${theme.menuHover} text-red-500`}
                                                    >
                                                        <HiOutlineTrash className="h-4 w-4" /> Delete User
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
                            <td colSpan={5} className={`px-4 py-6 text-center ${theme.textSecondary}`}>No users found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {deleteModal.isOpen && (
                <div className={`fixed inset-0 ${theme.modalOverlay} flex items-center justify-center z-50`}>
                    <div className={`${theme.modalBg} rounded-lg p-6 max-w-md w-full mx-4 border ${theme.border}`}>
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Delete User</h2>
                        <p className={`${theme.textSecondary} mb-6`}>
                            Are you sure you want to delete <span className={`font-semibold ${theme.text}`}>{deleteModal.userName}</span>?
                            This action cannot be undone and will permanently remove the user from both the database and Clerk.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setDeleteModal({ isOpen: false, userId: '', userName: '' })}
                                className={`px-4 py-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} rounded-md transition-colors`}
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