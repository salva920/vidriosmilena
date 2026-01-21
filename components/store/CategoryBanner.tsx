'use client'

import { Box, Heading, Text, VStack } from '@chakra-ui/react'

interface CategoryBannerProps {
  categoryName: string
  categoryDescription?: string
  categoryImage?: string
  imageUrl?: string
  isLandingPage?: boolean
  tipo?: string | null
}

export default function CategoryBanner({
  categoryName,
  categoryDescription,
  categoryImage,
  imageUrl,
  isLandingPage = false,
  tipo
}: CategoryBannerProps) {
  return (
    <Box
      position="relative"
      borderRadius="xl"
      overflow="hidden"
      h={{ base: '220px', md: '320px' }}
      mb="8"
      bg={isLandingPage ? 'transparent' : 'blue.900'}
    >
      {(imageUrl || categoryImage) && (
        <Box
          as="img"
          src={imageUrl || categoryImage}
          alt={categoryName}
          w="100%"
          h="100%"
          objectFit="cover"
          opacity={isLandingPage ? 1 : 0.3}
        />
      )}

      {!isLandingPage && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          textAlign="center"
          px="4"
        >
          <VStack spacing="3">
            <Heading size="2xl">
              {categoryName}
              {tipo === 'mamparas' && ' - Mamparas'}
              {tipo === 'espejos' && ' - Espejos'}
              {tipo === 'espejos-led' && ' - Espejos LED'}
            </Heading>
            {categoryDescription && (
              <Text fontSize="lg">{categoryDescription}</Text>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  )
}
