import { InputIdentityList, useEffect, useRef } from 'react'

export default function useAutoFocusContainer(
  shouldFocus: (inputs: InputIdentityList) => boolean, inputs: InputIdentityList
) {
  const container = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    shouldFocus(inputs) && container.current.focus()
  }, inputs)
  return container
}