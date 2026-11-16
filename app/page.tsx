import { Header, HeaderContent, HeaderNavigation } from "@/components/header";
import { CircularText } from "@/components/ui/circular-text";
import { SpinningText } from "@/components/ui/spinning-text";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col w-full h-full">
            <Header className="">
                <HeaderNavigation />
                <HeaderContent className="max-w-2xl">
                    <div>
                        <p className="text-xl">Hello! I&apos;m Full-stack developer</p>
                        <p className="text-sm text-muted-foreground mt-1">I build apps - Web, Mobile & Desktop & Open-Source contributor&nbsp;<Link href={'https://team.shiksha?utm=theboyofdream'} className="link" target="_blank">@team.shiksha</Link></p>
                    </div>
                </HeaderContent>
            </Header>
            {/* <div className="w-full max-w-2xl self-center">
                <p>Featured Projectes</p>
            </div> */}
            <span className="fixed bottom-2 left-2">
                {/* <CircularText
                    text="OPEN FOR WORK * OPEN FOR WORK * "
                    onHover="slowDown"
                    spinDuration={15}
                    className="w-[100px] h-[100px] text-muted-foreground hover:text-primary"
                    textStyle="text-xs"
                /> */}
            </span>
            <SpinningText className="text-xs cursor-pointer bg-amber-500 fixed bottom-20 left-20" radius={7.5} onHover="pause" >
                {"OPEN FOR WORK * ".repeat(2)}
            </SpinningText>
            <Cursor/>
        </div>
    );
}


function Cursor(){
    return <div
    className="fixed top-0 left-0 text-8xl"
    >
        hii
    </div>
}