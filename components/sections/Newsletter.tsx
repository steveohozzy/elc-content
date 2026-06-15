"use client"

import type React from "react"
import { useState } from "react"

type NewsletterSignUpData = {
  title?: string;
  intro?: string;
};

export function Newsletter({ data }: { data?: NewsletterSignUpData }) {
  const [email, setEmail] = useState("")
  const [done, setDone] = useState(false)
  

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setDone(true)
  }

  return (
    <section id="newsletter" className="mx-auto max-w-7xl px-4 pb-20 md:px-8 lg:pb-28">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 text-primary-foreground md:px-16 md:py-20">
        <div className="pointer-events-none absolute -right-4 -top-4 size-40 rounded-full bg-accent/60" aria-hidden />
        <div className="pointer-events-none absolute bottom-4 left-4 h-40 w-40 rounded-full bg-secondary opacity-50" aria-hidden />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-heading text-4xl font-semibold leading-tight md:text-5xl">
            {data?.title || "Join our community of curious families"}
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-primary-foreground/85">
            {data?.intro || "Play ideas, child-development tips and a little inspiration — straight to your inbox. No noise, just the good stuff."}
          </p>

          {done ? (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 font-semibold text-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 text-primary" aria-hidden="true"><path d="M20 6 9 17l-5-5"></path></svg>
              You&apos;re in! Welcome to the family.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="flex-1 rounded-full border-0 bg-background px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="rounded-full bg-foreground px-6 py-3.5 font-semibold text-background transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
