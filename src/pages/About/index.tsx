import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Gem, Heart, Shield, Sparkles } from 'lucide-react';

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const TIMELINE = [
  { year: '1989', title: 'The Beginning', description: 'Founded in the heart of Jaipur, Estele started as a small family atelier dedicated to timeless jewellery craftsmanship.' },
  { year: '1998', title: 'First Retail Store', description: 'Opened our flagship store, bringing handcrafted jewellery directly to discerning customers.' },
  { year: '2007', title: 'Pan-India Expansion', description: 'Expanded to 25+ retail locations across India, becoming a trusted name in premium fashion jewellery.' },
  { year: '2015', title: 'Digital Journey', description: 'Launched our e-commerce platform, making our collections accessible to jewellery lovers worldwide.' },
  { year: '2020', title: 'Sustainable Crafting', description: 'Introduced eco-friendly packaging and ethical sourcing practices across our entire supply chain.' },
  { year: '2024', title: 'Global Presence', description: 'Now serving customers in 30+ countries with the same passion and quality that started it all.' },
];

const VALUES = [
  { icon: Gem, title: 'Craftsmanship', description: 'Every piece is meticulously crafted by skilled artisans with decades of experience.' },
  { icon: Heart, title: 'Passion', description: 'We pour love into every design, ensuring each piece tells a unique story.' },
  { icon: Shield, title: 'Quality', description: 'We use only the finest materials, backed by our quality guarantee.' },
  { icon: Sparkles, title: 'Innovation', description: 'Blending traditional techniques with modern design for timeless elegance.' },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="relative h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1515562141589-67f0d93e6b50?w=1600&h=900&fit=crop"
          alt="Estele Craftsmanship"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="font-serif text-5xl font-semibold text-ivory sm:text-6xl">OUR STORY</h1>
            <p className="mt-4 font-sans text-lg text-ivory/80">Crafting Timeless Elegance Since 1989</p>
          </motion.div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <AnimatedSection className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-semibold text-charcoal">A Legacy of Elegance</h2>
          <p className="font-sans text-base leading-relaxed text-charcoal-muted">
            Estele was born from a deep passion for creating jewellery that transcends trends and time.
            What began as a small family atelier in Jaipur has grown into one of India&apos;s most beloved
            premium fashion jewellery brands. Our commitment to quality, artistry, and the pursuit
            of beauty drives everything we do.
          </p>
        </AnimatedSection>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <AnimatedSection className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-semibold text-charcoal">Our Craft</h2>
              <p className="mb-4 font-sans text-base leading-relaxed text-charcoal-muted">
                Each piece of Estele jewellery is a labour of love, handcrafted by skilled artisans
                who have honed their craft over generations. We combine traditional Indian
                jewellery-making techniques with contemporary design sensibilities to create
                pieces that are both timeless and modern.
              </p>
              <p className="font-sans text-base leading-relaxed text-charcoal-muted">
                From the initial sketch to the final polish, every step is guided by our unwavering
                commitment to quality. We source only the finest materials &mdash; from 24K gold plating
                to ethically sourced crystals &mdash; ensuring each piece meets our exacting standards.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=700&fit=crop"
                alt="Jewellery Craftsmanship"
                className="rounded-md object-cover shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 rounded-sm bg-gold px-6 py-4 shadow-md">
                <span className="block font-serif text-2xl font-bold text-ivory">35+</span>
                <span className="font-sans text-xs tracking-wider text-ivory">Years of Craft</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="mb-4 font-serif text-3xl font-semibold text-charcoal">Our Values</h2>
          <p className="mx-auto max-w-xl font-sans text-charcoal-muted">
            The principles that guide every piece we create and every interaction we have.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <AnimatedSection key={value.title} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cream">
                <value.icon className="h-7 w-7 text-gold" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 font-serif text-xl font-semibold text-charcoal">{value.title}</h3>
              <p className="font-sans text-sm text-charcoal-muted">{value.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section className="bg-charcoal">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-3xl font-semibold text-ivory">Our Journey</h2>
            <p className="mx-auto max-w-xl font-sans text-ivory/60">
              Milestones that shaped who we are today.
            </p>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gold/30 md:block" />

            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <AnimatedSection key={item.year}>
                  <div className={`flex flex-col items-center gap-4 md:flex-row ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center md:text-inherit`}>
                      <span className="mb-1 block font-serif text-2xl font-bold text-gold">{item.year}</span>
                      <h3 className="mb-1 font-serif text-lg font-semibold text-ivory">{item.title}</h3>
                      <p className="font-sans text-sm text-ivory/60">{item.description}</p>
                    </div>
                    <div className="hidden h-4 w-4 shrink-0 rounded-full border-2 border-gold bg-charcoal md:block" />
                    <div className="flex-1" />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=700&fit=crop"
              alt="Estele Team"
              className="rounded-md object-cover shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="mb-6 font-serif text-3xl font-semibold text-charcoal">The Team Behind the Sparkle</h2>
            <p className="mb-4 font-sans text-base leading-relaxed text-charcoal-muted">
              Our team of designers, artisans, and jewellery enthusiasts work together to bring
              every collection to life. Led by a vision to make premium fashion jewellery accessible,
              we pride ourselves on our attention to detail and dedication to customer satisfaction.
            </p>
            <p className="font-sans text-base leading-relaxed text-charcoal-muted">
              From our design studios in Jaipur to our fulfilment centres across India,
              every member of the Estele family shares a common goal &mdash; to create jewellery
              that makes you feel extraordinary.
            </p>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
