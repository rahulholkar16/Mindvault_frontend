import { useEffect, useRef } from "react";
import { normalizeTweetUrl } from "../utils/normalizeTweetUrl.js";
import InvalidTweet from "./InvalidTweet";

export function TweetEmbed({ url }: { url: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const data = normalizeTweetUrl(url);

    useEffect(() => {
        if (!data || !window.twttr || !ref.current) return;

        ref.current.innerHTML = "";

        window.twttr.widgets
            .createTweet(data.tweetId, ref.current, {
                theme: "dark",
                conversation: "none",
                align: "center",
            })
    }, [data?.tweetId, data]);

    if (!data) return <InvalidTweet />;

    return (
        <div className="relative my-4 rounded-lg overflow-hidden">

            <div
                ref={ref}
                className={`max-h-[240px] overflow-y-auto no-scrollbar`}
            />
        </div>
    );
}
