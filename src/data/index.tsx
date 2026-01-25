import {Zap, Shield, Share2} from 'lucide-react'

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