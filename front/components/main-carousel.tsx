"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const images = [
    "/main/main1.png",
    "/main/main2.png",
    "/main/main3.png",
    "/main/main4.png",
];

export function MainCarousel() {
    const [api, setApi] = useState<any>(null);

    // 페이지 로딩 시마다 랜덤한 이미지로 시작
    useEffect(() => {
        if (api) {
            const randomIndex = Math.floor(Math.random() * images.length);
            api.scrollTo(randomIndex);
        }
    }, [api]);

    // 자동 슬라이드 기능
    useEffect(() => {
        if (!api) return;

        const interval = setInterval(() => {
            api.scrollNext();
        }, 3000);

        return () => clearInterval(interval);
    }, [api]);

    return (
        <div className="w-[200px] h-[200px]">
            <Carousel
                setApi={setApi}
                className="w-full h-full"
                opts={{
                    loop: true,
                    align: "center",
                }}
            >
                <CarouselContent className="h-full">
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="h-full">
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <Image
                                    src={image}
                                    alt={`메인 이미지 ${index + 1}`}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover rounded-full"
                                    priority={index === 0}
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>


            </Carousel>
        </div>
    );
}
