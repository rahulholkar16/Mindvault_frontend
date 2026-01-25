import {Zap, Shield, Share2, Bird, Youtube, BookText, Link, Hash } from 'lucide-react'

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

export const Sidebar = [
    {
        title: "Tweets",
        icon: <Bird size={24} />,
    },
    {
        title: "Videos",
        icon: <Youtube size={24} />,
    },
    {
        title: "Documents",
        icon: <BookText size={24} />,
    },
    {
        title: "Links",
        icon: <Link size={24} />,
    },
    {
        title: "Tags",
        icon: <Hash size={24} />,
    },
];