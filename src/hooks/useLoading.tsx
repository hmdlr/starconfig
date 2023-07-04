import { useEffect, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

function useLoadingOverlay() {
  const [loading, setLoading] = useState(false);

  const showLoading = () => {
    setLoading(true);
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const LoadingOverlay = ({ children }: { children: any }) => {
    return (
        <Box
            position="relative"
            pointerEvents={loading ? 'none' : 'auto'}
        >
          {loading && (
              <Box
                  position="fixed"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  zIndex={9999}
              >
                <Spinner size="xl" />
              </Box>
          )}
          <Box
              filter={loading ? 'blur(2px)' : 'none'}
          >
            {children}
          </Box>
        </Box>
    );
  };


  return { showLoading, hideLoading, LoadingOverlay };
}

export default useLoadingOverlay;
