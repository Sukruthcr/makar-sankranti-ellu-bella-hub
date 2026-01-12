
import React, { useState, useRef } from 'react';
import { SANKRANTI_ITEMS } from './constants';
import { UserPhoto, SweetItem } from './types';
import { getFestiveGreeting, getRecipeDetails } from './services/geminiService';

const App: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [greeting, setGreeting] = useState('Welcome to Ravi Prasad Provision Stores! Taste the legacy of our hand-crafted Sankranti delicacies.');
  const [isLoadingGreeting, setIsLoadingGreeting] = useState(false);
  const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const [selectedItemInfo, setSelectedItemInfo] = useState<{name: string, info: string} | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const shopName = "Ravi Prasad Provision Stores";
  const address = "Near Market School, Kongadiyappa Statue";
  const phoneNumber = "9036205547";
  const tagline = "Home-Made Heritage, Freshness Guaranteed.";

  const handleCallOrder = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const fetchGreeting = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoadingGreeting(true);
    const result = await getFestiveGreeting(userName || "Valued Customer");
    setGreeting(result || `Happy Makar Sankranti from ${shopName}! Call us for fresh home-made Ellu Bella.`);
    setIsLoadingGreeting(false);
  };

  const handleShowInfo = async (itemName: string) => {
    setSelectedItemInfo({ name: itemName, info: 'Fetching our home-made secrets...' });
    const info = await getRecipeDetails(`${itemName} prepared home-style at Ravi Prasad Stores`);
    setSelectedItemInfo({ name: itemName, info: info || "Our traditional process ensures authentic taste and long-lasting freshness." });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto: UserPhoto = {
          id: Date.now().toString(),
          url: reader.result as string,
          caption: 'Fresh Batch',
          timestamp: Date.now()
        };
        setPhotos(prev => [newPhoto, ...prev]);
      };
      reader.readAsDataURL(file);
    }
  };

  const ImageWithFallback = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    const fallback = 'https://pngmagic.com/image_small/happy-makar-sankranti-2026-vfx-style-poster_DB9.webp';
    return (
      <img
        src={`${import.meta.env.BASE_URL}${src.startsWith('/') ? src.slice(1) : src}`}
        alt={alt}
        className={className}
        onError={(e) => { (e.target as HTMLImageElement).src = fallback }}
      />
    );
  };

  const ProductGallery = ({ item }: { item: SweetItem }) => {
    if (item.gallery && item.gallery.length >= 3) {
      return (
        <div className="grid grid-cols-2 grid-rows-2 h-full gap-1 p-2">
           <ImageWithFallback 
             src={item.gallery[0]} 
             className="w-full h-full object-cover rounded-tl-[3rem]" 
             alt={`${item.name} 1`} 
           />
           <ImageWithFallback 
             src={item.gallery[1]} 
             className="w-full h-full object-cover rounded-tr-[1rem]" 
             alt={`${item.name} 2`} 
           />
           <ImageWithFallback 
             src={item.gallery[2]} 
             className="w-full h-full object-cover col-span-2 rounded-b-[1rem]" 
             alt={`${item.name} 3`} 
           />
        </div>
      );
    } else if (item.gallery && item.gallery.length === 2) {
      return (
        <div className="grid grid-cols-1 grid-rows-2 h-full gap-1 p-2">
           <ImageWithFallback 
             src={item.gallery[0]} 
             className="w-full h-full object-cover rounded-t-[3rem]" 
             alt={`${item.name} 1`} 
           />
           <ImageWithFallback 
             src={item.gallery[1]} 
             className="w-full h-full object-cover rounded-b-[1rem]" 
             alt={`${item.name} 2`} 
           />
        </div>
      );
    }
    return (
      <ImageWithFallback 
        src={item.imageUrl} 
        alt={item.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
      />
    );
  };

  return (
    <div className="min-h-screen">
      {/* Sticky Call Order Banner */}
      <div 
        className="bg-orange-600 text-white py-3 px-4 text-center text-sm font-bold sticky top-0 z-50 shadow-lg flex items-center justify-center gap-4 cursor-pointer hover:bg-orange-700 transition-all active:scale-[0.98]"
        onClick={handleCallOrder}
      >
        <span className="animate-pulse flex items-center gap-2">
          📞 CLICK TO CALL & ORDER: <span className="bg-white text-orange-600 px-2 rounded font-black">{phoneNumber}</span>
        </span>
        <span className="hidden md:inline">• 1/2 KG, 1 KG & bulk packs available!</span>
      </div>

      {/* Hero Header */}
      <header className="relative pt-20 pb-28 px-4 text-center overflow-hidden">
        <div className="absolute top-20 left-[5%] opacity-10 animate-float text-5xl">🪁</div>
        <div className="absolute top-60 right-[8%] opacity-10 animate-float text-6xl" style={{animationDelay: '1.5s'}}>🪁</div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-800 rounded-full text-xs font-black mb-6 tracking-widest uppercase border border-orange-200 shadow-sm">
            Retail Shop Specializing in Home-Made Delights
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-orange-950 mb-4 tracking-tighter leading-tight">
            {shopName}
          </h1>
          <p className="text-xl md:text-3xl text-red-700 font-serif mb-10 italic font-semibold">
            "{tagline}"
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="flex items-center gap-3 text-orange-950 font-bold bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/50 shadow-xl">
              <span className="text-2xl">📍</span> {address}
            </div>
            <div 
              onClick={handleCallOrder}
              className="flex items-center gap-3 text-white font-black bg-orange-600 px-8 py-3 rounded-2xl border-2 border-orange-500 cursor-pointer hover:bg-orange-700 transition-all shadow-xl shadow-orange-200 group animate-bounce"
            >
              <span className="text-2xl group-hover:rotate-12 transition-transform">📞</span> Order Now: {phoneNumber}
            </div>
          </div>

          <div className="glass-morphism p-8 rounded-[3rem] shadow-2xl border-2 border-orange-200/50 max-w-2xl mx-auto">
             <h2 className="text-xl font-black text-orange-950 mb-4">Wishes from Ravi Prasad Stores</h2>
             {isLoadingGreeting ? (
               <div className="flex justify-center space-x-3 py-6">
                 <div className="w-4 h-4 bg-orange-600 rounded-full animate-bounce"></div>
                 <div className="w-4 h-4 bg-orange-600 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                 <div className="w-4 h-4 bg-orange-600 rounded-full animate-bounce [animation-delay:-.5s]"></div>
               </div>
             ) : (
               <div className="bg-orange-50/50 p-6 rounded-[2rem] mb-6 border border-orange-100/50 min-h-[100px] flex items-center justify-center">
                 <p className="text-lg md:text-xl text-orange-950 italic font-serif leading-relaxed px-4 whitespace-pre-wrap">"{greeting}"</p>
               </div>
             )}
             
             <form onSubmit={fetchGreeting} className="flex flex-col sm:flex-row gap-4">
               <input 
                 type="text" 
                 placeholder="Your Name..." 
                 className="flex-1 px-6 py-4 rounded-2xl border-2 border-orange-200 focus:outline-none focus:ring-4 focus:ring-orange-500/20 bg-white/90 transition-all text-lg font-bold text-orange-700 shadow-inner"
                 value={userName}
                 onChange={(e) => setUserName(e.target.value)}
               />
               <button 
                 type="submit"
                 className="px-8 py-4 bg-orange-950 text-white rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl active:scale-95"
               >
                 Greet Me
               </button>
             </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-48">
        
        {/* Core Value Cards */}
        <section className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 rounded-[3rem] bg-orange-900 text-white shadow-2xl relative overflow-hidden group">
             <div className="text-5xl mb-6">🏠</div>
             <h3 className="text-2xl font-black mb-3">Authentic & Home-Made</h3>
             <p className="text-orange-100/90 leading-relaxed">Made directly at our home for your family. No preservatives, only tradition.</p>
          </div>
          <div className="p-10 rounded-[3rem] bg-white border-4 border-orange-100 shadow-2xl group">
             <div className="text-5xl mb-6">⚖️</div>
             <h3 className="text-2xl font-black text-orange-950 mb-3">Custom Quantities</h3>
             <p className="text-gray-600 leading-relaxed">Available in 1/2 KG, 1 KG, and bulk packs. We pack precisely as you want!</p>
          </div>
          <div className="p-10 rounded-[3rem] bg-red-600 text-white shadow-2xl group">
             <div className="text-5xl mb-6">📱</div>
             <h3 className="text-2xl font-black mb-3">Order via Call</h3>
             <p className="text-red-100/90 leading-relaxed">One tap to call us at {phoneNumber}. We'll keep your fresh batch ready.</p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-orange-950 mb-4">Our Festive Catalog</h2>
            <div className="h-2 w-32 bg-orange-600 rounded-full mx-auto mb-6"></div>
            <p className="text-xl text-orange-800 font-bold uppercase tracking-widest">Fresh Home-Made Stock</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {SANKRANTI_ITEMS.map((item) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[3.5rem] overflow-hidden group shadow-2xl hover:shadow-[0_40px_80px_rgba(234,88,12,0.1)] transition-all duration-700 border border-orange-100/50 flex flex-col md:flex-row h-full"
              >
                {/* Product Image Section */}
                <div className="md:w-1/2 relative overflow-hidden bg-orange-100 min-h-[300px]">
                  <ProductGallery item={item} />
                  <div className="absolute top-6 left-6">
                    <span className="bg-orange-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                      Tradition
                    </span>
                  </div>
                </div>

                {/* Product Info Section */}
                <div className="p-10 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-black text-orange-950 mb-2 leading-tight">{item.name}</h3>
                    <p className="text-orange-600 font-bold italic text-base mb-4">{item.kannadaName}</p>
                    <p className="text-gray-600 text-base leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="mb-8">
                      <p className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-widest">Available Pack Sizes</p>
                      <div className="flex flex-wrap gap-2">
                        {item.availableQuantities.map((q) => (
                          <span key={q} className="px-4 py-1.5 bg-orange-50 border-2 border-orange-100 rounded-xl text-xs font-black text-orange-800">
                            {q}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleCallOrder}
                      className="w-full py-4 bg-orange-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-orange-100 hover:bg-orange-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                      <span>📞 Call to Order Now</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Home-Made Vibes Gallery Section */}
        <section className="mb-32">
          <div className="bg-gradient-to-br from-orange-600 to-red-700 rounded-[5rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
              <div className="text-center md:text-left">
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-none tracking-tighter">Purely Home-Made <br/> Quality</h2>
                <p className="text-white/90 text-xl mb-12 leading-relaxed font-medium">
                  We take pride in our "Retail but Home-Made" approach. Everything you see here is packed fresh based on your required weight (1/2 KG, 1 KG or more).
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-10 py-5 bg-white text-orange-950 rounded-[2rem] font-black text-lg hover:scale-105 transition-all shadow-xl active:scale-95"
                  >
                    📸 Share Your Pack
                  </button>
                  <button 
                    onClick={handleCallOrder}
                    className="px-10 py-5 bg-orange-950 text-white rounded-[2rem] font-black text-lg hover:bg-black transition-all shadow-xl active:scale-95 flex items-center gap-3"
                  >
                    <span>📞 Call Shop</span>
                  </button>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handlePhotoUpload}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl rotate-2">
                  <ImageWithFallback src="input_file_1.png" className="w-full h-full object-cover" alt="Fresh Batches" />
                </div>
                <div className="aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl -rotate-2 translate-y-8">
                  <ImageWithFallback src="input_file_2.png" className="w-full h-full object-cover" alt="Packing Fresh" />
                </div>
                {photos.slice(0, 2).map((p, i) => (
                  <div key={p.id} className="aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl rotate-3">
                    <img src={p.url} className="w-full h-full object-cover" alt="User upload" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="bg-white rounded-[4rem] p-16 md:p-20 border-4 border-orange-50 shadow-2xl relative overflow-hidden">
           <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-5xl font-black text-orange-950 mb-10 tracking-tighter">Visit Us Today</h2>
                 <div className="space-y-10">
                    <div className="flex gap-6 items-start">
                       <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl">🏠</div>
                       <div>
                          <h4 className="text-xl font-black text-orange-950 mb-1">Our Address</h4>
                          <p className="text-gray-500 text-lg leading-snug">{address}</p>
                       </div>
                    </div>
                    <div className="flex gap-6 items-start">
                       <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl">📞</div>
                       <div>
                          <h4 className="text-xl font-black text-green-900 mb-1">Direct Call Order</h4>
                          <p className="text-orange-950 text-2xl font-black tracking-tight">{phoneNumber}</p>
                          <p className="text-xs text-green-600 font-black uppercase mt-2">Available for Call-Orders 8 AM - 9 PM</p>
                       </div>
                    </div>
                    <div className="p-8 bg-orange-50/50 rounded-[2.5rem] border border-orange-100/50">
                       <p className="text-orange-900 font-serif italic text-lg leading-relaxed">
                          "Everything you need for the festival—from fresh Ellu Bella in 1/2 KG pouches to bulk orders for your office—is just a call away."
                       </p>
                    </div>
                 </div>
              </div>
              <div 
                className="relative aspect-square bg-orange-100 rounded-[3.5rem] border-8 border-white shadow-inner flex items-center justify-center cursor-pointer group overflow-hidden"
                onClick={handleCallOrder}
              >
                 <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" alt="Store area" />
                 <div className="relative z-10 bg-white p-10 rounded-full shadow-2xl border-4 border-orange-600 flex flex-col items-center animate-bounce">
                    <span className="text-5xl mb-1">📞</span>
                    <span className="text-orange-600 font-black text-xs uppercase tracking-widest">Call Now</span>
                 </div>
              </div>
           </div>
        </section>

      </main>

      {/* Floating Call Button */}
      <div 
        onClick={handleCallOrder}
        className="fixed bottom-8 right-8 w-20 h-20 bg-orange-600 text-white rounded-[2rem] shadow-[0_20px_60px_rgba(234,88,12,0.4)] flex flex-col items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all z-50 border-4 border-white group"
      >
        <span className="text-3xl group-hover:animate-bounce">📞</span>
        <span className="text-[10px] font-black uppercase tracking-tighter mt-1">Order</span>
      </div>

      <footer className="bg-black py-40 text-center text-white px-6">
         <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">{shopName}</h2>
            <p className="text-orange-400 text-xl font-serif italic mb-16 opacity-70">"Home-Made Taste. Pure Tradition. Locally Trusted."</p>
            <div className="h-px bg-white/10 w-full mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-white/40 text-sm font-black tracking-widest uppercase">
               <div>📍 {address}</div>
               <div onClick={handleCallOrder} className="cursor-pointer hover:text-white transition">📞 Call Order: {phoneNumber}</div>
            </div>
            <p className="mt-20 text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">Happy Makar Sankranti • ಎಳ್ಳು ಬೆಲ್ಲ ತಿಂದು ಒಳ್ಳೆ ಮಾತಾಡಿ</p>
         </div>
      </footer>

      {/* Detail Modal */}
      {selectedItemInfo && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-6 bg-black/70 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-white rounded-[4rem] p-10 md:p-16 max-w-2xl w-full shadow-2xl relative animate-in zoom-in-95 duration-500 overflow-hidden">
            <button 
               onClick={() => setSelectedItemInfo(null)}
               className="absolute top-10 right-10 text-orange-200 hover:text-orange-600 text-4xl font-light transition"
            >✕</button>
            <h3 className="text-4xl font-black text-orange-950 mb-8 border-b-6 border-orange-600 pb-2 inline-block">{selectedItemInfo.name}</h3>
            <p className="text-gray-800 text-xl font-serif italic leading-relaxed pl-4 border-l-4 border-orange-100 mb-10">
              {selectedItemInfo.info}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => {
                  handleCallOrder();
                  setSelectedItemInfo(null);
                }}
                className="flex-1 py-5 bg-orange-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-orange-100 hover:bg-orange-700 transition flex items-center justify-center gap-3 active:scale-95"
              >
                <span>📞 Click to Call & Order</span>
              </button>
              <button
                onClick={() => setSelectedItemInfo(null)}
                className="px-10 py-5 bg-orange-50 text-orange-800 rounded-[2rem] font-black transition"
              >Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
