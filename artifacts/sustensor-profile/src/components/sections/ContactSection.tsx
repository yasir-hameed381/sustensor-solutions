import { ArrowDownToLine, ArrowUpRight, CreditCard, Loader2, Mail, MapPin, MessageCircle, type LucideIcon } from 'lucide-react';

import { company } from '@/content/company';
import { copy } from '@/content/copy';
import { SECTION_IDS } from '@/content/sections';

import { Button } from '../ui/Button';
import { Accent, SectionHeading } from '../ui/Heading';
import { IconTile } from '../ui/IconTile';
import { Section } from '../ui/Section';
import { ContactForm } from './contact/ContactForm';

interface ContactSectionProps {
  pdfBusy: boolean;
  onDownloadProfile: () => void;
  onOpenBusinessCard: () => void;
}

export function ContactSection({ pdfBusy, onDownloadProfile, onOpenBusinessCard }: ContactSectionProps) {
  return (
    <Section id={SECTION_IDS.contact} labelledBy="contact-heading" variant="tint">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeading
            id="contact-heading"
            eyebrow="Next move"
            title={
              <>
                Take Action <Accent>Instantly</Accent>
              </>
            }
            lead={copy.contact.lead}
          />

          <ul className="mt-10 space-y-3">
            <ContactItem
              href={company.whatsappGreetingUrl}
              external
              icon={MessageCircle}
              label="WhatsApp & Phone"
              value={company.phone}
              note={copy.contact.whatsappNote}
            />
            <ContactItem
              href={company.emailUrl}
              icon={Mail}
              label="Corporate Briefing Desk"
              value={company.email}
              note={copy.contact.emailNote}
            />
            <li className="flex items-center gap-4 rounded-xl border border-hairline bg-surface p-5 shadow-xs">
              <IconTile icon={MapPin} />
              <span>
                <span className="block text-eyebrow uppercase text-accent-700">Headquarters</span>
                <span className="mt-1 block text-h4 text-fg">{company.locationLong}</span>
              </span>
            </li>
          </ul>

          <div className="mt-8 rounded-xl border border-hairline bg-surface p-6">
            <h3 className="text-h4 text-fg">Company resources</h3>
            <p className="mt-1 text-small text-fg-muted">Take our capability profile or executive business card with you.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="sm"
                icon={pdfBusy ? Loader2 : ArrowDownToLine}
                iconPosition="leading"
                onClick={onDownloadProfile}
                disabled={pdfBusy}
                className={pdfBusy ? '[&>svg]:animate-spin' : undefined}
              >
                {pdfBusy ? 'Preparing PDF…' : 'Download PDF profile'}
              </Button>
              <Button variant="secondary" size="sm" icon={CreditCard} iconPosition="leading" onClick={onOpenBusinessCard}>
                Business card
              </Button>
            </div>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}

interface ContactItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  note: string;
  external?: boolean;
}

function ContactItem({ href, icon, label, value, note, external = false }: ContactItemProps) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="spotlight group flex items-start gap-4 rounded-xl border border-hairline bg-surface p-5 shadow-xs transition-[border-color,box-shadow,transform] duration-(--duration-base) ease-out-soft hover:-translate-y-0.5 hover:border-accent-300 hover:shadow-md"
      >
        <IconTile icon={icon} />
        <span className="min-w-0 flex-1">
          <span className="block text-eyebrow uppercase text-accent-700">{label}</span>
          <span className="mt-1 block break-words text-body font-semibold text-fg sm:text-h4">
            {/* Lets a long email wrap after the "@" rather than mid-word. */}
            {value.includes('@') ? (
              <>
                {value.split('@')[0]}@<wbr />
                {value.split('@')[1]}
              </>
            ) : (
              value
            )}
          </span>
          <span className="mt-1 block text-small text-fg-muted">{note}</span>
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 shrink-0 text-fg-subtle transition-transform duration-(--duration-fast) group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-700"
        />
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </a>
    </li>
  );
}
