import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
  isGoBack: boolean;
}

function MobileLayout({ children, isGoBack }: Props) {
  const router = useRouter()
  return (
    <div className="h-screen max-w-xl mx-auto bg-white">
      {isGoBack ?
        <a onClick={() => router.back()} className="block my-3">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
        : <Link href={'/map'}>
          <a className="block my-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </a></Link>}
      {children}
    </div>
  );
}

export default MobileLayout;
