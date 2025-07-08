import { ErrorPage } from "../../../features/ErrorPage/components/ErrorPage"

export const NotFound = () => {
    return (
        <ErrorPage
            title="Page not found"
            description="The page you are looking for does not exist."
            image="/src/assets/not-found.avif"
            showHeader={false}
        />
    )
}