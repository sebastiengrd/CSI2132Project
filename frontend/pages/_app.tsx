import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '../components/contexts/UserContext';
import theme from "../components/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ChakraProvider>
  )
}

export default MyApp