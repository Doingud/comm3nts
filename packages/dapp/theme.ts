import { defineStyleConfig, extendTheme, StyleFunctionProps } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
  blue: {
    500: '#1DA1F2',
  },
  // bgColors: {
  //   bg: mode('whiteAlpha.900', 'gray.900')(props),
  // },
}

const Card = defineStyleConfig({
  baseStyle: (props) => ({
    container: {
      backgroundColor: mode("white", "blue.300")(props),
    }
  }),
  // variants: {
  //   container: (props) => ({
  //     dark: {
  //       // color: "white",
  //       // background: mode("white", "blue.500")(props),
  //       // fontSize: "10px",
  //       // _hover: { bg: mode("gray.700", "blue.500")(props) },
  //       // _focus: { bg: mode("gray.700", "blue.600")(props) },
  //       // _active: { bg: mode("gray.700", "blue.400")(props) },
  //     }
  //   }),
  //   }
  // }
  // defaultProps: {
  //   // backgroundColor: 'white',
  //   bg: mode('white', 'gray.700')(props),
  // }
});

const Container = defineStyleConfig({
  variants: {
    'outline-gradiant': {
      // container: {
        borderRadius: 'lg',
        p: '12',
        maxW: '2xl',
        minW: 'sm',
        borderWidth: '2px',
        borderColor: 'transparent',
        background: 'linear-gradient(white, white) padding-box, linear-gradient(134.64deg, #DEF0FA 0%, #7ADEFF 38.02%, #4188F7 63.54%, #8343F6 89.06%) border-box;',
        boxShadow: "md",
      // }
    }
  }
})

const Form = defineStyleConfig({
  // defaultProps: {
  //   colorScheme: 'green',
  // },
  // baseStyle: {
    // color: 'green',
    // background: 'black'
    // colorScheme: 'green',
  // },
  variants: {
    'columns': {
      container: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        py: '4',
      }
  //     flexDirection: 'column',
  //     colorScheme: 'green',
  //     // container: {
  //       // borderRadius: 'lg',
  //       // p: '12',
  //       // maxW: '2xl',
  //       // minW: 'sm',
  //       // borderWidth: '2px',
  //       // borderColor: 'transparent',
  //       // background: 'linear-gradient(white, white) padding-box, linear-gradient(134.64deg, #DEF0FA 0%, #7ADEFF 38.02%, #4188F7 63.54%, #8343F6 89.06%) border-box;',
  //       // boxShadow: "md",
  //     // }
    }
  }
})

const styles = {
  global: (props: StyleFunctionProps) => ({
    // body: {
    // },
    'html, body': {
      fontSize: 'sm',
      // bg: mode('white', 'gray.700')(props),
      color: mode('gray.600', 'whiteAlpha.900')(props),
      // lineHeight: 'tall',
    },
    a: {
      color: mode('teal.600', 'teal.300')(props),
    },
  }),
};

const theme = extendTheme({ 
  components: {
    Card,
    Container,
    Form,
    // FormLabel: {
    //   baseStyle: {
        
    //   }
    // }
  },
  colors,
  styles,
  fonts: {
    heading: inter.style.fontFamily,
    body: inter.style.fontFamily,
  },
});
console.log(theme);
export default theme;