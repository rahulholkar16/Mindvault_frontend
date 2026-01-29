import {Zap, Shield, Share2, Bird, Youtube, BookText, Link, Hash, GalleryHorizontalEnd } from 'lucide-react'

export const features = [
    {
        title: "Quick Capture",
        description: "Jot down ideas instantly. No friction, just pure thought capture.",
        icon: <Zap size={ 32} className = "text-blue-400 mb-4" />
    },
    {
        title: "Always Private",
        description: "Your thoughts are yours alone. End-to-end encrypted and secure.",
        icon: <Shield size={ 32 } className = "text-purple-400 mb-4" />
    },
    {
        title: "Stay Connected",
        description: "Sync across all your devices, anytime, anywhere.",
        icon: <Share2 size={ 32 } className = "text-cyan-400 mb-4" />
    }
];

export const sidebar = [
    {
        title: "All Post",
        icon: <GalleryHorizontalEnd />,
        type: "all"
    },
    {
        title: "Tweets",
        icon: <Bird size={20} />,
        type: "tweet",
    },
    {
        title: "Videos",
        icon: <Youtube size={20} />,
        type: "video",
    },
    {
        title: "Documents",
        icon: <BookText size={20} />,
        type: "document",
    },
    {
        title: "Links",
        icon: <Link size={20} />,
        type: "url",
    },
    {
        title: "Tags",
        icon: <Hash size={20} />,
        type: "tag",
    },
];