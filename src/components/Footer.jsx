export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-medium">FindVirtual.me</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering creators worldwide to showcase their work beautifully. 
              Build stunning portfolios that stand out from the crowd.
            </p>
          </div>

          {/* Product Section */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-medium">Product</h3>
            <div className="space-y-3">
              <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Features
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Templates
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Pricing
              </a>
              <a href="https://www.findvirtual.me/portfolios" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Examples
              </a>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-medium">Support</h3>
            <div className="space-y-3">
              <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Help Center
              </a>
              <a href="/contact" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Contact
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Privacy
              </a>
              <a href="#" className="block text-slate-400 hover:text-white transition-colors text-sm">
                Terms
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700 mt-12 pt-8">
          <p className="text-center text-slate-400 text-sm">
            © 2025 FindVirtual.me. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}