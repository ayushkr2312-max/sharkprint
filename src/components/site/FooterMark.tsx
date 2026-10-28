import { SharkMark } from '@/components/ui/Icon';

/** The giant wordmark, signed by Finishers. The Lateral Line ends by turning into its
 *  underline, which then sweeps across (LateralLine sets is-drawn on [data-footer-mark]). */
export function FooterMark() {
  return (
    <div className="wrap mt-10">
      <div data-footer-mark="" className="flex flex-col items-end gap-3 md:flex-row md:gap-6">
        <div className="relative w-full min-w-0 [container-type:inline-size] md:flex-1">
          <span aria-label="Sharkprint" className="block whitespace-nowrap font-logo text-[calc(100cqw/9.7)] leading-[1.05] tracking-[.01em] text-ink">
            SHARKPRINT
          </span>
          <span data-footer-underline="" aria-hidden="true" className="footer-underline absolute inset-x-0 -bottom-2 h-0.5 rounded-full bg-strike" />
        </div>
        <p className="label flex shrink-0 items-center gap-2 pb-1 text-ink-60 md:pb-[.9em]">
          <SharkMark className="h-3.5 w-auto text-ink" />
          By Finishers
        </p>
      </div>
    </div>
  );
}
