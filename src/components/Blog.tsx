import { useState, useMemo } from "react";
import { 
  BookOpen, Calendar, Clock, User, X, Share2, Heart, ArrowRight,
  Sparkles, Check, Send, AlertCircle
} from "lucide-react";
import { BlogPost } from "../types";

interface BlogProps {
  blogs: BlogPost[];
}

export default function Blog({ blogs }: BlogProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Record<string, { author: string; text: string; date: string }[]>>({
    "post-1": [
      { author: "Zandi L.", text: "This raster vs vector explanation was extremely useful. Finally resolved why my flyers printed blurry last month!", date: "May 26, 2026" }
    ]
  });

  const featuredPost = useMemo(() => {
    return blogs.find(b => b.isFeatured) || blogs[0] || null;
  }, [blogs]);

  const secondaryPosts = useMemo(() => {
    if (!featuredPost) return blogs;
    return blogs.filter(b => b.id !== featuredPost.id);
  }, [blogs, featuredPost]);

  const handleShareClick = (post: BlogPost) => {
    navigator.clipboard.writeText(`${window.location.origin}/blog/${post.id}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleLike = (postId: string) => {
    setLikes(prev => ({
      ...prev,
      [postId]: (prev[postId] || 0) + 1
    }));
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;
    const newComment = {
      author: "You (Guest)",
      text: commentText,
      date: "Today"
    };
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));
    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-ink-navy text-warm-cream transition-colors duration-300 light:bg-surface-light light:text-studio-navy py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Blog Header */}
        <div className="text-center md:text-left space-y-2 max-w-2xl">
          <span className="text-xs font-mono tracking-widest text-accent-gold light:text-studio-navy/60 uppercase">STUDIO PUBLICATIONS</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-white light:text-studio-navy">The Daydreamer and Sons Gazette</h1>
          <p className="text-xs sm:text-sm text-warm-cream/70 light:text-studio-navy/80">
            Insights, technical design tutorials, and creative stories formulated directly by the Daydreamer and Sons staff.
          </p>
        </div>

        {/* 1. HERO FEATURED POST CARD */}
        {featuredPost && (
          <div 
            onClick={() => setSelectedPost(featuredPost)}
            className="group bg-surface-dark/70 light:bg-white border border-white/10 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 cursor-pointer hover:border-accent-gold/40 transition-all shadow-2xl"
          >
            <div className="lg:col-span-7 h-64 sm:h-96 w-full relative">
              <img 
                src={featuredPost.imageUrl} 
                alt={featuredPost.title} 
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 text-[9px] font-mono bg-accent-gold text-studio-navy font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Featured Post
              </span>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono text-accent-gold uppercase tracking-wider block">
                  {featuredPost.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white group-hover:text-accent-gold transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-xs sm:text-sm text-warm-cream/70 leading-relaxed font-sans line-clamp-4">
                  {featuredPost.summary}
                </p>
              </div>

              {/* Author footer capsule */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent-gold text-studio-navy font-bold flex items-center justify-center text-xs font-mono">
                    {featuredPost.authorInitials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none">{featuredPost.author}</h4>
                    <span className="text-[10px] font-mono text-warm-cream/40">{featuredPost.publishDate} &bull; {featuredPost.readTime}</span>
                  </div>
                </div>

                <span className="text-xs font-mono text-accent-gold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Post</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 2. SECONDARY POSTS LISTING GRID */}
        <div className="space-y-6 pt-6 border-t border-white/5">
          <h3 className="font-serif text-xl font-semibold text-white">Lesser Journals & Technical Tips</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {secondaryPosts.map((post) => (
              <div 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group bg-surface-dark/70 light:bg-white border border-white/5 rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer hover:border-accent-gold/40 transition-all hover:shadow-xl"
              >
                <div>
                  <div className="h-48 w-full relative">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-3 left-3 text-[9px] font-mono bg-surface-dark text-accent-gold px-2.5 py-0.5 rounded-full uppercase">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h4 className="font-serif text-md font-bold text-white group-hover:text-accent-gold transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h4>
                    <p className="text-xs text-warm-cream/65 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-white/5 mx-5 mt-4 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent-gold text-studio-navy font-bold flex items-center justify-center text-[10px] font-mono">
                    {post.authorInitials}
                  </div>
                  <div className="text-[10px] font-mono leading-none">
                    <p className="text-white font-sans font-bold leading-normal">{post.author}</p>
                    <span className="text-warm-cream/40">{post.publishDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. POST DETAILED MODAL */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-surface-dark border border-white/10 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto relative text-warm-cream">
              {/* Top Banner Control Menu */}
              <div className="sticky top-0 bg-surface-dark border-b border-white/10 px-6 py-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-2 text-xs font-mono text-accent-gold">
                  <BookOpen className="w-4 h-4 text-accent-gold" />
                  <span>Journal Detail view</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleLike(selectedPost.id)}
                    className="p-2 rounded-full hover:bg-white/5 text-coral-pop flex items-center gap-1.5 text-xs font-mono"
                  >
                    <Heart className="w-4 h-4 text-coral-pop fill-current" />
                    <span>{(likes[selectedPost.id] || 15) + (likes[selectedPost.id] ? 1 : 0)}</span>
                  </button>
                  <button 
                    onClick={() => handleShareClick(selectedPost)}
                    className="p-2 rounded-full hover:bg-white/5 text-accent-gold flex items-center gap-1.5 text-xs font-mono"
                    title="Copy Article Link"
                  >
                    {copySuccess ? <Check className="w-4 h-4 text-success-green" /> : <Share2 className="w-4 h-4" />}
                    <span>{copySuccess ? "Copied" : "Share"}</span>
                  </button>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="p-2 rounded-full bg-black/50 hover:bg-neutral-800 text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Cover Banner */}
              <div className="h-56 sm:h-72 w-full relative">
                <img 
                  src={selectedPost.imageUrl} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-4 left-6 text-[10px] font-mono bg-accent-gold text-studio-navy font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedPost.category}
                </span>
              </div>

              {/* Main Content Article Body */}
              <div className="p-6 sm:p-10 space-y-6">
                <div className="space-y-4">
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                    {selectedPost.title}
                  </h1>
                  
                  {/* Author details card */}
                  <div className="flex items-center gap-3 py-3 border-y border-white/5">
                    <div className="w-10 h-10 rounded-full bg-accent-gold text-studio-navy font-bold flex items-center justify-center text-xs font-mono">
                      {selectedPost.authorInitials}
                    </div>
                    <div className="text-xs font-mono text-warm-cream/60">
                      <p className="text-white font-sans font-bold leading-normal">{selectedPost.author}</p>
                      <span>Published {selectedPost.publishDate} &bull; {selectedPost.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Markdown formatted HTML Rendering */}
                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-warm-cream/80 leading-relaxed space-y-4">
                  <p className="italic font-serif text-md text-accent-gold">
                    {selectedPost.summary}
                  </p>
                  
                  {/* render content lines */}
                  {selectedPost.content.split("\n\n").map((chunk, itemIdx) => {
                    const trimmed = chunk.trim();
                    if (trimmed.startsWith("###")) {
                      return <h3 key={itemIdx} className="font-serif text-lg font-bold text-white pt-4">{trimmed.replace("###", "")}</h3>;
                    }
                    if (trimmed.startsWith("####")) {
                      return <h4 key={itemIdx} className="font-serif text-md font-bold text-accent-gold pt-3">{trimmed.replace("####", "")}</h4>;
                    }
                    if (trimmed.startsWith("*")) {
                      return (
                        <ul key={itemIdx} className="list-disc pl-5 space-y-1.5 py-1">
                          {trimmed.split("\n").map((li, liIdx) => (
                            <li key={liIdx}>{li.replace("*", "").trim()}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (trimmed.startsWith(">")) {
                      return (
                        <blockquote key={itemIdx} className="border-l-4 border-accent-gold pl-4 italic text-accent-gold/90 font-mono py-2 bg-white/5 rounded-r">
                          {trimmed.replace(">", "").trim()}
                        </blockquote>
                      );
                    }
                    return <p key={itemIdx} className="leading-relaxed">{trimmed}</p>;
                  })}
                </div>

                {/* Native commenting space */}
                <div className="pt-8 border-t border-white/5 space-y-6">
                  <h3 className="font-serif text-md font-semibold text-white">Join the Conversation &bull; Comments</h3>
                  
                  {/* Listing existing comments */}
                  <div className="space-y-4">
                    {(comments[selectedPost.id] || []).map((comm, idx) => (
                      <div key={idx} className="bg-ink-navy/60 p-4 rounded-xl border border-white/5 text-xs text-left gap-2 space-y-1">
                        <div className="flex justify-between font-mono text-warm-cream/55 text-[10px]">
                          <strong>{comm.author}</strong>
                          <span>{comm.date}</span>
                        </div>
                        <p className="text-warm-cream/80 font-sans">{comm.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add guest comment form */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-warm-cream/60">Leave a response</label>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Type guest reply here..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="flex-1 bg-ink-navy border border-white/10 rounded-xl px-4 py-2 text-xs font-mono text-warm-cream outline-none focus:border-accent-gold transition-all"
                      />
                      <button 
                        onClick={() => handleAddComment(selectedPost.id)}
                        className="p-2.5 rounded-xl bg-accent-gold text-studio-navy hover:bg-[#e0b430] flex items-center justify-center transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
