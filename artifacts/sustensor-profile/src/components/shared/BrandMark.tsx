import { company } from '@/content/company';

export function BrandMark() {
  return (
    <span className="flex items-center gap-3.5">
      <img src={company.logo.onDark} alt="" className="h-11 w-auto object-contain sm:h-12" />
      <span className="display text-[20px] font-semibold leading-none tracking-[-0.03em] text-ivory sm:text-[22px]">
        {company.shortName}
      </span>
    </span>
  );
}
