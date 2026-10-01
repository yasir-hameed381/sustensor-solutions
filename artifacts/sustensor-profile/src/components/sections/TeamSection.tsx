import type { CSSProperties, ReactNode } from 'react';
import { ExternalLink, Handshake, Linkedin, Network, Users, type LucideIcon } from 'lucide-react';

import { SECTION_IDS } from '@/content/sections';
import { expertNetwork, leadershipTeam, partnerNetwork } from '@/content/team';
import type { Person } from '@/content/types';

import { PersonAvatar } from '../shared/PersonAvatar';
import { Card } from '../ui/Card';
import { GlanceCard } from '../ui/GlanceCard';
import { Accent, SectionHeading } from '../ui/Heading';
import { Section } from '../ui/Section';

export function TeamSection() {
  return (
    <Section id={SECTION_IDS.team} labelledBy="team-heading" variant="surface">
      <SectionHeading
        id="team-heading"
        eyebrow="Our team"
        title={
          <>
            The People <Accent>Behind the Work</Accent>
          </>
        }
        lead="A leadership team backed by specialist experts and trusted delivery partners."
        aside={
          <GlanceCard
            title="The network"
            items={[
              { value: leadershipTeam.length, label: 'Leaders', icon: Users },
              { value: expertNetwork.length, label: 'Experts', icon: Network },
              { value: partnerNetwork.length, label: 'Partners', icon: Handshake, tone: 'brand' },
            ]}
          />
        }
      />

      <TeamGroup id={SECTION_IDS.teamLeadership} icon={Users} title="Leadership team">
        <ul className="grid gap-4 md:grid-cols-2 lg:gap-6">
          {leadershipTeam.map((person, index) => (
            <li key={person.name} data-reveal style={{ '--reveal-index': index } as CSSProperties}>
              <Card padding="lg" interactive className="flex h-full flex-col gap-6 sm:flex-row sm:items-start">
                <LinkedInButton person={person} />
                <PersonAvatar name={person.name} image={person.image} size="lg" />
                <div className={person.linkedInUrl ? 'pr-10' : undefined}>
                  <h4 className="text-h3 text-fg">{person.name}</h4>
                  <p className="mt-1 text-small font-semibold text-accent-700">{person.role}</p>
                  <p className="mt-4 text-body text-fg-muted">{person.bio}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </TeamGroup>

      <TeamGroup id={SECTION_IDS.teamExperts} icon={Network} title="Expert network">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {expertNetwork.map((expert, index) => (
            <li key={expert.name} data-reveal style={{ '--reveal-index': index } as CSSProperties}>
              <Card interactive padding="sm" className="flex h-full items-start gap-4 sm:flex-col sm:gap-0">
                <LinkedInButton person={expert} />
                <PersonAvatar name={expert.name} image={expert.image} />
                <div className={expert.linkedInUrl ? 'min-w-0 pr-10 sm:mt-5 sm:pr-0' : 'min-w-0 sm:mt-5'}>
                  <h4 className="text-h4 text-fg">{expert.name}</h4>
                  <p className="mt-0.5 text-small font-medium text-accent-700">{expert.role}</p>
                  <p className="mt-2 text-small text-fg-muted sm:mt-3">{expert.bio}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </TeamGroup>

      <TeamGroup id={SECTION_IDS.teamPartners} icon={Handshake} title="Partner network">
        <ul className="grid gap-4 sm:grid-cols-3">
          {partnerNetwork.map((partner) => {
            const content = (
              <>
                <span
                  aria-hidden="true"
                  className="flex size-12 shrink-0 items-center justify-center rounded-md bg-ink-900 text-h4 text-white"
                >
                  {partner.name.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block text-h4 text-fg">{partner.name}</span>
                  <span className="mt-0.5 block text-small text-fg-muted">{partner.description}</span>
                </span>
              </>
            );
            const className = 'spotlight flex h-full items-center gap-4 rounded-xl border border-hairline bg-surface p-5 shadow-xs sm:p-6';
            return (
              <li key={partner.name}>
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`${className} transition-[border-color,box-shadow] duration-(--duration-base) hover:border-accent-300 hover:shadow-md`}
                  >
                    {content}
                    <ExternalLink aria-hidden="true" className="ml-auto size-4 shrink-0 text-accent-700" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                ) : (
                  <div className={className}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </TeamGroup>
    </Section>
  );
}

/** Icon-only LinkedIn link in the card's top-right corner; renders nothing without a URL. */
function LinkedInButton({ person }: { person: Person }) {
  if (!person.linkedInUrl) return null;
  return (
    <a
      href={person.linkedInUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`${person.name} on LinkedIn (opens in a new tab)`}
      className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full text-fg-subtle transition-colors duration-(--duration-fast) hover:bg-accent-50 hover:text-accent-700"
    >
      <Linkedin aria-hidden="true" className="size-5" />
    </a>
  );
}

function TeamGroup({ id, icon: Icon, title, children }: { id: string; icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <div id={id} className="mt-14 lg:mt-16">
      <h3 className="mb-5 flex items-center gap-2.5 text-eyebrow uppercase text-fg">
        <Icon aria-hidden="true" className="size-4 text-accent-700" />
        {title}
        <span aria-hidden="true" className="ml-2 h-px flex-1 bg-hairline" />
      </h3>
      {children}
    </div>
  );
}
