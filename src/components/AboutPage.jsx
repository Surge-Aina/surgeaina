import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* PAGE BACKGROUND */}
      <main className="bg-stone-50 text-stone-900">

        {/* HERO */}
        <header className="bg-gradient-to-r from-gray-300  to-gray-300 via-white text-gray-800 py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center gap-4">
              <Link to="/" aria-label="Home" className="shrink-0">
                <img
                  src="/surgeaina.png"
                  alt="Surge Aina logo"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                />
              </Link>
              <h1 className="text-4xl md:text-6xl  tracking-tight font-semibold">
                Explore Surge Aina
              </h1>
            </div>

            <p className="mt-3 text-3xl md:text-2xl max-w-3xl mx-auto text-center opacity-90 font-normal">
              Because tech should understand you
            </p>
          </div>
        </header>

        {/* OUR STORY */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 font-inter">Our Story</h2>
                <div>
                  <p className="text-lg md:text-2xl leading-relaxed text-slate-700 font-inter font-medium mb-6">
                    Surge Aina is a purpose-driven tech company that empowers creators and 
                    professionals through innovative digital solutions.
                  </p>

                  <p className="text-lg md:text-2xl leading-relaxed text-slate-700 font-inter font-medium mb-6">
                    Our latest creation, FindVirtual.me, is an intelligent platform that lets 
                    creators, designers, and professionals build stunning portfolio websites 
                    without any coding.
                  </p>

                  <p className="text-lg md:text-2xl leading-relaxed text-slate-700 font-inter font-medium">
                    We believe in making a beautiful web presence accessible to everyone - 
                    because your creativity should not be limited by technical barriers.
                  </p>
                </div>
              </div>

              <div>
                <img
                  src="/about.png"
                  alt="AI neural network visualization"
                  className="w-full rounded-xl shadow-xl aspect-[16/10] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-neutral-100 to-stone-200">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 font-inter">Why Choose Us?</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
              {/* Card 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-xl hover:scale-105 hover:bg-white hover:border-slate-300 transition-all duration-300 ease-in-out transform cursor-pointer group">
                <h3 className="text-xl font-bold text-slate-800 mb-4 font-inter group-hover:text-slate-900 transition-colors">
                  From Idea to Impact in Record Time.
                </h3>
                <p className="text-slate-600 font-inter text-lg leading-relaxed group-hover:text-slate-700 transition-colors">
                  While others are stuck in endless planning meetings, we're already building your MVP. Our intelligent design process delivers startup speed with enterprise quality - cutting development time by 40% without sacrificing results.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-xl hover:scale-105 hover:bg-white hover:border-slate-300 transition-all duration-300 ease-in-out transform cursor-pointer group">
                <h3 className="text-xl font-bold text-slate-800 mb-4 font-inter group-hover:text-slate-900 transition-colors">
                  Human-Centered Tech That Actually Makes Sense.
                </h3>
                <p className="text-slate-600 font-inter text-lg leading-relaxed group-hover:text-slate-700 transition-colors">
                  We don't just code - we create digital experiences that connect. Every solution is designed for real people, real problems, and real results. Technology should serve people, not confuse them.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-xl hover:scale-105 hover:bg-white hover:border-slate-300 transition-all duration-300 ease-in-out transform cursor-pointer group">
                <h3 className="text-xl font-bold text-slate-800 mb-4 font-inter group-hover:text-slate-900 transition-colors">
                  Proven Innovation - We Built FindVirtual.me.
                </h3>
                <p className="text-slate-600 font-inter text-lg leading-relaxed group-hover:text-slate-700 transition-colors">
                  We don't just talk about empowering users - we've done it. Our portfolio platform is already transforming how professionals showcase their work online. When you work with us, you're working with proven innovators.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 shadow-sm hover:shadow-xl hover:scale-105 hover:bg-white hover:border-slate-300 transition-all duration-300 ease-in-out transform cursor-pointer group">
                <h3 className="text-xl font-bold text-slate-800 mb-4 font-inter group-hover:text-slate-900 transition-colors">
                  Full-Stack Meets Business Strategy
                </h3>
                <p className="text-slate-600 font-inter text-lg leading-relaxed group-hover:text-slate-700 transition-colors">
                  Get developers who understand both technical complexity AND your business goals. We're not just coders - we're growth partners who build solutions designed to scale with you. Choose us for maximum value.
                </p>
              </div>
            </div>

            <div className="text-center mt-10">
              <Link
                to="/contact"
                className="bg-slate-900 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold font-inter transition-colors shadow-lg"
              >
                Get Connected
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
}