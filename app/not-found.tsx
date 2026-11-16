import { Header, HeaderNavigation } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default function Custom404() {
    return (
        <div className="flex flex-col w-svw h-svh">
            <Header>
                <HeaderNavigation />
            </Header>
            <div className="w-full h-full flex justify-center items-center">
                <span className="w-fit h-fit flex">
                    <span className="flex gap-4 items-center min-h-6 mb-12">
                        <span className="text-3xl font-semibold">404</span>
                        <Separator orientation="vertical" className="bg-primary/30" />
                        <span className="font-extralight">This page could not be found.</span>
                    </span>
                </span>
            </div>
        </div>
    );
}
