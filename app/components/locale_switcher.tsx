// components/LocaleSwitcher.tsx
'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { Languages, Check, ChevronsUpDown } from 'lucide-react'

const availableLocales = [
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'km', label: 'Khmer', short: 'KM' },
]

export function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const pathname = usePathname()
  const activeLocale = useLocale()

  // Find the currently selected locale object for display
  const selectedLocale =
    availableLocales.find((loc) => loc.value === activeLocale) ||
    availableLocales[0]

  const onSelectChange = (nextLocale: string) => {
    if (isPending || nextLocale === activeLocale) return

    // This function replaces the current locale prefix with the new one
    startTransition(() => {
      // Logic assumes the locale is the first segment of the path (e.g., /en/about)
      const pathSegments = pathname.split('/')
      pathSegments[1] = nextLocale
      const newPath = pathSegments.join('/')

      // Use router.replace to switch the route
      router.replace(newPath)
    })
  }

  return (
    <div className="w-36">
      <Listbox
        value={activeLocale}
        onChange={onSelectChange}
        disabled={isPending}
      >
        {({ open }) => (
          <div className="relative">
            {/* 1. Listbox Button (The visible selection) */}
            <ListboxButton
              className="relative w-full cursor-default rounded-lg bg-white dark:bg-gray-900 py-2 pl-3 pr-10 text-left 
                shadow-md focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2 
                focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm 
                text-gray-900 dark:text-white transition-colors duration-200"
            >
              <span className="flex items-center truncate font-medium">
                <Languages
                  className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                />
                {selectedLocale.label}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronsUpDown
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            {/* 2. Listbox Options (The dropdown menu) */}
            <ListboxOptions
              transition
              className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg 
                ring-1 ring-black/5 focus:outline-none sm:text-sm"
            >
              {availableLocales.map((locale) => (
                <ListboxOption
                  key={locale.value}
                  value={locale.value}
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
                        {locale.label}
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
