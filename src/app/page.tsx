import Link from "next/link";

export default function Home() {
  return (
    <>
      Halaman utama bxnime!
      <Link href="/anime" className="bg-blue-400 rounded p-4 flex mt-8 w-52 text-center">Pergi ke anime list</Link>
    </>
  );
}
