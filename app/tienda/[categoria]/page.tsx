'use client'

import { Box, Container, Text, SimpleGrid, HStack, Flex } from '@chakra-ui/react'
import { useState, useMemo } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import StoreNavbar from '@/components/store/StoreNavbar'
import ProductCard from '@/components/store/ProductCard'
import CategoryBanner from '@/components/store/CategoryBanner'
import ProductFilters from '@/components/store/ProductFilters'
import CocinasLanding from '@/components/landings/CocinasLanding'
import PergolasLanding from '@/components/landings/PergolasLanding'
import TerrazasLanding from '@/components/landings/TerrazasLanding'
import HabitacionesOficinasLanding from '@/components/landings/HabitacionesOficinasLanding'
import { getProductsByCategory, categories } from '@/data/products'
import { FilterOptions } from '@/types/product'
import Footer from '@/components/Footer'

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const categorySlug = params.categoria as string
  const tipo = searchParams.get('tipo')
  
  const category = categories.find(c => c.slug === categorySlug)
  const allProducts = getProductsByCategory(categorySlug)
  
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000000],
    sortBy: 'name-asc'
  })

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Filtrar por tipo si estamos en la categoría Baños
    if (categorySlug === 'banos' && tipo) {
      filtered = filtered.filter(p => {
        const nameLower = p.name.toLowerCase()
        if (tipo === 'mamparas') {
          return nameLower.includes('shower door') || nameLower.includes('mampara') || nameLower.includes('corredera')
        } else if (tipo === 'espejos') {
          return nameLower.includes('espejo') && !nameLower.includes('led')
        } else if (tipo === 'espejos-led') {
          return nameLower.includes('led') || nameLower.includes('espejo led')
        }
        return true
      })
    }

    // Filtrar por rango de precio
    filtered = filtered.filter(p => {
      const price = p.originalPrice || p.price
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    // Ordenar
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return (a.originalPrice || a.price) - (b.originalPrice || b.price)
        case 'price-desc':
          return (b.originalPrice || b.price) - (a.originalPrice || a.price)
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    return filtered
  }, [allProducts, filters, categorySlug, tipo])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const minPrice = Math.min(...allProducts.map(p => p.originalPrice || p.price))
  const maxPrice = Math.max(...allProducts.map(p => p.originalPrice || p.price))

  const isCocinasLanding = categorySlug === 'cocinas'
  const isPergolasLanding = categorySlug === 'pergolas-bioclimaticas'
  const isTerrazasLanding = categorySlug === 'terrazas-quinchos'
  const isHabitacionesLanding = categorySlug === 'habitaciones-oficinas'
  const isLandingPage = isCocinasLanding || isPergolasLanding || isTerrazasLanding || isHabitacionesLanding

  // Determinar imagen del banner según la categoría
  const getBannerImage = () => {
    if (isCocinasLanding) return 'https://dellorto.cl/wp-content/uploads/2025/03/SPLASHBACK_01.jpg'
    if (isPergolasLanding) return 'https://dellorto.cl/wp-content/uploads/2025/08/ENVIAR_ERICK-02-1024x385.jpg'
    if (isTerrazasLanding) return 'https://dellorto.cl/wp-content/uploads/2025/03/CIERRES_DE_TERRAZA.jpg'
    if (isHabitacionesLanding) return 'https://dellorto.cl/wp-content/uploads/2023/04/Portada-soluciones-9.png'
    return category?.image
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <StoreNavbar />
      
      <Box pt="8" pb="16">
        <Container maxW="container.xl">
          {/* Banner de categoría */}
          {category && (
            <CategoryBanner
              categoryName={category.name}
              categoryDescription={category.description}
              categoryImage={category.image}
              imageUrl={getBannerImage()}
              isLandingPage={isLandingPage}
              tipo={tipo}
            />
          )}

          {/* Landings especiales por categoría */}
          {isCocinasLanding ? (
            <CocinasLanding />
          ) : isPergolasLanding ? (
            <PergolasLanding />
          ) : isTerrazasLanding ? (
            <TerrazasLanding />
          ) : isHabitacionesLanding ? (
            <HabitacionesOficinasLanding />
          ) : (
            <Flex gap="6" direction={{ base: 'column', lg: 'row' }}>
              {/* Sidebar de filtros */}
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                minPrice={minPrice}
                maxPrice={maxPrice}
                formatPrice={formatPrice}
              />

              {/* Productos */}
              <Box flex="1">
                <HStack justify="space-between" mb="6">
                  <Text color="gray.600">
                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                  </Text>
                </HStack>

                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </SimpleGrid>

                {filteredProducts.length === 0 && (
                  <Text textAlign="center" color="gray.500" py="12">
                    No se encontraron productos con estos filtros
                  </Text>
                )}
              </Box>
            </Flex>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}
