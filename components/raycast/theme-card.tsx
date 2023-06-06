"use client";
import { Raycast } from "@/components/raycast";
import { Theme } from "@/lib/theme";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export function ThemeCard({ theme: raycastTheme }: { theme: Theme }) {
  const { push } = useRouter();
  const params = useParams();
  const slug = params.theme;
  const ref = React.useRef<HTMLButtonElement>(null);

  const style = Object.fromEntries(
    Object.entries(raycastTheme.colors).map(([key, value]) => [
      "--" + key,
      value,
    ])
  );

  React.useEffect(() => {
    if (slug === raycastTheme.slug) {
      setTimeout(() => {
        ref.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }, 1);
    }
  }, [slug]);

  return (
    <button
      ref={ref}
      key={raycastTheme.slug}
      className={`snap-always snap-center flex flex-col ring-2 ring-inset p-3 gap-3 rounded-4 overflow-hidden h-full aspect-[16/9] shrink-0 ${
        slug === raycastTheme.slug
          ? "ring-[rgb(var(--selection))]"
          : "ring-[rgba(0,0,0,0.2)] dark:ring-[rgba(255,255,255,0.2)]"
      }`}
      onClick={() => {
        push(raycastTheme.slug);
      }}
      style={style}
    >
      <div className="overflow-hidden rounded-3 flex-1 w-full">
        <div className="rounded-3">
          <Raycast
            disableLoadingAnimation={slug !== raycastTheme.slug}
            loadingAnimationType="static"
          />
        </div>
      </div>
      <div className="text-2">
        <span className="font-semibold">{raycastTheme.name} </span>
        <span className="opacity-50">by {raycastTheme.author}</span>
      </div>
    </button>
  );
}
