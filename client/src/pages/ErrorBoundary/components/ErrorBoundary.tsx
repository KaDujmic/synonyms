import {useEffect} from "react";
import {useRouteError} from "react-router";
import { ErrorPage } from "../../../features/ErrorPage/components/ErrorPage";

export const ErrorBoundary = () => {
    const error = useRouteError();

    useEffect(() => {
        // Log error :)
        console.log('error', error);
    }, []);

    return (
      <ErrorPage
        title="Oops! Something went wrong :("
        description="Try to refresh the page or use one of the links below."
        image="/src/assets/something-went-wrong.webp"
      />
    )
}