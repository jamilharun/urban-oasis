/**
 * Every photograph on the site goes through here.
 *
 * `src` is a base path with no extension — '/images/lounge' — and this serves
 * AVIF first, WebP second. The plates are graded to one target (see the notes
 * in the grading pass) so the set reads as a single shoot rather than eleven
 * stock photos.
 *
 * `display: contents` on the <picture> keeps it out of layout entirely, so the
 * <img> inherits the flex/grid position its container expects.
 */
export default function Plate({ src, alt, className = '', loading = 'lazy', ...rest }) {
  return (
    <picture className="contents">
      <source srcSet={`${src}.avif`} type="image/avif" />
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img src={`${src}.webp`} alt={alt} loading={loading} className={className} {...rest} />
    </picture>
  );
}
