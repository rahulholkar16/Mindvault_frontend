import { Share, Plus } from "lucide-react";
import { useAuth } from "../../store/auth/useAuth";
import Button from "../Button";

const DashboardNavbar = ({ setAddForm }: { setAddForm: () => void}) => {
    const ShareBrain = useAuth((s) => s.onShare);
    const link = useAuth((s) => s.shareLink);
    const onBrainShare = async () => {
        await ShareBrain();
        console.log(link);
    };
    return (
        <div className="min-h-10 mb-4 max-h-12 flex justify-between items-center">
            <h2 className="text-3xl font-bold">All Notes</h2>
            <div className="flex gap-6 items-center">
                <Button
                    text={"Share Brain"}
                    color="secondary"
                    size="large"
                    disabled={false}
                    onClick={onBrainShare}
                >
                    <Share size={20} />
                </Button>
                <Button
                    text="Add Content"
                    color="primary"
                    size="large"
                    disabled={false}
                    onClick={() => setAddForm()}
                >
                    <Plus size={20} />
                </Button>
            </div>
        </div>
    );
};

export default DashboardNavbar;