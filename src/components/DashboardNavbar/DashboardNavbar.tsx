import { Share, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../Button";
import { useFeature } from "../../store/feature/useFeature";

const DashboardNavbar = ({ setAddForm }: { setAddForm: () => void }) => {
    const onShare = useFeature((s) => s.onShare);
    const [isOpen, setIsOpen] = useState(false);
    const [shareLink, setShareLink] = useState("");

    useEffect(() => {
        async function share() {
            const resLink = await onShare();
            setShareLink(`http://localhost:5173/brain/${resLink}`)
        }
        share();
    }, [onShare]);

    return (
        <div className="min-h-10 mb-4 max-h-12 flex justify-between items-center">
            <h2 className="text-3xl font-bold">All Notes</h2>
            <div className="flex gap-6 items-center">
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
                    onClick={setAddForm}
                    disabled={false}
                >
                    <Plus size={20} />
                </Button>
            </div>

            {/* Share Card */}
            {isOpen && (
                <div className="inset-0 absolute flex items-center justify-center z-20">
                    <div className="w-[50%] bg-slate-600/50 rounded-xl backdrop-blur p-6 relative">
                        <button
                            className="absolute top-4 right-4 text-white/70 hover:text-white transition"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>

                        <h2 className="text-3xl font-bold mb-6">Share Brain</h2>

                        {/* Share Link Box */}
                        <div className="bg-white/10 border border-white/20 rounded-lg p-4">
                            <label className="text-sm text-gray-300 mb-2 block">
                                Shareable link
                            </label>

                            <div className="flex items-center gap-3">
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
                                            "https://yourapp.com/share/abcd1234",
                                        )
                                    }
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardNavbar;
