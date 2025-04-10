// import { db } from "@/infra/db";
// import { schema } from "@/infra/db/schemas";
// import { type Either, makeRight } from "@/infra/shared/either";
// import { asc, count, desc, ilike } from "drizzle-orm";
// import { z } from "zod";

// const getShortUrlInput = z.object({
//   searchQuery: z.string().optional(),
//   sortBy: z.enum(["createdAt"]).optional(),
//   sortDirection: z.enum(["asc", "desc"]).optional(),
//   page: z.number().optional().default(1),
//   pageSize: z.number().optional().default(20),
// });

// type GetShortUrlInput = z.input<typeof getShortUrlInput>;

// type GetShortUrlOutput = {
//   ShortUrl: {
//     fullUrl: string;
//     shortUrl: string;
//     createdAt: Date;
//   }[];
//   total: number;
// };

// export async function getShortUrls(
//   input: GetShortUrlInput
// ): Promise<Either<never, GetShortUrlOutput>> {
//   const { page, pageSize, searchQuery, sortBy, sortDirection } = getShortUrlInput.parse(input);

//   const [shortUrls, [{ total }]] = await Promise.all([
//     db
//       .select({
//         fullUrl: schema.shortUrls.fullUrl,
//         shortUrl: schema.shortUrls.shortUrl,
//         createdAt: schema.shortUrls.createdAt,
//       })
//       .from(schema.shortUrls)
//       .where(searchQuery ? ilike(schema.shortUrls.shortUrl, `%${searchQuery}%`) : undefined)
//       .orderBy((fields) => {
//         if (sortBy && sortDirection === "asc") {
//           return asc(fields[sortBy]);
//         }

//         if (sortBy && sortDirection === "desc") {
//           return desc(fields[sortBy]);
//         }

//         return desc(fields.shortUrl);
//       })
//       .offset((page - 1) * pageSize)
//       .limit(pageSize),

//     db
//       .select({ total: count(schema.shortUrls.shortUrl) })
//       .from(schema.shortUrls)
//       .where(searchQuery ? ilike(schema.shortUrls.shortUrl, `%${searchQuery}%`) : undefined),
//   ]);

//   return makeRight({ shortUrls, total });
// }
