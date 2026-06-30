type Props = {
  html: string;
};

/** Server-rendered Framer middle sections — avoids client hydration of large HTML blobs. */
export function FramerStaticBody({ html }: Props) {
  if (!html) return null;

  return (
    <div
      className="framer-static-body"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
