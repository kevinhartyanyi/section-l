'use client';

import { CityGem } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface GemCardProps {
    gem: CityGem;
}

export default function GemCard({ gem }: GemCardProps) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/gems/${gem.slug}`)}
            className="border border-gray-300 hover:border-gray-500 transition-colors cursor-pointer overflow-hidden"
        >
            {/* Cover Image */}
            {gem.coverImage && (
                <div className="relative w-full h-64 bg-gray-100">
                    <Image
                        src={gem.coverImage.formats?.large?.url || gem.coverImage.url}
                        alt={gem.coverImage.alternativeText || gem.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            )}

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-light text-gray-800 mb-2">
                    {gem.name}
                </h3>

                <p className="text-gray-600 mb-3">
                    {gem.shortDescription}
                </p>

                {gem.longDescription && (
                    <p className="text-sm text-gray-500 mb-4">
                        {gem.longDescription}
                    </p>
                )}

                {/* Tags */}
                {gem.tags && gem.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {gem.tags.map(tag => (
                            <span
                                key={tag.id}
                                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                )}

                {/* Tip */}
                {gem.tip && (
                    <div className="bg-gray-50 border-l-2 border-gray-300 p-3 mb-3">
                        <p className="text-sm text-gray-700">
                            💡 <span className="font-medium">Tip:</span> {gem.tip}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 text-sm">
                    {gem.googleMapsUrl && (
                        <a
                            href={gem.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                        >
                            📍 View on Maps →
                        </a>
                    )}
                    <span className="text-gray-400">
                        View details →
                    </span>
                </div>
            </div>
        </div>
    );
}