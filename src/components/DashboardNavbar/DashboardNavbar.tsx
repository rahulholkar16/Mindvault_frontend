import { Share, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../Button";
import { useFeature } from "../../store/feature/useFeature";
import { useNavigate } from "react-router";

const DashboardNavbar = () => {
    const onShare = useFeature((s) => s.onShare);
    const [isOpen, setIsOpen] = useState(false);
    const [shareLink, setShareLink] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function share() {
            const resLink = await onShare();
            setShareLink(
                `https://mindvault-kappa.vercel.app/dashboard/user/${resLink}`,
            );
        }
        share();
    }, [onShare]);

    return (
        <div className="min-h-10 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-3xl font-bold">All Notes</h2>

            <div className="flex gap-4 items-center">
                <Button
                    text="Share Brain"
                    color="secondary"
                    size="large"
                    onClick={() => setIsOpen(true)}
                    disabled={false}
                >
                    <Share size={20} />
                </Button>

                <Button
                    text="Add Content"
                    color="primary"
                    size="large"
                    onClick={() => navigate("create")}
                    disabled={false}
                >
                    <Plus size={20} />
                </Button>
            </div>

            {/* Share Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20 px-4">
                    <div className="w-full max-w-lg bg-slate-800 rounded-xl backdrop-blur p-6 relative">
                        <button
                            className="absolute top-4 right-4 text-white/70 hover:text-white transition"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                            Share Brain
                        </h2>

                        <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                            <label className="text-sm text-gray-300 mb-2 block">
                                Shareable link
                            </label>

                            <div className="flex flex-col sm:flex-row gap-3">
                                {shareLink === "false" ? (
                                    <p className="text-red-300">
                                        Your Profile is Private.
                                    </p>
                                ) : (
                                    <>
                                        <input
                                            type="text"
                                            readOnly
                                            value={shareLink}
                                            className="flex-1 bg-black/20 border border-white/20 text-white px-3 py-2 rounded-lg outline-none"
                                        />

                                        <button
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                                            onClick={() =>
                                                navigator.clipboard.writeText(
                                                    shareLink,
                                                )
                                            }
                                        >
                                            Copy
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardNavbar;
