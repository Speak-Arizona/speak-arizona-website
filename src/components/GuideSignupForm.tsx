// Shared AWeber sign-up form for the free "10 Tips to Look More Confident While
// Speaking" guide — list awlist6811283 (Speak Arizona, guide lead magnet),
// confirmed opt-in. Posts directly to AWeber; on submit the browser is sent to
// AWeber's confirmation ("check your email") page. AWeber requires both name and
// email (meta_required). Used on the guide page and the end-of-article block on
// episode posts, so the exact form markup lives in one place.
//
// `adTracking` sets AWeber's own meta_adtracking field (AWeber-side attribution,
// not site analytics) so signups can be told apart by placement. `idPrefix`
// keeps the input ids unique if the form ever renders twice on one page.
export default function GuideSignupForm({
  submitLabel = "SEND ME THE GUIDE",
  adTracking = "lead-magnet-confident-speaking",
  idPrefix = "lm",
}: {
  submitLabel?: string;
  adTracking?: string;
  idPrefix?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <form
        method="post"
        action="https://www.aweber.com/scripts/addlead.pl"
        acceptCharset="UTF-8"
        className="space-y-3"
        aria-label="Download the free guide"
      >
        <input type="hidden" name="meta_web_form_id" value="872450051" />
        <input type="hidden" name="meta_split_id" value="" />
        <input type="hidden" name="listname" value="awlist6811283" />
        <input
          type="hidden"
          name="redirect"
          value="https://speakarizona.com/guide-thank-you/"
        />
        <input
          type="hidden"
          name="meta_redirect_onlist"
          value="https://speakarizona.com/guide-thank-you/"
        />
        <input type="hidden" name="meta_adtracking" value={adTracking} />
        <input type="hidden" name="meta_message" value="1" />
        <input type="hidden" name="meta_required" value="name,email" />
        <input type="hidden" name="meta_tooltip" value="" />

        <label htmlFor={`${idPrefix}-name`} className="sr-only">
          First name
        </label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          name="name"
          required
          placeholder="Your first name"
          className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-blue"
        />
        <label htmlFor={`${idPrefix}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${idPrefix}-email`}
          type="email"
          name="email"
          required
          placeholder="Your email address"
          className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-text placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-blue"
        />
        <button
          type="submit"
          name="submit"
          value="Submit"
          className="w-full bg-blue text-white font-heading font-bold text-sm px-8 py-4 rounded-full hover:bg-blue-light transition-colors"
        >
          {submitLabel}
        </button>
      </form>
      <p className="text-text-light text-xs text-center mt-3">
        Check your inbox to confirm, and your guide arrives right after. No spam,
        unsubscribe anytime.
      </p>
    </div>
  );
}
