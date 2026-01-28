import { Share, Trash } from "lucide-react";
import type { CardProp } from "../types";
import { TweetEmbed } from "./TweetEmbed";

const Card: React.FC<CardProp> = ({
    Icon,
    title = "Testing Purpose",
    url = "https://x.com/aafaq_vaani/status/2015763050176053598?s=20",
}) => {
    

    return (
        <div className="bg-gray-800 text-white rounded-lg shadow-lg outline-gray-200 p-4 max-w-75">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    {Icon}
                    <p className="font-medium text-lg">{title}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Share />
                    <Trash />
                </div>
            </div>

            {/* For Document
          <div className="mt-4">
              <h2 className="font-bold text-2xl m-2">Document Project</h2>
              <p className="m-2 text-">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Cumque blanditiis neque quas debitis reprehenderit optio ipsam
                  ratione mollitia laborum dignissimos!
              </p>
          </div> */}

            {/* For Videos */}
            {/* <div className="my-4 rounded-lg">
                <iframe
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="rounded-lg w-full"
                    loading="lazy"
                    src="https://www.youtube.com/embed/y7S2oSjJ8PA?si=XvFwHJ90iastRZQB"
                    allowFullScreen
                />
                <p className="mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Labore, mollitia.
                </p>
            </div> */}

            {/* For tweet */}
            <TweetEmbed url={url} />

            {/* tags */}
            <span className="rounded-full mt-4 shadow-lg bg-slate-400 px-2 py-1 font-semibold text-center text-blue-600 text-sm">
                #Product
            </span>

            {/* time */}
            <div className="mt-6 px-2 font-semibold text-gray-400 text-sm">
                Added on 26-01-2026
            </div>
        </div>
    );
};

export default Card;
