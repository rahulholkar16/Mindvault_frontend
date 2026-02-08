import { useEffect } from "react";
import NoProfile from "../../images/noProfile.png";
import { useFeature } from "../../store/feature/useFeature";
import Button from "../Button";
import ContentOverlay from "../ContentOverlay/ContentOverlay";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../store/auth/useAuth";

const ShareProfileCom = () => {
    const { token } = useParams<{ token: string }>();
    const getShare = useFeature((s) => s.getShare);
    const content = useFeature((s) => s.brainContent);
    const user = useFeature((s) => s.brainUser);
    const followUser = useFeature((s) => s.followUser);
    const unfollowUser = useFeature((s) => s.unfollowUser);
    const navigate = useNavigate();

    const currentUser = useAuth((s) => s.user);

    useEffect(() => {
        if (token) getShare(token);
    }, [getShare, token]);

    if (user?._id === currentUser?._id) {
        navigate("/dashboard/profile");
        return null;
    }

    const isAlreadyFollowing = currentUser?.followingUsers?.some(
        (id) => id.toString() === user?._id,
    );

    const onFollow = () => {
        if (!user) return;

        if (isAlreadyFollowing) {
            unfollowUser?.(user._id);
        } else {
            followUser(user._id);
        }
    };

    return (
        <div className="mt-6 flex flex-col items-center">
            <div className="flex flex-col gap-5 w-full max-w-4xl">
                <div className="flex items-center gap-20 h-full mb-15">
                    <div className="rounded-full h-24 w-24 border-2 object-cover bg-slate-600 border-gray-300 p-1">
                        <img
                            src={user?.avatar || NoProfile}
                            className="rounded-full h-full w-full"
                            fetchPriority="high"
                        />
                    </div>

                    <div className="flex flex-col items-start gap-5">
                        <div className="flex gap-5 items-center">
                            <p className="text-2xl font-semibold">
                                {user?.name}
                            </p>
                            <Button
                                text={
                                    isAlreadyFollowing ? "Unfollow" : "Follow"
                                }
                                color={
                                    isAlreadyFollowing ? "secondary" : "primary"
                                }
                                disabled={false}
                                size="small"
                                onClick={onFollow}
                            />
                        </div>

                        <div className="flex items-center gap-10">
                            <div className="flex gap-1">
                                <span className="text-lg">
                                    {content?.length || 0}
                                </span>
                                <p className="text-slate-700 font-medium text-lg">
                                    post
                                </p>
                            </div>

                            <div className="flex gap-1">
                                <span className="text-lg">
                                    {user?.follower || 0}
                                </span>
                                <p className="text-slate-700 font-medium text-lg">
                                    follower
                                </p>
                            </div>

                            <div className="flex gap-1">
                                <span className="text-lg">
                                    {user?.following || 0}
                                </span>
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
