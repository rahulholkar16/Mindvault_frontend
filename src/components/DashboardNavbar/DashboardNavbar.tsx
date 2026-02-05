import { Share, Plus } from "lucide-react";
import { useCallback } from "react";
import Button from "../Button";
import { useFeature } from "../../store/feature/useFeature";

const DashboardNavbar = ({ setAddForm }: { setAddForm: () => void }) => {
    const onShare = useFeature((s) => s.onShare);
    const onBrainShare = useCallback(async () => {
        const link = await onShare();
        console.log(link);
    }, [onShare]);

    return (
        <div className="min-h-10 mb-4 max-h-12 flex justify-between items-center">
            <h2 className="text-3xl font-bold">All Notes</h2>

            <div className="flex gap-6 items-center">
                <Button
                    text="Share Brain"
                    color="secondary"
                    size="large"
                    onClick={onBrainShare}
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
        </div>
    );
};

export default DashboardNavbar;
