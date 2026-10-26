// app/dashboard/inventory/new/page.tsx

'use client';

import { useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  Camera,
  X,
  Plus,
  Loader2,
  CheckCircle2,
  Tag,
  Car,
  Banknote,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { PART_CATEGORIES, VEHICLE_MAKES } from '@/lib/constants';
import { ListingCard } from '@/components/marketplace/ListingCard';

// ============================================================
// TYPES
// ============================================================

interface ListingForm {
  title: string;
  description: string;
  priceKes: number;
  category: string;
  condition: 'new' | 'used';
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
}

const INITIAL_FORM: ListingForm = {
  title: '',
  description: '',
  priceKes: 0,
  category: '',
  condition: 'used',
  make: '',
  model: '',
  yearFrom: 2010,
  yearTo: 2020,
};

// ============================================================
// PAGE
// ============================================================

export default function NewListingPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ListingForm>(INITIAL_FORM);
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = <K extends keyof ListingForm>(key: K, value: ListingForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast.error('Maximum 5 photos allowed');
      return;
    }
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    if (errors.images) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.images;
        return next;
      });
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => {
      const next = [...prev];
      URL.revokeObjectURL(next[index].preview);
      next.splice(index, 1);
      return next;
    });
  };

  // ============================================================
  // LIVE PREVIEW DATA
  // ============================================================
  const previewListing = useMemo(() => {
    const fitment =
      form.make && form.model
        ? `${form.make} ${form.model} ${form.yearFrom}-${form.yearTo}`
        : form.make
        ? form.make
        : 'Universal fitment';

    return {
      id: 'preview',
      title: form.title || 'Your listing title',
      fitment: fitment,
      priceKes: form.priceKes,
      location: 'Nairobi',
      imageUrl: images[0]?.preview || 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=400&auto=format&fit=crop',
      isVerified: true,
    };
  }, [form, images]);

  // ============================================================
  // VALIDATION
  // ============================================================
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (form.priceKes <= 0) newErrors.priceKes = 'Price must be greater than 0';
    if (!form.category) newErrors.category = 'Category is required';
    if (images.length === 0) newErrors.images = 'At least one photo is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fix the errors below');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call (replace with useCreateListingMutation later)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Listing published!', {
      description: 'Your part is now live on the marketplace.',
    });

    router.push('/dashboard/inventory');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="h-9 w-9 flex items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-charcoal-higher transition-colors"
          aria-label="Back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Add New Listing</h1>
          <p className="text-sm text-text-secondary">Takes less than 60 seconds.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-6">
          
          {/* LEFT: FORM */}
          <div className="space-y-6">

            {/* Photos */}
            <Section
              icon={<Camera className="h-5 w-5 text-primary" />}
              title="Photos"
              description="Add up to 5 clear photos of the part."
            >
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden border border-border-subtle bg-charcoal group"
                  >
                    <Image src={img.preview} alt={`Upload ${index + 1}`} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-primary text-[9px] font-bold text-primary-foreground">
                        COVER
                      </span>
                    )}
                  </div>
                ))}

                {images.length < 5 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      'aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors',
                      errors.images
                        ? 'border-red-500/50 bg-red-500/5 hover:bg-red-500/10'
                        : 'border-border-subtle hover:border-primary/50 hover:bg-charcoal-higher bg-charcoal'
                    )}
                  >
                    <Plus className="h-6 w-6 text-text-muted" />
                    <span className="text-[10px] font-medium text-text-muted">Add</span>
                  </button>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
              {errors.images && <p className="text-xs text-red-500 mt-2">{errors.images}</p>}
            </Section>

            {/* Basic Details */}
            <Section
              icon={<Tag className="h-5 w-5 text-primary" />}
              title="Part Details"
              description="What are you selling?"
            >
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    placeholder="e.g., Brake Discs & Pads (Front)"
                    className={cn(
                      'w-full h-12 px-4 bg-charcoal border rounded-xl text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors',
                      errors.title ? 'border-red-500/50' : 'border-border-subtle focus:border-primary'
                    )}
                  />
                  {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => updateField('category', e.target.value)}
                      className={cn(
                        'w-full h-12 px-4 bg-charcoal border rounded-xl text-sm text-text-primary outline-none transition-colors cursor-pointer',
                        errors.category ? 'border-red-500/50' : 'border-border-subtle focus:border-primary'
                      )}
                    >
                      <option value="">Select category</option>
                      {PART_CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                      Condition
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['new', 'used'] as const).map((cond) => (
                        <button
                          key={cond}
                          type="button"
                          onClick={() => updateField('condition', cond)}
                          className={cn(
                            'h-12 rounded-xl border text-sm font-medium transition-colors capitalize',
                            form.condition === cond
                              ? 'bg-primary/10 border-primary/50 text-primary'
                              : 'bg-charcoal border-border-subtle text-text-secondary hover:border-primary/30'
                          )}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                    Description <span className="text-text-muted">(optional)</span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Mention any details about the part's condition, fitment, or origin."
                    rows={3}
                    className="w-full px-4 py-3 bg-charcoal border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-primary outline-none resize-none transition-colors"
                  />
                </div>
              </div>
            </Section>

            {/* Fitment */}
            <Section
              icon={<Car className="h-5 w-5 text-primary" />}
              title="Vehicle Fitment"
              description="Which vehicles does this part fit?"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                      Make <span className="text-text-muted">(optional)</span>
                    </label>
                    <select
                      value={form.make}
                      onChange={(e) => updateField('make', e.target.value)}
                      className="w-full h-12 px-4 bg-charcoal border border-border-subtle rounded-xl text-sm text-text-primary focus:border-primary outline-none cursor-pointer transition-colors"
                    >
                      <option value="">Any make</option>
                      {VEHICLE_MAKES.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                      Model <span className="text-text-muted">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={form.model}
                      onChange={(e) => updateField('model', e.target.value)}
                      placeholder="e.g., Fielder, Axio"
                      className="w-full h-12 px-4 bg-charcoal border border-border-subtle rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-1.5 block">Year from</label>
                    <input
                      type="number"
                      value={form.yearFrom}
                      onChange={(e) => updateField('yearFrom', parseInt(e.target.value))}
                      className="w-full h-12 px-4 bg-charcoal border border-border-subtle rounded-xl text-sm text-text-primary focus:border-primary outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-text-secondary mb-1.5 block">Year to</label>
                    <input
                      type="number"
                      value={form.yearTo}
                      onChange={(e) => updateField('yearTo', parseInt(e.target.value))}
                      className="w-full h-12 px-4 bg-charcoal border border-border-subtle rounded-xl text-sm text-text-primary focus:border-primary outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            </Section>

            {/* Pricing */}
            <Section
              icon={<Banknote className="h-5 w-5 text-primary" />}
              title="Pricing"
              description="Set a price for your part."
            >
              <div>
                <label className="text-sm font-medium text-text-secondary mb-1.5 block">
                  Price (KES) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-text-muted">
                    KES
                  </span>
                  <input
                    type="number"
                    value={form.priceKes || ''}
                    onChange={(e) => updateField('priceKes', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className={cn(
                      'w-full h-14 pl-14 pr-4 bg-charcoal border rounded-xl text-lg font-bold text-secondary tabular-nums outline-none transition-colors',
                      errors.priceKes ? 'border-red-500/50' : 'border-border-subtle focus:border-primary'
                    )}
                  />
                </div>
                {errors.priceKes && <p className="text-xs text-red-500 mt-1">{errors.priceKes}</p>}
              </div>
            </Section>

          </div>

          {/* RIGHT: LIVE PREVIEW */}
          <div className="xl:sticky xl:top-32 xl:self-start space-y-4">
            
            {/* Preview Label */}
            <div className="flex items-center gap-2 px-1">
              <Eye className="h-4 w-4 text-text-muted" />
              <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Live Preview
              </span>
            </div>

            {/* Card Preview */}
            <ListingCard {...previewListing} />

            {/* Hint */}
            <div className="p-4 rounded-xl bg-charcoal-elevated border border-border-subtle">
              <p className="text-xs text-text-secondary leading-relaxed">
                <strong className="text-text-primary">This is how buyers will see your listing.</strong>
                {' '}Fill in the form on the left — this preview updates live as you type.
              </p>
            </div>

          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-border-subtle">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            className="text-text-secondary hover:text-text-primary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-600 transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Publish Listing
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ============================================================
// SECTION COMPONENT
// ============================================================

function Section({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-2xl border border-border-subtle bg-charcoal-elevated">
      <div className="flex items-start gap-3 mb-5">
        <div className="h-10 w-10 rounded-lg bg-charcoal flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}