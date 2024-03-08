import Link from "next/link";

import Navigation from "../components/navigation";

export default function NotFound() {
  return (
    <div>
      <Navigation />
      <h1>Not Found!</h1>
      <Link href="/">메인으로 돌아가기</Link>
    </div>
  );
}
