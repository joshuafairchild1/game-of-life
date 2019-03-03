import { InputIdentityList, useEffect, useRef } from 'react'

export default function useAutoFocusContainer(
  shouldFocus: () => boolean, inputs: InputIdentityList
) {
  const container = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (shouldFocus()
      && container.current
      && document.activeElement !== container.current) {
        container.current.focus()
    }
  }, inputs)
  return container
}