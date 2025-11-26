import { type ReactNode } from "react";

interface SocialProps {
  url: string;
  children: ReactNode;
}
function Social({ url, children }: SocialProps) {
  return (
    <a href={url} rel="noopener noreferrer" target="__blank">
      {children}
    </a>
  );
}

export default Social;
