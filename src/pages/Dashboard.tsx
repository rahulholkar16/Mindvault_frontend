import Sidebar from "../components/Sidebar";
// import NoteEditor from "../components/NoteEditor";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Plus, Share } from "lucide-react";
import Card from "../components/Card";
import { useContent } from '../store/content/useContent.ts';
import NoteEditor from "../components/NoteEditor.tsx";

const Dashboard = () => {
    const { content, loading } = useContent();
    const [addForm, setAddForm] = useState(false);
    const getContent = useContent(state => state.getContent);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    useEffect(() => {
        getContent();
        if (!window.twttr) {
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);   

    return (
        <div className="flex h-screen bg-gray-900 w-full overflow-hidden">
            <Sidebar
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                // onCreateNote={createNote}
            />

            <div className="text-white p-6 py-5 w-full overflow-y-auto">
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
                            onClick={() => setAddForm(true)}
                        >
                            <Plus size={20} />
                        </Button>
                    </div>
                </div>

                {addForm ? (
                    <NoteEditor
                        setAddForm={setAddForm}
                        isSidebarOpen={isSidebarOpen}
                    />
                ) : loading ? (
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
                    <div
                        className="grid gap-8 mt-12 
                grid-cols-[repeat(auto-fill,minmax(280px,1fr))] 
                justify-start"
                    >
                        {content?.length &&
                            content.map((data, index) => (
                                <Card
                                    key={index}
                                    title={data.title}
                                    type={data?.type}
                                    description={data.description}
                                    url={data?.url}
                                    date={data?.createdAt}
                                />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
