import { memo, useRef, useState } from "react";
import { profilePicture } from "../../data";
import NoProfile from "../../images/noProfile.png";
import { ArrowLeft, CheckCircle, Plus } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router";
import { useAuth } from "../../store/auth/useAuth";
import { useSingupStore } from "../../store/singupData/useSingupData";
import ErrorOverlay from "../ErrorOverlay/ErrorOverlay";

const ProfileSelector = () => {
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(NoProfile);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const nevigate = useNavigate();
    const { setData, resetData } = useSingupStore();
    const { name, email, password } = useSingupStore();
    const register = useAuth((s) => s.register);
    const status = useAuth((s) => s.status);

    const handleButtonClick = () => {
        fileInputRef?.current?.click();
    };

    const handleImageChange = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        setImage(file);
    };

    const submitData = async () => {
        useAuth.setState({
            error: null,
        });
        setData({ avatar: image });
        const formData = new FormData();
        if (image) {
            formData.append("avatar", image);
        }
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        const success = await register(formData);
        if (success) {
            resetData();
            setImage(null);
            nevigate("/login");
        }
    };

    const urlToFile = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const fileName = url.split("/").pop() || "avatar.png";
        return new File([blob], fileName, { type: blob.type });
    };


    if (status === "idle") {
        return (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6 flex gap-3">
                <CheckCircle
                    size={20}
                    className="text-green-400 shrink-0 mt-0.5"
                />
                <p className="text-green-300 text-sm">
                    Account created! Redirecting to sign in...
                </p>
            </div>
        );
    }

    return (
        <div className="relative w-full min-h-screen max-w-screen overflow-hidden">
            {/* Error */}
            <ErrorOverlay />

            <div className="min-h-screen mx-auto flex flex-col items-center justify-center w-fit">
                {/* Back button */}
                <div className="flex w-full">
                    <button
                        onClick={() => nevigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>
                </div>

                <div className="w-160 h-100 shadow-lg flex bg-slate-600/50 rounded-xl backdrop-blur">
                    <div className="flex flex-col gap-6 p-4 min-w-90 justify-center items-center">
                        <h1 className="text-2xl font-bold">
                            Set Profile Pictue
                        </h1>
                        <div className="rounded-full h-24 w-24 border-2 object-cover bg-slate-600 border-gray-300 p-1">
                            <img
                                src={imageUrl}
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
                            onClick={submitData}
                            text="Done"
                            size="small"
                            color="success"
                            disabled={false}
                        />
                    </div>

                    <div className="h-full border-r border-gray-400 w-0"></div>

                    <div className="flex flex-col p-4">
                        <h1 className="text-2xl font-bold">Defult Avatar</h1>
                        <div className="flex flex-wrap gap-8 mt-6 overflow-auto no-scrollbar items-center justify-center">
                            {profilePicture.map((pic) => (
                                <div
                                    key={pic.id}
                                    onClick={async () => {
                                        const file = await urlToFile(pic.dp);
                                        setImage(file);
                                        setImageUrl(pic.dp);
                                    }}
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
            </div>
        </div>
    );
};

export default memo(ProfileSelector);
