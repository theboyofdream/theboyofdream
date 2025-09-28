import { Header, HeaderContent, HeaderNavigation } from "@/components/header";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col w-full h-full">
            <Header className="">
                <HeaderNavigation />
                <HeaderContent className="max-w-2xl">
                    <div>
                        <p>Hello! I&apos;m Full-stack developer</p>
                        <p className="text-sm text-muted-foreground mt-1">Building Web, Mobile & Desktop apps. Open-Source contributor&nbsp;<Link href={'https://team.shiksha?utm-source=theboyofdream'} className="hover:underline underline-offset-4" target="_blank">@team.shiksha</Link></p>
                    </div>
                </HeaderContent>
            </Header>
            {/* <div className="w-full max-w-2xl self-center">
                <p>Featured Projectes</p>
            </div> */}
        </div>
    );
}
