import Sidebar from "../components/Sidebar";
// import NoteEditor from "../components/NoteEditor";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Plus, Share } from "lucide-react";
import Card from "../components/Card";
import { useContent } from '../store/content/useContent.ts';

const Dashboard = () => {
    const { content, loading } = useContent();
    const getContent = useContent(state => state.getContent);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    useEffect(() => {
        getContent();
    }, []);

    return (
        <div className="flex h-screen bg-gray-900 w-full">
            <Sidebar
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                // onCreateNote={createNote}
            />

            <div className="text-white m-6 py-5 w-full">
                <div className="min-h-10 mb-4 max-h-12 flex justify-between items-center">
                    <h2 className="text-3xl font-bold">All Notes</h2>
                    <div className="flex gap-6 items-center">
                        <Button
                            text="Share Brain"
                            color="secondary"
                            size="large"
                            disabled={false}
                        >
                            <Share size={20} />
                        </Button>
                        <Button
                            text="Add Content"
                            color="primary"
                            size="large"
                            disabled={false}
                        >
                            <Plus size={20} />
                        </Button>
                    </div>
                </div>
                {loading ? (
                    <div className="flex items-center space-x-2">
                        <div className="animate-pulse rounded-full bg-gray-500 h-12 w-12" />
                        <div className="space-y-2">
                            <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[200px]">
                                {" "}
                            </div>
                            <div className="animate-pulse rounded-md bg-gray-500 h-4 w-[170px]">
                                {" "}
                            </div>
                        </div>
                    </div>
                ) : (
                    <Card />
                )}
            </div>
        </div>
    );
};

export default Dashboard;
