import { useEffect } from "react";
import NoProfile from "../../images/noProfile.png";
import { useFeature } from "../../store/feature/useFeature";
import Button from "../Button";
import ContentOverlay from "../ContentOverlay/ContentOverlay";
import { useParams } from "react-router";

const ShareProfileCom = () => {
    const { token } = useParams<{ token: string }>();
    const getShare = useFeature(s => s.getShare);
    const content = useFeature(s => s.brainContent);
    const user = useFeature(s => s.brainUser);

    useEffect(() => {
        if (token) getShare(token);
    }, [getShare, token]);

    return (
        <div className="mt-6 flex flex-col items-center">
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-20 h-full mb-15">
                    <div className="rounded-full h-24 w-24 border-2 object-cover bg-slate-600 border-gray-300 p-1">
                        <img
                            src={user?.avatar || NoProfile}
                            className="rounded-full h-full w-full"
                            fetchPriority="high"
                        />
                    </div>

                    <div className="flex flex-col items-start gap-5">
                        <div className="flex gap-5">
                            <p className="text-2xl">{user?.name}</p>
                            <div className="flex gap-2">
                                <Button
                                    text="Follow"
                                    color="primary"
                                    disabled={false}
                                    size="small"
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
                <div className="border border-gray-500 w-full"></div>
                <ContentOverlay content={content} />
            </div>
        </div>
    );
};

export default ShareProfileCom;
