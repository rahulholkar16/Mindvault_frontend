import { memo, useRef, useState, useCallback } from "react";
import { profilePicture } from "../../data";
import NoProfile from "../../images/noProfile.png";
import { ArrowLeft, Plus } from "lucide-react";
import Button from "../Button";
import { useNavigate } from "react-router";
import { useAuth } from "../../store/auth/useAuth";
import { useSingupStore } from "../../store/singupData/useSingupData";
import ErrorOverlay from "../ErrorCard/ErrorOverlay/ErrorOverlay";

const ProfileSelector = () => {
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(NoProfile);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const { setData, resetData } = useSingupStore();
    const { name, email, password, isPublic } = useSingupStore();

    // ✅ NEW: match optimized useAuth store
    const register = useAuth((s) => s.register);
    const isLoading = useAuth((s) => s.isLoading);

    const handleButtonClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleImageChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (!file) return;

            const url = URL.createObjectURL(file);
            setImageUrl(url);
            setImage(file);
        },
        [],
    );

    const submitData = useCallback(async () => {
        useAuth.setState({ error: null });

        setData({ avatar: image });

        const formData = new FormData();
        if (image) {
            formData.append("avatar", image);
        }

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("isPublic", String(isPublic));

        const success = await register(formData);

        if (success) {
            resetData();
            setImage(null);
            navigate("/login");
        }
    }, [
        image,
        name,
        email,
        password,
        isPublic,
        register,
        resetData,
        navigate,
        setData, 
    ]);


    const urlToFile = useCallback(async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const fileName = url.split("/").pop() || "avatar.png";
        return new File([blob], fileName, { type: blob.type });
    }, []);

    return (
        <div className="relative min-h-screen">
            <ErrorOverlay />

            {isLoading && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6 flex gap-3">
                    <p className="text-blue-300 text-sm">Creating account...</p>
                </div>
            )}

            <div className="min-h-screen mx-auto flex flex-col items-center justify-center w-fit">
                {/* Back button */}
                <div className="flex w-full">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </button>
                </div>

                <div className="w-160 h-100 shadow-lg flex bg-slate-600/50 rounded-xl backdrop-blur">
                    <div className="flex flex-col gap-6 p-4 min-w-90 justify-center items-center">
                        <h1 className="text-2xl font-bold">
                            Set Profile Picture
                        </h1>

                        <div className="rounded-full h-24 w-24 border-2 object-cover bg-slate-600 border-gray-300 p-1">
                            <img
                                src={imageUrl}
                                alt="Selected avatar"
                                className="rounded-full h-full w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>

                        <div className="px-4 py-3 rounded-lg shadow-lg overflow-hidden bg-gray-600 active:bg-gray-500 active:scale-80 transition-all duration-300">
                            <input
                                className="hidden"
                                type="file"
                                ref={fileInputRef}
                                accept="image/*"
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
                            text={isLoading ? "Saving..." : "Done"}
                            size="small"
                            color="success"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="h-full border-r border-gray-400 w-0"></div>

                    <div className="flex flex-col p-4">
                        <h1 className="text-2xl font-bold">Default Avatar</h1>

                        <div className="flex flex-wrap gap-8 mt-6 overflow-auto no-scrollbar items-center justify-center">
                            {profilePicture.map((pic) => (
                                <div
                                    key={pic.id}
                                    onClick={async () => {
                                        const file = await urlToFile(pic.dp);
                                        setImage(file);
                                        setImageUrl(pic.dp);
                                    }}
                                    className="rounded-full h-24 w-24 border-2 object-cover bg-slate-600 border-gray-300 p-1 active:scale-90 transition-transform duration-300 cursor-pointer"
                                >
                                    <img
                                        src={pic.dp}
                                        alt="Default avatar option"
                                        className="rounded-full h-full w-full object-cover"
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
