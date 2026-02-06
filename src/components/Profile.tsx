import { profileBar } from "../data";
import Button from "./Button";
import { useContent } from "../store/content/useContent";
import { useAuth } from "../store/auth/useAuth";
import NoProfile from "../images/noProfile.png";
import ContentOverlay from "./ContentOverlay/ContentOverlay";
import { useCallback } from "react";
import { useNavigate } from "react-router";

const Profile = () => {
    const active = useContent((s) => s.activeProfileTab);
    const setActive = useContent((s) => s.setActiveProfileTab);
    const fetchAll = useContent((s) => s.fetchMyContent);
    const fetchByType = useContent((s) => s.fetchMySpecificContent);
    const myContent = useContent((s) => s.myContent);
    const deleteCon = useContent((s) => s.delete);
    const avatar = useAuth((s) => s.user?.avatar);
    const name = useAuth((s) => s.user?.name);
    const nevigate = useNavigate();

    const onHandel = useCallback(
        async (type: string) => {
            setActive(type);
            if (type === "All") fetchAll();
            else fetchByType(type);
        },
        [fetchAll, fetchByType, setActive],
    );

    return (
        <div className="mt-6 flex flex-col items-center">
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-20 h-full mb-15">
                    <div className="rounded-full h-24 w-24 border-2 object-cover bg-slate-600 border-gray-300 p-1">
                        <img
                            src={avatar || NoProfile}
                            className="rounded-full h-full w-full"
                            fetchPriority="high"
                        />
                    </div>

                    <div className="flex flex-col items-start gap-5">
                        <div className="flex gap-5">
                            <p className="text-2xl">
                                {name}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    text="Edit Profile"
                                    color="secondary"
                                    disabled={false}
                                    size="small"
                                    onClick={() => nevigate("/edit-profile")}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-10">
                            <div className="flex gap-1">
                                <span className="text-lg">0</span>
                                <p className="text-slate-700 font-medium text-lg">
                                    post
                                </p>
                            </div>

                            <div className="flex gap-1">
                                <span className="text-lg">255</span>
                                <p className="text-slate-700 font-medium text-lg">
                                    follower
                                </p>
                            </div>

                            <div className="flex gap-1">
                                <span className="text-lg">120</span>
                                <p className="text-slate-700 font-medium text-lg">
                                    following
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* profile bar */}
                <div className="flex items-center justify-between mt-10 border-b border-gray-600">
                    {profileBar.map((item) => (
                        <div key={item.type} className="mx-5 cursor-pointer">
                            <button
                                onClick={() => onHandel(item?.type)}
                                className={`
                                    p-2 rounded
                                    ${
                                        active === item.type
                                            ? "bg-gray-600 border border-white"
                                            : ""
                                    }
                                `}
                            >
                                {item.icon}
                            </button>
                        </div>
                    ))}
                </div>
                <ContentOverlay content={myContent} onDelete={deleteCon} />
            </div>
        </div>
    );
};

export default Profile;
