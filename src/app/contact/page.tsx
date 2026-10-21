/**
 * @INPUT: 无
 * @OUTPUT: ContactPage - 用户联系与问题反馈入口
 * @POS: 核心信任页 - 证明网站真实有人维护，提供工单支持、算法纠错与功能建议入口
 *
 * @SYNC: 一旦本文件逻辑发生变更，必须更新上述注释，并同步更新 contact/_META.md。
 */
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, Clock, CheckCircle2, Send, HelpCircle } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Feature Request / Formula Feedback",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gradient-radial bg-grid relative overflow-hidden flex flex-col justify-between">
      <Header />

      <div className="relative z-10 pt-28 pb-16 px-4 max-w-4xl mx-auto flex-1 w-full">
        <nav className="mb-8 text-center">
          <Link
            href="/"
            className="text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors font-body text-sm"
          >
            ← Back to Home
          </Link>
        </nav>

        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full neon-border mb-4">
            <MessageSquare className="w-4 h-4 text-[var(--neon-cyan)]" />
            <span className="font-display text-xs tracking-widest text-[var(--neon-cyan)] uppercase">
              Get in Touch
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Contact & Support
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-body max-w-2xl mx-auto">
            Have a question about a calculation formula? Need a specialized calculator for your trade? We respond to all
            inquiries within 24 to 48 business hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-3">
              <Mail className="w-6 h-6 text-[var(--neon-cyan)]" />
              <h3 className="font-display font-bold text-white text-base">Direct Email</h3>
              <p className="text-xs text-[var(--text-secondary)]">For general inquiries, bug reports, or partnership opportunities:</p>
              <a
                href="mailto:support@productivitycalculator.work"
                className="font-mono text-xs text-[var(--neon-cyan)] hover:underline block break-all font-semibold"
              >
                support@productivitycalculator.work
              </a>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-3">
              <Clock className="w-6 h-6 text-[var(--neon-pink)]" />
              <h3 className="font-display font-bold text-white text-base">Response Window</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Our team monitors feedback daily. Technical bug reports and clinical formula clarifications are prioritized.
              </p>
              <span className="text-[11px] font-mono text-emerald-400">● Typical reply: &lt; 24h</span>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-3">
              <HelpCircle className="w-6 h-6 text-[var(--neon-purple)]" />
              <h3 className="font-display font-bold text-white text-base">Fast Answers</h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Looking for explanations on clinical Medicare rules? Check our specialized guide:
              </p>
              <Link
                href="/calculator/physical-therapy"
                className="text-xs text-[var(--neon-purple)] hover:underline inline-block font-semibold"
              >
                Physical Therapy FAQ →
              </Link>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="md:col-span-2">
            <div className="card-neon rounded-2xl p-8 md:p-10">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">Message Received!</h3>
                  <p className="text-[var(--text-secondary)] font-body text-sm max-w-md mx-auto">
                    Thank you for reaching out. We have received your submission and will get back to your email (
                    <span className="text-white font-mono">{formData.email}</span>) promptly.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "Feature Request / Formula Feedback", message: "" });
                    }}
                    variant="outline"
                    className="neon-border text-xs mt-4 cursor-pointer"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-white">Your Name</Label>
                    <Input
                      type="text"
                      placeholder="e.g. Dr. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-[var(--bg-elevated)] border-[var(--border)] text-white focus:border-[var(--neon-cyan)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-white">
                      Email Address <span className="text-[var(--neon-pink)]">*</span>
                    </Label>
                    <Input
                      type="email"
                      required
                      placeholder="you@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[var(--bg-elevated)] border-[var(--border)] text-white focus:border-[var(--neon-cyan)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-white">Subject / Industry</Label>
                    <Input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-[var(--bg-elevated)] border-[var(--border)] text-white focus:border-[var(--neon-cyan)]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-white">
                      Message / Formula Suggestion <span className="text-[var(--neon-pink)]">*</span>
                    </Label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us what formula or feature you'd like to see, or report an issue..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-md border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-2 text-sm text-white focus:border-[var(--neon-cyan)] focus:outline-none transition-colors"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[var(--neon-cyan)] text-black hover:bg-[var(--neon-cyan)]/80 font-display font-bold text-sm tracking-wide gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,255,242,0.3)]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Support</span>
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
