import { Box, Cpu, LineChart, Save, Settings, Sparkles } from "lucide-react";

export default function Features() {
    const featuresList = [
        {
            title: "Intelligent Compatibility Engine",
            description: "Our algorithm rigorously cross-references sockets, form factors, TDP limitations, and physical dimensions to ensure component synergy.",
            icon: <Settings className="w-6 h-6" />
        },
        {
            title: "Stunning 3D Digital Twin",
            description: "See your build come to life. Rotate, sweep, and inspect your prospective PC in high-fidelity WebGL to get a crystal clear idea of the final aesthetic.",
            icon: <Box className="w-6 h-6" />
        },
        {
            title: "Real-time Analytics",
            description: "Simulate how your chosen CPU and GPU pairing will perform in modern benchmarks and AAA game titles across multiple resolutions.",
            icon: <LineChart className="w-6 h-6" />
        },
        {
            title: "Smart Budget Allocation",
            description: "Define your maximum monetary limits, and our planner will intelligently distribute funds to maximize hardware ROI where it counts.",
            icon: <Cpu className="w-6 h-6" />
        },
        {
            title: "Persistent Matrix Saving",
            description: "Save multiple configuration branches into isolated testing nodes. Compare their performance and cost metrics side-by-side.",
            icon: <Save className="w-6 h-6" />
        },
        {
            title: "Aesthetic Grading System",
            description: "Receive heuristic feedback on geometric, coordinate, and lighting balance to ensure your rig looks as powerful as it performs.",
            icon: <Sparkles className="w-6 h-6" />
        }
    ];

    return (
        <div className="flex flex-col items-center flex-1 bg-[#030711] text-foreground w-full">
            {/* Hero Section */}
            <section className="w-full min-h-screen pt-14 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-[url('/images/pexels-ron-lach-7858767.jpg')] bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity z-0"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background rounded-full blur-[100px] -z-10" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-0"></div>

                <div className="space-y-8 max-w-[900px] relative z-10 mt-10">
                    <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-mono text-primary backdrop-blur-md mb-2 shadow-[0_0_20px_rgba(0,191,255,0.15)] mx-auto">
                        System Architecture
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight drop-shadow-2xl">
                        Capabilities of the <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300 glow-text">RigForce Engine</span>
                    </h1>
                    <p className="mx-auto max-w-[700px] text-lg md:text-xl text-muted-foreground/80 font-light leading-relaxed">
                        Designed from the ground up to provide enthusiasts and systems integrators with unprecedented simulation tools and analytical depth.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 mt-10 pt-4 border-t border-white/5 max-w-[600px] mx-auto">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold font-mono text-primary">10k+</span>
                            <span className="text-sm text-muted-foreground uppercase tracking-widest mt-1">Components</span>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-white/10"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold font-mono text-primary">0ms</span>
                            <span className="text-sm text-muted-foreground uppercase tracking-widest mt-1">Latency Simulation</span>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-white/10"></div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold font-mono text-primary">100%</span>
                            <span className="text-sm text-muted-foreground uppercase tracking-widest mt-1">Compatibility Accuracy</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="w-full py-24 relative border-t border-white/5 bg-card/10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
                    {featuresList.map((f, i) => (
                        <div key={i} className="group relative overflow-hidden flex flex-col items-start space-y-5 p-8 glass-card rounded-2xl tech-border border-white/5 hover:border-primary/40 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-14 h-14 rounded-xl bg-card border border-white/10 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,191,255,0.15)] group-hover:scale-110 transition-transform duration-500">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold font-mono text-foreground tracking-wide">{f.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-28 text-center glass-card p-12 lg:p-16 rounded-3xl tech-border border-primary/20 relative overflow-hidden max-w-5xl mx-auto w-full px-4 md:px-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Ready to initiate a build simulation?</h2>
                        <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg font-light">
                            Deploy directly into the simulator environment and start configuring your machine parameters.
                        </p>
                        <a
                            href="/build"
                            className="group inline-flex h-14 items-center justify-center rounded-lg bg-primary px-10 text-base font-semibold text-primary-foreground shadow-[0_0_30px_rgba(0,191,255,0.3)] transition-all hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_0_50px_rgba(0,191,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring gap-2"
                        >
                            Launch Simulation
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
