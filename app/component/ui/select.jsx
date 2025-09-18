"use client"
import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "../../lib/utils"

function Select({ children, value, onValueChange, defaultValue, ...props }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || "")

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue)
    if (onValueChange) {
      onValueChange(newValue)
    }
    setIsOpen(false)
  }

  return (
    <div className="relative" {...props}>
      {/* Pass context to children */}
      <div onClick={() => setIsOpen(!isOpen)}>
        {children && typeof children === "function" ? children({ selectedValue, isOpen, handleValueChange }) : children}
      </div>
      {isOpen && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-white shadow-md">
          {/* Content will be rendered here */}
        </div>
      )}
    </div>
  )
}

function SelectTrigger({ className, children, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </button>
  )
}

function SelectValue({ placeholder, ...props }) {
  return (
    <span className="block truncate text-gray-900" {...props}>
      {placeholder}
    </span>
  )
}

function SelectContent({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "absolute top-full z-50 mt-1 w-full rounded-md border bg-white shadow-md max-h-60 overflow-auto",
        className,
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  )
}

function SelectItem({ className, children, value, onSelect, ...props }) {
  return (
    <div
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-2 pr-8 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100",
        className,
      )}
      onClick={() => onSelect && onSelect(value)}
      {...props}
    >
      {children}
    </div>
  )
}

function SelectGroup({ children, ...props }) {
  return <div {...props}>{children}</div>
}

function SelectLabel({ className, children, ...props }) {
  return (
    <div className={cn("px-2 py-1.5 text-xs text-gray-500 font-medium", className)} {...props}>
      {children}
    </div>
  )
}

function SelectSeparator({ className, ...props }) {
  return <div className={cn("-mx-1 my-1 h-px bg-gray-200", className)} {...props} />
}

function SelectScrollUpButton(props) {
  return null
}

function SelectScrollDownButton(props) {
  return null
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
