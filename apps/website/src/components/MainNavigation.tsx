import { For } from "solid-js"
import { A } from "solid-start"
import { cleanPath, docs, Document } from "~/documents"

type Configuration = {
  sidebar: Entry[]
}

type Entry = {
  path?: string
  title: string
  children?: Entry[]
}

const configuration: Configuration = {
  sidebar: [
    {
      path: "introduction",
      title: "Introduction"
    },
    {
      title: "Manual"
    },
    {
      path: "/manual/introduction",
      title: "Introduction"
    },
    {
      path: "/manual/installation",
      title: "Installation"
    },
    {
      path: "/manual/basic-usage",
      title: "Basic Usage"
    },
    {
      path: "/manual/advanced-usage",
      title: "Advanced Usage"
    },
    {
      path: "/manual/best-practices",
      title: "Best Practices"
    },
    {
      title: "Guides"
    },
    {
      path: "/guides/performance",
      title: "Performance"
    }
  ]
}

function NavigationList({ entries }: { entries: Entry[]; prefix?: string }) {
  return (
    <ul>
      <For each={entries}>
        {(entry) => (
          <li>
            {entry.path ? (
              <A href={entry.path} activeClass="current">
                {entry.title}
              </A>
            ) : (
              <div class="section-title">{entry.title}</div>
            )}
          </li>
        )}
      </For>
    </ul>
  )
}

export function MainNavigation() {
  return (
    <nav role="main">
      <NavigationList entries={configuration.sidebar} />
    </nav>
  )
}
