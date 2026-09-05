import type { MetadataRoute } from "next";
import { cases } from "@/lib/cases";
import { columns } from "@/lib/columns";
import { plans } from "@/lib/plans";
import { voices } from "@/lib/voices";
import { pageContentUpdatedAt } from "@/lib/seo";

const SITE_URL = "https://kawaguchitenrei.com";

export default function sitemap(): MetadataRoute.Sitemap {

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/plan/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/area/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/area/kawaguchi/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/area/kawaguchi-ekimae/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/araijuku/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/hatogaya/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/nishikawaguchi/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/higashikawaguchi/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/kawaguchi-motogo/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/minami-hatogaya/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/tozuka-angyo/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/kamine/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/shingo/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/shiba/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/angyo/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/kamiaoki/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/area/aoki/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/hall/kawaguchi-memorial-hall/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/saijo/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/saijo/megurinomori/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/saijo/toda-sousaijyo/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/saijo/yatsuka-saijo/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/saijo/machiya-saijo/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact/`,
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/estimate/`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/column/`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/case/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/voice/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/faq/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/access/`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/pet/`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/company/`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/tokushoho/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/sitemap/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const planPages: MetadataRoute.Sitemap = plans.map((p) => ({
    url: `${SITE_URL}/plan/${p.slug}/`,
    changeFrequency: "monthly",
    priority: p.slug === "family-funeral" ? 0.9 : 0.7,
  }));

  const casePages: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${SITE_URL}/case/${c.slug}/`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const voicePages: MetadataRoute.Sitemap = voices.map((v) => ({
    url: `${SITE_URL}/voice/${v.slug}/`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const columnPages: MetadataRoute.Sitemap = columns.map((c) => ({
    url: `${SITE_URL}/column/${c.slug}/`,
    lastModified: new Date(c.updatedAt ?? c.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...planPages,
    ...casePages,
    ...voicePages,
    ...columnPages,
  ].map((entry) => ({
    ...entry,
    lastModified: pageContentUpdatedAt[new URL(entry.url).pathname] ?? entry.lastModified,
  }));
}
