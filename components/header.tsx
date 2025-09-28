"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useCallback } from "react"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"

function Header({
    className,
    ...props
}: React.ComponentProps<"header"> & {
    children: Array<React.ReactElement<typeof HeaderNavigation> | React.ReactElement<typeof HeaderContent>>
}) {
    return (
        <header
            className={cn("w-full p-8 flex flex-col gap-4 justify-center", className)}
            {...props}
        />
    )
}

function HeaderNavigation() {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const toggleTheme = useCallback(() => {
        setTheme(theme === "light" ? "dark" : "light")
    }, [theme, setTheme])

    const links = [
        { href: "/projects", label: "Projects" },
        { href: "/lab", label: "Lab" },
        { href: "/stats", label: "Stats" },
        { href: "/resources", label: "Resources" },
    ]

    return (
        <div className="w-full max-w-4xl self-center flex justify-between">
            <span></span>
            <div className="flex gap-4 text-sm items-center">
                {links.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        className={
                            cn(
                                // "hover:underline underline-offset-4",
                                pathname.toLowerCase().startsWith(href.toLowerCase())
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground dark:text-muted-foreground/60 hover:text-primary dark:hover:text-primary"
                            )
                        }
                    >
                        {label}
                    </Link>
                ))}
                <Button variant={"ghost"} onClick={toggleTheme} className="text-muted-foreground dark:text-muted-foreground/60 hover:text-primary dark:hover:text-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4.5"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M12 3l0 18" />
                        <path d="M12 9l4.65 -4.65" />
                        <path d="M12 14.3l7.37 -7.37" />
                        <path d="M12 19.6l8.85 -8.85" />
                    </svg>
                </Button>
            </div>
        </div>
    )
}

function HeaderContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            className={cn("w-full max-w-4xl self-center flex justify-between", className)}
            {...props}
        />
    )
}

export { Header, HeaderNavigation, HeaderContent }