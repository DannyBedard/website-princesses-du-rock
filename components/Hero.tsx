"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ExternalLinkIcon from "@/components/ExternalLinkIcon";
import { band } from "@/lib/band";

export default function Hero() {
  return (
    <section className="bg-black">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:gap-12 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto aspect-square w-full max-w-[16rem] sm:max-w-md md:order-2 md:max-w-none"
        >
          <Image
            src="/logo.webp"
            alt={band.name}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain"
          />
        </motion.div>

        <div className="text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-accent2 sm:text-sm"
          >
            {band.tagline}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Les Princesses
            <br />
            <span className="text-accent">du Rock</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mx-auto mt-6 max-w-xl text-lg text-foreground/75 leading-relaxed md:mx-0"
          >
            {band.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start"
          >
            <Link
              href="/shows"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Voir les spectacles
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-foreground/60 px-8 py-3 font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Booking
            </Link>
            <a
              href={band.musicUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Musique sur Bandcamp, ouvre un nouvel onglet"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-accent2/70 px-8 py-3 font-semibold text-accent2 transition-colors hover:bg-accent2 hover:text-background"
            >
              Musique
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
