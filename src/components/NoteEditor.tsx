import { useState } from "react";
import { Tag, X, Calendar, Clock, Link2 } from "lucide-react";
import type { NotesEditorProp, Note, NoteType } from "../types/index";
import Button from "./Button";

const NoteEditor: React.FC<NotesEditorProp> = ({ isSidebarOpen }) => {
    const [note, setNote] = useState({});
    const [type, setType] = useState<NoteType>("document");
     const [link, setLink] = useState("");

const handleTypeChange = (newType: NoteType) => {
    setType(newType);
    
};

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    if (!note) {
        return (
            <div className="flex-1 flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <Tag size={36} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        No Note Selected
                    </h2>
                    <p className="text-slate-400">
                        Select a note or create a new one to get started
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div
            className={`flex-1 flex flex-col overflow-y-auto ${isSidebarOpen ? "lg:ml-0" : "ml-0"}`}
        >
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-8">
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 mb-6">
                        <input
                            type="text"
                            // value={title}
                            // onChange={(e) => setTitle(e.target.value)}
                            // onBlur={handleUpdate}
                            placeholder="Note Title"
                            className="w-full text-4xl font-bold text-white placeholder-slate-500 focus:outline-none mb-4 bg-transparent"
                        />

                        <div className="flex items-center gap-6 text-sm text-slate-400 mb-6 pb-6 border-b border-slate-700">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>
                                    {/* Created {formatDateTime(note.createdAt)} */}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>
                                    {/* Updated {formatDateTime(note.updatedAt)} */}
                                </span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                <Tag size={16} />
                                Tags
                            </label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {/* {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium"
                                    >
                                        {tag}
                                        <button
                                            onClick={() => removeTag(tag)}
                                            className="hover:bg-blue-500/30 rounded-full p-0.5 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))} */}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    // value={newTag}
                                    // onChange={(e) => setNewTag(e.target.value)}
                                    // onKeyPress={(e) =>
                                    //     e.key === "Enter" && addTag()
                                    // }
                                    placeholder="Add a tag..."
                                    className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-slate-400"
                                />
                                <button
                                    // onClick={addTag}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/50 mb-6 backdrop-blur border border-slate-700 rounded-2xl p-8">
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-white mb-3">
                                Note Type
                            </label>
                            <div className="grid grid-cols-4 gap-3">
                                {(
                                    [
                                        "document",
                                        "tweet",
                                        "video",
                                        "link",
                                    ] as NoteType[]
                                ).map((noteType) => (
                                    <button
                                        key={noteType}
                                        onClick={() =>
                                            handleTypeChange(noteType)
                                        }
                                        className={`px-4 py-2 rounded-lg transition-all text-sm font-medium capitalize ${
                                            type === noteType
                                                ? "bg-blue-500 text-white"
                                                : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                                        }`}
                                    >
                                        {noteType}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {(type === "tweet" ||
                            type === "video" ||
                            type === "link") && (
                            <div className="">
                                <label className="block text-sm font-semibold text-white mb-2">
                                    <Link2 size={14} className="inline mr-2" />
                                    {type === "tweet"
                                        ? "Tweet URL"
                                        : type === "video"
                                          ? "Video URL"
                                          : "Link URL"}
                                </label>
                                <input
                                    type="url"
                                    value={link}
                                    onChange={(e) => setLink(e.target.value)}
                                    // onBlur={handleUpdate}
                                    placeholder={`Paste ${type} URL here...`}
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-slate-400"
                                />
                            </div>
                        )}
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
                        <textarea
                            // value={content}
                            // onChange={(e) => setContent(e.target.value)}
                            // onBlur={handleUpdate}
                            placeholder="Start writing your thoughts..."
                            className="w-full min-h-[300px] text-white placeholder-slate-500 focus:outline-none resize-none leading-relaxed bg-transparent"
                            style={{ fontSize: "16px", lineHeight: "1.75" }}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <Button
                    text="Upload"
                    size="large"
                    disabled={false}
                    color="success"
                />
            </div>
        </div>
    );
};

export default NoteEditor;
