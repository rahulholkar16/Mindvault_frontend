import { Suspense } from "react";
import Card from "../Card";
import CardSkeleton from "../skeleton/CardSkeleton";
import { useContent } from "../../store/content/useContent";

const ContentOverlay = () => {
    const myContent = useContent((s) => s.myContent);
    const deleteCon = useContent((s) => s.delete);
    const fetchMyContent = useContent((s) => s.fetchMyContent);

    // useEffect(() => {
    //     fetchMyContent();
    // }, []);

    async function deleteContent (_id: string) {
        await deleteCon(_id);
        await fetchMyContent();
    }

    if (myContent?.length == 0) {
        return (
            <div className="flex w-full items-center justify-center text-gray-700">No Content</div>
        );
    }
    
    return (
        <div className="flex gap-8 flex-col items-center">
            {myContent?.map((item) => (
                <Suspense key={item._id} fallback={<CardSkeleton />}>
                    <Card
                        title={item.title}
                        type={item.type}
                        description={item.description}
                        url={item.url}
                        date={item.createdAt}
                        onDel={() => deleteContent(item._id)}
                    />
                </Suspense>
            ))}
        </div>
    );
};

export default ContentOverlay;
