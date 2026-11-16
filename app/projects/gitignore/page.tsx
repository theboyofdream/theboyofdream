import { Label } from "@/components/ui/label"
import MultipleSelector, { Option } from "@/components/ui/multiselect"
import { useCallback, useState } from 'react'

async function fetchGitignoreList() {
    fetch('https://')
}

export default function Gitignore() {
    const [selectedItems, setSelectedItems] = useState([])
    const gitignoreList = useSWR(
        `/api/gitignore/list`,
        (...args)=>fetch(...args).then(res=>res.text()).then(res=>res.split(",").map(v=>({label: v, value: v})))
    )
    
    const gitignoreContent = useSWR(
        null,
        (url)=>fetch(url).then(res=>res.text()).then(res=>res.split(","))
    )

    const fetchGitignoreContents = useCallback(()=>{
        const items = selectedItems.map(i=>i.value).join(",")
        console.log(items)
        gitignoreContent.mutate(`/api/gitignore/${items}`)
    }, [selectedItems])

    // console.log(gitignoreList.data)
    console.log(gitignoreContent.data)


    return (
        <section className="w-svw h-svh flex justify-center">
            <div className="flex-1 max-w-md">
                <MultipleSelector
                    commandProps={{
                        label: "Select languages/frameworks",
                    }}
                    onChange={setSelectedItems}
                    disabled={gitignoreList.isLoading}
                    defaultOptions={[]}
                    options={gitignoreList.data || []}
                    placeholder="Select languages/frameworks"
                    emptyIndicator={<p className="text-center text-sm">No results found</p>}
                />

<button onClick={fetchGitignoreContents}>gene</button>
                <span>

                </span>
            </div>
        </section>
    )
}


const frameworks: Option[] = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
    {
        value: "angular",
        label: "Angular",
    },
    {
        value: "vue",
        label: "Vue.js",
    },
    {
        value: "react",
        label: "React",
    },
    {
        value: "ember",
        label: "Ember.js",
    },
    {
        value: "gatsby",
        label: "Gatsby",
    },
    {
        value: "eleventy",
        label: "Eleventy",
    },
    {
        value: "solid",
        label: "SolidJS",
    },
    {
        value: "preact",
        label: "Preact",
    },
    {
        value: "qwik",
        label: "Qwik",
    },
    {
        value: "alpine",
        label: "Alpine.js",
    },
    {
        value: "lit",
        label: "Lit",
    },
]

function Component() {
    return (
        <div className="*:not-first:mt-2">
            <Label>Multiselect with placeholder and clear</Label>
            <MultipleSelector
                commandProps={{
                    label: "Select frameworks",
                }}
                defaultOptions={frameworks}
                placeholder="Select frameworks"
                emptyIndicator={<p className="text-center text-sm">No results found</p>}
            />
            <p
                className="text-muted-foreground mt-2 text-xs"
                role="region"
                aria-live="polite"
            >
                Inspired by{" "}
                <a
                    className="hover:text-foreground underline"
                    href="https://shadcnui-expansions.typeart.cc/docs/multiple-selector"
                    target="_blank"
                    rel="noopener nofollow"
                >
                    shadcn/ui expansions
                </a>
            </p>
        </div>
    )
}
