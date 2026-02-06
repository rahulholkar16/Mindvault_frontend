import { useState } from "react";
import { Link2 } from "lucide-react";
import type {  NoteType } from "../types/index";
import Button from "./Button";
import { useContent } from "../store/content/useContent";
import { useNavigate } from "react-router";

const NoteEditor = () => {
    const [type, setType] = useState<NoteType>("document");
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    const nevigate = useNavigate();
    // const [tags, setTags] = useState<Array<string>>([]);
    const createContent = useContent((state) => state.create);
    // const [newTag, setNewTag] = useState("");
    // const [localError, setLocalError] = useState<string | null>(null);

    const handleTypeChange = (newType: NoteType) => {
        setType(newType);
    };

    async function handleUpload() {
        if (!title || !description || !type) {
            alert("Please fill in all fields");
            return;
        }

        if (type === "tweet" || type === "video" || type === "url") {
            if (!url) {
                alert("Please fill in all fields");
                return;
            }
        }

        const success = await createContent(title, url, description, type, isPublic);

        if (success) {
            setTitle("");
            setDescription("");
            setUrl("");
            nevigate("/dashboard/profile")
        }
    }

    // function addTag () {
    //     if (!newTag) {
    //         setLocalError("Please fill in all fields");
    //         return;
    //     }
    //     newTag.trim();
    //     const updatedTags = [...tags, newTag.trim()];
    //     setTags(updatedTags);
    //     setNewTag("");
    // }

    // function removeTag (tag: string) {
    //     setTags(prevTag => prevTag.filter(Tag => Tag !== tag));
    // }

    return (
        <div
            className={`flex-1 flex flex-col overflow-y-auto ml-0`}
        >
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-8">
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 mb-6">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Note Title"
                            className="w-full text-4xl h-full font-bold text-white placeholder-slate-500 focus:outline-none mb-4 bg-transparent"
                        />
                        {/* Tag UI */}
                        {/* <div className="mb-6">
                            <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                                <Tag size={16} />
                                Tags
                            </label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {tags.map((tag, index) => (
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
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyUp={(e) =>
                                        e.key === "Enter" && addTag()
                                    }
                                    placeholder="Add a tag..."
                                    className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-slate-400"
                                />
                                <button
                                    onClick={addTag}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors text-sm font-medium"
                                >
                                    Add
                                </button>
                            </div>
                        </div> */}
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
                            type === "url") && (
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
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    // onBlur={handleUpdate}
                                    placeholder={`Paste ${type} URL here...`}
                                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-white placeholder-slate-400"
                                />
                            </div>
                        )}
                    </div>

                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8">
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Start writing your thoughts..."
                            className="w-full min-h-[300px] text-white placeholder-slate-500 focus:outline-none resize-none leading-relaxed bg-transparent"
                            style={{ fontSize: "16px", lineHeight: "1.75" }}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center gap-4 py-6">
                <Button
                    text="Close"
                    size="large"
                    disabled={false}
                    color="danger"
                    onClick={() => nevigate(-1)}
                />
                <Button
                    text="Upload"
                    size="large"
                    disabled={false}
                    color="success"
                    onClick={handleUpload}
                />
            </div>
        </div>
    );
};

export default NoteEditor;
