'use client'

import { Box, Heading, Text, VStack, HStack, Select } from '@chakra-ui/react'
import { FilterOptions } from '@/types/product'

interface ProductFiltersProps {
  filters: FilterOptions
  setFilters: (filters: FilterOptions) => void
  minPrice: number
  maxPrice: number
  formatPrice: (price: number) => string
}

export default function ProductFilters({
  filters,
  setFilters,
  minPrice,
  maxPrice,
  formatPrice
}: ProductFiltersProps) {
  return (
    <Box
      w={{ base: '100%', lg: '250px' }}
      bg="white"
      p="6"
      borderRadius="lg"
      boxShadow="sm"
      h="fit-content"
      position={{ lg: 'sticky' }}
      top="120px"
    >
      <VStack align="stretch" spacing="6">
        <Heading size="sm" color="gray.900">
          Filtros
        </Heading>

        {/* Precio */}
        <Box>
          <Text fontSize="sm" fontWeight="semibold" mb="2">
            Precio
          </Text>
          <VStack spacing="2">
            <HStack w="100%" justify="space-between">
              <Text fontSize="xs">{formatPrice(filters.priceRange[0])}</Text>
              <Text fontSize="xs">{formatPrice(filters.priceRange[1])}</Text>
            </HStack>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={filters.priceRange[1]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilters({
                  ...filters,
                  priceRange: [filters.priceRange[0], parseInt(e.target.value, 10)],
                })
              }
              style={{ width: '100%' }}
            />
          </VStack>
        </Box>

        {/* Ordenar */}
        <Box>
          <Text fontSize="sm" fontWeight="semibold" mb="2">
            Ordenar por
          </Text>
          <Select
            value={filters.sortBy}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })
            }
            size="sm"
          >
            <option value="name-asc">Nombre A-Z</option>
            <option value="name-desc">Nombre Z-A</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
          </Select>
        </Box>
      </VStack>
    </Box>
  )
}
