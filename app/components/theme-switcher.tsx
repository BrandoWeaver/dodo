'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { Sun, Moon, Monitor, Check, ChevronsUpDown } from 'lucide-react'
const themeOptions = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
]

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-10 w-36 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
    )
  }
  const selectedOption =
    themeOptions.find((option) => option.value === theme) || themeOptions[2]
  const SelectedIcon = selectedOption.icon

  return (
    <div className="w-36">
      <Listbox value={theme} onChange={(value) => setTheme(value)}>
        {({ open }) => (
          <div className="relative">
            <ListboxButton
              className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-900 py-2 pl-3 pr-10 text-left 
                shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 
                focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
            >
              <span className="flex items-center truncate text-gray-900 dark:text-white">
                <SelectedIcon
                  className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                />
                {selectedOption.label}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>
            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg 
                ring-1 ring-black/5 focus:outline-none sm:text-sm 
                "
            >
              {themeOptions.map((option) => (
                <ListboxOption
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                        : 'text-gray-900 dark:text-gray-200'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`flex items-center truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        <option.icon
                          className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                        />
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 dark:text-blue-400">
                          <Check className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        )}
      </Listbox>
    </div>
  )
}
