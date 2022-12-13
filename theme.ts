import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const styles = {
  global: (props: Record<string, any>) => ({
    'html, body': {
      fontSize: 'sm',
      color: props.colorMode === 'dark' ? 'white' : 'gray.600',
      // lineHeight: 'tall',
    },
    a: {
      color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
    },
  }),
};

const theme = extendTheme({ colors, styles });

export default theme;