import { lqip } from '../data/lqip';

/**
 * Every photograph on the site goes through here.
 *
 * `src` is a base path with no extension — '/images/lounge' — and this serves
 * AVIF first, WebP second. The plates are graded to one target so the set
 * reads as a single shoot rather than eleven stock photos.
 *
 * `display: contents` on the <picture> keeps it out of layout entirely, so the
 * <img> inherits the flex/grid position its container expects. The blurred
 * placeholder is the <img>'s own background for the same reason — a wrapper
 * element would break every plate that relies on object-cover inside a sized
 * parent.
 */
export default function Plate({ src, alt, className = '', loading = 'lazy', style, ...rest }) {
  const placeholder = lqip[src];

  return (
    <picture className="contents">
      <source srcSet={`${src}.avif`} type="image/avif" />
      <source srcSet={`${src}.webp`} type="image/webp" />
      <img
        src={`${src}.webp`}
        alt={alt}
        loading={loading}
        className={className}
        style={
          placeholder
            ? {
                backgroundImage: `url("${placeholder}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                ...style,
              }
            : style
        }
        {...rest}
      />
    </picture>
  );
}
