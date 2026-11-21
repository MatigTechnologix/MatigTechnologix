import { Footer, PageHero } from "../../../components/site";
import TestimonialCards from "./TestimonialCards";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getTestimonials() {
  const res = await fetch(`${SURL}/rest/v1/Testimonial?order=createdAt.desc`, {
    headers: { apikey: SKEY, Authorization: `Bearer ${SKEY}` },
    cache: "no-store",
  });
  return res.json();
}

export default async function TestimonialsPage() {
  const items = await getTestimonials();
  return (
    <>
      <PageHero eyebrow="Testimonials" title="What our clients say." copy="Real feedback from real B2B teams we have worked with." />
      <main style={{background:"#f8fafc",padding:"80px 0"}}>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"0 24px"}}>
          <TestimonialCards items={items||[]} />
        </div>
      </main>
      <Footer />
    </>
  );
}
