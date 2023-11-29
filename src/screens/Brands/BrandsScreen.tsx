import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback, useEffect, useState } from "react";
import { fetchBrandsAction } from "../../store/Brands/actions";
import { selectAllBrands } from "../../store/Brands/selectors";
import { Box, Text } from "@chakra-ui/react";
import { IBrand } from "@hmdlr/types";
import BrandCard from "../../components/Brands/BrandCard";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import BrandEditor from "../../components/Brands/BrandEditor";

export const BrandsScreen = () => {
  const dispatch = useAppDispatch();
  const { setActions } = useActions();
  const navigate = useNavigate();

  const brands = useAppSelector(selectAllBrands);

  const [selectedBrand, setSelectedBrand] = useState<IBrand>();

  const onBrandClick = useCallback((brand: IBrand) => {
    setSelectedBrand(brand);
  }, []);

  const renderBrand = useCallback(
    (brand: IBrand) => {
      return <BrandCard brand={brand} key={brand.id} onClick={onBrandClick} />;
    },
    [onBrandClick],
  );

  const closeBrandDetailModal = useCallback(() => {
    setSelectedBrand(undefined);
  }, []);

  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);

  useEffect(() => {
    setActions({
      "Add brand": () => navigate("/rules/new"),
    });
  }, [navigate, setActions]);

  return (
    <Box padding={"2rem"}>
      <Text marginY={"1rem"}>Private brands</Text>
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
        {brands.map(renderBrand)}
      </Box>
      <BrandEditor brand={selectedBrand} onClose={closeBrandDetailModal} />
    </Box>
  );

  // return (
  //     <Container maxW="container.xxl">
  //       <Box mt={8}>
  //         <Center>
  //           <Box w="50%">
  //             <Input
  //                 placeholder="Enter your search term"
  //                 value={searchTerm}
  //                 onChange={(e) => setSearchTerm(e.target.value)}
  //             />
  //           </Box>
  //           <Box ml={4}>
  //             <Button colorScheme="blue" onClick={handleSearch}>
  //               Search
  //             </Button>
  //           </Box>
  //         </Center>
  //       </Box>
  //
  //       <Grid
  //           mt={5}
  //           width={'100%'}
  //           templateColumns="repeat(auto-fill, 12rem)"
  //           gap={4}
  //           px={5}
  //           py={3}
  //       >
  //         {shownRules.map((rule, idx) => (
  //             <RuleBlock
  //                 rule={{ ...rule, active: true }}
  //                 handleRuleClick={() => void 0}
  //                 showActionButton={false}
  //                 key={idx}
  //             />
  //         ))}
  //       </Grid>
  //
  //     </Container>
  // )
};