import { HTMLChakraProps, chakra, useColorModeValue } from '@chakra-ui/react'

export const LikeIcon = (props: HTMLChakraProps<'svg'>) => (
  <chakra.svg viewBox="0 0 19 16" {...props}>
    <path d="M10.2767 1.97821L9.49781 2.69125L8.71515 1.97648C7.75765 1.10214 6.45905 0.610993 5.10502 0.611075C3.751 0.611156 2.45247 1.10246 1.49509 1.97691C0.53771 2.85136 -8.9052e-05 4.03733 1.10603e-08 5.2739C8.90741e-05 6.51048 0.538059 7.69638 1.49556 8.57072L8.9944 15.4191C9.12797 15.5409 9.30903 15.6094 9.49781 15.6094C9.68659 15.6094 9.86764 15.5409 10.0012 15.4191L17.5067 8.56898C18.4631 7.69446 19.0002 6.50897 19 5.27298C18.9998 4.037 18.4624 2.85164 17.5058 1.97735C17.0312 1.54367 16.4677 1.19963 15.8475 0.964911C15.2273 0.730188 14.5626 0.609375 13.8912 0.609375C13.2199 0.609375 12.5551 0.730188 11.9349 0.964911C11.3147 1.19963 10.7512 1.54367 10.2767 1.97735V1.97821Z" fill="#2D3748"/>
  </chakra.svg>
)