import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string
    id: string
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <Avatar name={authorName} size={"big"} />
                <div className="font-extralight pl-2 text-sm flex justify-center flex-col">{authorName}
                </div>
                <div className=" flex justify-center pl-2 font-bold">
                    <span style={{ position: 'relative', top: '13px' }}>
                        &#x0307;
                    </span>
                </div>
                <div className="flex justify-center flex-col pl-2 font-thin text-slate-500 text-xs">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font- pt-2 font-semibold">
                {title}
            </div>
            <div className="text-xl font-thin">
                {content.slice(0, 100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-200">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
                {name[0]}
            </span>
        </div>
    );
}
