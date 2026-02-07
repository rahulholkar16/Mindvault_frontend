import { useRef, useState } from "react";
import { useAuth } from "../../store/auth/useAuth";
import { useFeature } from "../../store/feature/useFeature";

const EditPrivacyAndSetting = () => {
    const isPublic = useAuth(s => s.user?.isPublic);
    const [showPopup, setShowPopup] = useState(false);
    const status = useFeature(s => s.status);
    const toggleProfileVisibilty = useFeature(s => s.toggleProfileVisibilty);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const debounceRef = useRef<number | null>(null);
    const isVerified = useAuth(s => s.user?.isVerified);
    const resendEmailVerification = useFeature(s => s.resendEmailVerification);
    const changePassword = useFeature(s => s.changePassword);
    const forgatPasswordEmail = useFeature(s => s.forgotPasswordEmail);

    const handlePasswordChange = () => {
        if (newPassword !== confirmPassword) {
          useFeature.setState({
              error: "Passwords do not match!",
          });
          return;
        }

        changePassword(oldPassword, newPassword);
        if (status === "success") {
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
    };

    const handlePrivacyToggle = () => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            toggleProfileVisibilty();
        }, 500);
    };

    const handleResendVerification = () => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            resendEmailVerification();
        }, 200);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="p-4 text-white max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">
                    Privacy & Settings
                </h2>

                {/* PUBLIC / PRIVATE TOGGLE */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="font-medium">Profile Visibility</p>
                        <p className="text-sm text-gray-400">
                            {isPublic
                                ? "Your profile is public"
                                : "Your profile is private"}
                        </p>
                    </div>

                    {/* TOGGLE SWITCH */}
                    <div
                        onClick={handlePrivacyToggle}
                        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all ${
                            isPublic ? "bg-green-500" : "bg-gray-600"
                        }`}
                    >
                        <div
                            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-all ${
                                isPublic ? "translate-x-6" : "translate-x-0"
                            }`}
                        ></div>
                    </div>
                </div>

                {/* RESEND VERIFICATION EMAIL */}
                {!isVerified && (
                    <div className="mb-6 p-3 border border-gray-700 rounded bg-gray-900">
                        <p className="text-sm text-yellow-400 mb-2">
                            ⚠️ Your email is not verified
                        </p>
                        <button
                            onClick={handleResendVerification}
                            disabled={status === "loading"}
                            className={`text-sm px-3 py-1 rounded ${
                                status === "loading"
                                    ? "bg-gray-600 cursor-not-allowed opacity-70"
                                    : "bg-gray-700 hover:bg-gray-600"
                            }`}
                        >
                            {status === "loading"
                                ? "Sending..."
                                : "Resend verification email"}
                        </button>
                    </div>
                )}

                <hr className="border-gray-700 my-4" />

                {/* CHANGE PASSWORD */}
                <h3 className="font-semibold mb-2">Change Password</h3>

                <div className="flex flex-col gap-3">
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="p-2 rounded bg-gray-800 border border-gray-600 outline-none"
                        placeholder="Old Password"
                    />

                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="p-2 rounded bg-gray-800 border border-gray-600 outline-none"
                        placeholder="New Password"
                    />

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-2 rounded bg-gray-800 border border-gray-600 outline-none"
                        placeholder="Confirm New Password"
                    />

                    <button
                        onClick={handlePasswordChange}
                        disabled={status === "loading"}
                        className={`p-2 rounded ${
                            status === "loading"
                                ? "bg-blue-400 cursor-not-allowed opacity-70"
                                : "bg-blue-600 hover:bg-blue-700"
                        }`}
                    >
                        
                        Update Password
                    </button>
                </div>

                {/* FORGOT PASSWORD */}
                <p className="mt-4 text-sm">
                    Forgot your password?{" "}
                    <span
                        onClick={() => {
                            forgatPasswordEmail();
                            setShowPopup(true);

                            // auto close after 3 seconds
                            setTimeout(() => setShowPopup(false), 3000);
                        }}
                        className="text-blue-400 cursor-pointer hover:underline"
                    >
                        Reset it here
                    </span>
                </p>
            </div>
            {showPopup && (
                <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-slideIn">
                    ✅ Password reset email sent!
                </div>
            )}
        </div>
    );
};

export default EditPrivacyAndSetting;
