'use client';

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import PanelGateLogin from "@/app/(routes)/admin/panel/PanelGateLogin";
import Link from "next/link";

type Player = {
    _id: string;
    ign: string;
    uuid: string;
    hwid: string | null;
    role: 'OWNER' | 'DEVELOPER' | 'ADMIN' | 'STAFF' | 'PARTNER' | 'DONATOR' | 'BETA TESTER' | 'DEFAULT';
    isOnline: boolean;
    isBanned: boolean;
    banReason: string | null;
    lastSeen: Date;
    firstSeen: Date;
};

const ADMIN_ROLES = ["OWNER", "DEVELOPER", "ADMIN"];

export default function PlayerManagement() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [players, setPlayers] = useState<Player[]>([]);
    const [isSecondaryAuthComplete, setIsSecondaryAuthComplete] = useState(false);
    const [search, setSearch] = useState("");
    const [isVerifying, setIsVerifying] = useState(true);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [banModal, setBanModal] = useState<{ isOpen: boolean; playerId: string; playerName: string }>({
        isOpen: false,
        playerId: '',
        playerName: ''
    });
    const [banReason, setBanReason] = useState("");

    const fetchPlayers = useCallback(async () => {
        if (!isSignedIn) return;

        try {
            const res = await axios.get(`/api/admin/players?search=${search}`);
            setPlayers(res.data);
        } catch (err) {
            console.error(err);
        }
    }, [search, isSignedIn]);

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
            void fetchPlayers();
        }
    }, [fetchPlayers, isLoaded, isSignedIn, isSecondaryAuthComplete]);

    const updateRole = async (playerId: string, role: Player['role']) => {
        try {
            await axios.patch("/api/admin/players", { playerId, role });
            void fetchPlayers();
        } catch (err) {
            console.error(err);
        }
    };

    const handlePlayerAction = async (playerId: string, action: string, playerName?: string) => {
        if (action === 'hwid-ban') {
            setBanModal({ isOpen: true, playerId, playerName: playerName || '' });
            setOpenMenuId(null);
            return;
        }

        if (action === 'unban') {
            try {
                await axios.post(`/api/admin/player-actions`, { playerId, action });
                setOpenMenuId(null);
                void fetchPlayers();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const confirmBan = async () => {
        try {
            await axios.post(`/api/admin/player-actions`, {
                playerId: banModal.playerId,
                action: 'hwid-ban',
                reason: banReason || 'No reason provided'
            });
            setBanModal({ isOpen: false, playerId: '', playerName: '' });
            setBanReason("");
            void fetchPlayers();
        } catch (err) {
            console.error(err);
        }
    };

    const userHasAdminRole = ADMIN_ROLES.includes(user?.publicMetadata.role as string || "");

    if (!isLoaded || isVerifying) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-400 text-lg">Verifying session...</p>
            </div>
        </div>
    );

    if (!isSignedIn || !userHasAdminRole) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
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

    const roles: Player['role'][] = ["OWNER","DEVELOPER","ADMIN","STAFF","PARTNER","DONATOR","BETA TESTER","DEFAULT"];

    const totalPlayers = players.length;
    const onlinePlayers = players.filter(p => p.isOnline).length;
    const bannedPlayers = players.filter(p => p.isBanned).length;

    return (
        <div className="p-8 min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-semibold mb-6">Scythe Client | Player Management</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Total Players</p>
                    <p className="text-3xl font-bold text-purple-400">{totalPlayers}</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Online Now</p>
                    <p className="text-3xl font-bold text-green-400">{onlinePlayers}</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <p className="text-gray-400 text-sm mb-1">Banned</p>
                    <p className="text-3xl font-bold text-red-400">{bannedPlayers}</p>
                </div>
            </div>

            <input
                type="text"
                placeholder="Search by IGN or UUID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mr-4 w-full max-w-md mb-6 px-4 h-[36px] rounded-md bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-gray-600"
            />

            <Link href="/admin">
                <button className="w-[248px] h-[32px] rounded-sm mt-8 mb-4 cursor-pointer active:bg-gray-600 transition-all bg-gray-900 text-white shadow-black shadow-md hover:bg-gray-700">
                    Back to Admin Panel
                </button>
            </Link>

            <div className="rounded-md border border-gray-700">
                <table className="w-full table-auto text-left">
                    <thead className="bg-gray-800">
                    <tr>
                        <th className="px-4 py-2 border-b border-gray-700">IGN</th>
                        <th className="px-4 py-2 border-b border-gray-700">UUID</th>
                        <th className="px-4 py-2 border-b border-gray-700">Status</th>
                        <th className="px-4 py-2 border-b border-gray-700">Role</th>
                        <th className="px-4 py-2 border-b border-gray-700">Change Role</th>
                        <th className="px-4 py-2 border-b border-gray-700">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.length ? players.map(p => (
                        <tr key={p._id} className="hover:bg-gray-800">
                            <td className="px-4 py-2 border-b border-gray-700">
                                <div className="flex items-center gap-2">
                                    {p.ign}
                                    {p.isBanned && <span className="text-red-500 text-xs">🚫 BANNED</span>}
                                </div>
                            </td>
                            <td className="px-4 py-2 border-b border-gray-700 text-sm text-gray-400">{p.uuid.slice(0, 8)}...</td>
                            <td className="px-4 py-2 border-b border-gray-700">
                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                                    p.isOnline ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'
                                }`}>
                                    <span className={`w-2 h-2 rounded-full ${p.isOnline ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                                    {p.isOnline ? 'Online' : 'Offline'}
                                </span>
                            </td>
                            <td className="px-4 py-2 border-b border-gray-700">{p.role}</td>
                            <td className="px-4 py-2 border-b border-gray-700">
                                <select
                                    value={p.role}
                                    onChange={(e) => updateRole(p._id, e.target.value as Player['role'])}
                                    className="bg-gray-800 px-2 py-1 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    disabled={p.isBanned}
                                >
                                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </td>
                            <td className="px-4 py-2 border-b border-gray-700 relative">
                                <div className="relative">
                                    <button
                                        onClick={() => {
                                            setOpenMenuId(openMenuId === p._id ? null : p._id);
                                        }}
                                        className="p-2 hover:bg-gray-700 rounded-md transition-colors"
                                        title="Player Actions"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    {openMenuId === p._id && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setOpenMenuId(null)}
                                            />
                                            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-20">
                                                <div className="py-1">
                                                    {!p.isBanned ? (
                                                        <button
                                                            onClick={() => handlePlayerAction(p._id, 'hwid-ban', p.ign)}
                                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-red-400"
                                                        >
                                                            🔒 HWID Ban
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handlePlayerAction(p._id, 'unban', p.ign)}
                                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 text-green-400"
                                                        >
                                                            ✅ Unban Player
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={6} className="px-4 py-6 text-center text-gray-500">No players found</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Ban Confirmation Modal */}
            {banModal.isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700">
                        <h2 className="text-2xl font-bold text-red-500 mb-4">HWID Ban Player</h2>
                        <p className="text-gray-300 mb-4">
                            Are you sure you want to HWID ban <span className="font-semibold text-white">{banModal.playerName}</span>?
                            This will prevent them from accessing the client on this hardware.
                        </p>
                        <textarea
                            placeholder="Ban reason (optional)..."
                            value={banReason}
                            onChange={(e) => setBanReason(e.target.value)}
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-600 mb-4"
                            rows={3}
                        />
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => {
                                    setBanModal({ isOpen: false, playerId: '', playerName: '' });
                                    setBanReason("");
                                }}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmBan}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                            >
                                Ban Player
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}