import { Link } from "~/components/ui/link";

export default function Page() {
  return (
    <div>
      You are authenticated. <Link href="/admin/chat">Chat now</Link>.
    </div>
  );
}
