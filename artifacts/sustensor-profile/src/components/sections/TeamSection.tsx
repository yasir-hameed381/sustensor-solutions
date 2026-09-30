import { ExternalLink, Handshake, Linkedin, Network, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { SECTION_IDS } from '@/content/sections';
import { expertNetwork, leadershipTeam, partnerNetwork } from '@/content/team';

import { PersonAvatar } from '../shared/PersonAvatar';
import { Section } from '../shared/Section';
import { SectionHeader } from '../shared/SectionHeader';

export function TeamSection({ number }: { number: string }) {
  return (
    <Section id={SECTION_IDS.team} labelledBy="team-heading" tone="forest">
      <SectionHeader
        id="team-heading"
        onDark
        eyebrow={`${number} / Our team`}
        title={
          <>
            The People <span className="text-mint">Behind the Work</span>
          </>
        }
        aside="A leadership team backed by specialist experts and trusted delivery partners."
      />

      <TeamGroup id={SECTION_IDS.teamLeadership} icon={Users} title="Leadership team">
        <ul className="grid gap-4 md:grid-cols-2">
          {leadershipTeam.map((person) => (
            <li key={person.name} className="flex flex-col gap-5 border border-teal/50 bg-forest-2 p-6 sm:flex-row sm:items-start sm:p-8">
              <PersonAvatar name={person.name} photo={person.photo} className="display h-16 w-16 bg-mint text-xl text-forest" />
              <div>
                <h4 className="display text-2xl font-medium text-ivory">{person.name}</h4>
                <p className="mt-1 text-sm font-medium text-mint">{person.role}</p>
                <p className="mt-3 text-sm leading-6 text-on-dark">{person.bio}</p>
                {person.linkedInUrl && (
                  <a
                    href={person.linkedInUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-sage hover:text-mint"
                  >
                    <Linkedin aria-hidden="true" className="h-3.5 w-3.5" />
                    LinkedIn profile
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </TeamGroup>

      <TeamGroup id={SECTION_IDS.teamExperts} icon={Network} title="Expert network">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {expertNetwork.map((expert) => (
            <li key={expert.name} className="border border-teal/40 p-5">
              <PersonAvatar name={expert.name} photo={expert.photo} className="h-11 w-11 border border-sage/60 text-sm text-mint" />
              <h4 className="mt-4 text-base font-semibold text-ivory">{expert.name}</h4>
              <p className="mt-1 text-xs text-sage">{expert.role}</p>
              <p className="mt-3 hidden text-xs leading-5 text-on-dark sm:block">{expert.bio}</p>
            </li>
          ))}
        </ul>
      </TeamGroup>

      <TeamGroup id={SECTION_IDS.teamPartners} icon={Handshake} title="Partner network">
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {partnerNetwork.map((partner) => {
            const content = (
              <>
                <span className="display text-xl font-medium text-ivory">{partner.name}</span>
                <span className="mt-1 text-xs text-sage">{partner.description}</span>
              </>
            );
            return (
              <li key={partner.name}>
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-full flex-col items-center justify-center border border-teal/40 bg-forest-2/60 p-6 text-center transition-colors hover:border-sage"
                  >
                    {content}
                    <ExternalLink aria-hidden="true" className="mt-2 h-3.5 w-3.5 text-sage" />
                  </a>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center border border-teal/40 bg-forest-2/60 p-6 text-center">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </TeamGroup>
    </Section>
  );
}

interface TeamGroupProps {
  id: string;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

function TeamGroup({ id, icon: Icon, title, children }: TeamGroupProps) {
  return (
    <div id={id} className="mt-14 first-of-type:mt-16">
      <h3 className="mono mb-5 flex items-center gap-2 text-[10px] font-bold text-sage">
        <Icon aria-hidden="true" className="h-4 w-4" />
        {title}
      </h3>
      {children}
    </div>
  );
}
