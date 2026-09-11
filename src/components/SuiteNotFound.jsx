import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/** Both suite routes can be reached with a bad id, so they share one dead end. */
export default function SuiteNotFound({ id }) {
  return (
    <main id="main" className="scroll-mt-24 pt-28 pb-24 text-ink">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h1 className="text-balance text-display-sm font-display font-light mb-4">No such suite</h1>
        <p className="text-pretty text-ink-soft font-light mb-8">
          There is no suite with the id “{id}” in this building.
        </p>
        <Link
          to="/suites"
          className="inline-flex items-center gap-2 eyebrow text-accent hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all suites
        </Link>
      </div>
    </main>
  );
}
