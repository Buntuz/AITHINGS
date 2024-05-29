"use client"
import React from 'react'

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'


  import Link from "next/link"
 
  import { cn } from "@/lib/utils"
  import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
  
  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/primitives/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
      title: "Hover Card",
      href: "/docs/primitives/hover-card",
      description:
        "For sighted users to preview content available behind a link.",
    },
    {
      title: "Progress",
      href: "/docs/primitives/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
      title: "Scroll-area",
      href: "/docs/primitives/scroll-area",
      description: "Visually or semantically separates content.",
    },
    {
      title: "Tabs",
      href: "/docs/primitives/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
      title: "Tooltip",
      href: "/docs/primitives/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
  ]

  //https://heroicons.com/
  const products = [
    { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
  ]
  const callsToAction = [
    { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
    { name: 'Contact sales', href: '#', icon: PhoneIcon },
  ]
  
  function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

  
const TopBar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>  

<header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Product
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-4">
                                        <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                        
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                            shadcn/ui
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                            Beautifully designed components that you can copy and
                                            paste into your apps. Accessible. Customizable. Open
                                            Source.
                                            </p>
                                        </a>
                                        </NavigationMenuLink>
                                    </li>

                                    <ul className="space-y-4">
                                        <li>
                                            <a
                                            href="/docs/primitives/typography"
                                            className="block py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                                            title="Typography"
                                            >
                                            Styles for headings, paragraphs, lists...etc
                                            </a>
                                        </li>
                                        {/* Add more list items as needed */}
                                        </ul>
                                    </ul>
                                </NavigationMenuContent>
                                </NavigationMenuItem>
                                
                                
                            </NavigationMenuList>
                            </NavigationMenu>
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
          <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                                <ul className="space-y-4">
                                                <li>
                                                <a
                                                    href={component.href}
                                                    className="block py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                                                    title="Typography"
                                                >
                                                    {component.description}
                                                    {component.title}
                                                </a>
                                                
                                                </li>
                                                {/* Add more list items as needed */}
                                                </ul>
                                        
                                    ))}
                                    </ul>
                                </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                <Link href="/docs" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Documentation
                                    </NavigationMenuLink>
                                </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                            </NavigationMenu>
          </a>
          
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                    <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-4">
                                        <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                        
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                            shadcn/ui
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                            Beautifully designed components that you can copy and
                                            paste into your apps. Accessible. Customizable. Open
                                            Source.
                                            </p>
                                        </a>
                                        </NavigationMenuLink>
                                    </li>

                                    <ul className="space-y-4">
                                        <li>
                                            <a
                                            href="/docs/primitives/typography"
                                            className="block py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                                            title="Typography"
                                            >
                                            Styles for headings, paragraphs, lists...etc
                                            </a>
                                        </li>
                                        {/* Add more list items as needed */}
                                        </ul>
                                    </ul>
                                </NavigationMenuContent>
                                </NavigationMenuItem>
                                
                                
                            </NavigationMenuList>
                            </NavigationMenu>
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
                                                <ul className="space-y-4">
                                                <li>
                                                <a
                                                    href={component.href}
                                                    className="block py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                                                    title="Typography"
                                                >
                                                    {component.description}
                                                    {component.title}
                                                </a>
                                                
                                                </li>
                                                {/* Add more list items as needed */}
                                                </ul>
                                        
                                    ))}
                                    </ul>
                                </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                <Link href="/docs" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Documentation
                                    </NavigationMenuLink>
                                </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                            </NavigationMenu>
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                        
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                            shadcn/ui
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                            Beautifully designed components that you can copy and
                                            paste into your apps. Accessible. Customizable. Open
                                            Source.
                                            </p>
                                        </a>
                                        </NavigationMenuLink>
                                    </li>

                                    <ul className="space-y-4">
                                        <li>
                                            <a
                                            href="/docs/primitives/typography"
                                            className="block py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                                            title="Typography"
                                            >
                                            Styles for headings, paragraphs, lists...etc
                                            </a>
                                        </li>
                                        {/* Add more list items as needed */}
                                        </ul>

                                    

                                    </ul>
                                </NavigationMenuContent>
                                </NavigationMenuItem>

                               
                            </NavigationMenuList>
                            </NavigationMenu>
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
    </>
   
  )
}

export default TopBar
