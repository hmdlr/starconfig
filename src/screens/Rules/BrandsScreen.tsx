import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback, useEffect } from "react";
import { fetchBrandsAction } from "../../store/Brands/actions";
import { selectAllBrands } from "../../store/Brands/selectors";
import { Box } from "@chakra-ui/react";
import { IBrand } from "@hmdlr/types";
import BrandCard from "../../components/Brands/BrandCard";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";

export const BrandsScreen = () => {
  const dispatch = useAppDispatch();
  const { setActions } = useActions();
  const navigate = useNavigate();

  const brands = useAppSelector(selectAllBrands);

  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);

  const renderBrand = useCallback((brand: IBrand) => {
    return <BrandCard brand={brand} key={brand.id} />;
  }, []);

  useEffect(() => {
    setActions({
      "Add brand": () => navigate("/rules/new"),
    });
  }, [navigate, setActions]);

  return (
    <Box padding={"2rem"}>
      <Box display={"flex"} flexWrap={"wrap"} gap={"1rem"}>
        {brands.map(renderBrand)}
      </Box>
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
