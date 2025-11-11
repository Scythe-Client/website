import {useState} from "react";
import axios from "axios";
import {toast} from "sonner";

interface PanelGateLoginProps {
    onLoginSuccess: () => void;
}

export default function PanelGateLogin({ onLoginSuccess }: PanelGateLoginProps) {
    const [gateaId, setGateaId] = useState('');
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCustomLogin = async () => {
        setError(null);
        setIsLoading(true);

        if (!userId.trim()) {
            setError('User ID is required.');
            setIsLoading(false);
            return;
        }

        if (!gateaId && !token.trim()) {
            setError('Token is required when not using GateA.');
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.post('/api/admin/auth/gate', {
                gateAId: gateaId || undefined,
                userId: userId.trim(),
                token: token.trim()
            });

            if (res.status === 200) {
                onLoginSuccess();
            }
        } catch (err: any) {
            const errMsg = err.response?.data?.error || 'Authentication failed';
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <div className="bg-gray-200 w-[400px] h-auto p-6 shadow-gray-400 shadow-lg rounded-sm">
                    <h2 className="font-medium text-3xl pt-2">Panel Gate Login</h2>
                    <p className="text-red-500 mt-2 h-6">{error}</p>

                    <div>
                        <h4 className="text-[15px] pt-4 text-start pl-2">User ID</h4>
                        <input
                            placeholder="user_2j3k4l..."
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="p-2 w-[340px] h-[32px] bg-gray-300 border border-gray-400 hover:bg-gray-300/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                    </div>

                    <div className="mt-4">
                        <h4 className="text-[15px] pt-2 text-start pl-2">GateA ID</h4>
                        <input
                            placeholder="sc_gatea_..."
                            value={gateaId}
                            onChange={(e) => setGateaId(e.target.value)}
                            className="p-2 w-[340px] h-[32px] bg-gray-300 border border-gray-400 hover:bg-gray-300/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                    </div>

                    <div className="flex items-center mt-6 w-full max-w-sm mx-auto">
                        <div className="flex-grow ml-4 border-t border-gray-400"></div>
                        <span className="flex-shrink mx-4 text-gray-600 text-sm font-medium">
                            or
                        </span>
                        <div className="flex-grow mr-4 border-t border-gray-400"></div>
                    </div>

                    <div>
                        <h4 className="text-[15px] pt-4 text-start pl-2">Token</h4>
                        <input
                            placeholder="scapi_..."
                            type="password"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="p-2 w-[340px] h-[32px] bg-gray-300 border border-gray-400 hover:bg-gray-300/50 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                    </div>

                    <button
                        onClick={handleCustomLogin}
                        disabled={isLoading}
                        className={`w-[248px] h-[32px] rounded-sm mt-8 mb-4 cursor-pointer shadow active:bg-gray-500 transition-all ${
                            isLoading
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-gray-800 text-white shadow-black hover:bg-gray-600 hover:shadow-gray-800'
                        }`}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
}