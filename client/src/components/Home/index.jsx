import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "@store/features/UserSlice";

const Index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return <div>Home</div>;
};

export default Index;
