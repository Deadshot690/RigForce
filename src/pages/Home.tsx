import { ArrowRight, Cpu, MonitorPlay, Zap } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col items-center flex-1 bg-[#030711] text-foreground">
            {/* Hero Section */}
            <section className="w-full min-h-screen pt-14 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-[url('/images/pexels-atahandemir-30265371.jpg')] bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity z-0"></div>
                {/* Immersive background elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background rounded-full blur-[100px] -z-10" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-0"></div>

                <div className="space-y-8 max-w-[900px] relative z-10 mt-10">
                    <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(0,191,255,0.15)]">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse mr-2"></span>
                        RigForce Studio Engine 2.0 Now Live
                    </div>

                    <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl drop-shadow-2xl">
                        Architect Your <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 glow-text">Ultimate Machine</span>
                    </h1>

                    <p className="mx-auto max-w-[700px] text-lg text-muted-foreground/80 md:text-xl font-light leading-relaxed">
                        Industry-grade PC simulation. Analyze bottlenecks, estimate performance metrics, and visualize your configuration in a highly detailed 3D environment before purchasing a single component.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12 pt-4">
                        <a
                            href="/build"
                            className="group inline-flex h-14 items-center justify-center rounded-lg bg-primary px-8 text-base font-semibold text-primary-foreground shadow-[0_0_40px_rgba(0,191,255,0.4)] transition-all hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(0,191,255,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            Enter Simulation
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </a>
                        <a
                            href="/features"
                            className="inline-flex h-14 items-center justify-center rounded-lg border border-border bg-card/40 backdrop-blur-sm px-8 text-base font-semibold shadow-sm transition-all hover:bg-card hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                            Explore Engine Capabilities
                        </a>
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="w-full py-24 bg-card/30 relative border-t border-white/5">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group relative overflow-hidden flex flex-col items-start space-y-5 p-8 glass-card rounded-2xl tech-border border-white/10 hover:border-primary/40 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-14 h-14 rounded-xl bg-card border border-white/10 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,191,255,0.15)] group-hover:scale-110 transition-transform duration-500">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold font-mono text-foreground tracking-wide">Intelligent Compatibility</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Advanced algorithmic checks for socket parity, thermal constraints, and physical dimensional clearance. No guesswork required.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="group relative overflow-hidden flex flex-col items-start space-y-5 p-8 glass-card rounded-2xl tech-border border-white/10 hover:border-primary/40 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-14 h-14 rounded-xl bg-card border border-white/10 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,191,255,0.15)] group-hover:scale-110 transition-transform duration-500">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold font-mono text-foreground tracking-wide">Performance Heuristics</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Proprietary engine simulating framerates and productivity outputs across various resolutions based on your exact hardware matrix.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="group relative overflow-hidden flex flex-col items-start space-y-5 p-8 glass-card rounded-2xl tech-border border-white/10 hover:border-primary/40 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-14 h-14 rounded-xl bg-card border border-white/10 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(0,191,255,0.15)] group-hover:scale-110 transition-transform duration-500">
                                <MonitorPlay className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold font-mono text-foreground tracking-wide">3D Digital Twin</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                See your design rendered in real-time utilizing a sophisticated WebGL canvas with physical lighting and material properties.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
