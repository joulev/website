import { AnimeLayout } from "~/components/anime/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AnimeLayout isAdmin>{children}</AnimeLayout>;
}
