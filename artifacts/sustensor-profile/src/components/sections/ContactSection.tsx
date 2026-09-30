import { ArrowDownToLine, ArrowRight, CreditCard, Loader2, Mail, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { company } from '@/content/company';
import { copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/sections';
import { cn } from '@/lib/utils';

import { Section } from '../shared/Section';
import { SectionHeader } from '../shared/SectionHeader';

interface ContactSectionProps {
  number: string;
  pdfBusy: boolean;
  onDownloadProfile: () => void;
  onOpenBusinessCard: () => void;
}

export function ContactSection({ number, pdfBusy, onDownloadProfile, onOpenBusinessCard }: ContactSectionProps) {
  return (
    <Section id={SECTION_IDS.contact} labelledBy="contact-heading">
      <SectionHeader
        id="contact-heading"
        eyebrow={`${number} / Next move`}
        title={
          <>
            Take Action <span className="text-emerald">Instantly</span>
          </>
        }
        aside={copy.contact.lead}
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <ContactCard
          href={company.whatsappGreetingUrl}
          external
          icon={MessageCircle}
          label="WhatsApp & Phone"
          value={company.phone}
          note={copy.contact.whatsappNote}
        />
        <ContactCard
          href={company.emailUrl}
          icon={Mail}
          label="Corporate Briefing Desk"
          value={company.email}
          note={copy.contact.emailNote}
          dark
        />
      </div>

      <div className="mt-4 flex flex-col gap-4 border border-line bg-paper p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h3 className="display text-xl font-semibold text-forest">Company resources</h3>
          <p className="mt-1 text-sm text-copy">Take our capability profile or executive business card with you.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onDownloadProfile}
            disabled={pdfBusy}
            className="flex items-center gap-2 bg-forest px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-mint transition-colors hover:bg-forest-2 disabled:cursor-wait disabled:opacity-70"
          >
            {pdfBusy ? (
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowDownToLine aria-hidden="true" className="h-4 w-4" />
            )}
            {pdfBusy ? 'Preparing PDF…' : 'Download PDF profile'}
          </button>
          <button
            type="button"
            onClick={onOpenBusinessCard}
            className="flex items-center gap-2 border border-gold px-4 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-forest transition-colors hover:bg-gold"
          >
            <CreditCard aria-hidden="true" className="h-4 w-4" />
            Business card
          </button>
        </div>
      </div>
    </Section>
  );
}

interface ContactCardProps {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
  external?: boolean;
  dark?: boolean;
}

function ContactCard({ href, icon: Icon, label, value, note, external = false, dark = false }: ContactCardProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn(
        'group relative flex min-h-[230px] flex-col justify-between overflow-hidden border p-6 transition-colors sm:p-8',
        dark ? 'border-forest bg-forest text-ivory hover:bg-forest-2' : 'border-line-green bg-mist hover:border-emerald hover:bg-mist-2',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute -right-12 -top-12 h-40 w-40 rounded-full border transition-transform duration-500 group-hover:scale-125',
          dark ? 'border-teal/50' : 'border-line-green',
        )}
      />
      <span className="relative flex items-center justify-between">
        <span className={cn('flex h-11 w-11 items-center justify-center', dark ? 'bg-gold text-forest' : 'bg-forest text-mint')}>
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <ArrowRight
          aria-hidden="true"
          className={cn('h-5 w-5 transition-transform group-hover:translate-x-1', dark ? 'text-mint' : 'text-emerald')}
        />
      </span>
      <span className="relative block">
        <span className={cn('mono block text-[9px]', dark ? 'text-sage' : 'text-emerald')}>{label}</span>
        <span className={cn('display mt-3 block break-all font-medium sm:text-3xl', dark ? 'text-2xl text-ivory' : 'text-2xl text-forest')}>
          {value}
        </span>
        <span className={cn('mt-2 block text-sm leading-6', dark ? 'text-on-dark' : 'text-copy')}>{note}</span>
      </span>
    </a>
  );
}
