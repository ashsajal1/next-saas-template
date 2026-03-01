import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Zap, Loader2 } from "lucide-react";

const meta = {
  title: "App/Loading",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Full-page loading state shown when navigating between pages or loading data.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      {/* Loading Content */}
      <div className="text-center">
        {/* Logo Animation */}
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto shadow-xl shadow-primary/20 animate-pulse">
            <Zap className="w-10 h-10 text-primary-foreground" />
          </div>
          {/* Orbiting dots */}
          <div className="absolute inset-0 -m-4">
            <div 
              className="w-28 h-28 border-2 border-dashed border-primary/20 rounded-full" 
              style={{ animation: 'spin 3s linear infinite' }} 
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-bold mb-2">SaaSFlow</h1>
        <p className="text-muted-foreground mb-8">Loading your workspace...</p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto mb-6">
          <div 
            className="h-full bg-primary rounded-full"
            style={{
              animation: 'loading-bar 2s ease-in-out infinite'
            }}
          />
        </div>

        {/* Loading Spinner with text */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Preparing your dashboard</span>
        </div>

        {/* Tips */}
        <div className="mt-12 max-w-md mx-auto">
          <p className="text-xs text-muted-foreground/70">
            Did you know? Teams using SaaSFlow save an average of 20+ hours per week on manual tasks.
          </p>
        </div>
      </div>

      {/* CSS for custom animation */}
      <style>{`
        @keyframes loading-bar {
          0% {
            width: 0%;
            transform: translateX(-100%);
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  ),
};

export const WithoutTips: Story = {
  render: () => (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto shadow-xl shadow-primary/20 animate-pulse">
            <Zap className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="absolute inset-0 -m-4">
            <div 
              className="w-28 h-28 border-2 border-dashed border-primary/20 rounded-full" 
              style={{ animation: 'spin 3s linear infinite' }} 
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-2">SaaSFlow</h1>
        <p className="text-muted-foreground mb-8">Loading...</p>

        <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-primary rounded-full"
            style={{ animation: 'loading-bar 2s ease-in-out infinite' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div className="min-h-[400px] flex flex-col items-center justify-center bg-background relative">
      <div className="text-center">
        <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Zap className="w-8 h-8 text-primary-foreground" />
        </div>
        
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    </div>
  ),
};
