import { GetServerSideProps } from "next";

import {
  Box,
  Flex,
  SimpleGrid,
  Text,
  theme,
  Spinner,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";

import dynamic from "next/dynamic";

import React, { useContext, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { ApexOptions } from "apexcharts";
import { parseCookies } from "nookies";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const series = [
  {
    name: "series1",
    data: [1, 2, 4, 7, 11, 13, 17],
  },
];

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      "2022-04-09T00:00:00.000Z",
      "2022-04-10T00:00:00.000Z",
      "2022-04-11T00:00:00.000Z",
      "2022-04-11T00:00:00.000Z",
      "2022-04-12T00:00:00.000Z",
      "2022-04-12T00:00:00.000Z",
      "2022-04-13T00:00:00.000Z",
    ],
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.5,
    },
  },
};

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const router = useRouter();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== "undefined") {
        // Handler to call on window resize

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  const size = useWindowSize();

  return (
    <Flex direction="column" h="100vh">
      {user && (
        <>
          {user.email !== "ricardofsdomene@icloud.com" ? (
            <Flex justify="center" align="center" h="100%">
              <Spinner size="xl" color="facebook.400" />
            </Flex>
          ) : (
            <>
              <Header />

              <Flex w="100vw" mx="auto">
                <Sidebar />

                <SimpleGrid
                  flex="1"
                  p="4"
                  gap="4"
                  minChildWidth={320}
                  alignItems="flex-start"
                >
                  <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
                    <Text fontSize="lg" mb="4">
                      Novos usuários
                    </Text>
                    <Chart
                      type="area"
                      height="160"
                      series={series}
                      options={options}
                    />
                  </Box>
                  <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
                    <Text fontSize="lg" mb="4">
                      Novas vagas
                    </Text>
                    <Chart
                      type="area"
                      height="160"
                      series={series}
                      options={options}
                    />
                  </Box>
                </SimpleGrid>
                {size.width >= 1200 && (
                  <>
                    {isWideVersion && (
                      <Flex justifyContent="center" width="20%" p="4">
                        <Flex
                          width="100%"
                          borderRadius="12"
                          justifyContent="center"
                          alignItems="center"
                          bg="#eee"
                          p="4"
                        >
                          <Text color="#000">{size.width}</Text>
                        </Flex>
                      </Flex>
                    )}
                  </>
                )}
              </Flex>
            </>
          )}
        </>
      )}
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  // let cookies = parseCookies(req);

  // if (!session?.activeSubscription) {
  //   return {
  //     redirect: {
  //       destination: `/posts/preview/${slug}`,
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};
