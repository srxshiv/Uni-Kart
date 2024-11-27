import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { base_url } from "../App";

function Verification() {
    const navigate = useNavigate();
    const [otp, setOtp] = React.useState('');
    const email = localStorage.getItem('verification-email');
    const fname = localStorage.getItem('fname');
    const [loading, setLoading] = React.useState(false);

    const handleChange = (event) => {
        setOtp(event.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        const body = {
            verificationCode: otp,
            email,
            fname
        };
        try {
            const response = await axios.post(`${base_url}/user/verification`, body);
            if (response.status === 200) {
                localStorage.setItem('unikart-auth', `${response.data.token}`);
                localStorage.removeItem('verification-email');
                localStorage.removeItem('fname');
                navigate('/home');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error(error);
            alert('Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-3xl font-bold text-zinc-900 text-center mb-8">
                        Verify Your Email
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                                Enter Verification Code
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
                                placeholder="Enter OTP"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium disabled:bg-indigo-300"
                        >
                            {loading ? "Verifying..." : "Verify Email"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verification;