import { Box, Button, chakra, Flex, HStack, HTMLChakraProps, Icon, IconButton, Link, useColorMode, useColorModeValue, useDisclosure, useUpdateEffect } from "@chakra-ui/react"
import NextLink from 'next/link'
import { useScroll } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { FaMoon, FaSun } from 'react-icons/fa'
import Logo, { LogoIcon } from './logo'
import siteConfig from 'configs/site-config.json';
import { DiscordIcon, GithubIcon } from 'components/icons'

import { MobileNavButton, MobileNavContent } from './mobile-nav'
import useAutenticate from "hooks/useAuthenticate"

function HeaderContent() {
  const mobileNav = useDisclosure()
  const { isAuthenticating, did, handleLogin, logout} = useAutenticate();

  const { toggleColorMode: toggleMode } = useColorMode()

  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const mobileNavBtnRef = useRef<HTMLButtonElement>()

  useEffect(() => {
    mobileNavBtnRef.current?.focus()
  }, [mobileNav.isOpen])

  return (
    <>
      <Flex w='100%' h='100%' px='6' align='center' justify='space-between'>
        <Flex align='center'>
          <NextLink href='/' passHref>
            <chakra.div display='block' aria-label='Comm3nts, Back to homepage'>
              <Logo display={{ base: 'none', md: 'block' }} />
              <Box minW='3rem' display={{ base: 'block', md: 'none' }}>
                <LogoIcon />
              </Box>
            </chakra.div>
          </NextLink>
        </Flex>

        <Flex
          justify='flex-end'
          w='100%'
          align='center'
          color='gray.400'
          // maxW='1100px'
        >
          <HStack spacing='5' display={{ base: 'none', md: 'flex' }}>
            <Link
              isExternal
              aria-label='Go to Comm3nts GitHub page'
              href={siteConfig.repo.url}
            >
              <Icon
                as={GithubIcon}
                display='block'
                transition='color 0.2s'
                w='5'
                h='5'
                _hover={{ color: 'gray.600' }}
              />
            </Link>
            <Link aria-label='Go to Comm3nts Discord page' href='/discord'>
              <Icon
                as={DiscordIcon}
                display='block'
                transition='color 0.2s'
                w='5'
                h='5'
                _hover={{ color: 'gray.600' }}
              />
            </Link>
          </HStack>
          <HStack spacing='5'>
            {!did?.authenticated &&
              <Button
                isLoading={isAuthenticating}
                onClick={handleLogin}

              >
                Login
              </Button>
            }
            {did?.authenticated && 
              <>
                <span>{did?.parent}</span>
                <Button
                  onClick={logout}

                >
                  Logout
                </Button>
              </>
            }
          </HStack>
          <HStack spacing='5'>
            <IconButton
              size='md'
              fontSize='lg'
              aria-label={`Switch to ${text} mode`}
              variant='ghost'
              color='current'
              ml={{ base: '0', md: '3' }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            />
            <MobileNavButton
              ref={mobileNavBtnRef}
              aria-label='Open Menu'
              onClick={mobileNav.onOpen}
            />
          </HStack>
        </Flex>
      </Flex>
      <MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
    </>
  )
}

function Header(props: HTMLChakraProps<'header'>) {
  const { maxW = '8xl', maxWidth = '8xl' } = props
  const ref = useRef<HTMLHeadingElement>(null)
  const [y, setY] = useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  const { scrollY } = useScroll()
  useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])

  return (
    <chakra.header
      ref={ref}
      shadow={y > height ? 'sm' : undefined}
      transition='box-shadow 0.2s, background-color 0.2s'
      pos='sticky'
      top='0'
      zIndex='3'
      bg='white'
      _dark={{ bg: 'gray.800' }}
      left='0'
      right='0'
      width='full'
      {...props}
    >
      <chakra.div height='4.5rem' 
        mx='auto' 
        // maxW={maxW} 
        // maxWidth={maxWidth}
      >
        <HeaderContent />
      </chakra.div>
    </chakra.header>
  )
}

export default Header