// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blogSchema = z.object({
  // Campos obligatorios
  title: z.string().max(100, "El título no puede exceder 100 caracteres"),
  description: z
    .string()
    .max(200, "La descripción no puede exceder 200 caracteres"),
  publishDate: z.date(),

  // Campos opcionales
  updateDate: z.date().optional(),
  author: z.string().default("Zauriel Jesús Espejel Cervantes"),

  // Arrays
  tags: z.array(z.string()).max(10, "Máximo 10 tags por post"),
  categories: z
    .array(z.string())
    .max(3, "Máximo 3 categorías por post")
    .optional(),

  // Imágenes
  image: z.string(),
  imageAlt: z.string().optional(),
  footNoteImage: z.string().optional(),

  // Estados y configuraciones
  draft: z.boolean().default(false),

  // SEO
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),

  // Información adicional
  readingTime: z.number().optional(), // minutos estimados
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),

  // Enlaces relacionados
});

// =============================================
// DEFINICIÓN DE COLLECTION
// =============================================

export const collections = {
  blog: defineCollection({
    type: "content",
    schema: blogSchema,
  }),
};

// =============================================
// EXPORTAR TIPOS
// =============================================

export type BlogPost = z.infer<typeof blogSchema>;
export type PostDifficulty = BlogPost["difficulty"];

// =============================================
// CONSTANTES PARA COMPONENTES
// =============================================

export const DIFFICULTY_LEVELS = {
  beginner: "Principiante",
  intermediate: "Intermedio",
  advanced: "Avanzado",
} as const;
