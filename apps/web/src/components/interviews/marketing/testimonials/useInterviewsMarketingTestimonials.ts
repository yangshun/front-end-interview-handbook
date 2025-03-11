import type { InterviewsMarketingTestimonial } from './InterviewsMarketingTestimonialCard';
import { InterviewsMarketingTestimonialsDict } from './InterviewsMarketingTestimonials';

export function useInterviewsMarketingTestimonials(
  showAll = false,
  columns = 3,
) {
  const testimonialsObjects = InterviewsMarketingTestimonialsDict();

  const testimonials: ReadonlyArray<InterviewsMarketingTestimonial> = showAll
    ? (() => {
        const items = Object.values(testimonialsObjects).sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : -1,
        );
        const featuredItems = items.filter((item) => item.featured);
        const nonFeaturedItems = items.filter((item) => !item.featured);

        return [...featuredItems, ...nonFeaturedItems];
      })()
    : [
        testimonialsObjects.kiaanCastillo,
        testimonialsObjects.yugantJoshi,
        testimonialsObjects.shrinivasKangal,
        testimonialsObjects.revatiDamle,
        testimonialsObjects.edWang,
        testimonialsObjects.deannaTran,
        testimonialsObjects.kevinGonzalez,
        testimonialsObjects.kana,
        testimonialsObjects.yuhuiWang,
        testimonialsObjects.locChuong,
        testimonialsObjects.luca,
        testimonialsObjects.chenweiZhang,
        testimonialsObjects.shoaibAhmed,
        testimonialsObjects.pratikMehta,
        testimonialsObjects.lunghaoLee,
        testimonialsObjects.nam,
        testimonialsObjects.alan,
        testimonialsObjects.luke,
        testimonialsObjects.larry,
        testimonialsObjects.ryan,
        testimonialsObjects.faithKomlo,
        testimonialsObjects.nafis,
        testimonialsObjects.ismail,
        testimonialsObjects.anand,
        testimonialsObjects.yuChienChan,
        testimonialsObjects.shellyPaul,
        testimonialsObjects.jacky,
      ];

  const testimonialColumns: ReadonlyArray<{
    charCount: number;
    items: Array<InterviewsMarketingTestimonial>;
  }> = Array.from({ length: columns }).map((_) => ({
    charCount: 0,
    items: [],
  }));

  testimonials.forEach((testimonial) => {
    let smallestColumn = 0;

    for (let i = 1; i < columns; i++) {
      if (
        testimonialColumns[i].charCount <
        testimonialColumns[smallestColumn].charCount
      ) {
        smallestColumn = i;
      }
    }
    testimonialColumns[smallestColumn].items.push(testimonial);
    testimonialColumns[smallestColumn].charCount +=
      testimonial.testimonial.length;
  });

  return testimonialColumns.map(({ items }) => items).flat();
}
