import { Mail, Zap } from "lucide-react";

export default function AboutUs() {
    return (
        <div className="flex flex-col items-center flex-1 bg-[#030711] text-foreground w-full">
            {/* Hero Section */}
            <section className="w-full min-h-screen pt-14 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-[url('/images/pexels-zeleboba-28824342.jpg')] bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity z-0"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background rounded-full blur-[100px] -z-10" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-0"></div>

                <div className="space-y-8 max-w-[900px] relative z-10 mt-10">
                    <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-mono text-primary backdrop-blur-md mb-2 shadow-[0_0_20px_rgba(0,191,255,0.15)] mx-auto">
                        <Zap className="h-4 w-4 mr-2" /> Company Overview
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-2xl">
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300 glow-text">RigForce</span>
                    </h1>
                    <p className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground/80 font-light leading-relaxed">
                        We believe systems architecture should be exact and foolproof. We are on a mission to democratize high-end PC building through intelligent, data-driven software.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 mt-8 border-t border-white/5 max-w-[800px] mx-auto text-left">
                        <div className="space-y-2">
                            <h4 className="text-primary font-mono text-sm uppercase tracking-wider">01 // Precision</h4>
                            <p className="text-sm text-muted-foreground">Every component interaction is mathematically verified before rendering.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-primary font-mono text-sm uppercase tracking-wider">02 // Analytics</h4>
                            <p className="text-sm text-muted-foreground">Deep performance heuristics prevent bottlenecking and thermal throttling.</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-primary font-mono text-sm uppercase tracking-wider">03 // Visualization</h4>
                            <p className="text-sm text-muted-foreground">True 1:1 digital twins providing absolute aesthetic clarity.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="w-full py-24 relative border-t border-white/5 bg-card/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-28 max-w-5xl mx-auto px-4 md:px-8 w-full relative z-10">
                    <div className="space-y-4 p-8 glass-card rounded-2xl border border-white/5 tech-border hover:border-primary/30 transition-colors">
                        <h2 className="text-2xl font-bold font-mono tracking-wide text-foreground">Our Origin</h2>
                        <p className="text-muted-foreground/90 leading-relaxed font-light">
                            RigForce began when hardware engineers grew frustrated with the disjointed process of speccing a new workstation. Checking compatibilities on one site, estimating performance on another, and trying to visualize the result was prone to critical errors. We decided to forge the ultimate unified platform.
                        </p>
                    </div>
                    <div className="space-y-4 p-8 glass-card rounded-2xl border border-white/5 tech-border hover:border-primary/30 transition-colors">
                        <h2 className="text-2xl font-bold font-mono tracking-wide text-foreground">Our Vision</h2>
                        <p className="text-muted-foreground/90 leading-relaxed font-light">
                            We envision a future where everyone, regardless of technical background, can confidently select components and assemble their core machine. We continuously update our simulation engine and heuristical databases to provide the most exact digital twin experience possible.
                        </p>
                    </div>
                </div>

                <div className="glass-card p-10 md:p-14 rounded-3xl border border-primary/20 tech-border text-center max-w-4xl mx-auto w-full px-4 md:px-8 relative overflow-hidden z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4 tracking-tight">Initialize Contact</h2>
                        <p className="text-muted-foreground/80 mb-8 max-w-md mx-auto font-light text-lg">
                            Have heuristic feedback, discovered an engine anomaly, or want to integrate with our API? Our channels are open.
                        </p>
                        <a href="mailto:contact@superbuilder.xyz" className="inline-flex items-center justify-center gap-2 group text-primary hover:text-primary/80 font-mono text-lg transition-colors">
                            <Mail className="w-5 h-5 group-hover:-translate-y-1 transition-transform" /> hello@rigforce.io
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
