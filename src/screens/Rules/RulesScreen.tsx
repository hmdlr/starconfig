import { Box, Button, Center, Container, Grid, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useActions } from "../../hooks/useActions";
import { useNavigate } from "react-router-dom";
import { useRules } from "../../hooks/useRules";
import { RuleBlock } from "../../components/Rule";


export const RulesScreen = () => {
  const { setActions } = useActions();
  const { loadAllRules, rules} = useRules();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const [shownRules, setShownRules] = useState(rules);

  const handleSearch = () => {
    // Perform search logic here
    const filteredRules = rules.filter((rule) => {
      return rule.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setShownRules(filteredRules);
  };

  useEffect(() => {
    setContextActions();
    loadAllRules();
  }, []);

  useEffect(() => {
    setShownRules(rules)
  }, [rules])

  const setContextActions = () => {
    setActions({
      'Create': () => navigate(`/rules/new`),
    })
  }

  return (
      <Container maxW="container.xxl">
        <Box mt={8}>
          <Center>
            <Box w="50%">
              <Input
                  placeholder="Enter your search term"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
            <Box ml={4}>
              <Button colorScheme="blue" onClick={handleSearch}>
                Search
              </Button>
            </Box>
          </Center>
        </Box>

        <Grid
            mt={5}
            width={'100%'}
            templateColumns="repeat(auto-fill, 12rem)"
            gap={4}
            px={5}
            py={3}
        >
          {shownRules.map((rule, idx) => (
              <RuleBlock
                  rule={{ ...rule, active: true }}
                  handleRuleClick={() => void 0}
                  showActionButton={false}
                  key={idx}
              />
          ))}
        </Grid>

      </Container>
  )
}
