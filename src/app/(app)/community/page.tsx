"use client";

import { MessageSquare, Heart, Share2, MoreVertical, ShieldCheck, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const MOCK_POSTS = [
  {
    id: 1,
    author: "Ramesh Kumar",
    avatar: "R",
    location: "Nashik, MH",
    time: "2 hours ago",
    content: "Brown spots appearing on my tomato leaves. Any idea what this could be? I applied neem oil last week but it seems to be spreading.",
    image: null,
    likes: 24,
    comments: 5,
    isLiked: false,
    topComment: {
      author: "Dr. Sharma",
      avatar: "S",
      isExpert: true,
      content: "This looks like Early Blight. Make sure to remove the lower affected leaves and avoid overhead watering to keep the foliage dry."
    }
  },
  {
    id: 2,
    author: "Suresh Patil",
    avatar: "S",
    location: "Pune, MH",
    time: "5 hours ago",
    content: "Just harvested my first batch of organic wheat! The yield is looking great this season thanks to the new irrigation schedule.",
    image: null,
    likes: 112,
    comments: 18,
    isLiked: true,
    topComment: null
  },
  {
    id: 3,
    author: "Amit Singh",
    avatar: "A",
    location: "Satara, MH",
    time: "1 day ago",
    content: "Is anyone else facing issues with whiteflies this week? What are some organic remedies?",
    image: null,
    likes: 45,
    comments: 12,
    isLiked: false,
    topComment: {
      author: "KisanEdge AI",
      avatar: "K",
      isExpert: true,
      content: "Whiteflies can be managed organically by using yellow sticky traps and spraying a mixture of neem oil and mild liquid soap."
    }
  }
];

export default function CommunityPage() {
  const [posts, setPosts] = useState(MOCK_POSTS);

  const toggleLike = (id: number) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  return (
    <div className="flex flex-col h-full bg-[#f8faf9] relative pb-24 overflow-y-auto">
      {/* Header */}
      <div className="pt-safe px-4 pb-3 bg-white sticky top-0 z-20 border-b border-gray-100 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between h-12">
          <h1 className="text-[22px] font-bold text-[#0e3b1c] tracking-tight ml-2">Community</h1>
          <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:text-[#16a34a] hover:bg-[#16a34a]/10 transition-colors">
            <Search className="w-5 h-5" />
          </button>
        </div>
        
        {/* Post Input Mock */}
        <div className="flex gap-3 px-2 pb-1">
          <div className="w-10 h-10 bg-[#DCFCE7] rounded-full flex items-center justify-center shrink-0 border-2 border-white shadow-sm">
            <span className="text-[#14532D] font-bold">K</span>
          </div>
          <div className="flex-1 bg-gray-100 rounded-full flex items-center px-4 text-gray-500 text-[14px]">
            Share an update or ask a question...
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-3">
        {posts.map((post, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.1 }}
            key={post.id} 
            className="bg-white border-y sm:border sm:rounded-2xl border-gray-200 sm:mx-3 p-4 shadow-sm"
          >
            {/* Author */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold shrink-0">
                  {post.avatar}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-[#0e3b1c] text-[15px] leading-tight">{post.author}</span>
                  <div className="flex items-center gap-1.5 text-gray-500 text-[12px] mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>{post.location}</span>
                    <span>•</span>
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <p className="text-[15px] text-gray-800 leading-relaxed mb-3">
              {post.content}
            </p>

            {/* Interaction Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex gap-2">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${post.isLiked ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                  <span className="text-[13px] font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-500 hover:bg-gray-50 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-[13px] font-medium">{post.comments}</span>
                </button>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-gray-500 hover:bg-gray-50 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Top Comment */}
            {post.topComment && (
              <div className="mt-3 bg-gray-50 rounded-xl p-3 flex gap-2.5 border border-gray-100">
                <div className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold shrink-0 text-[11px] shadow-sm">
                  {post.topComment.avatar}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="font-bold text-[#0e3b1c] text-[13px]">{post.topComment.author}</span>
                    {post.topComment.isExpert && (
                      <ShieldCheck className="w-3.5 h-3.5 text-[#16a34a]" />
                    )}
                  </div>
                  <p className="text-[13px] text-gray-700 leading-snug">{post.topComment.content}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
