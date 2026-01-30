import { useRef, useState } from "react";
import { profilePicture } from "../../data";
import NoProfile from "../../images/noProfile.png";
import { Plus } from "lucide-react";
import Button from "../Button";

const ProfileSelector = () => {
    const [image, setImage] = useState(NoProfile);
    const fileInputRef = useRef<HTMLInputElement>(null);
console.log(image);

    const handleButtonClick = () => {
        fileInputRef?.current?.click();
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImage(url);
    };
    return (
        <>
            <div className="w-160 h-100 shadow-lg flex bg-slate-600/50 rounded-xl backdrop-blur">
                <div className="flex flex-col gap-6 p-4 min-w-90 justify-center items-center">
                    <h1 className="text-2xl font-bold">Set Profile Pictue</h1>
                    <div className="rounded-full h-24 w-24 border-2 object-cover bg-slate-600 border-gray-300 p-1">
                        <img
                            src={image}
                            className="rounded-full h-full w-full"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <div className="px-4 py-3 rounded-lg shadow-lg overflow-hidden bg-gray-600 active:bg-gray-500 active:scale-80 transition-all duration-300">
                        <input
                            className="outline-none hidden"
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            title="Choose file"
                            onChange={handleImageChange}
                        />
                        <button onClick={handleButtonClick}>
                            <div className="flex items-center gap-2 justify-center">
                                <Plus />
                                Upload Image
                            </div>
                        </button>
                    </div>
                    <Button
                        text="Done"
                        size="small"
                        color="success"
                        disabled={false}
                    />
                </div>

                <div className="h-full border-r border-gray-400 w-0"></div>

                <div className="flex flex-col p-4">
                    <h1 className="text-2xl font-bold">Defult Profile</h1>
                    <div className="flex flex-wrap gap-8 mt-6 overflow-auto no-scrollbar items-center justify-center">
                        {profilePicture.map((pic) => (
                            <div
                                key={pic.id}
                                onClick={() => setImage(pic.dp)}
                                className="rounded-full h-24 w-24 border-2 object-cover bg-slate-600 border-gray-300 p-1 active:scale-90 transition-transform duration-300"
                            >
                                <img
                                    src={pic?.dp}
                                    className="rounded-full h-full w-full"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileSelector;
