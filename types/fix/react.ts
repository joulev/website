import "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style -- n/a
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
