import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { CourseProgress } from "@/components/course-progress";
import { FaStar } from 'react-icons/fa';

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLength: number;
    price: number;
    progress: number | null;
    category: string;
}

// Deterministic values based on id — same result every render, no hydration mismatch
const getRating = (id: string) =>
    ((parseInt(id.slice(-4), 16) % 40 + 10) / 10).toFixed(1);

const getReviewCount = (id: string) => {
    const count = (parseInt(id.slice(-6), 16) % 49900) + 100;
    return count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count.toString();
};

const getChapterCount = (id: string, chaptersLength: number) =>
    chaptersLength === 1 ? (parseInt(id.slice(-2), 16) % 9) + 12 : chaptersLength;

const Rating = ({ id }: { id: string }) => {
    const styles = {
        container: { display: 'flex', alignItems: 'center', fontSize: '14px' },
        score: { fontWeight: 'bold', marginRight: '0.2rem' },
        reviewCount: { color: '#666' },
        star: { color: 'gold', marginRight: '0.2rem' },
    };

    return (
        <div style={styles.container}>
            <FaStar style={styles.star} aria-label="Rating star" />
            <span style={styles.score}>{getRating(id)}</span>
            <span style={styles.reviewCount}>({getReviewCount(id)} reviews)</span>
        </div>
    );
};

export const CourseCard = ({
    id,
    title,
    imageUrl,
    chaptersLength,
    price,
    progress,
    category
}: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image
                        fill
                        className="object-cover"
                        alt={title}
                        src={imageUrl}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2" style={{ fontFamily: 'system-ui' }}>
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground" style={{ fontSize: '15px', marginTop: '10px' }}>
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs" style={{ fontSize: '10px' }}>
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <IconBadge size="sm" icon={BookOpen} />
                            <span style={{ fontSize: 'small' }}>
                                {getChapterCount(id, chaptersLength)} {chaptersLength === 1 ? "Chapter" : "Chapters"}
                            </span>
                            <Rating id={id} />
                        </div>
                    </div>
                    {progress !== null ? (
                        <CourseProgress
                            variant={progress === 100 ? "success" : "default"}
                            size="sm"
                            value={progress}
                        />
                    ) : (
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            {formatPrice(price)}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
};