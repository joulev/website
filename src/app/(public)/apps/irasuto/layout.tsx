import type { Metadata } from "next";

import { Title } from "~/components/title";
import { Button, LinkButton } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { opengraphImage } from "~/app/opengraph";

import { NavigateButton } from "./navigate-button";

function CreditDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          転載について <span className="text-xs">(ja)</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>絵の転載について</DialogTitle>
        </DialogHeader>
        <div className="prose">
          <p>イラストレーターの方々様へ、</p>
          <p>
            日本語が下手なので、日本語の間違いなどは申し訳ありません。翻訳者を使わないで書いてみました。
          </p>
          <p>
            このページで、私は一番好きな絵を集まっています。クレジットとツイッタのリンクも書いてあるのですが、これが
            <strong>無料の転載</strong>
            ということに違いありません。私はこのページから全然お金をつけていないし、ただ大好きな絵のコレクションを作ってみたいだけなので、貴方にここの転載も宜しければ、とても嬉しいです。
          </p>
          <p>
            しかし、もしここで貴方の絵があって、貴方はその絵をこのページから削除したい場合は、遠慮なく私にメールを送ってください。私はすぐに削除します。
          </p>
          <p>たくさんの美しい絵を描いてくれてありがとうございます。これからも頑張ってください！</p>
        </div>
        <DialogFooter>
          <LinkButton className="w-full sm:w-auto" href="mailto:me@joulev.dev">
            メールで削除をリクエストする
          </LinkButton>
          <DialogClose asChild>
            <Button className="w-full sm:w-auto" variants={{ variant: "primary" }}>
              閉じる
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container">
      <Card className="flex flex-col p-0">
        <div className="bg-bg-darker py-6">
          <div className="container flex max-w-screen-md flex-col gap-6">
            <Title
              title="irasuto"
              titleLabel={<span className="text-base text-text-tertiary">イラスト</span>}
              subtitle="This is where I store my collection of some of the most gorgeous illustrations related to Japanese popular culture that I’ve found on Twitter. Enjoy :)"
            />
            <div className="flex flex-col items-stretch gap-x-6 gap-y-3 sm:flex-row">
              <NavigateButton />
              <CreditDialog />
            </div>
          </div>
        </div>
        {children}
      </Card>
    </main>
  );
}

export const metadata: Metadata = {
  title: "joulev.dev » irasuto",
  description: "My collection of illustrations",
  openGraph: {
    title: "joulev.dev » irasuto",
    description: "My collection of illustrations",
    url: "/apps/irasuto",
    ...opengraphImage,
  },
};
