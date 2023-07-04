import { useActions } from "../../hooks/useActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CreateRule = () => {
  const { setActions } = useActions();
  const navigate = useNavigate();


  useEffect(() => {
    setContextActions();
  }, []);

  const setContextActions = () => {
    setActions({
      'Cancel': () => navigate(`/rules`),
    })
  }

  return (
<></>
  )
}
